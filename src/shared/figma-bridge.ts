/** Browser client for the local Figma bridge. The bridge only listens on 127.0.0.1. */

export const FIGMA_BRIDGE_PORT = 47321;
export const FIGMA_BRIDGE_URL = `http://127.0.0.1:${FIGMA_BRIDGE_PORT}`;
export const FIGMA_NOT_CONNECTED = "피그마 MCP 연동이 되어 있지 않습니다. 다시 연결한 뒤 생성해 주세요.";
/** Figma rejects images larger than this on either edge. */
export const FIGMA_IMAGE_MAX = 4096;

export type FigmaPageRef = { fileKey: string; nodeId: string | null };

export function parseFigmaPageUrl(value: string): FigmaPageRef | null {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase();
  if (host !== "figma.com" && !host.endsWith(".figma.com")) return null;
  const parts = url.pathname.split("/").filter(Boolean);
  const designAt = parts.indexOf("design");
  const fileAt = parts.indexOf("file");
  const at = designAt >= 0 ? designAt : fileAt;
  const key = parts[at + 1];
  if (at < 0 || !key) return null;
  const branch = parts[at + 2] === "branch" ? parts[at + 3] : "";
  const fileKey = branch || key;
  if (!/^[A-Za-z0-9]{10,128}$/.test(fileKey)) return null;
  const raw = url.searchParams.get("node-id");
  if (!raw) return { fileKey, nodeId: null };
  const nodeId = decodeURIComponent(raw).replace(/-/g, ":");
  if (!/^[A-Za-z0-9:;]+$/.test(nodeId)) return null;
  return { fileKey, nodeId };
}

export async function figmaBridgeReady(): Promise<boolean> {
  try {
    const res = await fetch(`${FIGMA_BRIDGE_URL}/health`, { signal: abortAfter(1200) });
    if (!res.ok) return false;
    const body = (await res.json()) as { plugin?: unknown };
    return body.plugin === true;
  } catch {
    return false;
  }
}

export async function sendCardToFigma(input: {
  page: FigmaPageRef;
  name: string;
  width: number;
  height: number;
  radius: number;
  png: Blob;
}): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const bytes = new Uint8Array(await input.png.arrayBuffer());
    const res = await fetch(`${FIGMA_BRIDGE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileKey: input.page.fileKey,
        nodeId: input.page.nodeId,
        name: input.name,
        width: input.width,
        height: input.height,
        radius: input.radius,
        pngBase64: bytesToBase64(bytes),
      }),
      signal: abortAfter(30_000),
    });
    const created = (await res.json().catch(() => ({}))) as { id?: unknown; error?: unknown };
    if (res.status === 409) {
      return { ok: false, message: text(created.error, "이전 카드를 아직 Figma에 넣는 중입니다.") };
    }
    if (!res.ok || typeof created.id !== "string") {
      return { ok: false, message: text(created.error, "카드를 Figma에 넣지 못했습니다.") };
    }
    const deadline = Date.now() + 45_000;
    while (Date.now() < deadline) {
      await delay(400);
      const statusRes = await fetch(`${FIGMA_BRIDGE_URL}/jobs/${created.id}`, { signal: abortAfter(2000) });
      if (statusRes.status === 404) return { ok: false, message: "카드를 Figma에 넣지 못했습니다." };
      const status = (await statusRes.json().catch(() => ({}))) as { status?: unknown; error?: unknown };
      if (status.status === "done") return { ok: true };
      if (status.status === "error") {
        return { ok: false, message: text(status.error, "카드를 Figma에 넣지 못했습니다.") };
      }
    }
    await fetch(`${FIGMA_BRIDGE_URL}/jobs/${created.id}/cancel`, { method: "POST" }).catch(() => undefined);
    return { ok: false, message: "Figma 플러그인이 응답하지 않습니다. 플러그인을 실행 중인지 확인해 주세요." };
  } catch {
    return { ok: false, message: FIGMA_NOT_CONNECTED };
  }
}

function text(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const step = 8192;
  for (let index = 0; index < bytes.length; index += step) {
    binary += String.fromCharCode(...bytes.subarray(index, index + step));
  }
  return btoa(binary);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function abortAfter(ms: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}
