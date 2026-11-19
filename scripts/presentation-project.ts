/**
 * Local page folders: presentation/project 1/pages/page N.
 * The dev server creates, deletes, and serves them. A production build has no route.
 */
import { createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve, sep } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { backgroundIdFor, logoSlug, speakerSlug } from "../src/shared/conference.ts";
import { GIT_MAX_FILE_BYTES } from "../src/shared/limits.ts";
import { PRESENTATION_MEDIA_PREFIX, PRESENTATION_PROJECT_ROUTE, PRESENTATION_UPLOAD_ROUTE } from "../src/shared/presentation-files.ts";

const PROJECT = join("presentation", "project 1", "pages");
const META = "page.json";
const IMAGE = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);
const VIDEO = new Set([".mp4", ".webm", ".mov"]);
const SOURCE = "phase 2-resources";

type Meta = { id: string; placed: string[] };
type Folder = { dir: string; meta: Meta };
type SyncPage = { id: string; copy?: string[] };
type ListedFile = { name: string; kind: "image" | "video"; placed: boolean };

function pagesRoot(): string {
  return resolve(PROJECT);
}

function safeId(id: string): boolean {
  return /^[\w-]+$/.test(id);
}

function inside(parent: string, child: string): boolean {
  const root = resolve(parent);
  const target = resolve(child);
  return target === root || target.startsWith(`${root}${sep}`);
}

function readMeta(dir: string): Meta | null {
  try {
    const raw = JSON.parse(readFileSync(join(dir, META), "utf8")) as { id?: unknown; placed?: unknown };
    if (typeof raw.id !== "string" || !safeId(raw.id)) return null;
    const placed = Array.isArray(raw.placed) ? raw.placed.filter((name): name is string => typeof name === "string" && name === basename(name)) : [];
    return { id: raw.id, placed };
  } catch {
    return null;
  }
}

function writeMeta(dir: string, meta: Meta): void {
  const next = `${JSON.stringify({ id: meta.id, placed: meta.placed }, null, 2)}\n`;
  const file = join(dir, META);
  if (existsSync(file) && readFileSync(file, "utf8") === next) return;
  writeFileSync(file, next);
}

function kindOf(name: string): "image" | "video" | null {
  const ext = extname(name).toLowerCase();
  if (IMAGE.has(ext)) return "image";
  if (VIDEO.has(ext)) return "video";
  return null;
}

/** SVGs in the source folder have a viewBox and no pixel size. An img needs both. */
function sizedSvg(text: string): string {
  if (/<svg[^>]*\swidth=/.test(text)) return text;
  const viewBox = text.match(/<svg[^>]*\bviewBox="\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/);
  const edge = 1080;
  const vw = viewBox ? Number(viewBox[1]) : edge;
  const vh = viewBox ? Number(viewBox[2]) : edge;
  const scale = edge / Math.max(vw, vh, 1);
  const width = Math.round(vw * scale);
  const height = Math.round(vh * scale);
  return text.replace(/<svg\b/, `<svg width="${width}" height="${height}"`);
}

let sourceMap: Map<string, string> | null = null;

function sources(): Map<string, string> {
  if (sourceMap) return sourceMap;
  const map = new Map<string, string>();
  const root = resolve(SOURCE);
  const addDir = (dir: string, put: (file: string, name: string) => void) => {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
      if (name.startsWith(".")) continue;
      const file = join(dir, name);
      if (!statSync(file).isFile()) continue;
      put(file, name);
    }
  };
  addDir(join(root, "[Speecher]"), (file, name) => {
    const id = speakerSlug(name);
    if (id) map.set(`conf:${id}`, file);
  });
  addDir(join(root, "[SVG]"), (file, name) => {
    const id = logoSlug(name);
    if (id) map.set(`conf:${id}`, file);
  });
  const graphics = join(root, "[Graphic_Resources] 2");
  if (existsSync(graphics)) {
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        if (name.startsWith(".")) continue;
        const file = join(dir, name);
        if (statSync(file).isDirectory()) {
          walk(file);
          continue;
        }
        const id = backgroundIdFor(name);
        const kind = kindOf(name);
        if (!id || !kind) continue;
        map.set(`${kind === "video" ? "bgv" : "bg"}:${id}`, file);
      }
    };
    walk(graphics);
  }
  sourceMap = map;
  return map;
}

/** Copies a conference asset into the page folder. Returns the file name, or null when the key is unknown. */
function copyAsset(dir: string, key: string): string | null {
  const from = sources().get(key);
  if (!from) return null;
  const name = basename(from);
  const dest = join(dir, name);
  if (!existsSync(dest)) {
    if (extname(from).toLowerCase() === ".svg") writeFileSync(dest, sizedSvg(readFileSync(from, "utf8")));
    else writeFileSync(dest, readFileSync(from));
  }
  return name;
}

function readFolders(): Map<string, Folder> {
  const root = pagesRoot();
  const found = new Map<string, Folder>();
  if (!existsSync(root)) return found;
  for (const name of readdirSync(root)) {
    if (name.startsWith(".") && !name.startsWith(".tmp-") && !name.startsWith(".new-")) continue;
    const dir = join(root, name);
    if (!statSync(dir).isDirectory()) continue;
    const meta = readMeta(dir);
    if (!meta || found.has(meta.id)) continue;
    found.set(meta.id, { dir, meta });
  }
  return found;
}

function listFiles(folder: Folder): ListedFile[] {
  const files: ListedFile[] = [];
  for (const name of readdirSync(folder.dir)) {
    if (name.startsWith(".") || name === META) continue;
    const kind = kindOf(name);
    if (!kind || !statSync(join(folder.dir, name)).isFile()) continue;
    files.push({ name, kind, placed: folder.meta.placed.includes(name) });
  }
  return files.sort((a, b) => a.name.localeCompare(b.name, "en"));
}

function syncFolders(pages: SyncPage[]): { id: string; files: ListedFile[] }[] {
  const root = pagesRoot();
  mkdirSync(root, { recursive: true });
  const wanted = pages.filter((page) => safeId(page.id));
  const folders = readFolders();
  for (const [id, folder] of folders) {
    if (wanted.some((page) => page.id === id) || !inside(root, folder.dir)) continue;
    rmSync(folder.dir, { recursive: true, force: true });
    folders.delete(id);
  }
  for (const page of wanted) {
    if (folders.has(page.id)) continue;
    const dir = join(root, `.new-${page.id}`);
    mkdirSync(dir, { recursive: true });
    folders.set(page.id, { dir, meta: { id: page.id, placed: [] } });
  }
  const plan = wanted.map((page, index) => ({ page, name: `page ${index + 1}`, folder: folders.get(page.id)! }));
  if (plan.some((item) => basename(item.folder.dir) !== item.name)) {
    for (const item of plan) {
      const tmp = join(root, `.tmp-${item.page.id}`);
      if (item.folder.dir !== tmp) renameSync(item.folder.dir, tmp);
      item.folder.dir = tmp;
    }
    for (const [index, item] of plan.entries()) {
      const dest = join(root, item.name);
      if (existsSync(dest)) renameSync(dest, join(root, `.stray-${index}-${item.name}`));
      renameSync(item.folder.dir, dest);
      item.folder.dir = dest;
    }
  }
  return plan.map((item) => {
    for (const key of item.page.copy ?? []) {
      const name = copyAsset(item.folder.dir, key);
      if (name && !item.folder.meta.placed.includes(name)) item.folder.meta.placed.push(name);
    }
    writeMeta(item.folder.dir, item.folder.meta);
    return { id: item.page.id, files: listFiles(item.folder) };
  });
}

function markPlaced(pages: { id: string; names: string[] }[]): void {
  const folders = readFolders();
  for (const page of pages) {
    const folder = folders.get(page.id);
    if (!folder) continue;
    let changed = false;
    for (const name of page.names) {
      if (name !== basename(name) || !existsSync(join(folder.dir, name)) || folder.meta.placed.includes(name)) continue;
      folder.meta.placed.push(name);
      changed = true;
    }
    if (changed) writeMeta(folder.dir, folder.meta);
  }
}

function fileFor(pageId: string, name: string): string | null {
  if (!safeId(pageId) || name !== basename(name) || name.startsWith(".") || !kindOf(name)) return null;
  const folder = readFolders().get(pageId);
  if (!folder) return null;
  const file = resolve(folder.dir, name);
  if (!inside(folder.dir, file) || !existsSync(file) || !statSync(file).isFile()) return null;
  return file;
}

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

function loopback(req: IncomingMessage): boolean {
  const host = (req.headers.host ?? "").replace(/:\d+$/, "").replace(/^\[|\]$/g, "");
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

function sendFile(req: IncomingMessage, res: ServerResponse, file: string): void {
  const size = statSync(file).size;
  const type = MIME[extname(file).toLowerCase()] ?? "application/octet-stream";
  res.setHeader("Content-Type", type);
  res.setHeader("Accept-Ranges", "bytes");
  const range = req.headers.range;
  const match = range && type.startsWith("video/") ? /bytes=(\d*)-(\d*)/.exec(range) : null;
  if (!match) {
    res.statusCode = 200;
    res.setHeader("Content-Length", size);
    createReadStream(file).pipe(res);
    return;
  }
  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Number(match[2]) : size - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || end >= size) {
    res.statusCode = 416;
    res.end();
    return;
  }
  res.statusCode = 206;
  res.setHeader("Content-Range", `bytes ${start}-${end}/${size}`);
  res.setHeader("Content-Length", end - start + 1);
  createReadStream(file, { start, end }).pipe(res);
}

function safeFileName(name: string): string | null {
  const base = basename(name);
  if (!base || base !== name || base.startsWith(".") || base === META || !kindOf(base)) return null;
  return base;
}

function uniqueName(dir: string, name: string): string {
  if (!existsSync(join(dir, name))) return name;
  const ext = extname(name);
  const stem = name.slice(0, name.length - ext.length);
  let index = 2;
  while (existsSync(join(dir, `${stem}-${index}${ext}`))) index += 1;
  return `${stem}-${index}${ext}`;
}

/** Deletes one image or video from the page folder and drops it from placed. */
function removeFile(pageId: string, rawName: string): { name: string; keys: string[] } | null {
  const name = safeFileName(rawName);
  const folder = name ? readFolders().get(pageId) : null;
  if (!name || !folder || !inside(pagesRoot(), folder.dir)) return null;
  const file = join(folder.dir, name);
  if (!existsSync(file) || !statSync(file).isFile()) return null;
  const keys = [...sources().entries()].flatMap(([key, source]) => (basename(source) === name ? [key] : []));
  rmSync(file);
  const placed = folder.meta.placed.filter((item) => item !== name);
  if (placed.length !== folder.meta.placed.length) {
    folder.meta.placed = placed;
    writeMeta(folder.dir, folder.meta);
  }
  return { name, keys };
}

/** Writes one image or video into the page folder and marks it placed. */
function saveUpload(pageId: string, rawName: string, data: Buffer): { name: string; kind: "image" | "video" } | null {
  const name = safeFileName(rawName);
  const folder = name && data.length > 0 ? readFolders().get(pageId) : null;
  if (!name || !folder || !inside(pagesRoot(), folder.dir)) return null;
  const stored = uniqueName(folder.dir, name);
  const dest = join(folder.dir, stored);
  if (extname(stored).toLowerCase() === ".svg") writeFileSync(dest, sizedSvg(data.toString("utf8")));
  else writeFileSync(dest, data);
  if (!folder.meta.placed.includes(stored)) {
    folder.meta.placed.push(stored);
    writeMeta(folder.dir, folder.meta);
  }
  const kind = kindOf(stored);
  return kind ? { name: stored, kind } : null;
}

function readBuffer(req: IncomingMessage, limit: number): Promise<Buffer> {
  return new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error("body"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolveBody(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > 1024 * 1024) {
        reject(new Error("body"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolveBody(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

export function presentationProject(): Plugin {
  return {
    name: "presentation-project",
    configureServer(server) {
      const root = pagesRoot();
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url !== PRESENTATION_PROJECT_ROUTE && url !== PRESENTATION_UPLOAD_ROUTE && !url.startsWith(PRESENTATION_MEDIA_PREFIX)) {
          next();
          return;
        }
        if (!loopback(req)) {
          res.statusCode = 403;
          res.end();
          return;
        }
        if (url.startsWith(PRESENTATION_MEDIA_PREFIX)) {
          const parts = url.slice(PRESENTATION_MEDIA_PREFIX.length).split("/").map((part) => decodeURIComponent(part));
          const file = parts.length === 2 ? fileFor(parts[0] ?? "", parts[1] ?? "") : null;
          if (!file) {
            res.statusCode = 404;
            res.end();
            return;
          }
          sendFile(req, res, file);
          return;
        }
        if (url === PRESENTATION_UPLOAD_ROUTE) {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.end();
            return;
          }
          try {
            const query = new URL(req.url ?? "", "http://localhost").searchParams;
            const saved = saveUpload(query.get("page") ?? "", query.get("name") ?? "", await readBuffer(req, GIT_MAX_FILE_BYTES));
            if (!saved) {
              res.statusCode = 400;
              res.end();
              return;
            }
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(saved));
          } catch {
            res.statusCode = 413;
            res.end();
          }
          return;
        }
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }
        try {
          const body = JSON.parse(await readBody(req)) as {
            pages?: SyncPage[];
            placed?: { id?: unknown; names?: unknown }[];
            remove?: { id?: unknown; name?: unknown };
          };
          if (body.remove) {
            const id = body.remove.id;
            const name = body.remove.name;
            const removed = typeof id === "string" && typeof name === "string" ? removeFile(id, name) : null;
            if (!removed) {
              res.statusCode = 404;
              res.end();
              return;
            }
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(removed));
            return;
          }
          if (Array.isArray(body.placed)) {
            markPlaced(
              body.placed.flatMap((item) => {
                if (!item || typeof item.id !== "string" || !Array.isArray(item.names)) return [];
                return [{ id: item.id, names: item.names.filter((name): name is string => typeof name === "string") }];
              }),
            );
          }
          if (!Array.isArray(body.pages)) {
            res.statusCode = 204;
            res.end();
            return;
          }
          const pages = body.pages.flatMap((page) => {
            if (!page || typeof page.id !== "string") return [];
            const copy = Array.isArray(page.copy) ? page.copy.filter((key): key is string => typeof key === "string") : [];
            return [{ id: page.id, copy }];
          });
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ pages: syncFolders(pages) }));
        } catch {
          res.statusCode = 400;
          res.end();
        }
      });
      server.httpServer?.once("listening", () => {
        mkdirSync(root, { recursive: true });
      });
    },
    handleHotUpdate({ file }) {
      if (file.startsWith(pagesRoot())) return [];
    },
  };
}
