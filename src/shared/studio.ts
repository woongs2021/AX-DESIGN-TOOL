import { presetById } from "./studio-presets.ts";

export const RADIUS_MIN = 0;
export const RADIUS_MAX = 120;
export const RADIUS_DEFAULT = 28;

export type StudioState = {
  presetId: string;
  title: string;
  body: string;
  themeSlug: string;
  color: string;
  radius: number;
  code: string;
  panel: "design" | "code";
};

export type Rgb = { r: number; g: number; b: number };

const INK_DARK = "rgb(0, 0, 0)";
const INK_LIGHT = "rgb(255, 255, 255)";

export function clampRadius(value: number): number {
  if (!Number.isFinite(value)) return RADIUS_MIN;
  return Math.min(RADIUS_MAX, Math.max(RADIUS_MIN, Math.round(value)));
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
  <div class="studio-card__copy">
    <h1>{{title}}</h1>
    <p>{{body}}</p>
  </div>
</article>
<style>
  .studio-card {
    box-sizing: border-box;
    width: var(--studio-width);
    height: var(--studio-height);
    margin: 0;
    overflow: hidden;
    background: var(--studio-color);
    border-radius: var(--studio-radius);
    font-family: "Pretendard Variable", Pretendard, system-ui, sans-serif;
    color: var(--studio-ink);
  }
  .studio-card img {
    display: block;
    width: 100%;
    height: 72%;
    object-fit: cover;
  }
  .studio-card__copy { padding: 4% 5% 0; }
  .studio-card h1:empty, .studio-card p:empty { display: none; }
  .studio-card h1 {
    margin: 0 0 0.35em;
    font-size: calc(var(--studio-width) * 0.046);
    font-weight: 600;
    line-height: 1.15;
  }
  .studio-card p {
    margin: 0;
    font-size: calc(var(--studio-width) * 0.026);
    line-height: 1.4;
  }
</style>`;
}

export type StudioDocumentInput = StudioSubstitution & {
  color: string;
  radius: number;
  width: number;
  height: number;
  code: string;
};

export function studioFragment(input: StudioDocumentInput): string {
  const color = normalizeHex(input.color) ?? input.color;
  const ink = pickInk(color);
  const radius = clampRadius(input.radius);
  const preset = presetById("ig-feed-square");
  const width = input.width > 0 ? input.width : preset.width;
  const height = input.height > 0 ? input.height : preset.height;
  const body = substituteStudioCode(input.code.trim() || designToCode(), input);
  return `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;margin:0;background:transparent;--studio-color:${color};--studio-ink:${ink};--studio-radius:${radius}px;--studio-width:${width}px;--studio-height:${height}px">${body}</div>`;
}

export function studioSrcdoc(input: StudioDocumentInput): string {
  const fragment = studioFragment(input);
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${fragment}</body>
</html>`;
}
