import { LAYER_BLUR_MAX, clampUnit, layerBlurBottom, parseBlend, parseShadow, shadowOffset, shapeBlend, shapeShadow, vectorSvg, type LineLayer, type LinearGradient, type PenLayer, type ShapeBlend, type ShapeLayer, type ShapeShadow, parseGradient, parseVectorLayer } from "./studio-shapes.ts";
import { DEFAULT_PRESET_ID, presetById } from "./studio-presets.ts";

export const RADIUS_MIN = 0;
export const RADIUS_MAX = 120;
export const RADIUS_DEFAULT = 28;
export const IMAGE_RADIUS_DEFAULT = 12;
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
export type TextAlign = "left" | "center" | "right";
export const TEXT_ALIGNS: readonly TextAlign[] = ["left", "center", "right"];
export type TextLayer = {
  id: string;
  kind: TextKind;
  text: string;
  x: number;
  y: number;
  size: number;
  fontId: string;
  color: string;
  /** Solid color is used when this is absent. */
  gradient?: LinearGradient | null;
  /** One of TEXT_WEIGHTS. */
  weight: number;
  italic: boolean;
  underline: boolean;
  /** Lines align inside the block; x stays the block's left edge. */
  align: TextAlign;
  /** Absent means normal. Same modes as a shape. */
  blend?: ShapeBlend;
  /** Absent means no shadow. Same size, blur, distance, and opacity as a shape. */
  shadow?: ShapeShadow;
};
/** x/y/width describe the cropped part on the card. */
export type ImageLayer = {
  id: string;
  kind: "image";
  /** A capture slug, or upload:<id> for an image added in this browser. */
  src: string;
  x: number;
  y: number;
  width: number;
  /** Corner radius in card pixels, same range as the card radius. */
  radius: number;
  crop: StudioCrop | null;
  /** One color painted over every visible pixel (logo color). Absent shows the source colors. */
  tint?: string | null;
  /** Absent means normal. Same modes as a shape. */
  blend?: ShapeBlend;
  /** Absent means no shadow. Same size, blur, distance, and opacity as a shape. */
  shadow?: ShapeShadow;
  /** 0–100. Absent means fully opaque. */
  opacity?: number;
  /** Uniform layer blur in card pixels. Absent means sharp. */
  blur?: number;
  /** Blur at the bottom edge. The top stays at the layer blur. Absent or 0 keeps an even blur. */
  blurBottom?: number;
  /** -100–100. Absent means unchanged. */
  brightness?: number;
  /** -100–100. Absent means unchanged. */
  contrast?: number;
  /** -100–100. Absent means unchanged. -100 is gray. */
  saturation?: number;
  /** Hue rotation in degrees, -180–180. Absent means unchanged. */
  hue?: number;
};
export type StudioLayer = TextLayer | ImageLayer | ShapeLayer | LineLayer | PenLayer;
export type LayerKind = StudioLayer["kind"];

/** Conference main background: fills the card under every layer and is not a layer itself. */
export type StudioBackground = { id: string; mode: "image" | "video" };

export type StudioState = {
  /** Conference only. */
  background?: StudioBackground | null;
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
  /** Sets of layer ids that select, move, copy, and delete together. Each set has at least two ids. */
  groups?: string[][];
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

/**
 * Scale every selected font by one factor.
 * nextLargest is the new size of the largest font; the others keep the same ratio.
 * The factor stops when any font would pass the minimum or the card's maximum.
 */
export function scaleFontSizes(sizes: readonly number[], nextLargest: number, cardWidth: number): number[] {
  if (sizes.length === 0) return [];
  const bases = sizes.map((size) => Math.max(1, size));
  const baseLargest = Math.max(...bases);
  const max = maxFontSize(cardWidth);
  let minFactor = FONT_MIN / baseLargest;
  let maxFactor = max / baseLargest;
  for (const base of bases) {
    minFactor = Math.max(minFactor, FONT_MIN / base);
    maxFactor = Math.min(maxFactor, max / base);
  }
  const requested = (Number.isFinite(nextLargest) ? nextLargest : baseLargest) / baseLargest;
  const factor = minFactor > maxFactor ? requested : Math.min(maxFactor, Math.max(minFactor, requested));
  return bases.map((base) => clampFontSize(base * factor, cardWidth));
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

function defaultLayer(kind: "image", src: string, cardWidth?: number, cardHeight?: number): ImageLayer;
function defaultLayer(kind: TextKind, src: string, cardWidth?: number, cardHeight?: number): TextLayer;
function defaultLayer(
  kind: "image" | TextKind,
  src: string,
  cardWidth = presetById(DEFAULT_PRESET_ID).width,
  cardHeight = presetById(DEFAULT_PRESET_ID).height,
): StudioLayer {
  if (kind === "image") {
    return { id: "image", kind, src, x: 0, y: 0, width: clampImageWidth(cardWidth), radius: IMAGE_RADIUS_DEFAULT, crop: null };
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
    ...textStyle({}, kind),
  };
}

export function createStudioState(themeSlug: string, color: string, presetId = DEFAULT_PRESET_ID): StudioState {
  const preset = presetById(presetId);
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
    layers: [
      defaultLayer("image", themeSlug, preset.width, preset.height),
      defaultLayer("body", themeSlug, preset.width, preset.height),
      defaultLayer("title", themeSlug, preset.width, preset.height),
    ],
  };
}

export function newLayerId(): string {
  return `layer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const TEXT_WEIGHTS = [
  { value: 300, label: "Light" },
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "SemiBold" },
  { value: 700, label: "Bold" },
] as const;
export const REGULAR_WEIGHT = 400;
export const BOLD_WEIGHT = 700;

export function isBold(layer: Pick<TextLayer, "weight">): boolean {
  return layer.weight >= 600;
}

function textStyle(value: Record<string, unknown>, kind: TextKind): Pick<TextLayer, "weight" | "italic" | "underline" | "align"> {
  const weight = TEXT_WEIGHTS.find((item) => item.value === value.weight)?.value;
  return {
    weight: weight ?? (kind === "title" ? 600 : REGULAR_WEIGHT),
    italic: value.italic === true,
    underline: value.underline === true,
    align: TEXT_ALIGNS.find((align) => align === value.align) ?? "left",
  };
}

export function isTextLayer(layer: StudioLayer): layer is TextLayer {
  return layer.kind === "title" || layer.kind === "body";
}

export function textBlend(layer: Pick<TextLayer, "blend">): ShapeBlend {
  return parseBlend(layer.blend);
}

export function imageBlend(layer: Pick<ImageLayer, "blend">): ShapeBlend {
  return parseBlend(layer.blend);
}

/** 0–100. A missing value is fully opaque. */
export function layerOpacity(layer: { opacity?: number | null }): number {
  return clampUnit(layer.opacity ?? 100, 100);
}

/** Uniform image blur in card pixels. */
export function imageBlur(layer: Pick<ImageLayer, "blur">): number {
  return clampUnit(layer.blur ?? 0, LAYER_BLUR_MAX);
}

export function layerOpacityCss(layer: { opacity?: number | null }): string {
  const opacity = layerOpacity(layer);
  return opacity < 100 ? `opacity: ${opacity / 100};` : "";
}

export function imageBlurCss(layer: Pick<ImageLayer, "blur">): string {
  const blur = imageBlur(layer);
  return blur > 0 ? `filter: blur(${blur}px);` : "";
}

/** Brightness, contrast, and saturation. 0 leaves the photo unchanged. */
export const IMAGE_TONE_LIMIT = 100;
/** Hue rotation in degrees. */
export const IMAGE_HUE_LIMIT = 180;

export function clampSigned(value: number, limit: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(limit, Math.max(-limit, Math.round(value)));
}

export type ImageAdjust = { brightness: number; contrast: number; saturation: number; hue: number };

/** Neutral values are 0. Missing fields stay unchanged. */
export function imageAdjust(layer: Pick<ImageLayer, "brightness" | "contrast" | "saturation" | "hue">): ImageAdjust {
  return {
    brightness: clampSigned(layer.brightness ?? 0, IMAGE_TONE_LIMIT),
    contrast: clampSigned(layer.contrast ?? 0, IMAGE_TONE_LIMIT),
    saturation: clampSigned(layer.saturation ?? 0, IMAGE_TONE_LIMIT),
    hue: clampSigned(layer.hue ?? 0, IMAGE_HUE_LIMIT),
  };
}

/** CSS filter functions for the photo. Empty when every control is neutral. */
export function imageAdjustFilter(adjust: ImageAdjust): string {
  const parts: string[] = [];
  if (adjust.brightness !== 0) parts.push(`brightness(${100 + adjust.brightness}%)`);
  if (adjust.contrast !== 0) parts.push(`contrast(${100 + adjust.contrast}%)`);
  if (adjust.saturation !== 0) parts.push(`saturate(${100 + adjust.saturation}%)`);
  if (adjust.hue !== 0) parts.push(`hue-rotate(${adjust.hue}deg)`);
  return parts.join(" ");
}

/** One filter declaration: color adjust, then blur. Empty when the photo is untouched. */
export function imageFilterCss(
  layer: Pick<ImageLayer, "blur" | "brightness" | "contrast" | "saturation" | "hue">,
  blur = imageBlur(layer),
): string {
  const parts = [imageAdjustFilter(imageAdjust(layer)), blur > 0 ? `blur(${blur}px)` : ""].filter(Boolean);
  return parts.length > 0 ? `filter: ${parts.join(" ")};` : "";
}

export { layerBlurBottom };

/** CSS for an image shadow. Size is the box-shadow spread. */
export function imageShadowCss(layer: Pick<ImageLayer, "shadow">): string {
  const shadow = shapeShadow(layer);
  if (shadow.opacity <= 0 || (shadow.size <= 0 && shadow.blur <= 0 && shadow.distance <= 0)) return "";
  const offset = shadowOffset(shadow.distance);
  return `box-shadow: ${offset.x}px ${offset.y}px ${shadow.blur}px ${shadow.size}px rgba(0, 0, 0, ${shadow.opacity / 100});`;
}

/** CSS for a text shadow. Size is drawn as a ring, since text-shadow has no spread. */
export function textShadowCss(layer: Pick<TextLayer, "shadow">): string {
  const shadow = shapeShadow(layer);
  if (shadow.opacity <= 0 || (shadow.size <= 0 && shadow.blur <= 0 && shadow.distance <= 0)) return "";
  const offset = shadowOffset(shadow.distance);
  const color = `rgba(0, 0, 0, ${shadow.opacity / 100})`;
  if (shadow.size <= 0) return `text-shadow: ${offset.x}px ${offset.y}px ${shadow.blur}px ${color};`;
  const steps = 8;
  const parts: string[] = [];
  for (let index = 0; index < steps; index += 1) {
    const angle = (index / steps) * Math.PI * 2;
    const x = Math.round(offset.x + Math.cos(angle) * shadow.size);
    const y = Math.round(offset.y + Math.sin(angle) * shadow.size);
    parts.push(`${x}px ${y}px ${shadow.blur}px ${color}`);
  }
  return `text-shadow: ${parts.join(", ")};`;
}

export const UPLOAD_PREFIX = "upload:";

export function isUploadSrc(src: string): boolean {
  return src.startsWith(UPLOAD_PREFIX);
}

/** Show a theme on the bottom image. The other image layers keep their own source. */
export function setStudioTheme(state: StudioState, slug: string): void {
  state.themeSlug = slug;
  const image = firstLayer(state, "image");
  if (image) image.src = slug;
}

export function firstLayer(state: StudioState, kind: "image"): ImageLayer | undefined;
export function firstLayer(state: StudioState, kind: TextKind): TextLayer | undefined;
export function firstLayer(state: StudioState, kind: LayerKind): StudioLayer | undefined {
  return state.layers.find((layer) => layer.kind === kind);
}

/** The first layer of a kind, added back with starting values if the state has none. */
export function ensureLayer(state: StudioState, kind: "image"): ImageLayer;
export function ensureLayer(state: StudioState, kind: TextKind): TextLayer;
export function ensureLayer(state: StudioState, kind: "image" | TextKind): StudioLayer {
  const found = state.layers.find((layer) => layer.kind === kind);
  if (found) return found;
  const layer = kind === "image"
    ? defaultLayer("image", state.themeSlug, state.cardWidth, state.cardHeight)
    : defaultLayer(kind, state.themeSlug, state.cardWidth, state.cardHeight);
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

function parseLayer(raw: unknown, ink: string, theme: string): StudioLayer | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const num = (field: unknown) => (typeof field === "number" && Number.isFinite(field) ? field : null);
  const tune = (field: unknown, limit: number, key: "brightness" | "contrast" | "saturation" | "hue") => {
    const amount = clampSigned(num(field) ?? 0, limit);
    return amount === 0 ? {} : { [key]: amount };
  };
  const id = typeof value.id === "string" && value.id ? value.id : newLayerId();
  const vector = parseVectorLayer({ ...value, id }, ink);
  if (vector) return vector;
  const x = num(value.x) ?? 0;
  const y = num(value.y) ?? 0;
  if (value.kind === "image") {
    const crop = value.crop as Record<string, unknown> | null | undefined;
    const cx = num(crop?.x);
    const cy = num(crop?.y);
    const cw = num(crop?.w);
    const ch = num(crop?.h);
    const tint = normalizeHex(String(value.tint ?? ""));
    return {
      id,
      kind: "image",
      src: typeof value.src === "string" && value.src ? value.src : theme,
      x,
      y,
      width: clampImageWidth(num(value.width) ?? IMAGE_MIN),
      radius: clampRadius(num(value.radius) ?? IMAGE_RADIUS_DEFAULT),
      crop: cx !== null && cy !== null && cw && ch ? { x: cx, y: cy, w: cw, h: ch } : null,
      ...(tint ? { tint } : {}),
      blend: parseBlend(value.blend),
      ...(value.shadow && typeof value.shadow === "object" ? { shadow: parseShadow(value.shadow) } : {}),
      ...(num(value.opacity) !== null && (num(value.opacity) ?? 100) < 100 ? { opacity: clampUnit(num(value.opacity) ?? 100, 100) } : {}),
      ...(num(value.blur) !== null && (num(value.blur) ?? 0) > 0 ? { blur: clampUnit(num(value.blur) ?? 0, LAYER_BLUR_MAX) } : {}),
      ...(clampUnit(num(value.blurBottom) ?? 0, LAYER_BLUR_MAX) > 0
        ? { blurBottom: clampUnit(num(value.blurBottom) ?? 0, LAYER_BLUR_MAX) }
        : {}),
      ...tune(value.brightness, IMAGE_TONE_LIMIT, "brightness"),
      ...tune(value.contrast, IMAGE_TONE_LIMIT, "contrast"),
      ...tune(value.saturation, IMAGE_TONE_LIMIT, "saturation"),
      ...tune(value.hue, IMAGE_HUE_LIMIT, "hue"),
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
    gradient: parseGradient(value.gradient),
    blend: parseBlend(value.blend),
    ...(value.shadow && typeof value.shadow === "object" ? { shadow: parseShadow(value.shadow) } : {}),
    ...textStyle(value, value.kind),
  };
}

/** Before layers, the card kept one title, one body, and one image as flat fields. */
function legacyLayers(value: Record<string, unknown>, ink: string, theme: string): StudioLayer[] {
  const num = (field: unknown, fallback: number) => (typeof field === "number" && Number.isFinite(field) ? field : fallback);
  const text = (field: unknown, fallback: string) => (typeof field === "string" ? field : fallback);
  const font = text(value.fontId, "pretendard");
  return [
    { id: "image", kind: "image", src: theme, x: num(value.imageX, 0), y: num(value.imageY, 0), width: clampImageWidth(num(value.imageWidth, IMAGE_MIN)), radius: IMAGE_RADIUS_DEFAULT, crop: null },
    {
      id: "body",
      kind: "body",
      text: text(value.body, DEFAULT_BODY),
      x: num(value.bodyX, DEFAULT_BODY_X),
      y: num(value.bodyY, DEFAULT_BODY_Y),
      size: num(value.bodySize, DEFAULT_BODY_SIZE),
      fontId: text(value.bodyFontId, font) || font,
      color: normalizeHex(text(value.bodyColor, "")) ?? ink,
      ...textStyle({}, "body"),
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
      ...textStyle({}, "title"),
    },
  ];
}

function parseGroups(raw: unknown, ids: Set<string>): string[][] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const groups: string[][] = [];
  for (const item of raw) {
    if (!Array.isArray(item)) continue;
    const group = [...new Set(item.filter((id): id is string => typeof id === "string" && ids.has(id)))];
    if (group.length >= 2) groups.push(group);
  }
  return groups.length > 0 ? groups : undefined;
}

function parseBackground(raw: unknown): StudioBackground | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  if (typeof value.id !== "string" || !value.id) return null;
  return { id: value.id, mode: value.mode === "video" ? "video" : "image" };
}

/** A stored studio state (baseline or saved card), upgraded to layers. Null when it is not a studio state. */
export function normalizeStudioState(raw: unknown): StudioState | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  if (typeof value.themeSlug !== "string" || typeof value.color !== "string") return null;
  const num = (field: unknown, fallback: number) => (typeof field === "number" && Number.isFinite(field) ? field : fallback);
  const base = createStudioState(value.themeSlug, value.color);
  const ink = inkHex(value.color);
  const background = parseBackground(value.background);
  const layers = Array.isArray(value.layers)
    ? value.layers
        .map((layer) => parseLayer(layer, ink, value.themeSlug as string))
        .filter((layer): layer is StudioLayer => layer !== null)
    : legacyLayers(value, ink, value.themeSlug);
  const groups = parseGroups(value.groups, new Set(layers.map((layer) => layer.id)));
  const state: StudioState = {
    ...base,
    ...(background ? { background } : {}),
    presetId: typeof value.presetId === "string" ? value.presetId : base.presetId,
    cardWidth: clampCardSize(num(value.cardWidth, base.cardWidth)),
    cardHeight: clampCardSize(num(value.cardHeight, base.cardHeight)),
    radius: clampRadius(num(value.radius, base.radius)),
    code: typeof value.code === "string" ? value.code : "",
    panel: value.panel === "code" ? "code" : "design",
    controlsWidth: num(value.controlsWidth, base.controlsWidth),
    layers,
    ...(groups ? { groups } : {}),
  };
  ensureLayer(state, "image");
  ensureLayer(state, "body");
  ensureLayer(state, "title");
  return state;
}

/** Copy every field, and drop groups when the incoming card has none. */
export function assignStudio(state: StudioState, next: StudioState): void {
  Object.assign(state, next);
  if (!next.groups?.length) delete state.groups;
}

/** Restore the card to its starting values. The chosen theme, size preset, and panel width stay. */
export function resetStudioState(state: StudioState, color: string): void {
  const next = createStudioState(state.themeSlug, color, state.presetId);
  next.controlsWidth = state.controlsWidth;
  next.panel = state.panel;
  assignStudio(state, next);
}

/** 초기화: a saved baseline replaces the factory start. A missing baseline uses resetStudioState. */
export function applyStudioBaseline(state: StudioState, baseline: StudioState | null, color: string): void {
  if (!baseline) {
    resetStudioState(state, color);
    return;
  }
  const { controlsWidth, panel } = state;
  assignStudio(state, structuredClone(baseline));
  state.controlsWidth = controlsWidth;
  state.panel = panel;
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
  /** Image URLs for {{image:<src>}}, keyed by layer src. */
  images?: Record<string, string>;
};

export function substituteStudioCode(code: string, values: StudioSubstitution): string {
  const safe = sanitizeStudioCode(code);
  return safe
    .replaceAll("{{title}}", escapeHtml(values.title))
    .replaceAll("{{body}}", escapeHtml(values.body))
    .replaceAll("{{themeImage}}", escapeHtml(values.themeImage))
    .replace(/\{\{image:([^}]+)\}\}/g, (_, src: string) => escapeHtml(values.images?.[src] ?? ""));
}

/**
 * Design-panel state as an HTML+CSS fragment, layers in stacking order.
 * The first title and body stay live as {{title}} / {{body}}; copies carry their own text.
 */
export function designToCode(
  state: StudioState,
  aspect: number | ((layer: ImageLayer) => number) = 1,
  extras: { id: string; stack: string }[] = [],
): string {
  const aspectOf = (layer: ImageLayer) => (typeof aspect === "number" ? aspect : aspect(layer));
  const px = (value: number) => `${Math.round(value * 100) / 100}px`;
  const title = firstLayer(state, "title");
  const body = firstLayer(state, "body");
  const items: string[] = [];
  const rules: string[] = [];
  let imageFade = false;
  if (state.background) {
    items.push(
      state.background.mode === "video"
        ? `  <video class="studio-bg" src="{{image:background}}" poster="{{image:background-poster}}" autoplay muted loop playsinline></video>`
        : `  <img class="studio-bg" src="{{image:background}}" alt="" />`,
    );
    rules.push("  .studio-card .studio-bg { position: absolute; left: 0; top: 0; width: 100%; height: 100%; object-fit: cover; }");
  }
  state.layers.forEach((layer, index) => {
    const name = `layer-${index + 1}`;
    if (layer.kind === "shape" || layer.kind === "line" || layer.kind === "pen") {
      const blend = layer.kind === "shape" && shapeBlend(layer) !== "normal" ? ` mix-blend-mode: ${shapeBlend(layer)};` : "";
      const fade = layer.kind === "shape" ? layerOpacityCss(layer) : "";
      const opacity = fade ? ` ${fade}` : "";
      items.push(
        `  <svg class="${name}" viewBox="0 0 ${state.cardWidth} ${state.cardHeight}" preserveAspectRatio="none">${vectorSvg(layer)}</svg>`,
      );
      rules.push(`  .studio-card .${name} { position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: visible;${blend}${opacity} }`);
      return;
    }
    const place = `left: ${px(layer.x)}; top: ${px(layer.y)};`;
    if (layer.kind === "image") {
      const src = layer.src === state.themeSlug ? "{{themeImage}}" : `{{image:${escapeHtml(layer.src)}}}`;
      const ratio = aspectOf(layer);
      const corner = `border-radius: ${px(clampRadius(layer.radius))};`;
      const blend = imageBlend(layer);
      const bottom = layerBlurBottom(layer);
      const box = [
        blend !== "normal" ? `mix-blend-mode: ${blend};` : "",
        layerOpacityCss(layer),
        bottom > 0 ? "" : imageFilterCss(layer),
        imageShadowCss(layer),
      ].filter(Boolean).join(" ");
      const fx = box ? ` ${box}` : "";
      if (bottom > 0) {
        imageFade = true;
        const baseBlur = imageFilterCss(layer, imageBlur(layer));
        const fade = imageFilterCss(layer, bottom);
        const height = imageLayerHeight(layer, ratio);
        if (layer.crop) {
          const full = uncroppedRect(layer, ratio);
          items.push(`  <div class="${name}"><div class="studio-crop"><img src="${src}" alt="" /></div><div class="studio-fade"><div class="studio-crop"><img src="${src}" alt="" /></div></div></div>`);
          rules.push(`  .studio-card .${name} { position: absolute; ${place} width: ${px(layer.width)}; height: ${px(height)}; ${corner}${fx} }`);
          rules.push(`  .studio-card .${name} .studio-crop { inset: 0; border-radius: inherit; }`);
          if (baseBlur) rules.push(`  .studio-card .${name} > .studio-crop { ${baseBlur} }`);
          rules.push(`  .studio-card .${name} .studio-fade { ${fade} }`);
          rules.push(`  .studio-card .${name} img { left: ${px(full.x - layer.x)}; top: ${px(full.y - layer.y)}; width: ${px(full.w)}; }`);
        } else {
          items.push(`  <div class="${name}"><img src="${src}" alt="" /><img class="studio-fade" src="${src}" alt="" /></div>`);
          rules.push(`  .studio-card .${name} { position: absolute; ${place} width: ${px(layer.width)}; height: ${px(height)}; ${corner}${fx} }`);
          rules.push(`  .studio-card .${name} > img { inset: 0; width: 100%; height: 100%; object-fit: fill; border-radius: inherit; }`);
          if (baseBlur) rules.push(`  .studio-card .${name} > img:first-child { ${baseBlur} }`);
          rules.push(`  .studio-card .${name} .studio-fade { ${fade} }`);
        }
        return;
      }
      if (layer.crop) {
        const full = uncroppedRect(layer, ratio);
        items.push(`  <div class="${name}"><div class="studio-crop"><img src="${src}" alt="" /></div></div>`);
        rules.push(`  .studio-card .${name} { position: absolute; ${place} width: ${px(layer.width)}; height: ${px(imageLayerHeight(layer, ratio))}; ${corner}${fx} }`);
        rules.push(`  .studio-card .${name} .studio-crop { inset: 0; border-radius: inherit; }`);
        rules.push(`  .studio-card .${name} img { left: ${px(full.x - layer.x)}; top: ${px(full.y - layer.y)}; width: ${px(full.w)}; }`);
      } else {
        items.push(`  <img class="${name}" src="${src}" alt="" />`);
        rules.push(`  .studio-card .${name} { ${place} width: ${px(layer.width)}; ${corner}${fx} }`);
      }
      return;
    }
    const tag = layer.kind === "title" ? "h1" : "p";
    const text = layer === title ? "{{title}}" : layer === body ? "{{body}}" : escapeHtml(layer.text);
    items.push(`  <${tag} class="${name}">${text}</${tag}>`);
    const blend = textBlend(layer);
    const style = [
      `font-weight: ${layer.weight};`,
      layer.italic ? "font-style: italic;" : "",
      layer.underline ? "text-decoration: underline;" : "",
      layer.align !== "left" ? `text-align: ${layer.align};` : "",
      blend !== "normal" ? `mix-blend-mode: ${blend};` : "",
      textShadowCss(layer),
    ].filter(Boolean).join(" ");
    const gradient = layer.gradient;
    const paint = gradient
      ? `color: transparent; background-image: linear-gradient(${(gradient.angle + 90) % 360}deg, ${gradient.from}, ${gradient.to}); -webkit-background-clip: text; background-clip: text;`
      : `color: ${layer.color};`;
    rules.push(
      `  .studio-card .${name} { ${place} font-size: ${px(layer.size)}; font-family: ${fontStack(layer.fontId, extras)}; ${paint} ${style} }`,
    );
  });
  if (imageFade) {
    rules.push("  .studio-card .studio-fade { position: absolute; inset: 0; -webkit-mask-image: linear-gradient(to bottom, transparent, #000); mask-image: linear-gradient(to bottom, transparent, #000); }");
  }
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..700;1,300..700&family=Roboto:ital,wght@0,300..700;1,300..700&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${fragment}</body>
</html>`;
}

export type LayerAlign = "left" | "hcenter" | "right" | "top" | "vcenter" | "bottom" | "hspace" | "vspace";
export const LAYER_ALIGNS: readonly LayerAlign[] = ["left", "hcenter", "right", "top", "vcenter", "bottom"];
export const LAYER_DISTRIBUTES: readonly LayerAlign[] = ["hspace", "vspace"];

/** Equal gaps along one axis; the bounds of the boxes stay put. */
function spaceOffsets(boxes: readonly StudioRect[], axis: "x" | "y"): number[] {
  const size = axis === "x" ? "w" : "h";
  const order = boxes.map((_, index) => index).sort((a, b) => boxes[a]![axis] - boxes[b]![axis]);
  const first = boxes[order[0]!]!;
  const end = Math.max(...boxes.map((box) => box[axis] + box[size]));
  const total = boxes.reduce((sum, box) => sum + box[size], 0);
  const gap = (end - first[axis] - total) / Math.max(1, boxes.length - 1);
  const offsets = boxes.map(() => 0);
  let at = first[axis];
  for (const index of order) {
    const box = boxes[index]!;
    offsets[index] = at - box[axis];
    at += box[size] + gap;
  }
  return offsets;
}

export type ShiftAxis = "x" | "y";

/**
 * While Shift is held, keep the axis the gesture first moved along.
 * A larger horizontal delta locks Y; a larger vertical delta locks X.
 */
export function shiftAxisDelta(
  dx: number,
  dy: number,
  shift: boolean,
  axis: ShiftAxis | null,
  threshold = 4,
): { dx: number; dy: number; axis: ShiftAxis | null } {
  if (!shift) return { dx, dy, axis: null };
  let next = axis;
  if (!next && Math.hypot(dx, dy) >= threshold) next = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
  if (next === "x") return { dx, dy: 0, axis: "x" };
  if (next === "y") return { dx: 0, dy, axis: "y" };
  return { dx, dy, axis: null };
}

/** Snap a point onto the locked axis through an anchor. Used while aiming a line. */
export function shiftAxisPoint(
  point: { x: number; y: number },
  anchor: { x: number; y: number },
  shift: boolean,
  axis: ShiftAxis | null,
  threshold = 4,
): { x: number; y: number; axis: ShiftAxis | null } {
  const locked = shiftAxisDelta(point.x - anchor.x, point.y - anchor.y, shift, axis, threshold);
  return { x: anchor.x + locked.dx, y: anchor.y + locked.dy, axis: locked.axis };
}

function liveGroup(state: StudioState, id: string): string[] | null {
  const found = state.groups?.find((group) => group.includes(id));
  if (!found) return null;
  const live = found.filter((member, index) => found.indexOf(member) === index && state.layers.some((layer) => layer.id === member));
  return live.length >= 2 ? live : null;
}

/** The group that contains this layer, or the layer on its own. */
export function groupedIds(state: StudioState, id: string): string[] {
  return liveGroup(state, id) ?? [id];
}

export function canGroupLayers(state: StudioState, ids: readonly string[]): boolean {
  const unique = [...new Set(ids)].filter((id) => state.layers.some((layer) => layer.id === id));
  if (unique.length < 2) return false;
  const current = liveGroup(state, unique[0]!);
  return !(current && current.length === unique.length && unique.every((id) => current.includes(id)));
}

/** Replace any groups that overlap this selection with one group. */
export function groupLayers(state: StudioState, ids: readonly string[]): boolean {
  if (!canGroupLayers(state, ids)) return false;
  const unique = [...new Set(ids)].filter((id) => state.layers.some((layer) => layer.id === id));
  const drop = new Set(unique);
  const rest = (state.groups ?? [])
    .map((group) => group.filter((id) => !drop.has(id)))
    .filter((group) => group.length >= 2);
  state.groups = [...rest, unique];
  return true;
}

export function canUngroupLayers(state: StudioState, ids: readonly string[]): boolean {
  const picked = new Set(ids);
  return (state.groups ?? []).some((group) => {
    const live = liveGroup(state, group[0] ?? "");
    return Boolean(live && live.every((id) => picked.has(id)));
  });
}

/** Dissolve every fully selected group. */
export function ungroupLayers(state: StudioState, ids: readonly string[]): boolean {
  if (!canUngroupLayers(state, ids)) return false;
  const picked = new Set(ids);
  const next = (state.groups ?? []).filter((group) => {
    const live = liveGroup(state, group[0] ?? "");
    return !(live && live.every((id) => picked.has(id)));
  });
  if (next.length === 0) delete state.groups;
  else state.groups = next;
  return true;
}

export function pruneGroups(state: StudioState): void {
  const ids = new Set(state.layers.map((layer) => layer.id));
  const next = (state.groups ?? [])
    .map((group) => [...new Set(group.filter((id) => ids.has(id)))])
    .filter((group) => group.length >= 2);
  if (next.length === 0) delete state.groups;
  else state.groups = next;
}

/** Groups for duplicated layers. `ids` maps an original id to its copy. */
export function copiedGroups(groups: readonly (readonly string[])[] | undefined, ids: ReadonlyMap<string, string>): string[][] {
  if (!groups) return [];
  const next: string[][] = [];
  for (const group of groups) {
    const copy = group.map((id) => ids.get(id)).filter((id): id is string => Boolean(id));
    if (copy.length >= 2) next.push(copy);
  }
  return next;
}

/**
 * Selection rectangles. A fully selected group is one box around its members.
 * Layers that are not in such a group keep their own boxes.
 */
export function selectionOutlines(
  state: StudioState,
  selected: Iterable<string>,
  boxes: readonly (StudioRect & { id: string })[],
): { key: string; box: StudioRect }[] {
  const picked = new Set(selected);
  const byId = new Map(boxes.map((box) => [box.id, box]));
  const outlines: { key: string; box: StudioRect }[] = [];
  const seen = new Set<string>();
  for (const id of picked) {
    if (seen.has(id)) continue;
    const members = groupedIds(state, id);
    const whole = members.length > 1 && members.every((member) => picked.has(member));
    const ids = whole ? members : [id];
    for (const member of ids) seen.add(member);
    const found = ids.flatMap((member) => {
      const box = byId.get(member);
      return box ? [box] : [];
    });
    if (found.length === 0) continue;
    const box = found.length === 1 ? { x: found[0]!.x, y: found[0]!.y, w: found[0]!.w, h: found[0]!.h } : selectionBounds(found);
    outlines.push({ key: whole ? `group:${[...members].sort().join("\0")}` : id, box });
  }
  return outlines;
}

/** The rectangle that wraps every box. Several selected objects align inside it. */
export function selectionBounds(boxes: readonly StudioRect[]): StudioRect {
  const x = Math.min(...boxes.map((box) => box.x));
  const y = Math.min(...boxes.map((box) => box.y));
  const right = Math.max(...boxes.map((box) => box.x + box.w));
  const bottom = Math.max(...boxes.map((box) => box.y + box.h));
  return { x, y, w: right - x, h: bottom - y };
}

/** How far each box moves to line up on one edge or center of `bounds`, or to space the boxes evenly inside their own span. */
export function alignOffsets(boxes: readonly StudioRect[], align: LayerAlign, bounds: StudioRect): { dx: number; dy: number }[] {
  if (align === "hspace" || align === "vspace") {
    const offsets = spaceOffsets(boxes, align === "hspace" ? "x" : "y");
    return offsets.map((value) => (align === "hspace" ? { dx: value, dy: 0 } : { dx: 0, dy: value }));
  }
  const left = bounds.x;
  const top = bounds.y;
  const right = bounds.x + bounds.w;
  const bottom = bounds.y + bounds.h;
  return boxes.map((box) => ({
    dx:
      align === "left" ? left - box.x
      : align === "right" ? right - box.w - box.x
      : align === "hcenter" ? (left + right - box.w) / 2 - box.x
      : 0,
    dy:
      align === "top" ? top - box.y
      : align === "bottom" ? bottom - box.h - box.y
      : align === "vcenter" ? (top + bottom - box.h) / 2 - box.y
      : 0,
  }));
}
