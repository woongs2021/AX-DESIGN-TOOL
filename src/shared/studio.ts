import { DEFAULT_PRESET_ID, presetById } from "./studio-presets.ts";

export const RADIUS_MIN = 0;
export const RADIUS_MAX = 120;
export const RADIUS_DEFAULT = 28;
export const CARD_MIN = 100;
export const CARD_MAX = 4000;
export const FONT_MIN = 5;
export const FONT_SIDE_MARGIN = 10;
export const IMAGE_MIN = 100;
export const IMAGE_MAX = 4000;
export const CONTROLS_MIN = 240;
export const CONTROLS_DEFAULT = 360;
export const PREVIEW_MIN = 280;
export const SPLITTER_WIDTH = 6;
export const DEFAULT_TITLE = "Hello";
export const DEFAULT_BODY = "헤르메스의 대표 브랜드 에셋입니다.\n에이전트의 그래픽 결과물을 합성하였습니다.";
export const DEFAULT_THEME_SLUG = "black-mountain-red-horizon";
const DEFAULT_TITLE_SIZE = 100;
const DEFAULT_BODY_SIZE = 32;
const DEFAULT_TITLE_X = 71;
const DEFAULT_TITLE_Y = 99;
const DEFAULT_BODY_X = 77;
const DEFAULT_BODY_Y = 209;

export const BUILTIN_FONTS = [
  { id: "pretendard", label: "Pretendard", stack: '"Pretendard Variable", Pretendard, system-ui, sans-serif' },
  { id: "roboto", label: "Roboto", stack: "Roboto, system-ui, sans-serif" },
  { id: "montserrat", label: "Montserrat", stack: "Montserrat, system-ui, sans-serif" },
] as const;

/** The visible part of the source image, as fractions of its width and height. */
export type StudioCrop = { x: number; y: number; w: number; h: number };
export type StudioRect = { x: number; y: number; w: number; h: number };

export type TextKind = "title" | "body";
export type TextLayer = {
  id: string;
  kind: TextKind;
  text: string;
  x: number;
  y: number;
  size: number;
  fontId: string;
  color: string;
};
/** Every image layer shows the theme image. x/y/width describe the cropped part on the card. */
export type ImageLayer = {
  id: string;
  kind: "image";
  x: number;
  y: number;
  width: number;
  crop: StudioCrop | null;
};
export type StudioLayer = TextLayer | ImageLayer;
export type LayerKind = StudioLayer["kind"];

export type StudioState = {
  presetId: string;
  cardWidth: number;
  cardHeight: number;
  themeSlug: string;
  color: string;
  radius: number;
  code: string;
  panel: "design" | "code";
  controlsWidth: number;
  /** Bottom to top. */
  layers: StudioLayer[];
};

export type Rgb = { r: number; g: number; b: number };

const INK_DARK = "rgb(0, 0, 0)";
const INK_LIGHT = "rgb(255, 255, 255)";

export function clampRadius(value: number): number {
  if (!Number.isFinite(value)) return RADIUS_MIN;
  return Math.min(RADIUS_MAX, Math.max(RADIUS_MIN, Math.round(value)));
}

export function clampCardSize(value: number): number {
  if (!Number.isFinite(value)) return CARD_MIN;
  return Math.min(CARD_MAX, Math.max(CARD_MIN, Math.round(value)));
}

/** Change width and height together, keeping their ratio inside the card limits. */
export function scaleCardSize(
  width: number,
  height: number,
  nextWidth: number,
): { cardWidth: number; cardHeight: number } {
  const baseWidth = Math.max(1, Math.round(width));
  const baseHeight = Math.max(1, Math.round(height));
  const ratio = baseHeight / baseWidth;
  let cardWidth = clampCardSize(nextWidth);
  const rawHeight = Math.round(cardWidth * ratio);
  let cardHeight = clampCardSize(rawHeight);
  if (rawHeight !== cardHeight) {
    cardWidth = clampCardSize(Math.round(cardHeight / ratio));
    cardHeight = clampCardSize(Math.round(cardWidth * ratio));
  }
  return { cardWidth, cardHeight };
}

/** Largest font that still keeps 10px clear on the left and right of the card. */
export function maxFontSize(cardWidth: number): number {
  return Math.max(FONT_MIN, clampCardSize(cardWidth) - FONT_SIDE_MARGIN * 2);
}

export function clampFontSize(value: number, cardWidth: number): number {
  const max = maxFontSize(cardWidth);
  if (!Number.isFinite(value)) return FONT_MIN;
  return Math.min(max, Math.max(FONT_MIN, Math.round(value)));
}

export function clampImageWidth(value: number): number {
  if (!Number.isFinite(value)) return IMAGE_MIN;
  return Math.min(IMAGE_MAX, Math.max(IMAGE_MIN, Math.round(value)));
}

/** Element positions snap to 0.5px so arrow-key nudges can move half a pixel. */
export function roundOffset(value: number): number {
  return Math.round(value * 2) / 2;
}

export function clampTextOffset(value: number, limit: number, size: number): number {
  const max = Math.max(0, Math.round(limit) - Math.min(Math.max(size, 0), Math.round(limit)));
  if (!Number.isFinite(value)) return 0;
  return Math.min(max, Math.max(0, roundOffset(value)));
}

/** Keep at least 40px of the image on the card so it can slide past the edges. */
export function clampImageOffset(value: number, card: number, image: number): number {
  const lo = Math.round(-image + 40);
  const hi = Math.round(card - 40);
  if (!Number.isFinite(value)) return 0;
  if (lo > hi) return Math.round((card - image) / 2);
  return Math.min(hi, Math.max(lo, roundOffset(value)));
}

/** Resize the image to nextWidth while the anchor point stays fixed on the card. */
export function scaleImageAround(
  image: { x: number; y: number; width: number },
  nextWidth: number,
  anchorX: number,
  anchorY: number,
): { x: number; y: number; width: number } {
  const width = clampImageWidth(nextWidth);
  const factor = width / Math.max(1, image.width);
  return {
    x: Math.round(anchorX - (anchorX - image.x) * factor),
    y: Math.round(anchorY - (anchorY - image.y) * factor),
    width,
  };
}

export function clampControlsWidth(value: number, studioWidth: number): number {
  const max = Math.max(CONTROLS_MIN, Math.round(studioWidth) - PREVIEW_MIN - SPLITTER_WIDTH);
  if (!Number.isFinite(value)) return CONTROLS_DEFAULT;
  return Math.min(max, Math.max(CONTROLS_MIN, Math.round(value)));
}

export function fontLabelFromPath(path: string): string {
  const base = path.split(/[/\\]/).pop() ?? path;
  return base.replace(/\.(woff2|woff|ttf|otf)$/i, "").replace(/[-_]+/g, " ").trim();
}

export function fontStack(fontId: string, extras: { id: string; stack: string }[] = []): string {
  const builtin = BUILTIN_FONTS.find((font) => font.id === fontId);
  if (builtin) return builtin.stack;
  return extras.find((font) => font.id === fontId)?.stack ?? BUILTIN_FONTS[0].stack;
}

function defaultLayer(kind: "image", cardWidth?: number, cardHeight?: number): ImageLayer;
function defaultLayer(kind: TextKind, cardWidth?: number, cardHeight?: number): TextLayer;
function defaultLayer(kind: LayerKind, cardWidth?: number, cardHeight?: number): StudioLayer;
function defaultLayer(kind: LayerKind, cardWidth = presetById(DEFAULT_PRESET_ID).width, cardHeight = presetById(DEFAULT_PRESET_ID).height): StudioLayer {
  if (kind === "image") {
    return { id: "image", kind, x: 0, y: 0, width: clampImageWidth(cardWidth), crop: null };
  }
  const title = kind === "title";
  const size = clampFontSize(title ? DEFAULT_TITLE_SIZE : DEFAULT_BODY_SIZE, cardWidth);
  return {
    id: kind,
    kind,
    text: title ? DEFAULT_TITLE : DEFAULT_BODY,
    x: clampTextOffset(title ? DEFAULT_TITLE_X : DEFAULT_BODY_X, cardWidth, size),
    y: clampTextOffset(title ? DEFAULT_TITLE_Y : DEFAULT_BODY_Y, cardHeight, size),
    size,
    fontId: title ? "montserrat" : "pretendard",
    color: rgbToHex(0, 0, 0),
  };
}

export function createStudioState(themeSlug: string, color: string): StudioState {
  const preset = presetById(DEFAULT_PRESET_ID);
  return {
    presetId: preset.id,
    cardWidth: preset.width,
    cardHeight: preset.height,
    themeSlug,
    color,
    radius: RADIUS_DEFAULT,
    code: "",
    panel: "design",
    controlsWidth: CONTROLS_DEFAULT,
    layers: [defaultLayer("image"), defaultLayer("body"), defaultLayer("title")],
  };
}

export function newLayerId(): string {
  return `layer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function isTextLayer(layer: StudioLayer): layer is TextLayer {
  return layer.kind !== "image";
}

export function firstLayer(state: StudioState, kind: "image"): ImageLayer | undefined;
export function firstLayer(state: StudioState, kind: TextKind): TextLayer | undefined;
export function firstLayer(state: StudioState, kind: LayerKind): StudioLayer | undefined {
  return state.layers.find((layer) => layer.kind === kind);
}

/** The first layer of a kind, added back with starting values if the state has none. */
export function ensureLayer(state: StudioState, kind: "image"): ImageLayer;
export function ensureLayer(state: StudioState, kind: TextKind): TextLayer;
export function ensureLayer(state: StudioState, kind: LayerKind): StudioLayer {
  const found = state.layers.find((layer) => layer.kind === kind);
  if (found) return found;
  const layer = defaultLayer(kind, state.cardWidth, state.cardHeight);
  layer.id = newLayerId();
  if (kind === "image") state.layers.unshift(layer);
  else state.layers.push(layer);
  return layer;
}

/** Height of an image layer on the card. aspect is the source height / width. */
export function imageLayerHeight(layer: ImageLayer, aspect: number): number {
  const crop = layer.crop;
  return crop ? (layer.width * aspect * crop.h) / crop.w : layer.width * aspect;
}

/** Where the whole source image sits on the card, so a crop can grow back out. */
export function uncroppedRect(layer: ImageLayer, aspect: number): StudioRect {
  const crop = layer.crop ?? { x: 0, y: 0, w: 1, h: 1 };
  const w = layer.width / crop.w;
  const h = w * aspect;
  return { x: layer.x - crop.x * w, y: layer.y - crop.y * h, w, h };
}

/** The crop that shows box out of the full image rect. Null when nothing is cut away. */
export function cropFromBox(full: StudioRect, box: StudioRect): StudioCrop | null {
  const crop = {
    x: (box.x - full.x) / full.w,
    y: (box.y - full.y) / full.h,
    w: box.w / full.w,
    h: box.h / full.h,
  };
  const near = (a: number, b: number) => Math.abs(a - b) < 0.001;
  if (near(crop.x, 0) && near(crop.y, 0) && near(crop.w, 1) && near(crop.h, 1)) return null;
  return crop;
}

const CROP_MIN_HEIGHT = 20;

function clampBetween(value: number, lo: number, hi: number): number {
  return Math.min(Math.max(value, lo), Math.max(lo, hi));
}

/** Drag one crop handle (n, ne, e, se, s, sw, w, nw). The box stays inside the full image. */
export function resizeCropBox(full: StudioRect, box: StudioRect, edge: string, dx: number, dy: number): StudioRect {
  const minW = Math.min(IMAGE_MIN, full.w);
  const minH = Math.min(CROP_MIN_HEIGHT, full.h);
  let left = box.x;
  let top = box.y;
  let right = box.x + box.w;
  let bottom = box.y + box.h;
  if (edge.includes("w")) left = clampBetween(left + dx, full.x, right - minW);
  if (edge.includes("e")) right = clampBetween(right + dx, left + minW, full.x + full.w);
  if (edge.includes("n")) top = clampBetween(top + dy, full.y, bottom - minH);
  if (edge.includes("s")) bottom = clampBetween(bottom + dy, top + minH, full.y + full.h);
  return { x: left, y: top, w: right - left, h: bottom - top };
}

/** Slide the crop window over the image without changing its size. */
export function moveCropBox(full: StudioRect, box: StudioRect, dx: number, dy: number): StudioRect {
  return {
    ...box,
    x: clampBetween(box.x + dx, full.x, full.x + full.w - box.w),
    y: clampBetween(box.y + dy, full.y, full.y + full.h - box.h),
  };
}

function parseLayer(raw: unknown, ink: string): StudioLayer | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const num = (field: unknown) => (typeof field === "number" && Number.isFinite(field) ? field : null);
  const id = typeof value.id === "string" && value.id ? value.id : newLayerId();
  const x = num(value.x) ?? 0;
  const y = num(value.y) ?? 0;
  if (value.kind === "image") {
    const crop = value.crop as Record<string, unknown> | null | undefined;
    const cx = num(crop?.x);
    const cy = num(crop?.y);
    const cw = num(crop?.w);
    const ch = num(crop?.h);
    return {
      id,
      kind: "image",
      x,
      y,
      width: clampImageWidth(num(value.width) ?? IMAGE_MIN),
      crop: cx !== null && cy !== null && cw && ch ? { x: cx, y: cy, w: cw, h: ch } : null,
    };
  }
  if (value.kind !== "title" && value.kind !== "body") return null;
  return {
    id,
    kind: value.kind,
    text: typeof value.text === "string" ? value.text : "",
    x,
    y,
    size: num(value.size) ?? (value.kind === "title" ? DEFAULT_TITLE_SIZE : DEFAULT_BODY_SIZE),
    fontId: typeof value.fontId === "string" && value.fontId ? value.fontId : "pretendard",
    color: normalizeHex(String(value.color ?? "")) ?? ink,
  };
}

/** Before layers, the card kept one title, one body, and one image as flat fields. */
function legacyLayers(value: Record<string, unknown>, ink: string): StudioLayer[] {
  const num = (field: unknown, fallback: number) => (typeof field === "number" && Number.isFinite(field) ? field : fallback);
  const text = (field: unknown, fallback: string) => (typeof field === "string" ? field : fallback);
  const font = text(value.fontId, "pretendard");
  return [
    { id: "image", kind: "image", x: num(value.imageX, 0), y: num(value.imageY, 0), width: clampImageWidth(num(value.imageWidth, IMAGE_MIN)), crop: null },
    {
      id: "body",
      kind: "body",
      text: text(value.body, DEFAULT_BODY),
      x: num(value.bodyX, DEFAULT_BODY_X),
      y: num(value.bodyY, DEFAULT_BODY_Y),
      size: num(value.bodySize, DEFAULT_BODY_SIZE),
      fontId: text(value.bodyFontId, font) || font,
      color: normalizeHex(text(value.bodyColor, "")) ?? ink,
    },
    {
      id: "title",
      kind: "title",
      text: text(value.title, DEFAULT_TITLE),
      x: num(value.titleX, DEFAULT_TITLE_X),
      y: num(value.titleY, DEFAULT_TITLE_Y),
      size: num(value.titleSize, DEFAULT_TITLE_SIZE),
      fontId: text(value.titleFontId, font) || font,
      color: normalizeHex(text(value.titleColor, "")) ?? ink,
    },
  ];
}

/** A stored studio state (baseline or saved card), upgraded to layers. Null when it is not a studio state. */
export function normalizeStudioState(raw: unknown): StudioState | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  if (typeof value.themeSlug !== "string" || typeof value.color !== "string") return null;
  const num = (field: unknown, fallback: number) => (typeof field === "number" && Number.isFinite(field) ? field : fallback);
  const base = createStudioState(value.themeSlug, value.color);
  const ink = inkHex(value.color);
  const state: StudioState = {
    ...base,
    presetId: typeof value.presetId === "string" ? value.presetId : base.presetId,
    cardWidth: clampCardSize(num(value.cardWidth, base.cardWidth)),
    cardHeight: clampCardSize(num(value.cardHeight, base.cardHeight)),
    radius: clampRadius(num(value.radius, base.radius)),
    code: typeof value.code === "string" ? value.code : "",
    panel: value.panel === "code" ? "code" : "design",
    controlsWidth: num(value.controlsWidth, base.controlsWidth),
    layers: Array.isArray(value.layers)
      ? value.layers.map((layer) => parseLayer(layer, ink)).filter((layer): layer is StudioLayer => layer !== null)
      : legacyLayers(value, ink),
  };
  ensureLayer(state, "image");
  ensureLayer(state, "body");
  ensureLayer(state, "title");
  return state;
}

/** Restore the card to its starting values. The chosen theme and panel width stay. */
export function resetStudioState(state: StudioState, color: string): void {
  const next = createStudioState(state.themeSlug, color);
  next.controlsWidth = state.controlsWidth;
  next.panel = state.panel;
  Object.assign(state, next);
}

/** 초기화: a saved baseline replaces the factory start. A missing baseline uses resetStudioState. */
export function applyStudioBaseline(state: StudioState, baseline: StudioState | null, color: string): void {
  if (!baseline) {
    resetStudioState(state, color);
    return;
  }
  Object.assign(state, structuredClone(baseline));
}

export function normalizeHex(value: string): string | null {
  const match = value.trim().match(/^#([0-9a-fA-F]{6})$/);
  if (!match) return null;
  return `#${match[1]!.toLowerCase()}`;
}

export function rgbToHex(r: number, g: number, b: number): string {
  const channel = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

export function parseRgb(value: string): Rgb | null {
  const hex = normalizeHex(value);
  if (hex) {
    return {
      r: Number.parseInt(hex.slice(1, 3), 16),
      g: Number.parseInt(hex.slice(3, 5), 16),
      b: Number.parseInt(hex.slice(5, 7), 16),
    };
  }
  const rgb = value
    .trim()
    .match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);
  if (!rgb) return null;
  return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) };
}

function channelLuminance(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function contrastAgainst(ink: Rgb, background: Rgb): number {
  const l1 =
    0.2126 * channelLuminance(ink.r) +
    0.7152 * channelLuminance(ink.g) +
    0.0722 * channelLuminance(ink.b);
  const l2 =
    0.2126 * channelLuminance(background.r) +
    0.7152 * channelLuminance(background.g) +
    0.0722 * channelLuminance(background.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Black or white hex for the starting title and body color. */
export function inkHex(background: string): string {
  const parsed = parseRgb(pickInk(background));
  if (!parsed) return rgbToHex(0, 0, 0);
  return rgbToHex(parsed.r, parsed.g, parsed.b);
}

/** Black or white, whichever clears 4.5:1. Ties prefer the higher ratio. */
export function pickInk(background: string): string {
  const bg = parseRgb(background) ?? { r: 255, g: 255, b: 255 };
  const black = contrastAgainst({ r: 0, g: 0, b: 0 }, bg);
  const white = contrastAgainst({ r: 255, g: 255, b: 255 }, bg);
  if (black >= 4.5 && black >= white) return INK_DARK;
  if (white >= 4.5) return INK_LIGHT;
  return black >= white ? INK_DARK : INK_LIGHT;
}

export function inkContrast(background: string, ink: string): number {
  const bg = parseRgb(background);
  const fg = parseRgb(ink);
  if (!bg || !fg) return 0;
  return contrastAgainst(fg, bg);
}

/**
 * Greedy wrap. Words that exceed maxWidth break by character so Korean
 * strings without spaces still stay inside the card.
 */
export function wrapText(
  text: string,
  maxWidth: number,
  measure: (line: string) => number,
): string[] {
  if (maxWidth <= 0) return [];
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }
    let current = "";
    const pushWord = (word: string) => {
      if (measure(word) <= maxWidth) {
        current = word;
        return;
      }
      let chunk = "";
      for (const char of word) {
        const next = chunk + char;
        if (measure(next) <= maxWidth) chunk = next;
        else {
          if (chunk) lines.push(chunk);
          chunk = char;
        }
      }
      current = chunk;
    };
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (measure(next) <= maxWidth) current = next;
      else {
        if (current) lines.push(current);
        pushWord(word);
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

export function coverRect(
  srcWidth: number,
  srcHeight: number,
  boxWidth: number,
  boxHeight: number,
): { x: number; y: number; w: number; h: number } {
  const scale = Math.max(boxWidth / srcWidth, boxHeight / srcHeight);
  const w = srcWidth * scale;
  const h = srcHeight * scale;
  return { x: (boxWidth - w) / 2, y: (boxHeight - h) / 2, w, h };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Drop script tags and inline event handlers before the fragment is rendered. */
export function sanitizeStudioCode(code: string): string {
  return code
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/?>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

export type StudioSubstitution = {
  title: string;
  body: string;
  themeImage: string;
};

export function substituteStudioCode(code: string, values: StudioSubstitution): string {
  const safe = sanitizeStudioCode(code);
  return safe
    .replaceAll("{{title}}", escapeHtml(values.title))
    .replaceAll("{{body}}", escapeHtml(values.body))
    .replaceAll("{{themeImage}}", escapeHtml(values.themeImage));
}

/**
 * Design-panel state as an HTML+CSS fragment, layers in stacking order.
 * The first title and body stay live as {{title}} / {{body}}; copies carry their own text.
 */
export function designToCode(
  state: StudioState,
  aspect = 1,
  extras: { id: string; stack: string }[] = [],
): string {
  const px = (value: number) => `${Math.round(value * 100) / 100}px`;
  const title = firstLayer(state, "title");
  const body = firstLayer(state, "body");
  const items: string[] = [];
  const rules: string[] = [];
  state.layers.forEach((layer, index) => {
    const name = `layer-${index + 1}`;
    const place = `left: ${px(layer.x)}; top: ${px(layer.y)};`;
    if (layer.kind === "image") {
      if (layer.crop) {
        const full = uncroppedRect(layer, aspect);
        items.push(`  <div class="studio-crop ${name}"><img src="{{themeImage}}" alt="" /></div>`);
        rules.push(`  .studio-card .${name} { ${place} width: ${px(layer.width)}; height: ${px(imageLayerHeight(layer, aspect))}; }`);
        rules.push(`  .studio-card .${name} img { left: ${px(full.x - layer.x)}; top: ${px(full.y - layer.y)}; width: ${px(full.w)}; }`);
      } else {
        items.push(`  <img class="${name}" src="{{themeImage}}" alt="" />`);
        rules.push(`  .studio-card .${name} { ${place} width: ${px(layer.width)}; }`);
      }
      return;
    }
    const tag = layer.kind === "title" ? "h1" : "p";
    const text = layer === title ? "{{title}}" : layer === body ? "{{body}}" : escapeHtml(layer.text);
    items.push(`  <${tag} class="${name}">${text}</${tag}>`);
    rules.push(
      `  .studio-card .${name} { ${place} font-size: ${px(layer.size)}; font-family: ${fontStack(layer.fontId, extras)}; color: ${layer.color}; }`,
    );
  });
  return `<article class="studio-card">
${items.join("\n")}
</article>
<style>
  .studio-card {
    position: relative;
    box-sizing: border-box;
    width: var(--studio-width);
    height: var(--studio-height);
    margin: 0;
    overflow: hidden;
    background: var(--studio-color);
    border-radius: var(--studio-radius);
    font-family: var(--studio-title-font);
    color: var(--studio-ink);
  }
  .studio-card img, .studio-card .studio-crop { position: absolute; }
  .studio-card img { height: auto; }
  .studio-card .studio-crop { overflow: hidden; }
  .studio-card h1:empty, .studio-card p:empty { display: none; }
  .studio-card h1, .studio-card p { position: absolute; margin: 0; line-height: 1.25; }
  .studio-card h1 { font-weight: 600; }
  .studio-card p { font-weight: 400; }
${rules.join("\n")}
</style>`;
}

/**
 * Card values for the code preview. The title/body/image fields come from the first layer of each
 * kind and stay exposed as --studio-* variables so code written against them keeps working.
 */
export type StudioDocumentInput = StudioSubstitution & {
  design: string;
  color: string;
  radius: number;
  width: number;
  height: number;
  code: string;
  titleFontStack: string;
  bodyFontStack: string;
  titleSize: number;
  bodySize: number;
  titleX: number;
  titleY: number;
  bodyX: number;
  bodyY: number;
  imageWidth: number;
  imageX: number;
  imageY: number;
  titleColor: string;
  bodyColor: string;
};

export function studioFragment(input: StudioDocumentInput): string {
  const color = normalizeHex(input.color) ?? input.color;
  const ink = pickInk(color);
  const titleColor = normalizeHex(input.titleColor) ?? inkHex(color);
  const bodyColor = normalizeHex(input.bodyColor) ?? inkHex(color);
  const radius = clampRadius(input.radius);
  const preset = presetById("ig-feed-square");
  const width = input.width > 0 ? input.width : preset.width;
  const height = input.height > 0 ? input.height : preset.height;
  const titleFont = input.titleFontStack.replaceAll(";", "");
  const bodyFont = input.bodyFontStack.replaceAll(";", "");
  const body = substituteStudioCode(input.code.trim() || input.design, input);
  const vars = [
    `--studio-color:${color}`,
    `--studio-ink:${ink}`,
    `--studio-radius:${radius}px`,
    `--studio-width:${width}px`,
    `--studio-height:${height}px`,
    `--studio-title-font:${titleFont}`,
    `--studio-body-font:${bodyFont}`,
    `--studio-title-size:${clampFontSize(input.titleSize, width)}px`,
    `--studio-body-size:${clampFontSize(input.bodySize, width)}px`,
    `--studio-title-x:${roundOffset(input.titleX)}px`,
    `--studio-title-y:${roundOffset(input.titleY)}px`,
    `--studio-body-x:${roundOffset(input.bodyX)}px`,
    `--studio-body-y:${roundOffset(input.bodyY)}px`,
    `--studio-image-width:${clampImageWidth(input.imageWidth)}px`,
    `--studio-image-x:${roundOffset(input.imageX)}px`,
    `--studio-image-y:${roundOffset(input.imageY)}px`,
    `--studio-title-color:${titleColor}`,
    `--studio-body-color:${bodyColor}`,
  ].join(";");
  return `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;margin:0;background:transparent;${vars}">${body}</div>`;
}

export function studioSrcdoc(input: StudioDocumentInput): string {
  const fragment = studioFragment(input);
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${fragment}</body>
</html>`;
}
