/**
 * Local relay between the studio and the Figma plugin.
 * Listens on 127.0.0.1 only. `npm run dev` starts it; `npm run figma-bridge` starts it alone.
 */
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { FIGMA_BRIDGE_PORT, FIGMA_BRIDGE_URL } from "../src/shared/figma-bridge.ts";

const HOST = "127.0.0.1";
const BODY_LIMIT = 48 * 1024 * 1024;
const PLUGIN_FRESH_MS = 4000;
const JOB_TTL_MS = 120_000;

type Job = {
  id: string;
  fileKey: string;
  nodeId: string | null;
  name: string;
  width: number;
  height: number;
  radius: number;
  png: Buffer;
  status: "pending" | "done" | "error";
  error: string;
  leasedUntil: number;
  createdAt: number;
};

let server: Server | null = null;
let starting = false;
let pluginSeenAt = 0;
let pending: Job | null = null;
const jobs = new Map<string, Job>();

export function startFigmaBridge(): Server | null {
  if (server?.listening) return server;
  if (starting) return null;
  starting = true;
  const next = createServer((req, res) => {
    void handle(req, res).catch((error: unknown) => {
      if (res.headersSent) return;
      const status = typeof error === "object" && error && "status" in error && typeof error.status === "number" ? error.status : 500;
      sendJson(res, status, { error: error instanceof Error ? error.message : "실패" });
    });
  });
  next.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.log(`[figma-bridge] ${FIGMA_BRIDGE_URL} is already running`);
      if (server === next) server = null;
      return;
    }
    console.error("[figma-bridge]", error);
  });
  server = next;
  next.listen(FIGMA_BRIDGE_PORT, HOST, () => {
    console.log(`[figma-bridge] ${FIGMA_BRIDGE_URL}`);
  });
  return next;
}

async function handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method === "OPTIONS") {
    cors(res);
    res.writeHead(204);
    res.end();
    return;
  }
  sweep();
  const url = new URL(req.url ?? "/", FIGMA_BRIDGE_URL);
  const path = url.pathname;
  if (req.method === "GET" && path === "/health") {
    sendJson(res, 200, { ok: true, plugin: Date.now() - pluginSeenAt < PLUGIN_FRESH_MS });
    return;
  }
  if (req.method === "GET" && path === "/jobs/next") {
    pluginSeenAt = Date.now();
    const job = takePending();
    sendJson(res, 200, {
      job: job
        ? {
            id: job.id,
            fileKey: job.fileKey,
            nodeId: job.nodeId,
            name: job.name,
            width: job.width,
            height: job.height,
            radius: job.radius,
          }
        : null,
    });
    return;
  }
  const png = path.match(/^\/jobs\/([^/]+)\/png$/);
  if (req.method === "GET" && png) {
    const job = jobs.get(decodeURIComponent(png[1] ?? ""));
    if (!job) {
      sendJson(res, 404, { error: "없는 작업입니다." });
      return;
    }
    cors(res);
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": job.png.length,
      "Cache-Control": "no-store",
    });
    res.end(job.png);
    return;
  }
  const one = path.match(/^\/jobs\/([^/]+)$/);
  if (req.method === "GET" && one) {
    const job = jobs.get(decodeURIComponent(one[1] ?? ""));
    if (!job) {
      sendJson(res, 404, { error: "없는 작업입니다." });
      return;
    }
    sendJson(res, 200, { status: job.status, error: job.error });
    return;
  }
  const result = path.match(/^\/jobs\/([^/]+)\/result$/);
  if (req.method === "POST" && result) {
    const job = jobs.get(decodeURIComponent(result[1] ?? ""));
    if (!job) {
      sendJson(res, 404, { error: "없는 작업입니다." });
      return;
    }
    const body = await readJson(req);
    const record = asRecord(body);
    job.status = record.ok === true ? "done" : "error";
    job.error = job.status === "error" ? clip(record.error, "카드를 넣지 못했습니다.") : "";
    if (pending?.id === job.id) pending = null;
    sendJson(res, 200, { ok: true });
    return;
  }
  const cancel = path.match(/^\/jobs\/([^/]+)\/cancel$/);
  if (req.method === "POST" && cancel) {
    const job = jobs.get(decodeURIComponent(cancel[1] ?? ""));
    if (job && job.status === "pending") {
      job.status = "error";
      job.error = "Figma 플러그인이 응답하지 않습니다. 플러그인을 실행 중인지 확인해 주세요.";
      if (pending?.id === job.id) pending = null;
    }
    sendJson(res, 200, { ok: true });
    return;
  }
  if (req.method === "POST" && path === "/jobs") {
    if (pending && pending.status === "pending" && Date.now() - pending.createdAt < 60_000) {
      sendJson(res, 409, { error: "이전 카드를 아직 Figma에 넣는 중입니다." });
      return;
    }
    const body = asRecord(await readJson(req));
    const job = jobFrom(body);
    jobs.set(job.id, job);
    pending = job;
    sendJson(res, 200, { id: job.id });
    return;
  }
  sendJson(res, 404, { error: "없는 주소입니다." });
}

function takePending(): Job | null {
  if (!pending || pending.status !== "pending") return null;
  if (pending.leasedUntil > Date.now()) return null;
  pending.leasedUntil = Date.now() + 45_000;
  return pending;
}

function jobFrom(body: Record<string, unknown>): Job {
  const fileKey = body.fileKey;
  const name = body.name;
  const width = body.width;
  const height = body.height;
  const radius = body.radius;
  const pngBase64 = body.pngBase64;
  const nodeId = body.nodeId;
  if (typeof fileKey !== "string" || !/^[A-Za-z0-9]{10,128}$/.test(fileKey)) fail(400, "Figma 파일 주소를 확인해 주세요.");
  if (typeof width !== "number" || typeof height !== "number" || width < 1 || height < 1 || width > 20000 || height > 20000) {
    fail(400, "카드 크기를 확인해 주세요.");
  }
  if (typeof radius !== "number" || !Number.isFinite(radius) || radius < 0 || radius > 10000) fail(400, "카드 radius를 확인해 주세요.");
  if (typeof pngBase64 !== "string") fail(400, "카드 이미지가 없습니다.");
  const png = Buffer.from(pngBase64, "base64");
  if (png.length < 8 || png.length > 40_000_000 || png[0] !== 0x89 || png[1] !== 0x50 || png[2] !== 0x4e || png[3] !== 0x47) {
    fail(400, "카드 이미지를 읽지 못했습니다.");
  }
  const parsedNode = typeof nodeId === "string" && /^[A-Za-z0-9:;]+$/.test(nodeId) ? nodeId : null;
  return {
    id: crypto.randomUUID(),
    fileKey,
    nodeId: parsedNode,
    name: typeof name === "string" && name.trim() ? name.trim().slice(0, 120) : "카드",
    width: Math.round(width),
    height: Math.round(height),
    radius: Math.round(radius),
    png,
    status: "pending",
    error: "",
    leasedUntil: 0,
    createdAt: Date.now(),
  };
}

function sweep(): void {
  const now = Date.now();
  for (const [id, job] of jobs) {
    if (now - job.createdAt > JOB_TTL_MS) {
      jobs.delete(id);
      if (pending?.id === id) pending = null;
    }
  }
}

function clip(value: unknown, fallback: string): string {
  if (typeof value !== "string" || !value.trim()) return fallback;
  return value.trim().slice(0, 200);
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const raw = await readBody(req);
  try {
    return JSON.parse(raw.toString("utf8")) as unknown;
  } catch {
    fail(400, "요청을 읽지 못했습니다.");
  }
}

async function readBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buf.length;
    if (size > BODY_LIMIT) fail(413, "카드 이미지가 너무 큽니다.");
    chunks.push(buf);
  }
  return Buffer.concat(chunks);
}

function fail(status: number, message: string): never {
  throw Object.assign(new Error(message), { status });
}

function cors(res: ServerResponse): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  cors(res);
  const data = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(data),
    "Cache-Control": "no-store",
  });
  res.end(data);
}

if (process.argv[1]?.endsWith("figma-bridge.ts")) startFigmaBridge();
