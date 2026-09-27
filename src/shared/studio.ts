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
export const DEFAULT_TITLE = "시즌";
export const DEFAULT_BODY = "새로운 컬렉션\n브랜드의 첫 인상을 한 장으로 전합니다.";

export const BUILTIN_FONTS = [
  { id: "pretendard", label: "Pretendard", stack: '"Pretendard Variable", Pretendard, system-ui, sans-serif' },
  { id: "roboto", label: "Roboto", stack: "Roboto, system-ui, sans-serif" },
  { id: "montserrat", label: "Montserrat", stack: "Montserrat, system-ui, sans-serif" },
] as const;

export type StudioState = {
  presetId: string;
  cardWidth: number;
  cardHeight: number;
  title: string;
  body: string;
  themeSlug: string;
  color: string;
  radius: number;
  code: string;
  panel: "design" | "code";
  controlsWidth: number;
  titleSize: number;
  bodySize: number;
  titleX: number;
  titleY: number;
  bodyX: number;
  bodyY: number;
  titleFontId: string;
  bodyFontId: string;
  titleColor: string;
  bodyColor: string;
  imageWidth: number;
  imageX: number;
  imageY: number;
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

export function clampTextOffset(value: number, limit: number, size: number): number {
  const max = Math.max(0, Math.round(limit) - Math.min(Math.max(size, 0), Math.round(limit)));
  if (!Number.isFinite(value)) return 0;
  return Math.min(max, Math.max(0, Math.round(value)));
}

/** Keep at least 40px of the image on the card so it can slide past the edges. */
export function clampImageOffset(value: number, card: number, image: number): number {
  const lo = Math.round(-image + 40);
  const hi = Math.round(card - 40);
  if (!Number.isFinite(value)) return 0;
  if (lo > hi) return Math.round((card - image) / 2);
  return Math.min(hi, Math.max(lo, Math.round(value)));
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

export function createStudioState(themeSlug: string, color: string): StudioState {
  const preset = presetById(DEFAULT_PRESET_ID);
  const titleSize = clampFontSize(Math.round(preset.width * 0.046), preset.width);
  const bodySize = clampFontSize(Math.round(preset.width * 0.026), preset.width);
  const titleY = Math.round(preset.height * 0.7);
  return {
    presetId: preset.id,
    cardWidth: preset.width,
    cardHeight: preset.height,
    title: DEFAULT_TITLE,
    body: DEFAULT_BODY,
    themeSlug,
    color,
    radius: RADIUS_DEFAULT,
    code: "",
    panel: "design",
    controlsWidth: CONTROLS_DEFAULT,
    titleSize,
    bodySize,
    titleX: clampTextOffset(Math.round(preset.width * 0.06), preset.width, titleSize),
    titleY: clampTextOffset(titleY, preset.height, titleSize),
    bodyX: clampTextOffset(Math.round(preset.width * 0.06), preset.width, bodySize),
    bodyY: clampTextOffset(titleY + Math.round(titleSize * 1.6), preset.height, bodySize),
    titleFontId: "pretendard",
    bodyFontId: "pretendard",
    titleColor: inkHex(color),
    bodyColor: inkHex(color),
    imageWidth: clampImageWidth(preset.width),
    imageX: 0,
    imageY: 0,
  };
}

/** Restore the card to its starting values. The chosen theme and panel width stay. */
export function resetStudioState(state: StudioState, color: string): void {
  const next = createStudioState(state.themeSlug, color);
  next.controlsWidth = state.controlsWidth;
  next.panel = state.panel;
  Object.assign(state, next);
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

/** Design-panel state as an HTML+CSS fragment. Placeholders stay live. */
export function designToCode(): string {
  return `<article class="studio-card">
  <img src="{{themeImage}}" alt="" />
  <h1>{{title}}</h1>
  <p>{{body}}</p>
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
  .studio-card img {
    position: absolute;
    left: var(--studio-image-x);
    top: var(--studio-image-y);
    width: var(--studio-image-width);
    height: auto;
  }
  .studio-card h1:empty, .studio-card p:empty { display: none; }
  .studio-card h1, .studio-card p { position: absolute; margin: 0; line-height: 1.25; }
  .studio-card h1 {
    left: var(--studio-title-x);
    top: var(--studio-title-y);
    font-size: var(--studio-title-size);
    font-weight: 600;
    font-family: var(--studio-title-font);
    color: var(--studio-title-color);
  }
  .studio-card p {
    left: var(--studio-body-x);
    top: var(--studio-body-y);
    font-size: var(--studio-body-size);
    font-weight: 400;
    font-family: var(--studio-body-font);
    color: var(--studio-body-color);
  }
</style>`;
}

export type StudioDocumentInput = StudioSubstitution & {
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
  const body = substituteStudioCode(input.code.trim() || designToCode(), input);
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
    `--studio-title-x:${Math.round(input.titleX)}px`,
    `--studio-title-y:${Math.round(input.titleY)}px`,
    `--studio-body-x:${Math.round(input.bodyX)}px`,
    `--studio-body-y:${Math.round(input.bodyY)}px`,
    `--studio-image-width:${clampImageWidth(input.imageWidth)}px`,
    `--studio-image-x:${Math.round(input.imageX)}px`,
    `--studio-image-y:${Math.round(input.imageY)}px`,
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
