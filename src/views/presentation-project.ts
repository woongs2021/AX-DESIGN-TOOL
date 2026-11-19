/**
 * On localhost, each deck page has a folder under presentation/project 1/pages.
 * Images and videos already on the page are copied there.
 * A file that is not on the page yet is loaded and placed like a type 3 frame.
 */
import { CONFERENCE_SRC_PREFIX } from "../shared/conference.ts";
import {
  PAGE_FILES_EVENT,
  PRESENTATION_PROJECT_ROUTE,
  PRESENTATION_UPLOAD_ROUTE,
  presentationFileSrc,
  presentationFileUrl,
  presentationProjectEnabled,
} from "../shared/presentation-files.ts";
import type { PresentationDeck, PresentationPage } from "../shared/presentation.ts";
import { SLIDE_H, SLIDE_W } from "../shared/presentation.ts";
import {
  clampImageOffset,
  clampImageWidth,
  newLayerId,
  type ImageLayer,
  type StudioCrop,
} from "../shared/studio.ts";

type ListedFile = { name: string; kind: "image" | "video"; placed: boolean };
type Listing = { pages?: { id?: string; files?: ListedFile[] }[] };
export type PageFileSource = { src: string; url: string; thumb: string; label: string; kind: "theme" | "video" };

const seen = new Set<string>();
let pending = Promise.resolve();
let lastListing: Listing | null = null;

export function isPageMedia(file: File): boolean {
  if (file.type.startsWith("image/") || file.type.startsWith("video/")) return true;
  return /\.(png|jpe?g|webp|gif|svg|avif|mp4|webm|mov)$/i.test(file.name);
}

function sourcesOf(pageId: string): PageFileSource[] {
  const files = lastListing?.pages?.find((page) => page.id === pageId)?.files ?? [];
  return files.flatMap((file) => {
    const src = presentationFileSrc(pageId, file.name);
    const url = presentationFileUrl(src);
    if (!url) return [];
    return [{ src, url, thumb: url, label: file.name, kind: file.kind === "video" ? "video" as const : "theme" as const }];
  });
}

function publish(pageId: string): void {
  document.dispatchEvent(new CustomEvent<PageFileSource[]>(PAGE_FILES_EVENT, { detail: sourcesOf(pageId) }));
}

function remember(pageId: string, files: { name: string; kind: "image" | "video" }[]): void {
  const pages = lastListing?.pages ?? [];
  let page = pages.find((item) => item.id === pageId);
  if (!page) {
    page = { id: pageId, files: [] };
    pages.push(page);
    lastListing = { pages };
  }
  page.files ??= [];
  for (const file of files) {
    if (!page.files.some((item) => item.name === file.name)) page.files.push({ name: file.name, kind: file.kind, placed: true });
  }
  publish(pageId);
}

function assetKeys(page: PresentationPage): string[] {
  const keys: string[] = [];
  const add = (key: string) => {
    if (key && !keys.includes(key)) keys.push(key);
  };
  for (const layer of page.state.layers) {
    if (layer.kind === "image" && layer.src.startsWith(CONFERENCE_SRC_PREFIX)) add(layer.src);
  }
  const background = page.state.background;
  if (background?.id && !background.file) add(`${background.mode === "video" ? "bgv" : "bg"}:${background.id}`);
  return keys;
}

/** Type 3 agenda slots for up to three pictures, and the mosaic for four. */
function type3Slots(count: number): { x: number; y: number; w: number; h: number }[] {
  const px = (value: number) => Math.round(value * 2);
  if (count <= 3) {
    const row = [
      { x: px(69), w: px(570) },
      { x: px(675), w: px(570) },
      { x: px(1281), w: px(571) },
    ];
    return row.slice(0, count).map((slot) => ({ x: slot.x, y: px(360), w: slot.w, h: px(430) }));
  }
  if (count === 4) {
    return [
      { x: 0, y: px(58), w: px(688), h: px(516) },
      { x: px(688), y: px(58), w: px(687), h: px(518) },
      { x: 0, y: px(574), w: px(688), h: px(448) },
      { x: px(688), y: px(573), w: px(687), h: px(449) },
    ];
  }
  const slots: { x: number; y: number; w: number; h: number }[] = [];
  const width = px(570);
  const height = px(430);
  for (let index = 0; index < count; index += 1) {
    const column = index % 3;
    const row = Math.floor(index / 3);
    slots.push({ x: px(69) + column * px(606), y: px(360) + row * px(466), w: column === 2 ? px(571) : width, h: height });
  }
  return slots;
}

function coverCrop(frameW: number, frameH: number, imageW: number, imageH: number): StudioCrop {
  const frame = frameH / Math.max(1, frameW);
  const aspect = imageH / Math.max(1, imageW);
  return aspect >= frame
    ? { x: 0, y: (1 - frame / aspect) / 2, w: 1, h: frame / aspect }
    : { x: (1 - aspect / frame) / 2, y: 0, w: aspect / frame, h: 1 };
}

function loadSize(url: string): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth || 1, height: image.naturalHeight || 1 });
    image.onerror = () => resolve(null);
    image.src = url;
  });
}

function layerInsertAt(page: PresentationPage): number {
  let at = 0;
  page.state.layers.forEach((layer, index) => {
    if (layer.kind === "image") at = index + 1;
    else if (
      layer.kind === "shape" &&
      index === at &&
      layer.width >= page.state.cardWidth - 2 &&
      layer.height >= page.state.cardHeight - 2
    ) {
      at = index + 1;
    }
  });
  return at;
}

async function placeFresh(deck: PresentationDeck, listing: Listing): Promise<{ id: string; names: string[] }[]> {
  const placed: { id: string; names: string[] }[] = [];
  for (const item of listing.pages ?? []) {
    if (!item?.id || !Array.isArray(item.files)) continue;
    const page = deck.pages.find((candidate) => candidate.id === item.id);
    if (!page) continue;
    const names: string[] = [];
    const images = item.files.filter((file) => file.kind === "image" && !file.placed && !seen.has(`${page.id}/${file.name}`));
    const slots = type3Slots(images.length);
    const layers: ImageLayer[] = [];
    for (const [index, file] of images.entries()) {
      const key = `${page.id}/${file.name}`;
      const src = presentationFileSrc(page.id, file.name);
      const url = presentationFileUrl(src);
      const slot = slots[index];
      if (!url || !slot) continue;
      seen.add(key);
      const size = await loadSize(url);
      if (!size) {
        seen.delete(key);
        continue;
      }
      const width = clampImageWidth(slot.w);
      layers.push({
        id: newLayerId(),
        kind: "image",
        src,
        x: clampImageOffset(slot.x, page.state.cardWidth || SLIDE_W, width),
        y: clampImageOffset(slot.y, page.state.cardHeight || SLIDE_H, slot.h),
        width,
        radius: 0,
        crop: coverCrop(width, slot.h, size.width, size.height),
      });
      names.push(file.name);
    }
    if (layers.length) {
      page.state.layers.splice(layerInsertAt(page), 0, ...layers);
      page.thumb = "";
    }
    const video = item.files.find((file) => file.kind === "video" && !file.placed && !seen.has(`${page.id}/${file.name}`));
    if (video && page.state.background?.mode !== "video" && !page.state.background?.file) {
      seen.add(`${page.id}/${video.name}`);
      page.state.background = { id: page.state.background?.id || "slide", mode: "video", file: presentationFileSrc(page.id, video.name) };
      page.thumb = "";
      names.push(video.name);
    }
    if (names.length) placed.push({ id: page.id, names });
  }
  return placed;
}

async function applyProject(deck: PresentationDeck, onChange: () => void): Promise<void> {
  const response = await fetch(PRESENTATION_PROJECT_ROUTE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pages: deck.pages.map((page) => ({ id: page.id, copy: assetKeys(page) })) }),
  });
  if (!response.ok) return;
  lastListing = (await response.json()) as Listing;
  const placed = await placeFresh(deck, lastListing);
  if (placed.length) {
    const marked = await fetch(PRESENTATION_PROJECT_ROUTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placed }),
    });
    if (!marked.ok) return;
    onChange();
  }
  const page = deck.pages[deck.selected];
  if (page) publish(page.id);
}

/** Removes one image or video from the open page's folder and from the control panel. */
export async function removePageFile(pageId: string, name: string): Promise<string[] | null> {
  const run = pending.then(async () => {
    const response = await fetch(PRESENTATION_PROJECT_ROUTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ remove: { id: pageId, name } }),
    });
    if (!response.ok) return null;
    const body = (await response.json()) as { keys?: unknown };
    const keys = Array.isArray(body.keys) ? body.keys.filter((key): key is string => typeof key === "string") : [];
    seen.delete(`${pageId}/${name}`);
    const page = lastListing?.pages?.find((item) => item.id === pageId);
    if (page?.files) {
      page.files = page.files.filter((file) => file.name !== name);
      publish(pageId);
    }
    return keys;
  });
  pending = run.then(() => undefined).catch(() => undefined);
  return run;
}

/** Saves images and videos into the open page's folder and shows them in the control panel. */
export async function uploadPageFiles(
  pageId: string,
  files: File[],
): Promise<{ name: string; src: string; kind: "image" | "video" }[]> {
  const run = pending.then(async () => {
    const saved: { name: string; src: string; kind: "image" | "video" }[] = [];
    for (const file of files) {
      const response = await fetch(
        `${PRESENTATION_UPLOAD_ROUTE}?page=${encodeURIComponent(pageId)}&name=${encodeURIComponent(file.name)}`,
        { method: "POST", body: file },
      );
      if (!response.ok) continue;
      const body = (await response.json()) as { name?: unknown; kind?: unknown };
      if (typeof body.name !== "string" || (body.kind !== "image" && body.kind !== "video")) continue;
      saved.push({ name: body.name, src: presentationFileSrc(pageId, body.name), kind: body.kind });
    }
    if (saved.length) remember(pageId, saved);
    return saved;
  });
  pending = run.then(() => undefined).catch(() => undefined);
  return run;
}

/** Creates, renames, and deletes page folders so they match the deck. Localhost only. */
export function syncPresentationProject(deck: PresentationDeck, onChange: () => void): void {
  if (!presentationProjectEnabled() || deck.pages.length === 0) return;
  pending = pending.then(() => applyProject(deck, onChange)).catch(() => undefined);
}
