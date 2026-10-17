import { assetUrl, escapeHtml } from "../lib/dom.ts";
import type { CaptureRecord } from "../shared/index-types.ts";
import {
  BUILTIN_FONTS,
  CARD_MAX,
  CARD_MIN,
  clampCardSize,
  clampControlsWidth,
  clampFontSize,
  clampImageOffset,
  clampImageWidth,
  clampRadius,
  clampTextOffset,
  CONTROLS_MIN,
  cropFromBox,
  designToCode,
  ensureLayer,
  isUploadSrc,
  TEXT_ALIGNS,
  alignOffsets,
  LAYER_ALIGNS,
  LAYER_DISTRIBUTES,
  type LayerAlign,
  BOLD_WEIGHT,
  isBold,
  REGULAR_WEIGHT,
  TEXT_WEIGHTS,
  fontLabelFromPath,
  fontStack,
  FONT_MIN,
  FONT_SIDE_MARGIN,
  IMAGE_MAX,
  IMAGE_RADIUS_DEFAULT,
  imageLayerHeight,
  IMAGE_MIN,
  inkHex,
  isTextLayer,
  maxFontSize,
  moveCropBox,
  newLayerId,
  normalizeHex,
  rgbToHex,
  PREVIEW_MIN,
  SPLITTER_WIDTH,
  RADIUS_MAX,
  RADIUS_MIN,
  resizeCropBox,
  roundOffset,
  scaleCardSize,
  scaleFontSizes,
  scaleImageAround,
  studioFragment,
  studioSrcdoc,
  uncroppedRect,
  wrapText,
  type ImageLayer,
  type LayerKind,
  type StudioDocumentInput,
  type StudioLayer,
  type StudioRect,
  type StudioState,
  type TextAlign,
  type TextKind,
  type TextLayer,
} from "../shared/studio.ts";
import { presetById, STUDIO_PRESETS } from "../shared/studio-presets.ts";
import {
  BLEND_LABELS,
  LAYER_BLUR_MAX,
  LINE_WIDTH_DEFAULT,
  LINE_WIDTH_MAX,
  LINE_WIDTH_MIN,
  PEN_CLOSE,
  SHADOW_BLUR_MAX,
  SHADOW_DISTANCE_MAX,
  SHADOW_SIZE_MAX,
  SHAPE_BLENDS,
  SHAPE_MAX,
  SHAPE_MIN,
  clampShapeSize,
  arrowLength,
  arrowPolygon,
  clampUnit,
  emptyShadow,
  emptyStroke,
  lineBounds,
  lineContains,
  lineSegment,
  penBounds,
  nodeBounds,
  penContains,
  penPointIndex,
  resizeShape,
  restartPenAt,
  scaleShapeBox,
  shadowOffset,
  shapeBlend,
  shapeContains,
  radiusHandlePoints,
  shapeNodes,
  shapeShadow,
  shapeStroke,
  starInner,
  starPoints,
  tracePen,
  trianglePoints,
  traceShape,
  transformNodes,
  type DrawPath,
  type LineLayer,
  type LinearGradient,
  type PenAnchor,
  type PenLayer,
  type ShapeBlend,
  type ShapeHandle,
  type ShapeLayer,
  type ShapeName,
} from "../shared/studio-shapes.ts";
import { confirmProceed, showToast } from "../feedback.ts";
import thumbIgFeedSquare from "../styles/presets/ig-feed-square.webp";
import thumbIgFeedPortrait from "../styles/presets/ig-feed-portrait.webp";
import thumbIgStory from "../styles/presets/ig-story.webp";
import thumbFbFeed from "../styles/presets/fb-feed.webp";
import thumbFbCover from "../styles/presets/fb-cover.webp";
import thumbYtThumbnail from "../styles/presets/yt-thumbnail.webp";
import thumbYtBanner from "../styles/presets/yt-banner.webp";
import thumbYtShorts from "../styles/presets/yt-shorts.webp";
import { addUpload, getUploads, removeUpload, uploadBySrc, uploadSrc } from "../studio-uploads.ts";

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;
const NUDGE_STEP = 0.5;
const NUDGE_SHIFT_STEP = 10;
const IS_MAC = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
const HISTORY_LIMIT = 40;
let previewZoom = 1;
let undoStack: StudioState[] = [];
let redoStack: StudioState[] = [];
let undoZoom: number[] = [];
let redoZoom: number[] = [];
let gesture: StudioState | null = null;
let gestureZoom = 1;

type Device = "mobile" | "tablet" | "desktop";
const DEVICES: { id: Device; label: string; icon: string }[] = [
  {
    id: "mobile",
    label: "모바일 뷰",
    icon: `<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z"/><path d="M11 18.5h2"/></svg>`,
  },
  {
    id: "tablet",
    label: "타블렛 뷰",
    icon: `<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 2.5h13A1.5 1.5 0 0 1 20 4v16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V4a1.5 1.5 0 0 1 1.5-1.5Z"/><path d="M10.5 18.5h3"/></svg>`,
  },
  {
    id: "desktop",
    label: "데스크탑 뷰",
    icon: `<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4Z"/><path d="M8.5 21h7M12 17v4"/></svg>`,
  },
];
const TABLET_QUERY = "(min-width: 768px)";
const DESKTOP_QUERY = "(min-width: 1025px)";
let studioDevice: Device | null = null;
let stopDeviceWatch: (() => void) | null = null;
let stopHistoryShortcut: (() => void) | null = null;
let stopStudioKeys: (() => void) | null = null;
let layerClipboard: StudioLayer[] = [];
let layerMenu: HTMLElement | null = null;
const LONG_PRESS_MS = 500;
const PASTE_OFFSET = 20;

function largestDevice(): Device {
  if (window.matchMedia(DESKTOP_QUERY).matches) return "desktop";
  if (window.matchMedia(TABLET_QUERY).matches) return "tablet";
  return "mobile";
}

/** The chosen device, stepped down when the window is too narrow to show it. */
function activeDevice(): Device {
  const order: Device[] = ["mobile", "tablet", "desktop"];
  const max = largestDevice();
  if (!studioDevice) return max;
  return order.indexOf(studioDevice) <= order.indexOf(max) ? studioDevice : max;
}

function cloneStudio(state: StudioState): StudioState {
  return structuredClone(state);
}

function sameStudio(a: StudioState, b: StudioState): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

const imageCache = new Map<string, HTMLImageElement>();
const dataUrlCache = new Map<string, Promise<string>>();

function loadImage(url: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(url);
  if (cached?.complete && cached.naturalWidth > 0) return Promise.resolve(cached);
  return new Promise((resolve, reject) => {
    const image = cached ?? new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Image failed: ${url}`));
    if (!cached) {
      imageCache.set(url, image);
      image.src = url;
    }
  });
}

function themeDataUrl(url: string): Promise<string> {
  const cached = dataUrlCache.get(url);
  if (cached) return cached;
  const pending = fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Theme image HTTP ${response.status}`);
      return response.blob();
    })
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error ?? new Error("data url failed"));
          reader.readAsDataURL(blob);
        }),
    );
  dataUrlCache.set(url, pending);
  return pending;
}

const localFontUrls = import.meta.glob("../../fonts/*.{woff2,woff,ttf,otf}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

type FontChoice = { id: string; label: string; stack: string };

function textFont(layer: TextLayer, size: number, extras: FontChoice[]): string {
  return `${layer.italic ? "italic " : ""}${layer.weight} ${size}px ${fontStack(layer.fontId, extras)}`;
}
type HitBox = { id: string; kind: LayerKind; x: number; y: number; w: number; h: number };

const installedFonts = new Set<string>();

function fontFormat(url: string): string {
  if (url.includes(".woff2")) return "woff2";
  if (url.includes(".woff")) return "woff";
  if (url.includes(".otf")) return "opentype";
  return "truetype";
}

function extraFonts(): FontChoice[] {
  const builtins = new Set(BUILTIN_FONTS.map((font) => font.label.toLowerCase()));
  const extras: FontChoice[] = [];
  for (const [path, url] of Object.entries(localFontUrls)) {
    const label = fontLabelFromPath(path);
    if (!label || builtins.has(label.toLowerCase())) continue;
    const id = `local:${label}`;
    if (extras.some((font) => font.id === id)) continue;
    if (!installedFonts.has(label)) {
      installedFonts.add(label);
      const style = document.createElement("style");
      style.textContent = `@font-face{font-family:${JSON.stringify(label)};src:url("${url}") format("${fontFormat(url)}");font-display:swap;}`;
      document.head.append(style);
    }
    extras.push({
      id,
      label,
      stack: `${JSON.stringify(label)}, system-ui, sans-serif`,
    });
  }
  return extras;
}

function fontChoices(): FontChoice[] {
  return [...BUILTIN_FONTS, ...extraFonts()];
}

function roundedPath(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number,
): void {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, r);
}

function documentInput(
  state: StudioState,
  themeImage: string,
  images: Record<string, string>,
  aspect: (layer: ImageLayer) => number,
): StudioDocumentInput {
  const title = ensureLayer(state, "title");
  const body = ensureLayer(state, "body");
  const image = ensureLayer(state, "image");
  const extras = extraFonts();
  return {
    title: title.text,
    body: body.text,
    themeImage,
    images,
    design: designToCode(state, aspect, extras),
    color: state.color,
    radius: state.radius,
    width: state.cardWidth,
    height: state.cardHeight,
    code: state.code,
    titleFontStack: fontStack(title.fontId, extras),
    bodyFontStack: fontStack(body.fontId, extras),
    titleSize: title.size,
    bodySize: body.size,
    titleX: title.x,
    titleY: title.y,
    bodyX: body.x,
    bodyY: body.y,
    imageWidth: image.width,
    imageX: image.x,
    imageY: image.y,
    titleColor: title.color,
    bodyColor: body.color,
  };
}

const effectBuffers: HTMLCanvasElement[] = [];
const BLUR_STEPS = 8;

function effectBuffer(index: number, width: number, height: number): HTMLCanvasElement {
  const canvas = effectBuffers[index] ?? document.createElement("canvas");
  effectBuffers[index] = canvas;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = Math.max(1, width);
    canvas.height = Math.max(1, height);
  }
  canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

function boxGradient(
  ctx: CanvasRenderingContext2D,
  gradient: LinearGradient,
  x: number,
  y: number,
  w: number,
  h: number,
): CanvasGradient {
  const rad = (gradient.angle * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const half = (Math.abs(dx) * w + Math.abs(dy) * h) / 2;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const paint = ctx.createLinearGradient(cx - dx * half, cy - dy * half, cx + dx * half, cy + dy * half);
  paint.addColorStop(0, gradient.from);
  paint.addColorStop(1, gradient.to);
  return paint;
}

function blurMask(index: number, steps: number): Array<[number, number]> {
  const at = (step: number) => Math.min(1, Math.max(0, step / (steps - 1)));
  if (index <= 0) return [[0, 1], [at(1), 0]];
  if (index >= steps - 1) return [[at(steps - 2), 0], [1, 1]];
  return [[at(index - 1), 0], [at(index), 1], [at(index + 1), 0]];
}

function compositeFor(blend: ShapeBlend): GlobalCompositeOperation {
  return blend === "normal" ? "source-over" : blend;
}

function drawCard(
  canvas: HTMLCanvasElement,
  state: StudioState,
  imageOf: (layer: ImageLayer) => HTMLImageElement | null,
  hiddenId?: string,
): HitBox[] {
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  const width = state.cardWidth;
  const height = state.cardHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  roundedPath(ctx, width, height, state.radius);
  ctx.clip();
  ctx.fillStyle = state.color;
  ctx.fillRect(0, 0, width, height);

  const hits: HitBox[] = [];
  const maxText = Math.max(1, width - FONT_SIDE_MARGIN * 2);
  ctx.textBaseline = "top";
  const extras = extraFonts();
  const paintImage = (layer: ImageLayer): void => {
    const source = imageOf(layer);
    if (!source) return;
    const height = imageLayerHeight(layer, source.naturalHeight / source.naturalWidth);
    if (layer.id !== hiddenId) {
      const radius = Math.max(0, Math.min(layer.radius, layer.width / 2, height / 2));
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(layer.x, layer.y, layer.width, height, radius);
      ctx.clip();
      const crop = layer.crop;
      if (crop) {
        const sw = source.naturalWidth;
        const sh = source.naturalHeight;
        ctx.drawImage(source, crop.x * sw, crop.y * sh, crop.w * sw, crop.h * sh, layer.x, layer.y, layer.width, height);
      } else {
        ctx.drawImage(source, layer.x, layer.y, layer.width, height);
      }
      ctx.restore();
    }
    hits.push({ id: layer.id, kind: "image", x: layer.x, y: layer.y, w: layer.width, h: height });
  };

  const paintText = (layer: TextLayer): void => {
    if (!layer.text.trim()) return;
    ctx.font = textFont(layer, layer.size, extras);
    const lines = wrapText(layer.text.trim(), maxText, (value) => ctx.measureText(value).width);
    const lineHeight = Math.round(layer.size * 1.25);
    const widths = lines.map((line) => ctx.measureText(line).width);
    const widest = Math.max(0, ...widths);
    const underline = Math.max(1, Math.round(layer.size / 16));
    const blockWidth = Math.max(widest, layer.size);
    const blockHeight = Math.max(lines.length, 1) * lineHeight;
    ctx.fillStyle = layer.gradient ? boxGradient(ctx, layer.gradient, layer.x, layer.y, blockWidth, blockHeight) : layer.color;
    lines.forEach((line, index) => {
      if (layer.id === hiddenId) return;
      const lineWidth = widths[index] ?? 0;
      const x = layer.x + (layer.align === "center" ? (widest - lineWidth) / 2 : layer.align === "right" ? widest - lineWidth : 0);
      const y = layer.y + index * lineHeight;
      ctx.fillText(line, x, y);
      if (layer.underline) ctx.fillRect(x, y + layer.size * 0.98, lineWidth, underline);
    });
    hits.push({
      id: layer.id,
      kind: layer.kind,
      x: layer.x,
      y: layer.y,
      w: blockWidth,
      h: blockHeight,
    });
  };

  const pathOf = (target: CanvasRenderingContext2D): DrawPath => ({
    moveTo: (x, y) => target.moveTo(x, y),
    lineTo: (x, y) => target.lineTo(x, y),
    quadraticCurveTo: (cx, cy, x, y) => target.quadraticCurveTo(cx, cy, x, y),
    bezierCurveTo: (c1x, c1y, c2x, c2y, x, y) => target.bezierCurveTo(c1x, c1y, c2x, c2y, x, y),
    closePath: () => target.closePath(),
    ellipse: (x, y, rx, ry) => target.ellipse(x, y, Math.max(0, rx), Math.max(0, ry), 0, 0, Math.PI * 2),
    rect: (x, y, w, h, radius) => target.roundRect(x, y, w, h, radius),
  });
  const paintShape = (layer: ShapeLayer): void => {
    if (layer.id !== hiddenId) {
      const shadow = shapeShadow(layer);
      const stroke = shapeStroke(layer);
      const blurFrom = clampUnit(layer.blurFrom ?? 0, LAYER_BLUR_MAX);
      const blurTo = clampUnit(layer.blurTo ?? 0, LAYER_BLUR_MAX);
      const fillShape = (target: CanvasRenderingContext2D) => {
        target.beginPath();
        traceShape(pathOf(target), layer);
        target.fillStyle = layer.gradient ? boxGradient(target, layer.gradient, layer.x, layer.y, layer.width, layer.height) : layer.color;
        target.fill();
      };
      const paintStroke = (target: CanvasRenderingContext2D) => {
        if (stroke.width <= 0 || stroke.opacity <= 0) return;
        target.save();
        target.globalAlpha *= stroke.opacity / 100;
        target.lineWidth = stroke.width;
        target.lineJoin = "round";
        target.lineCap = "round";
        target.strokeStyle = stroke.gradient
          ? boxGradient(target, stroke.gradient, layer.x, layer.y, layer.width, layer.height)
          : stroke.color;
        target.beginPath();
        traceShape(pathOf(target), layer);
        target.stroke();
        target.restore();
      };
      if (shadow.opacity > 0 && (shadow.size > 0 || shadow.blur > 0 || shadow.distance > 0)) {
        const offset = shadowOffset(shadow.distance);
        const ink = `rgba(0, 0, 0, ${shadow.opacity / 100})`;
        const spread = shadow.size * 2 + stroke.width;
        ctx.save();
        ctx.shadowColor = ink;
        ctx.shadowBlur = shadow.blur;
        ctx.shadowOffsetX = offset.x;
        ctx.shadowOffsetY = offset.y;
        ctx.fillStyle = ink;
        ctx.strokeStyle = ink;
        ctx.lineJoin = "round";
        ctx.lineWidth = spread;
        ctx.beginPath();
        traceShape(pathOf(ctx), layer);
        if (spread > 0) ctx.stroke();
        ctx.fill();
        ctx.restore();
      }
      ctx.save();
      ctx.globalCompositeOperation = compositeFor(shapeBlend(layer));
      if (blurFrom === 0 && blurTo === 0) {
        fillShape(ctx);
      } else {
        const pad = Math.ceil(Math.max(blurFrom, blurTo) * 2) + 4;
        const left = Math.max(0, Math.floor(layer.x - pad));
        const top = Math.max(0, Math.floor(layer.y - pad));
        const right = Math.min(width, Math.ceil(layer.x + layer.width + pad));
        const bottom = Math.min(height, Math.ceil(layer.y + layer.height + pad));
        const bw = Math.max(1, right - left);
        const bh = Math.max(1, bottom - top);
        const sharp = effectBuffer(0, bw, bh);
        const sharpCtx = sharp.getContext("2d");
        if (!sharpCtx) fillShape(ctx);
        else {
          sharpCtx.save();
          sharpCtx.translate(-left, -top);
          fillShape(sharpCtx);
          sharpCtx.restore();
          ctx.drawImage(sharp, left, top);
          const localX = layer.x - left;
          for (let index = 0; index < BLUR_STEPS; index += 1) {
            const t = index / (BLUR_STEPS - 1);
            const radius = blurFrom + (blurTo - blurFrom) * t;
            if (radius < 0.5) continue;
            const blurred = effectBuffer(1, bw, bh);
            const blurredCtx = blurred.getContext("2d");
            if (!blurredCtx) continue;
            blurredCtx.filter = `blur(${radius}px)`;
            blurredCtx.drawImage(sharp, 0, 0);
            blurredCtx.filter = "none";
            blurredCtx.globalCompositeOperation = "destination-in";
            const mask = blurredCtx.createLinearGradient(localX, 0, localX + layer.width, 0);
            for (const [at, alpha] of blurMask(index, BLUR_STEPS)) mask.addColorStop(at, `rgba(0, 0, 0, ${alpha})`);
            blurredCtx.fillStyle = mask;
            blurredCtx.fillRect(0, 0, bw, bh);
            blurredCtx.globalCompositeOperation = "source-over";
            ctx.drawImage(blurred, left, top);
          }
        }
      }
      paintStroke(ctx);
      ctx.restore();
    }
    hits.push({ id: layer.id, kind: "shape", x: layer.x, y: layer.y, w: layer.width, h: layer.height });
  };
  const paintLine = (layer: LineLayer): void => {
    if (layer.id !== hiddenId) {
      const segment = lineSegment(layer);
      ctx.beginPath();
      ctx.strokeStyle = layer.color;
      ctx.fillStyle = layer.color;
      ctx.lineWidth = layer.stroke;
      ctx.lineCap = layer.cap;
      ctx.moveTo(segment.x1, segment.y1);
      ctx.lineTo(segment.x2, segment.y2);
      ctx.stroke();
      const length = arrowLength(layer);
      const heads = [
        layer.start ? arrowPolygon({ x: layer.x, y: layer.y }, { x: layer.x2, y: layer.y2 }, length) : null,
        layer.end ? arrowPolygon({ x: layer.x2, y: layer.y2 }, { x: layer.x, y: layer.y }, length) : null,
      ];
      for (const points of heads) {
        const tip = points?.[0];
        if (!points || !tip) continue;
        ctx.beginPath();
        ctx.moveTo(tip.x, tip.y);
        for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
        ctx.closePath();
        ctx.fill();
      }
    }
    const box = lineBounds(layer);
    hits.push({ id: layer.id, kind: "line", x: box.x, y: box.y, w: box.w, h: box.h });
  };
  const paintPen = (layer: PenLayer): void => {
    if (layer.id !== hiddenId && layer.points.length > 0) {
      ctx.beginPath();
      tracePen(pathOf(ctx), layer.points, layer.closed);
      if (layer.fill) {
        ctx.fillStyle = layer.fill;
        ctx.fill();
      }
      if (layer.stroke && layer.strokeWidth > 0) {
        ctx.strokeStyle = layer.stroke;
        ctx.lineWidth = layer.strokeWidth;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }
    const box = penBounds(layer);
    hits.push({ id: layer.id, kind: "pen", x: box.x, y: box.y, w: box.w, h: box.h });
  };

  for (const layer of state.layers) {
    if (layer.kind === "image") paintImage(layer);
    else if (layer.kind === "shape") paintShape(layer);
    else if (layer.kind === "line") paintLine(layer);
    else if (layer.kind === "pen") paintPen(layer);
    else paintText(layer);
  }
  ctx.restore();
  return hits;
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

async function paintForeignObject(
  canvas: HTMLCanvasElement,
  srcdoc: string,
  width: number,
  height: number,
): Promise<void> {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject x="0" y="0" width="${width}" height="${height}">${srcdoc}</foreignObject></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    const image = await loadImage(url);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
  } finally {
    URL.revokeObjectURL(url);
    imageCache.delete(url);
  }
}

let previewObserver: ResizeObserver | null = null;

/** A scrollbar that floats over the content and shows only while scrolling. Returns its re-place function. */
function overlayScrollbar(scroller: HTMLElement, thumb: HTMLElement, host: HTMLElement): () => void {
  let hideTimer = 0;
  const place = () => {
    const max = scroller.scrollHeight - scroller.clientHeight;
    if (max <= 1) {
      thumb.hidden = true;
      return;
    }
    thumb.hidden = false;
    const thumbHeight = Math.max(32, (scroller.clientHeight / scroller.scrollHeight) * scroller.clientHeight);
    const travel = Math.max(0, scroller.clientHeight - thumbHeight);
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${(scroller.scrollTop / max) * travel}px)`;
  };
  scroller.addEventListener("scroll", () => {
    place();
    host.classList.add("is-scrolling");
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => host.classList.remove("is-scrolling"), 700);
  });
  place();
  return place;
}

const THEME_DRAG = "application/x-ax-studio-image";
const PRESET_SHAPE = 56;
const PRESET_THUMBS: Record<string, string> = {
  "ig-feed-square": thumbIgFeedSquare,
  "ig-feed-portrait": thumbIgFeedPortrait,
  "ig-story": thumbIgStory,
  "fb-feed": thumbFbFeed,
  "fb-cover": thumbFbCover,
  "yt-thumbnail": thumbYtThumbnail,
  "yt-banner": thumbYtBanner,
  "yt-shorts": thumbYtShorts,
};
const STEP = 2;
const STEP_SHIFT = 10;
const DRAW_TOOLS = [
  { id: "select", label: "선택", path: "M6 4.5v12.2l2.7-2.7 3.4 5.3 1.7-1.1-3.4-5.2H17z" },
  { id: "ellipse", label: "원", path: "M19 12a7 7 0 1 1-14 0 7 7 0 1 1 14 0" },
  { id: "rect", label: "사각형", path: "M6 6h12v12H6z" },
  { id: "triangle", label: "삼각형", path: "M12 5 19 19H5z" },
  { id: "star", label: "별", path: "M12 4.5 14.2 9.6 19.7 10.1 15.5 13.8 16.7 19.2 12 16.4 7.3 19.2 8.5 13.8 4.3 10.1 9.8 9.6z" },
  { id: "line", label: "선", path: "M5 12h14" },
  { id: "pen", label: "펜", path: "M15.5 4.5 19.5 8.5 8 20H4v-4z" },
] as const;
const drawIcon = (path: string) =>
  `<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}" /></svg>`;

function stepButtons(name: string): string {
  return `<span class="studio__steps">
                <button type="button" class="studio__step" data-step="-1" aria-label="${name} 줄이기" title="${STEP}px 줄이기 · Shift ${STEP_SHIFT}px">−</button>
                <button type="button" class="studio__step" data-step="1" aria-label="${name} 키우기" title="${STEP}px 키우기 · Shift ${STEP_SHIFT}px">+</button>
              </span>`;
}

const TEXT_TOGGLES = [
  { style: "bold", label: "볼드", glyph: "B" },
  { style: "italic", label: "이탤릭", glyph: "I" },
  { style: "underline", label: "밑줄", glyph: "U" },
] as const;
const ALIGN_LABELS: Record<TextAlign, string> = { left: "왼쪽 정렬", center: "가운데 정렬", right: "오른쪽 정렬" };
const ALIGN_PATHS: Record<TextAlign, string> = {
  left: "M4 6h16M4 10h10M4 14h16M4 18h10",
  center: "M4 6h16M7 10h10M4 14h16M7 18h10",
  right: "M4 6h16M10 10h10M4 14h16M10 18h10",
};

const LAYER_ALIGN_LABELS: Record<LayerAlign, string> = {
  left: "왼쪽 정렬",
  hcenter: "수평 가운데 정렬",
  right: "오른쪽 정렬",
  top: "위쪽 정렬",
  vcenter: "수직 가운데 정렬",
  bottom: "아래쪽 정렬",
  hspace: "가로 균등 정렬",
  vspace: "세로 균등 정렬",
};
const LAYER_ALIGN_PATHS: Record<LayerAlign, string> = {
  left: "M4 3v18M8 6h11v4H8zM8 14h7v4H8z",
  hcenter: "M12 3v18M6 6h12v4H6zM8.5 14h7v4h-7z",
  right: "M20 3v18M5 6h11v4H5zM9 14h7v4H9z",
  top: "M3 4h18M6 8h4v11H6zM14 8h4v7h-4z",
  vcenter: "M3 12h18M6 6h4v12H6zM14 8.5h4v7h-4z",
  bottom: "M3 20h18M6 5h4v11H6zM14 9h4v7h-4z",
  hspace: "M4 3v18M20 3v18M9.5 7h5v10h-5z",
  vspace: "M3 4h18M3 20h18M7 9.5h10v5H7z",
};
const layerAlignButton = (align: LayerAlign) =>
  `<button type="button" class="studio__zoom-btn" data-layer-align="${align}" aria-label="${LAYER_ALIGN_LABELS[align]}" title="${LAYER_ALIGN_LABELS[align]}"><svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${LAYER_ALIGN_PATHS[align]}" /></svg></button>`;

type TextToggle = (typeof TEXT_TOGGLES)[number]["style"];

function styleOn(layer: TextLayer, style: TextToggle): boolean {
  return style === "bold" ? isBold(layer) : layer[style];
}

function weightOptions(weight: number): string {
  return TEXT_WEIGHTS.map(
    (item) => `<option value="${item.value}"${item.value === weight ? " selected" : ""}>${item.label} · ${item.value}</option>`,
  ).join("");
}

function textStyleControls(kind: TextKind, name: string, layer: TextLayer): string {
  const pressed = (on: boolean) => `aria-pressed="${on ? "true" : "false"}"`;
  const toggles = TEXT_TOGGLES.map(
    (item) =>
      `<button type="button" class="studio__style-btn studio__style-btn--${item.style}" data-text-kind="${kind}" data-text-style="${item.style}" ${pressed(styleOn(layer, item.style))} aria-label="${name} ${item.label}" title="${item.label}">${item.glyph}</button>`,
  ).join("");
  const aligns = TEXT_ALIGNS.map(
    (align) =>
      `<button type="button" class="studio__style-btn" data-text-kind="${kind}" data-text-align="${align}" ${pressed(layer.align === align)} aria-label="${name} ${ALIGN_LABELS[align]}" title="${ALIGN_LABELS[align]}"><svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${ALIGN_PATHS[align]}" /></svg></button>`,
  ).join("");
  return `
          <div class="studio__field">
            <span id="studio-${kind}-style-label">${name} 스타일</span>
            <div class="studio__text-style" role="group" aria-labelledby="studio-${kind}-style-label">
              <div class="studio__style-set">${toggles}</div>
              <div class="studio__style-set">${aligns}</div>
            </div>
          </div>`;
}

function themeOptions(captures: CaptureRecord[], activeSrc: string): string {
  const option = (src: string, image: string, label: string) => {
    const selected = src === activeSrc;
    return `
      <button
        type="button"
        class="studio__theme"
        role="radio"
        data-theme-slug="${escapeHtml(src)}"
        aria-checked="${selected ? "true" : "false"}"
        tabindex="${selected ? "0" : "-1"}"
        draggable="true"
      >
        <img src="${escapeHtml(image)}" alt="${escapeHtml(label)}" draggable="false" />
      </button>
    `;
  };
  const archive = captures.map((capture) =>
    option(capture.slug, assetUrl(capture.asset.thumbPath ?? capture.asset.path), capture.title),
  );
  const uploads = getUploads().map(
    (upload) => `
      <div class="studio__theme-item">
        ${option(uploadSrc(upload), upload.url, upload.name)}
        <button type="button" class="studio__theme-remove" data-upload-remove="${escapeHtml(upload.id)}" aria-label="${escapeHtml(upload.name)} 삭제" title="삭제">×</button>
      </div>
    `,
  );
  const add = `<button type="button" class="studio__theme studio__theme--add" id="studio-theme-add" aria-label="이미지 추가" title="이미지 추가">+</button>`;
  return [...archive, ...uploads, add].join("");
}

export function renderStudio(state: StudioState, captures: CaptureRecord[]): string {
  if (captures.length === 0) {
    return `
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;
  }

  const blankInk = rgbToHex(0, 0, 0);
  const gradientControls = (prefix: string, label: string) => `
            <button type="button" class="studio__style-btn studio__style-btn--wide" id="${prefix}-gradient-toggle" aria-pressed="false">그라데이션</button>
          </div>
          <div id="${prefix}-gradient" hidden>
            <div class="studio__field">
              <label for="${prefix}-end">${label} 끝 색</label>
              <div class="studio__color">
                <input id="${prefix}-end" class="studio__color-picker studio__color-picker--text" type="color" value="${blankInk}" aria-label="${label} 그라데이션 끝 색" />
                <input id="${prefix}-end-hex" class="studio__control" type="text" value="${blankInk}" spellcheck="false" aria-label="${label} 그라데이션 끝 색 hex" />
              </div>
            </div>
            <div class="studio__field">
              <label for="${prefix}-angle">${label} 각도</label>
              <div class="studio__radius">
                <input id="${prefix}-angle" type="range" min="0" max="360" step="1" value="0" />
                ${stepButtons(`${label} 각도`)}
                <input id="${prefix}-angle-number" class="studio__control studio__control--number" type="number" min="0" max="360" step="1" value="0" aria-label="${label} 각도 수치" />
              </div>
            </div>
          </div>`;
  const shadowRow = (id: string, label: string, max: number) => `
            <div class="studio__field">
              <label for="${id}">${label}</label>
              <div class="studio__radius">
                <input id="${id}" type="range" min="0" max="${max}" step="1" value="0" />
                ${stepButtons(label)}
                <input id="${id}-number" class="studio__control studio__control--number" type="number" min="0" max="${max}" step="1" value="0" aria-label="${label} 수치" />
              </div>
            </div>`;
  const title = ensureLayer(state, "title");
  const body = ensureLayer(state, "body");
  const image = ensureLayer(state, "image");
  const preset = presetById(state.presetId);
  const presets = STUDIO_PRESETS.map((item) => {
    const selected = item.id === preset.id;
    const scale = PRESET_SHAPE / Math.max(item.width, item.height);
    const shapeWidth = (item.width * scale).toFixed(2);
    const shapeHeight = (item.height * scale).toFixed(2);
    const thumb = PRESET_THUMBS[item.id];
    const shape = thumb
      ? `<img class="studio__preset-shape" alt="" src="${escapeHtml(thumb)}" style="width:${shapeWidth}px;height:${shapeHeight}px">`
      : `<span class="studio__preset-shape" style="width:${shapeWidth}px;height:${shapeHeight}px"></span>`;
    return `
      <button type="button" class="studio__preset" role="radio" data-preset-id="${escapeHtml(item.id)}" aria-checked="${selected ? "true" : "false"}" tabindex="${selected ? "0" : "-1"}">
        <span class="studio__preset-frame" style="width:${PRESET_SHAPE}px" aria-hidden="true">${shape}</span>
        <span class="studio__preset-name">${escapeHtml(item.name)}</span>
        <span class="studio__preset-size">${item.width}×${item.height}</span>
      </button>`;
  }).join("");
  const themes = themeOptions(captures, image.src);
  const designSelected = state.panel === "design";
  const fonts = fontChoices();
  const fontMax = maxFontSize(state.cardWidth);
  const fontOptions = (selected: string) =>
    fonts
      .map(
        (font) =>
          `<option value="${escapeHtml(font.id)}"${font.id === selected ? " selected" : ""}>${escapeHtml(font.label)}</option>`,
      )
      .join("");

  const undoIcon = `<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>`;
  const redoIcon = `<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>`;

  const device = activeDevice();
  const deviceButtons = DEVICES.map(
    (item) =>
      `<button type="button" class="studio__zoom-btn studio-devices__btn" data-device="${item.id}" aria-label="${item.label}" title="${item.label}" aria-pressed="${item.id === device ? "true" : "false"}">${item.icon}</button>`,
  ).join("");

  return `
    <div class="studio-view">
    <div class="studio-devices" role="group" aria-label="디바이스 뷰">${deviceButtons}</div>
    <div class="studio-device-frame">
    <div class="studio-device" id="studio-device" data-device="${device}" data-framed="${device === largestDevice() ? "false" : "true"}">
    <section class="studio" style="--studio-controls-width:${state.controlsWidth}px">
      <div class="studio__controls-wrap">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${designSelected ? "true" : "false"}" tabindex="${designSelected ? "0" : "-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${designSelected ? "false" : "true"}" tabindex="${designSelected ? "-1" : "0"}">Code</button>
        </div>
        <div class="studio__panel-host">
        <div class="studio__panel-scroll" id="studio-panel-scroll">
        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${designSelected ? "" : " hidden"}>
          <div class="studio__field">
            <span id="studio-preset-label">카드 크기 프리셋</span>
            <div class="studio__presets" role="radiogroup" aria-labelledby="studio-preset-label">${presets}</div>
          </div>
          <div class="studio__field">
            <span id="studio-draw-label">도형</span>
            <div class="studio__draw" role="group" aria-labelledby="studio-draw-label">
              ${DRAW_TOOLS.map(
                (tool) =>
                  `<button type="button" class="studio__draw-btn" data-draw="${tool.id}" aria-label="${tool.label}" title="${tool.label}"${tool.id === "select" ? ' aria-pressed="true"' : tool.id === "pen" ? ' aria-pressed="false"' : ""}>${drawIcon(tool.path)}</button>`,
              ).join("")}
            </div>
            <p class="studio__hint">원, 사각형, 삼각형, 별과 선, 펜으로 카드에 형태를 그리는 도구입니다.</p>
          </div>
          <div class="studio__field" id="studio-shape-size-field" hidden>
            <label for="studio-shape-size">도형 크기</label>
            <div class="studio__radius">
              <input id="studio-shape-size" type="range" min="${SHAPE_MIN}" max="${SHAPE_MAX}" step="1" value="${SHAPE_MIN}" />
              ${stepButtons("도형 크기")}
              <input id="studio-shape-size-number" class="studio__control studio__control--number" type="number" min="${SHAPE_MIN}" max="${SHAPE_MAX}" step="1" value="${SHAPE_MIN}" aria-label="도형 크기 수치" />
            </div>
          </div>
          <div class="studio__field" id="studio-shape-radius-field" hidden>
            <label for="studio-shape-radius">도형 radius</label>
            <div class="studio__radius">
              <input id="studio-shape-radius" type="range" min="${RADIUS_MIN}" max="${RADIUS_MAX}" step="1" value="0" />
              ${stepButtons("도형 radius")}
              <input id="studio-shape-radius-number" class="studio__control studio__control--number" type="number" min="${RADIUS_MIN}" max="${RADIUS_MAX}" step="1" value="0" aria-label="도형 radius 수치" />
            </div>
          </div>
          <div class="studio__field" id="studio-shape-color-field" hidden>
            <label for="studio-shape-color">도형 색</label>
            <div class="studio__color">
              <input id="studio-shape-color" class="studio__color-picker studio__color-picker--text" type="color" value="${blankInk}" aria-label="도형 색 피커" />
              <input id="studio-shape-hex" class="studio__control" type="text" value="${blankInk}" spellcheck="false" aria-label="도형 색 hex" />
              ${gradientControls("studio-shape", "도형")}
          </div>
          <div id="studio-shape-stroke" hidden>
            ${shadowRow("studio-stroke-width", "선 두께", LINE_WIDTH_MAX)}
            ${shadowRow("studio-stroke-opacity", "선 투명도", 100)}
            <div class="studio__field">
              <label for="studio-stroke-color">선 색</label>
              <div class="studio__color">
                <input id="studio-stroke-color" class="studio__color-picker studio__color-picker--text" type="color" value="${blankInk}" aria-label="선 색 피커" />
                <input id="studio-stroke-hex" class="studio__control" type="text" value="${blankInk}" spellcheck="false" aria-label="선 색 hex" />
                ${gradientControls("studio-stroke", "선")}
            </div>
          </div>
          <div id="studio-shape-effects" hidden>
            ${shadowRow("studio-shadow-size", "그림자 크기", SHADOW_SIZE_MAX)}
            ${shadowRow("studio-shadow-blur", "그림자 블러", SHADOW_BLUR_MAX)}
            ${shadowRow("studio-shadow-distance", "그림자 거리", SHADOW_DISTANCE_MAX)}
            ${shadowRow("studio-shadow-opacity", "그림자 투명도", 100)}
            <div class="studio__field">
              <label for="studio-shape-blend">블렌딩</label>
              <select id="studio-shape-blend" class="studio__control">${SHAPE_BLENDS.map((blend) => `<option value="${blend}">${BLEND_LABELS[blend]}</option>`).join("")}</select>
            </div>
            <div class="studio__field">
              <span id="studio-layer-blur-label">레이어 블러</span>
              <div class="studio__dual" role="group" aria-labelledby="studio-layer-blur-label">
                <div class="studio__dual-ends">
                  <label>왼쪽 <input id="studio-blur-from-number" class="studio__control studio__control--number" type="number" min="0" max="${LAYER_BLUR_MAX}" step="1" value="0" aria-label="왼쪽 블러 수치" /></label>
                  <label>오른쪽 <input id="studio-blur-to-number" class="studio__control studio__control--number" type="number" min="0" max="${LAYER_BLUR_MAX}" step="1" value="0" aria-label="오른쪽 블러 수치" /></label>
                </div>
                <div class="studio__dual-range">
                  <div class="studio__dual-track"></div>
                  <input id="studio-blur-from" type="range" min="0" max="${LAYER_BLUR_MAX}" step="1" value="0" aria-label="왼쪽 블러" />
                  <input id="studio-blur-to" type="range" min="0" max="${LAYER_BLUR_MAX}" step="1" value="0" aria-label="오른쪽 블러" />
                </div>
              </div>
            </div>
          </div>
          <div id="studio-line-fields" hidden>
            <div class="studio__field">
              <label for="studio-line-width">선 두께</label>
              <div class="studio__radius">
                <input id="studio-line-width" type="range" min="${LINE_WIDTH_MIN}" max="${LINE_WIDTH_MAX}" step="1" value="${LINE_WIDTH_DEFAULT}" />
                ${stepButtons("선 두께")}
                <input id="studio-line-width-number" class="studio__control studio__control--number" type="number" min="${LINE_WIDTH_MIN}" max="${LINE_WIDTH_MAX}" step="1" value="${LINE_WIDTH_DEFAULT}" aria-label="선 두께 수치" />
              </div>
            </div>
            <div class="studio__field">
              <span id="studio-line-cap-label">선 끝</span>
              <div class="studio__text-style" role="group" aria-labelledby="studio-line-cap-label">
                <button type="button" class="studio__style-btn studio__style-btn--wide" data-line-cap="butt" aria-pressed="true">딱딱</button>
                <button type="button" class="studio__style-btn studio__style-btn--wide" data-line-cap="round" aria-pressed="false">뭉뚝</button>
              </div>
            </div>
            <div class="studio__field">
              <span id="studio-line-arrow-label">화살표</span>
              <div class="studio__text-style" role="group" aria-labelledby="studio-line-arrow-label">
                <button type="button" class="studio__style-btn studio__style-btn--wide" data-line-arrow="start" aria-pressed="false">왼쪽</button>
                <button type="button" class="studio__style-btn studio__style-btn--wide" data-line-arrow="end" aria-pressed="false">오른쪽</button>
              </div>
            </div>
            <div class="studio__field">
              <label for="studio-line-color">선 색</label>
              <div class="studio__color">
                <input id="studio-line-color" class="studio__color-picker studio__color-picker--text" type="color" value="${blankInk}" aria-label="선 색 피커" />
                <input id="studio-line-hex" class="studio__control" type="text" value="${blankInk}" spellcheck="false" aria-label="선 색 hex" />
              </div>
            </div>
          </div>
          <div id="studio-pen-fields" hidden>
            <div class="studio__field">
              <label for="studio-pen-width">펜 선 두께</label>
              <div class="studio__radius">
                <input id="studio-pen-width" type="range" min="0" max="${LINE_WIDTH_MAX}" step="1" value="4" />
                ${stepButtons("펜 선 두께")}
                <input id="studio-pen-width-number" class="studio__control studio__control--number" type="number" min="0" max="${LINE_WIDTH_MAX}" step="1" value="4" aria-label="펜 선 두께 수치" />
              </div>
            </div>
            <div class="studio__field">
              <label for="studio-pen-stroke">펜 선 색</label>
              <div class="studio__color">
                <input id="studio-pen-stroke" class="studio__color-picker studio__color-picker--text" type="color" value="${blankInk}" aria-label="펜 선 색 피커" />
                <input id="studio-pen-stroke-hex" class="studio__control" type="text" value="${blankInk}" spellcheck="false" aria-label="펜 선 색 hex" />
              </div>
            </div>
            <div class="studio__field">
              <label for="studio-pen-fill">펜 채우기</label>
              <div class="studio__color">
                <input id="studio-pen-fill-toggle" type="checkbox" aria-label="펜 채우기 사용" />
                <input id="studio-pen-fill" class="studio__color-picker studio__color-picker--text" type="color" value="${blankInk}" aria-label="펜 채우기 색 피커" />
                <input id="studio-pen-fill-hex" class="studio__control" type="text" value="${blankInk}" spellcheck="false" aria-label="펜 채우기 색 hex" />
              </div>
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-size">너비·높이 함께</label>
            <div class="studio__radius">
              <input id="studio-size" type="range" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardWidth}" />
              ${stepButtons("너비·높이 함께")}
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardWidth}" />
              ${stepButtons("카드 너비")}
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardHeight}" />
              ${stepButtons("카드 높이")}
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field" id="studio-font-scale-field" hidden>
            <label for="studio-font-scale">폰트 크기 함께</label>
            <div class="studio__radius">
              <input id="studio-font-scale" type="range" min="5" max="${fontMax}" step="1" value="${Math.max(title.size, body.size)}" />
              ${stepButtons("폰트 크기 함께")}
              <input id="studio-font-scale-number" class="studio__control studio__control--number" type="number" min="5" max="${fontMax}" step="1" value="${Math.max(title.size, body.size)}" aria-label="폰트 크기 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${escapeHtml(title.text)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker studio__color-picker--text" type="color" value="${escapeHtml(title.color)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${escapeHtml(title.color)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
              ${gradientControls("studio-title", "타이틀")}
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${fontMax}" step="1" value="${title.size}" />
              ${stepButtons("타이틀 폰트 크기")}
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${fontMax}" step="1" value="${title.size}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${fontOptions(title.fontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-title-weight">타이틀 굵기</label>
            <select id="studio-title-weight" class="studio__control">${weightOptions(title.weight)}</select>
          </div>
          ${textStyleControls("title", "타이틀", title)}
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${escapeHtml(body.text)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker studio__color-picker--text" type="color" value="${escapeHtml(body.color)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${escapeHtml(body.color)}" spellcheck="false" aria-label="본문 컬러 hex" />
              ${gradientControls("studio-body", "본문")}
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${fontMax}" step="1" value="${body.size}" />
              ${stepButtons("본문 폰트 크기")}
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${fontMax}" step="1" value="${body.size}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${fontOptions(body.fontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body-weight">본문 굵기</label>
            <select id="studio-body-weight" class="studio__control">${weightOptions(body.weight)}</select>
          </div>
          ${textStyleControls("body", "본문", body)}
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮기고, 더블 클릭(탭)해 바로 수정할 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${themes}</div>
            <input type="file" id="studio-theme-file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" multiple hidden />
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${IMAGE_MIN}" max="${IMAGE_MAX}" step="1" value="${image.width}" />
              ${stepButtons("카드 이미지 크기")}
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${IMAGE_MIN}" max="${IMAGE_MAX}" step="1" value="${image.width}" aria-label="카드 이미지 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-image-radius">이미지 radius</label>
            <div class="studio__radius">
              <input id="studio-image-radius" type="range" min="${RADIUS_MIN}" max="${RADIUS_MAX}" step="1" value="${image.radius}" aria-valuemin="${RADIUS_MIN}" aria-valuemax="${RADIUS_MAX}" aria-valuenow="${image.radius}" />
              ${stepButtons("이미지 radius")}
              <input id="studio-image-radius-number" class="studio__control studio__control--number" type="number" min="${RADIUS_MIN}" max="${RADIUS_MAX}" step="1" value="${image.radius}" aria-label="이미지 radius 수치" />
            </div>
          </div>
          <p class="studio__hint">프리뷰에서 이미지를 드래그해 옮기고, 핀치하거나 클릭 후 가장자리 핸들을 끌어 크기를 조절할 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-color">카드 컬러</label>
            <div class="studio__color">
              <input id="studio-color" class="studio__color-picker" type="color" value="${escapeHtml(state.color)}" aria-label="카드 컬러 피커" />
              <input id="studio-hex" class="studio__control" type="text" value="${escapeHtml(state.color)}" spellcheck="false" aria-label="카드 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-radius">카드 radius</label>
            <div class="studio__radius">
              <input id="studio-radius" type="range" min="${RADIUS_MIN}" max="${RADIUS_MAX}" step="1" value="${state.radius}" aria-valuemin="${RADIUS_MIN}" aria-valuemax="${RADIUS_MAX}" aria-valuenow="${state.radius}" />
              ${stepButtons("카드 radius")}
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${RADIUS_MIN}" max="${RADIUS_MAX}" step="1" value="${state.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-set-baseline">초기화로 세팅</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-save-library">그래픽 라이브러리에 추가</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${designSelected ? " hidden" : ""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${escapeHtml(state.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
        </div>
        <div class="studio__scroll-thumb" id="studio-scroll-thumb" hidden></div>
        </div>
      </form>
      </div>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${CONTROLS_MIN}" aria-valuenow="${state.controlsWidth}" tabindex="0"></div>

      <div class="studio__preview">
        <div class="studio__align" id="studio-align" role="toolbar" aria-label="선택한 객체 정렬" hidden>
          ${LAYER_ALIGNS.map(layerAlignButton).join("")}
          <span class="studio__align-divider" aria-hidden="true"></span>
          ${LAYER_DISTRIBUTES.map(layerAlignButton).join("")}
        </div>
        <div class="studio__stage" id="studio-stage">
          <p class="studio__loading" id="studio-loading" role="status" hidden>이미지를 로딩중입니다...</p>
          <div class="studio__stage-frame">
            <div class="studio__fit" id="studio-fit">
              <div class="studio__scaler" id="studio-scaler">
                <canvas id="studio-canvas" aria-label="카드 프리뷰"></canvas>
                <iframe id="studio-iframe" title="카드 코드 프리뷰" sandbox="" referrerpolicy="no-referrer" hidden></iframe>
              </div>
              <div class="studio__overlay" id="studio-overlay">
                <span class="studio__handle" data-handle="top" hidden></span>
                <span class="studio__handle" data-handle="right" hidden></span>
                <span class="studio__handle" data-handle="bottom" hidden></span>
                <span class="studio__handle" data-handle="left" hidden></span>
                <span class="studio__handle" data-handle="nw" hidden></span>
                <span class="studio__handle" data-handle="ne" hidden></span>
                <span class="studio__handle" data-handle="se" hidden></span>
                <span class="studio__handle" data-handle="sw" hidden></span>
                <span class="studio__handle" data-line-end="start" hidden></span>
                <span class="studio__handle" data-line-end="end" hidden></span>
                <div class="studio__pen-handles" id="studio-pen-handles"></div>
                <div class="studio__select-frame studio__crop-frame" id="studio-crop-frame" hidden></div>
                ${["nw", "n", "ne", "e", "se", "s", "sw", "w"].map((edge) => `<span class="studio__handle studio__handle--crop" data-crop="${edge}" hidden></span>`).join("")}
                <textarea class="studio__editor" id="studio-editor" rows="1" spellcheck="false" aria-label="텍스트 편집" hidden></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="studio__bar">
          <p class="studio__meta" id="studio-meta" aria-live="polite"></p>
          <div class="studio__bar-actions">
            <div class="studio__history" role="group" aria-label="편집 기록">
              <button type="button" class="studio__zoom-btn" id="studio-undo" aria-label="이전 동작" disabled>${undoIcon}</button>
              <button type="button" class="studio__zoom-btn" id="studio-redo" aria-label="원래대로" disabled>${redoIcon}</button>
            </div>
            <div class="studio__zoom" role="group" aria-label="프리뷰 확대">
              <button type="button" class="studio__zoom-btn" id="studio-zoom-out" aria-label="축소">−</button>
              <span class="studio__zoom-label" id="studio-zoom-label">100%</span>
              <button type="button" class="studio__zoom-btn" id="studio-zoom-in" aria-label="확대">+</button>
              <button type="button" class="studio__zoom-btn studio__zoom-btn--text" id="studio-zoom-fit" aria-label="프리뷰에 맞춤">Fit</button>
            </div>
            <button type="button" class="button" id="studio-download">PNG 다운로드</button>
          </div>
        </div>
      </div>
    </section>
    </div>
    <div class="studio__scroll-thumb studio-device__thumb" id="studio-device-thumb" hidden></div>
    </div>
    </div>
  `;
}

export function bindStudio(
  root: HTMLElement,
  state: StudioState,
  captures: CaptureRecord[],
  actions: {
    onReset: () => void;
    onSetBaseline: () => void;
    /** Loads the preset's saved baseline and re-renders. False when it has none. */
    onLoadPreset: (presetId: string) => boolean;
    onAddToLibrary: (thumbnail: string) => Promise<boolean>;
  },
): void {
  if (captures.length === 0) return;
  const presetButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-preset-id]")];
  const sizeRange = root.querySelector<HTMLInputElement>("#studio-size");
  const sizeNumber = root.querySelector<HTMLInputElement>("#studio-size-number");
  const widthRange = root.querySelector<HTMLInputElement>("#studio-width");
  const widthNumber = root.querySelector<HTMLInputElement>("#studio-width-number");
  const heightRange = root.querySelector<HTMLInputElement>("#studio-height");
  const heightNumber = root.querySelector<HTMLInputElement>("#studio-height-number");
  const titleInput = root.querySelector<HTMLInputElement>("#studio-title");
  const titleColorInput = root.querySelector<HTMLInputElement>("#studio-title-color");
  const titleHexInput = root.querySelector<HTMLInputElement>("#studio-title-hex");
  const fontScaleField = root.querySelector<HTMLElement>("#studio-font-scale-field");
  const fontScaleRange = root.querySelector<HTMLInputElement>("#studio-font-scale");
  const fontScaleNumber = root.querySelector<HTMLInputElement>("#studio-font-scale-number");
  const titleSizeRange = root.querySelector<HTMLInputElement>("#studio-title-size");
  const titleSizeNumber = root.querySelector<HTMLInputElement>("#studio-title-size-number");
  const bodyInput = root.querySelector<HTMLTextAreaElement>("#studio-body");
  const bodyColorInput = root.querySelector<HTMLInputElement>("#studio-body-color");
  const bodyHexInput = root.querySelector<HTMLInputElement>("#studio-body-hex");
  const bodySizeRange = root.querySelector<HTMLInputElement>("#studio-body-size");
  const bodySizeNumber = root.querySelector<HTMLInputElement>("#studio-body-size-number");
  const titleFontSelect = root.querySelector<HTMLSelectElement>("#studio-title-font");
  const bodyFontSelect = root.querySelector<HTMLSelectElement>("#studio-body-font");
  const titleWeightSelect = root.querySelector<HTMLSelectElement>("#studio-title-weight");
  const bodyWeightSelect = root.querySelector<HTMLSelectElement>("#studio-body-weight");
  const imageRange = root.querySelector<HTMLInputElement>("#studio-image-width");
  const imageNumber = root.querySelector<HTMLInputElement>("#studio-image-width-number");
  const imageRadiusRange = root.querySelector<HTMLInputElement>("#studio-image-radius");
  const imageRadiusNumber = root.querySelector<HTMLInputElement>("#studio-image-radius-number");
  const shapeSizeField = root.querySelector<HTMLElement>("#studio-shape-size-field");
  const shapeSizeRange = root.querySelector<HTMLInputElement>("#studio-shape-size");
  const shapeSizeNumber = root.querySelector<HTMLInputElement>("#studio-shape-size-number");
  const shapeRadiusField = root.querySelector<HTMLElement>("#studio-shape-radius-field");
  const shapeRadiusRange = root.querySelector<HTMLInputElement>("#studio-shape-radius");
  const shapeRadiusNumber = root.querySelector<HTMLInputElement>("#studio-shape-radius-number");
  const shapeColorField = root.querySelector<HTMLElement>("#studio-shape-color-field");
  const shapeColorInput = root.querySelector<HTMLInputElement>("#studio-shape-color");
  const shapeHexInput = root.querySelector<HTMLInputElement>("#studio-shape-hex");
  const shapeEffects = root.querySelector<HTMLElement>("#studio-shape-effects");
  const shapeStrokeFields = root.querySelector<HTMLElement>("#studio-shape-stroke");
  const shadowSizeRange = root.querySelector<HTMLInputElement>("#studio-shadow-size");
  const shadowSizeNumber = root.querySelector<HTMLInputElement>("#studio-shadow-size-number");
  const shadowBlurRange = root.querySelector<HTMLInputElement>("#studio-shadow-blur");
  const shadowBlurNumber = root.querySelector<HTMLInputElement>("#studio-shadow-blur-number");
  const shadowDistanceRange = root.querySelector<HTMLInputElement>("#studio-shadow-distance");
  const shadowDistanceNumber = root.querySelector<HTMLInputElement>("#studio-shadow-distance-number");
  const shadowOpacityRange = root.querySelector<HTMLInputElement>("#studio-shadow-opacity");
  const shadowOpacityNumber = root.querySelector<HTMLInputElement>("#studio-shadow-opacity-number");
  const strokeWidthRange = root.querySelector<HTMLInputElement>("#studio-stroke-width");
  const strokeWidthNumber = root.querySelector<HTMLInputElement>("#studio-stroke-width-number");
  const strokeOpacityRange = root.querySelector<HTMLInputElement>("#studio-stroke-opacity");
  const strokeOpacityNumber = root.querySelector<HTMLInputElement>("#studio-stroke-opacity-number");
  const strokeColorInput = root.querySelector<HTMLInputElement>("#studio-stroke-color");
  const strokeHexInput = root.querySelector<HTMLInputElement>("#studio-stroke-hex");
  const shapeBlendSelect = root.querySelector<HTMLSelectElement>("#studio-shape-blend");
  const blurFromRange = root.querySelector<HTMLInputElement>("#studio-blur-from");
  const blurFromNumber = root.querySelector<HTMLInputElement>("#studio-blur-from-number");
  const blurToRange = root.querySelector<HTMLInputElement>("#studio-blur-to");
  const blurToNumber = root.querySelector<HTMLInputElement>("#studio-blur-to-number");
  const lineFields = root.querySelector<HTMLElement>("#studio-line-fields");
  const lineWidthRange = root.querySelector<HTMLInputElement>("#studio-line-width");
  const lineWidthNumber = root.querySelector<HTMLInputElement>("#studio-line-width-number");
  const lineColorInput = root.querySelector<HTMLInputElement>("#studio-line-color");
  const lineHexInput = root.querySelector<HTMLInputElement>("#studio-line-hex");
  const penFields = root.querySelector<HTMLElement>("#studio-pen-fields");
  const penWidthRange = root.querySelector<HTMLInputElement>("#studio-pen-width");
  const penWidthNumber = root.querySelector<HTMLInputElement>("#studio-pen-width-number");
  const penStrokeInput = root.querySelector<HTMLInputElement>("#studio-pen-stroke");
  const penStrokeHexInput = root.querySelector<HTMLInputElement>("#studio-pen-stroke-hex");
  const penFillToggle = root.querySelector<HTMLInputElement>("#studio-pen-fill-toggle");
  const penFillInput = root.querySelector<HTMLInputElement>("#studio-pen-fill");
  const penFillHexInput = root.querySelector<HTMLInputElement>("#studio-pen-fill-hex");
  const penButton = root.querySelector<HTMLButtonElement>('[data-draw="pen"]');
  const selectButton = root.querySelector<HTMLButtonElement>('[data-draw="select"]');
  const lineEnds = [...root.querySelectorAll<HTMLElement>("[data-line-end]")];
  const penHandleHost = root.querySelector<HTMLElement>("#studio-pen-handles");
  const colorInput = root.querySelector<HTMLInputElement>("#studio-color");
  const hexInput = root.querySelector<HTMLInputElement>("#studio-hex");
  const radiusRange = root.querySelector<HTMLInputElement>("#studio-radius");
  const radiusNumber = root.querySelector<HTMLInputElement>("#studio-radius-number");
  const codeInput = root.querySelector<HTMLTextAreaElement>("#studio-code");
  const canvas = root.querySelector<HTMLCanvasElement>("#studio-canvas");
  const iframe = root.querySelector<HTMLIFrameElement>("#studio-iframe");
  const meta = root.querySelector<HTMLElement>("#studio-meta");
  const scaler = root.querySelector<HTMLElement>("#studio-scaler");
  const fit = root.querySelector<HTMLElement>("#studio-fit");
  const stage = root.querySelector<HTMLElement>("#studio-stage");
  const imageLoading = root.querySelector<HTMLElement>("#studio-loading");
  const alignBar = root.querySelector<HTMLElement>("#studio-align");
  const zoomOut = root.querySelector<HTMLButtonElement>("#studio-zoom-out");
  const zoomIn = root.querySelector<HTMLButtonElement>("#studio-zoom-in");
  const zoomLabel = root.querySelector<HTMLElement>("#studio-zoom-label");
  const undoButton = root.querySelector<HTMLButtonElement>("#studio-undo");
  const redoButton = root.querySelector<HTMLButtonElement>("#studio-redo");
  const scrollThumb = root.querySelector<HTMLElement>("#studio-scroll-thumb");
  const controlsWrap = root.querySelector<HTMLElement>(".studio__controls-wrap");
  const exportCode = root.querySelector<HTMLElement>("#studio-export");
  const splitter = root.querySelector<HTMLElement>("#studio-splitter");
  const studio = root.querySelector<HTMLElement>(".studio");
  const overlay = root.querySelector<HTMLElement>("#studio-overlay");
  const cropFrame = root.querySelector<HTMLElement>("#studio-crop-frame");
  const editor = root.querySelector<HTMLTextAreaElement>("#studio-editor");
  const handles = [...root.querySelectorAll<HTMLElement>(".studio__handle[data-handle]")];
  const cropHandles = [...root.querySelectorAll<HTMLElement>(".studio__handle[data-crop]")];
  if (
    !overlay ||
    !cropFrame ||
    !editor ||
    !sizeRange ||
    !sizeNumber ||
    !widthRange ||
    !widthNumber ||
    !heightRange ||
    !heightNumber ||
    !titleInput ||
    !titleColorInput ||
    !titleHexInput ||
    !fontScaleField ||
    !fontScaleRange ||
    !fontScaleNumber ||
    !titleSizeRange ||
    !titleSizeNumber ||
    !bodyInput ||
    !bodyColorInput ||
    !bodyHexInput ||
    !bodySizeRange ||
    !bodySizeNumber ||
    !titleFontSelect ||
    !bodyFontSelect ||
    !titleWeightSelect ||
    !bodyWeightSelect ||
    !imageRange ||
    !imageNumber ||
    !imageRadiusRange ||
    !imageRadiusNumber ||
    !shapeSizeField ||
    !shapeSizeRange ||
    !shapeSizeNumber ||
    !shapeRadiusField ||
    !shapeRadiusRange ||
    !shapeRadiusNumber ||
    !shapeColorField ||
    !shapeColorInput ||
    !shapeHexInput ||
    !shapeEffects ||
    !shapeStrokeFields ||
    !shadowSizeRange ||
    !shadowSizeNumber ||
    !shadowBlurRange ||
    !shadowBlurNumber ||
    !shadowDistanceRange ||
    !shadowDistanceNumber ||
    !shadowOpacityRange ||
    !shadowOpacityNumber ||
    !strokeWidthRange ||
    !strokeWidthNumber ||
    !strokeOpacityRange ||
    !strokeOpacityNumber ||
    !strokeColorInput ||
    !strokeHexInput ||
    !shapeBlendSelect ||
    !blurFromRange ||
    !blurFromNumber ||
    !blurToRange ||
    !blurToNumber ||
    !lineFields ||
    !lineWidthRange ||
    !lineWidthNumber ||
    !lineColorInput ||
    !lineHexInput ||
    !penFields ||
    !penWidthRange ||
    !penWidthNumber ||
    !penStrokeInput ||
    !penStrokeHexInput ||
    !penFillToggle ||
    !penFillInput ||
    !penFillHexInput ||
    !penButton ||
    !selectButton ||
    !penHandleHost ||
    !colorInput ||
    !hexInput ||
    !radiusRange ||
    !radiusNumber ||
    !codeInput ||
    !canvas ||
    !iframe ||
    !meta ||
    !scaler ||
    !fit ||
    !stage ||
    !imageLoading ||
    !zoomOut ||
    !zoomIn ||
    !zoomLabel ||
    !undoButton ||
    !redoButton ||
    !scrollThumb ||
    !controlsWrap ||
    !exportCode ||
    !splitter ||
    !studio ||
    !root.querySelector("#studio-set-baseline") ||
    !root.querySelector("#studio-save-library")
  ) {
    return;
  }

  let dropper = false;
  let blockPresetClick = false;
  let penMode = false;
  let penEdit: { id: string; snapshot: PenAnchor[] | null; box: { x: number; y: number; width: number; height: number } | null; active: number | null } | null = null;
  let penDraft: { points: PenAnchor[]; hover: { x: number; y: number } | null; pointerId: number | null; dragging: number | null; closing: boolean } | null = null;
  const setDropper = (on: boolean) => {
    dropper = on;
    if (on) studio.dataset.dropper = "true";
    else delete studio.dataset.dropper;
  };

  /** Uploads come from this browser; a source that is gone falls back to the theme. */
  const srcUrl = (src: string): string => {
    const upload = uploadBySrc(src);
    if (upload) return upload.url;
    const capture =
      captures.find((item) => item.slug === src) ?? captures.find((item) => item.slug === state.themeSlug) ?? captures[0];
    return capture ? assetUrl(capture.asset.path) : "";
  };
  const imageOf = (layer: ImageLayer): HTMLImageElement | null => {
    const image = imageCache.get(srcUrl(layer.src));
    return image?.complete && image.naturalWidth > 0 ? image : null;
  };
  const aspectOf = (layer: ImageLayer): number => {
    const image = imageOf(layer);
    return image ? image.naturalHeight / image.naturalWidth : 1;
  };
  const codeDocument = async (): Promise<StudioDocumentInput> => {
    const dataOf = (src: string) => {
      const url = srcUrl(src);
      return url ? themeDataUrl(url).catch(() => "") : Promise.resolve("");
    };
    const others = [...new Set(state.layers.flatMap((layer) => (layer.kind === "image" && layer.src !== state.themeSlug ? [layer.src] : [])))];
    const [themeData, ...otherData] = await Promise.all([dataOf(state.themeSlug), ...others.map(dataOf)]);
    const images = Object.fromEntries(others.map((src, index) => [src, otherData[index] ?? ""]));
    return documentInput(state, themeData ?? "", images, aspectOf);
  };

  let drawToken = 0;
  let viewScale = 1;
  const selected = new Set<string>();
  let editing: { id: string; original: string } | null = null;
  let cropping: { id: string; full: StudioRect; box: StudioRect } | null = null;
  let paint = () => {};
  let syncOverlay = () => {};

  const layerById = (id: string) => state.layers.find((layer) => layer.id === id);
  const selectedLayers = () => state.layers.filter((layer) => selected.has(layer.id));
  /** The panel edits the topmost selected layer of a kind, or the first layer of that kind. */
  const panelText = (kind: TextKind): TextLayer => {
    for (let index = state.layers.length - 1; index >= 0; index -= 1) {
      const layer = state.layers[index];
      if (layer && layer.kind === kind && selected.has(layer.id)) return layer;
    }
    return ensureLayer(state, kind);
  };
  const panelImage = (): ImageLayer => {
    for (let index = state.layers.length - 1; index >= 0; index -= 1) {
      const layer = state.layers[index];
      if (layer && layer.kind === "image" && selected.has(layer.id)) return layer;
    }
    return ensureLayer(state, "image");
  };
  const topSelected = <T extends StudioLayer>(kind: T["kind"]): T | null => {
    for (let index = state.layers.length - 1; index >= 0; index -= 1) {
      const layer = state.layers[index];
      if (layer && layer.kind === kind && selected.has(layer.id)) return layer as T;
    }
    return null;
  };
  const panelShape = () => topSelected<ShapeLayer>("shape");
  const panelLine = () => topSelected<LineLayer>("line");
  const panelPen = () => topSelected<PenLayer>("pen");
  const imageLayers = () => state.layers.filter((layer): layer is ImageLayer => layer.kind === "image");
  const imageReady = (url: string) => {
    const image = imageCache.get(url);
    return Boolean(image?.complete && image.naturalWidth > 0);
  };
  const setImageLoading = (on: boolean) => {
    imageLoading.hidden = !on;
    if (on) stage.dataset.loading = "true";
    else delete stage.dataset.loading;
  };
  const hasImage = () => imageLayers().some((layer) => imageOf(layer));

  const syncZoom = () => {
    if (!Number.isFinite(previewZoom) || previewZoom <= 0) previewZoom = 1;
    zoomOut.disabled = previewZoom <= ZOOM_MIN + 0.001;
    zoomIn.disabled = previewZoom >= ZOOM_MAX - 0.001;
    zoomLabel.textContent = `${Math.round(previewZoom * 100)}%`;
  };

  const fitScaleFor = (cardWidth: number, cardHeight: number) => {
    const bounds = stage.getBoundingClientRect();
    const pad = 20;
    const fitScale = Math.min(
      Math.max(bounds.width - pad, 1) / cardWidth,
      Math.max(bounds.height - pad, 1) / cardHeight,
    );
    return Number.isFinite(fitScale) && fitScale > 0 ? fitScale : 1;
  };

  const updateScale = () => {
    const base = fitScaleFor(state.cardWidth, state.cardHeight);
    syncZoom();
    const safeScale = base * previewZoom;
    fit.style.width = `${state.cardWidth * safeScale}px`;
    fit.style.height = `${state.cardHeight * safeScale}px`;
    scaler.style.width = `${state.cardWidth}px`;
    scaler.style.height = `${state.cardHeight}px`;
    scaler.style.transform = `scale(${safeScale})`;
    viewScale = safeScale;
    syncOverlay();
  };

  zoomOut.addEventListener("click", () => {
    previewZoom = Math.max(ZOOM_MIN, previewZoom - ZOOM_STEP);
    updateScale();
  });
  zoomIn.addEventListener("click", () => {
    previewZoom = Math.min(ZOOM_MAX, previewZoom + ZOOM_STEP);
    updateScale();
  });
  root.querySelector("#studio-zoom-fit")?.addEventListener("click", () => {
    previewZoom = 1;
    updateScale();
    stage.scrollTo(0, 0);
  });

  const panelScroll = root.querySelector<HTMLElement>("#studio-panel-scroll");
  const placeScroll = panelScroll && scrollThumb && controlsWrap
    ? overlayScrollbar(panelScroll, scrollThumb, controlsWrap)
    : () => {};
  const fitCodeInput = () => {
    codeInput.style.height = "auto";
    codeInput.style.height = `${Math.max(180, codeInput.scrollHeight)}px`;
    placeScroll();
  };

  const syncHistoryButtons = () => {
    const undo = document.querySelector<HTMLButtonElement>("#studio-undo");
    const redo = document.querySelector<HTMLButtonElement>("#studio-redo");
    if (undo) undo.disabled = undoStack.length === 0;
    if (redo) redo.disabled = redoStack.length === 0;
  };
  let gestureOwner: EventTarget | null = null;
  /** Sizes at the start of one 폰트 크기 함께 gesture, so each step uses the same ratio. */
  let fontBase: { id: string; size: number }[] | null = null;
  const finishGesture = (owner?: EventTarget) => {
    if (owner && gestureOwner !== owner) return;
    fontBase = null;
    if (!gesture) {
      gestureOwner = null;
      return;
    }
    const before = gesture;
    const beforeZoom = gestureZoom;
    gesture = null;
    gestureOwner = null;
    if (sameStudio(before, state) && beforeZoom === previewZoom) return;
    undoStack.push(before);
    undoZoom.push(beforeZoom);
    if (undoStack.length > HISTORY_LIMIT) {
      undoStack.shift();
      undoZoom.shift();
    }
    redoStack = [];
    redoZoom = [];
    syncHistoryButtons();
  };
  const beginGesture = (owner?: EventTarget) => {
    if (owner && gestureOwner === owner && gesture) return;
    finishGesture();
    gesture = cloneStudio(state);
    gestureZoom = previewZoom;
    gestureOwner = owner ?? null;
  };
  /** One undo step around a change that re-renders the studio (초기화, loading a preset's baseline). */
  const recordChange = (change: () => boolean): boolean => {
    finishGesture();
    const before = cloneStudio(state);
    const beforeZoom = previewZoom;
    if (!change()) return false;
    if (!sameStudio(before, state) || beforeZoom !== previewZoom) {
      undoStack.push(before);
      undoZoom.push(beforeZoom);
      if (undoStack.length > HISTORY_LIMIT) {
        undoStack.shift();
        undoZoom.shift();
      }
      redoStack = [];
      redoZoom = [];
    }
    syncHistoryButtons();
    return true;
  };
  const paintRangeFill = (range: HTMLInputElement) => {
    const min = Number(range.min);
    const max = Number(range.max);
    const value = Number(range.value);
    const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
    range.style.setProperty("--range-fill", `${Math.min(100, Math.max(0, pct))}%`);
  };
  let sizeRatio = state.cardHeight / Math.max(1, state.cardWidth);
  const imageSnapshot = () => new Map(imageLayers().map((layer) => [layer.id, { width: layer.width, x: layer.x, y: layer.y }]));
  let sizeBase = { cardWidth: state.cardWidth, images: imageSnapshot() };
  const captureSizeRatio = () => {
    sizeRatio = state.cardHeight / Math.max(1, state.cardWidth);
    sizeBase = { cardWidth: state.cardWidth, images: imageSnapshot() };
  };

  let hits: HitBox[] = [];

  const layerHeight = (layer: ImageLayer) => imageLayerHeight(layer, aspectOf(layer));

  const clampLayout = () => {
    state.cardWidth = clampCardSize(state.cardWidth);
    state.cardHeight = clampCardSize(state.cardHeight);
    for (const layer of imageLayers()) {
      layer.width = clampImageWidth(layer.width);
      layer.radius = clampRadius(layer.radius);
    }
  };

  const writeControl = (range: HTMLInputElement, number: HTMLInputElement, value: number) => {
    range.value = String(value);
    if (document.activeElement !== number) number.value = String(value);
  };

  const syncSizeControls = () => {
    const title = panelText("title");
    const body = panelText("body");
    const fontCap = maxFontSize(state.cardWidth);
    const titleMax = String(Math.max(fontCap, title.size));
    const bodyMax = String(Math.max(fontCap, body.size));
    for (const input of [titleSizeRange, titleSizeNumber]) {
      input.min = "5";
      input.max = titleMax;
    }
    for (const input of [bodySizeRange, bodySizeNumber]) {
      input.min = "5";
      input.max = bodyMax;
    }
    writeControl(sizeRange, sizeNumber, state.cardWidth);
    writeControl(widthRange, widthNumber, state.cardWidth);
    writeControl(heightRange, heightNumber, state.cardHeight);
    writeControl(titleSizeRange, titleSizeNumber, title.size);
    writeControl(bodySizeRange, bodySizeNumber, body.size);
    const selectedSizes = selectedLayers().filter(isTextLayer).map((layer) => layer.size);
    const fontScale = selectedSizes.length > 0 ? Math.max(...selectedSizes) : FONT_MIN;
    const fontScaleMax = String(Math.max(fontCap, fontScale));
    fontScaleRange.min = String(FONT_MIN);
    fontScaleNumber.min = String(FONT_MIN);
    fontScaleRange.max = fontScaleMax;
    fontScaleNumber.max = fontScaleMax;
    writeControl(fontScaleRange, fontScaleNumber, fontScale);
    writeControl(imageRange, imageNumber, panelImage().width);
    writeControl(imageRadiusRange, imageRadiusNumber, panelImage().radius);
    const shape = panelShape();
    if (shape) {
      const shadow = shapeShadow(shape);
      writeControl(shapeSizeRange, shapeSizeNumber, Math.round(Math.max(shape.width, shape.height)));
      writeControl(shapeRadiusRange, shapeRadiusNumber, shape.radius);
      const stroke = shapeStroke(shape);
      writeControl(shadowSizeRange, shadowSizeNumber, shadow.size);
      writeControl(shadowBlurRange, shadowBlurNumber, shadow.blur);
      writeControl(shadowDistanceRange, shadowDistanceNumber, shadow.distance);
      writeControl(shadowOpacityRange, shadowOpacityNumber, shadow.opacity);
      writeControl(strokeWidthRange, strokeWidthNumber, stroke.width);
      writeControl(strokeOpacityRange, strokeOpacityNumber, stroke.opacity);
      writeControl(blurFromRange, blurFromNumber, clampUnit(shape.blurFrom ?? 0, LAYER_BLUR_MAX));
      writeControl(blurToRange, blurToNumber, clampUnit(shape.blurTo ?? 0, LAYER_BLUR_MAX));
    }
    const line = panelLine();
    if (line) writeControl(lineWidthRange, lineWidthNumber, line.stroke);
    const pen = panelPen();
    if (pen) writeControl(penWidthRange, penWidthNumber, pen.strokeWidth);
    imageRadiusRange.setAttribute("aria-valuenow", String(panelImage().radius));
  };

  const syncRadiusControls = () => {
    radiusRange.value = String(state.radius);
    radiusRange.setAttribute("aria-valuenow", String(state.radius));
    radiusNumber.value = String(state.radius);
    root.style.setProperty("--studio-card-radius", `${state.radius}px`);
  };

  const markTheme = (src: string, focus = false) => {
    for (const button of root.querySelectorAll<HTMLButtonElement>("[data-theme-slug]")) {
      const selected = button.dataset.themeSlug === src;
      button.setAttribute("aria-checked", selected ? "true" : "false");
      button.tabIndex = selected ? 0 : -1;
      if (selected && focus) button.focus();
    }
  };
  /** A theme goes on the selected images, or on the bottom image when none is selected. */
  const selectTheme = (src: string, focus: boolean) => {
    const picked = selectedLayers().filter((layer): layer is ImageLayer => layer.kind === "image");
    for (const layer of picked.length > 0 ? picked : [ensureLayer(state, "image")]) layer.src = src;
    const bottom = ensureLayer(state, "image");
    if (!isUploadSrc(bottom.src)) state.themeSlug = bottom.src;
    markTheme(src, focus);
    void redraw();
  };

  const showPanel = (panel: StudioState["panel"]) => {
    if (panel !== "design") {
      setDropper(false);
      if (penEdit) commitPenEdit();
      penMode = false;
      penDraft = null;
      delete canvas.dataset.pen;
    }
    state.panel = panel;
    const design = panel === "design";
    root.querySelector("#studio-panel-design")?.toggleAttribute("hidden", !design);
    root.querySelector("#studio-panel-code")?.toggleAttribute("hidden", design);
    const designTab = root.querySelector<HTMLButtonElement>("#studio-tab-design");
    const codeTab = root.querySelector<HTMLButtonElement>("#studio-tab-code");
    designTab?.setAttribute("aria-selected", design ? "true" : "false");
    codeTab?.setAttribute("aria-selected", design ? "false" : "true");
    if (designTab) designTab.tabIndex = design ? 0 : -1;
    if (codeTab) codeTab.tabIndex = design ? -1 : 0;
    void redraw();
  };

  const syncGradient = (prefix: string, color: string, gradient: LinearGradient | null) => {
    const toggle = root.querySelector<HTMLButtonElement>(`#${prefix}-gradient-toggle`);
    const panel = root.querySelector<HTMLElement>(`#${prefix}-gradient`);
    const endColor = root.querySelector<HTMLInputElement>(`#${prefix}-end`);
    const endHex = root.querySelector<HTMLInputElement>(`#${prefix}-end-hex`);
    const angleRange = root.querySelector<HTMLInputElement>(`#${prefix}-angle`);
    const angleNumber = root.querySelector<HTMLInputElement>(`#${prefix}-angle-number`);
    if (!toggle || !panel || !endColor || !endHex || !angleRange || !angleNumber) return;
    toggle.setAttribute("aria-pressed", gradient ? "true" : "false");
    panel.hidden = !gradient;
    if (!gradient) return;
    if (document.activeElement !== endHex) {
      endColor.value = gradient.to;
      endHex.value = gradient.to;
    }
    writeControl(angleRange, angleNumber, gradient.angle);
    if (document.activeElement !== root.querySelector(`#${prefix}-hex`)) {
      const picker = root.querySelector<HTMLInputElement>(`#${prefix}-color`);
      const hex = root.querySelector<HTMLInputElement>(`#${prefix}-hex`);
      if (picker && hex && prefix !== "studio-shape") {
        picker.value = color;
        hex.value = color;
      }
    }
  };

  const syncForm = () => {
    const title = panelText("title");
    const body = panelText("body");
    for (const button of presetButtons) {
      const selected = button.dataset.presetId === state.presetId;
      button.setAttribute("aria-checked", selected ? "true" : "false");
      button.tabIndex = selected ? 0 : -1;
    }
    fontScaleField.hidden = selectedLayers().filter(isTextLayer).length < 2;
    if (document.activeElement !== titleInput) titleInput.value = title.text;
    if (document.activeElement !== bodyInput) bodyInput.value = body.text;
    if (document.activeElement !== titleHexInput) {
      titleColorInput.value = title.color;
      titleHexInput.value = title.color;
    }
    if (document.activeElement !== bodyHexInput) {
      bodyColorInput.value = body.color;
      bodyHexInput.value = body.color;
    }
    if (document.activeElement !== hexInput) {
      colorInput.value = state.color;
      hexInput.value = state.color;
    }
    titleFontSelect.value = title.fontId;
    bodyFontSelect.value = body.fontId;
    titleWeightSelect.value = String(title.weight);
    bodyWeightSelect.value = String(body.weight);
    for (const button of root.querySelectorAll<HTMLButtonElement>("[data-text-kind]")) {
      const layer = button.dataset.textKind === "title" ? title : body;
      const style = button.dataset.textStyle as TextToggle | undefined;
      const on = style ? styleOn(layer, style) : layer.align === button.dataset.textAlign;
      button.setAttribute("aria-pressed", on ? "true" : "false");
    }
    const shape = panelShape();
    const line = panelLine();
    const pen = panelPen();
    shapeSizeField.hidden = !shape;
    shapeRadiusField.hidden = !shape || shape.shape === "ellipse" || Boolean(shape.nodes && shape.nodes.length >= 2);
    shapeColorField.hidden = !shape;
    shapeStrokeFields.hidden = !shape;
    shapeEffects.hidden = !shape;
    lineFields.hidden = !line;
    penFields.hidden = !pen;
    penButton.setAttribute("aria-pressed", penMode ? "true" : "false");
    selectButton.setAttribute("aria-pressed", penMode ? "false" : "true");
    if (shape && document.activeElement !== shapeHexInput) {
      shapeColorInput.value = shape.color;
      shapeHexInput.value = shape.color;
      shapeBlendSelect.value = shapeBlend(shape);
    }
    syncGradient("studio-title", title.color, title.gradient ?? null);
    syncGradient("studio-body", body.color, body.gradient ?? null);
    syncGradient("studio-shape", shape?.color ?? rgbToHex(0, 0, 0), shape?.gradient ?? null);
    const stroke = shape ? shapeStroke(shape) : null;
    if (stroke && document.activeElement !== strokeHexInput) {
      strokeColorInput.value = stroke.color;
      strokeHexInput.value = stroke.color;
    }
    syncGradient("studio-stroke", stroke?.color ?? rgbToHex(0, 0, 0), stroke?.gradient ?? null);
    if (line && document.activeElement !== lineHexInput) {
      lineColorInput.value = line.color;
      lineHexInput.value = line.color;
      for (const button of root.querySelectorAll<HTMLButtonElement>("[data-line-cap]")) {
        button.setAttribute("aria-pressed", button.dataset.lineCap === line.cap ? "true" : "false");
      }
      for (const button of root.querySelectorAll<HTMLButtonElement>("[data-line-arrow]")) {
        const on = button.dataset.lineArrow === "start" ? line.start : line.end;
        button.setAttribute("aria-pressed", on ? "true" : "false");
      }
    }
    if (pen) {
      const stroke = pen.stroke || rgbToHex(0, 0, 0);
      if (document.activeElement !== penStrokeHexInput) {
        penStrokeInput.value = stroke;
        penStrokeHexInput.value = stroke;
      }
      penFillToggle.checked = Boolean(pen.fill);
      penFillInput.disabled = !pen.fill;
      penFillHexInput.disabled = !pen.fill;
      if (pen.fill && document.activeElement !== penFillHexInput) {
        penFillInput.value = pen.fill;
        penFillHexInput.value = pen.fill;
      }
    }
    if (document.activeElement !== codeInput) codeInput.value = state.code;
    markTheme(panelImage().src);
  };

  const redraw = async (): Promise<void> => {
    const token = ++drawToken;
    clampLayout();
    syncForm();
    syncSizeControls();
    root.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach(paintRangeFill);
    const preset = presetById(state.presetId);
    meta.textContent = `${state.cardWidth} × ${state.cardHeight} · ${preset.name}`;
    exportCode.textContent = designToCode(state, aspectOf, extraFonts());
    fitCodeInput();
    syncRadiusControls();
    updateScale();

    const loadFace = (layer: TextLayer) => {
      const family = fontStack(layer.fontId, extraFonts()).split(",")[0]?.replaceAll('"', "").trim();
      if (!family) return Promise.resolve();
      return document.fonts.load(`${layer.italic ? "italic " : ""}${layer.weight} ${layer.size}px "${family}"`);
    };
    try {
      await Promise.all(state.layers.filter(isTextLayer).map(loadFace));
    } catch {
      /* the canvas stack falls through to the next family */
    }
    if (token !== drawToken) return;

    if (state.code.trim()) {
      setImageLoading(false);
      canvas.hidden = true;
      iframe.hidden = false;
      const input = await codeDocument();
      if (token !== drawToken) return;
      iframe.srcdoc = studioSrcdoc(input);
      syncOverlay();
      return;
    }

    iframe.hidden = true;
    canvas.hidden = false;
    const urls = [...new Set(imageLayers().map((layer) => srcUrl(layer.src)).filter(Boolean))];
    setImageLoading(urls.some((url) => !imageReady(url)));
    await Promise.all(urls.map((url) => loadImage(url).catch(() => null)));
    if (token !== drawToken) return;
    clampLayout();
    exportCode.textContent = designToCode(state, aspectOf, extraFonts());
    paint();
    setImageLoading(false);
  };

  /** Shift+click steps by STEP_SHIFT. Each click is one undo step. */
  const bindSteps = (range: HTMLInputElement, apply: (value: number) => void, read: () => number, before?: () => void) => {
    for (const button of range.parentElement?.querySelectorAll<HTMLButtonElement>("[data-step]") ?? []) {
      button.addEventListener("click", (event) => {
        before?.();
        const delta = Number(button.dataset.step) * (event.shiftKey ? STEP_SHIFT : STEP);
        beginGesture(button);
        apply(Math.min(Number(range.max), Math.max(Number(range.min), read() + delta)));
        clampLayout();
        finishGesture(button);
        void redraw();
      });
    }
  };
  const bindPair = (
    range: HTMLInputElement,
    number: HTMLInputElement,
    apply: (value: number) => void,
    read: () => number,
    before?: () => void,
  ) => {
    bindSteps(range, apply, read, before);
    range.addEventListener("pointerdown", () => beginGesture(range));
    range.addEventListener("keydown", () => beginGesture(range));
    range.addEventListener("pointerup", () => finishGesture(range));
    range.addEventListener("pointercancel", () => finishGesture(range));
    range.addEventListener("keyup", () => finishGesture(range));
    range.addEventListener("input", () => {
      apply(Number(range.value));
      void redraw();
    });
    const commitNumber = () => {
      clampLayout();
      number.value = String(read());
      finishGesture(number);
    };
    number.addEventListener("focus", () => beginGesture(number));
    number.addEventListener("input", () => {
      if (number.value.trim() === "") return;
      apply(Number(number.value));
      void redraw();
    });
    number.addEventListener("change", commitNumber);
    number.addEventListener("blur", commitNumber);
  };

  const pickPreset = (button: HTMLButtonElement) => {
    const preset = presetById(button.dataset.presetId ?? "");
    if (recordChange(() => actions.onLoadPreset(preset.id))) {
      document.querySelector<HTMLButtonElement>(`[data-preset-id="${preset.id}"]`)?.focus();
      return;
    }
    beginGesture(button);
    state.presetId = preset.id;
    state.cardWidth = preset.width;
    state.cardHeight = preset.height;
    finishGesture(button);
    void redraw();
  };
  for (const button of presetButtons) {
    button.addEventListener("click", () => pickPreset(button));
    button.addEventListener("keydown", (event) => {
      const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
      if (!delta) return;
      event.preventDefault();
      const next = presetButtons[(presetButtons.indexOf(button) + delta + presetButtons.length) % presetButtons.length];
      if (!next) return;
      pickPreset(next);
      if (next.isConnected) next.focus();
    });
  }
  sizeRange.addEventListener("pointerdown", captureSizeRatio);
  sizeRange.addEventListener("keydown", captureSizeRatio);
  sizeNumber.addEventListener("focus", captureSizeRatio);
  bindPair(sizeRange, sizeNumber, (value) => {
    const screen = fitScaleFor(state.cardWidth, state.cardHeight) * previewZoom;
    const next = scaleCardSize(
      Math.max(1, state.cardWidth),
      Math.max(1, Math.round(state.cardWidth * sizeRatio)),
      value,
    );
    state.cardWidth = next.cardWidth;
    state.cardHeight = next.cardHeight;
    const factor = state.cardWidth / Math.max(1, sizeBase.cardWidth);
    for (const layer of imageLayers()) {
      const base = sizeBase.images.get(layer.id);
      if (!base) continue;
      layer.width = clampImageWidth(base.width * factor);
      const imageFactor = layer.width / Math.max(1, base.width);
      layer.x = Math.round(base.x * imageFactor);
      layer.y = Math.round(base.y * imageFactor);
    }
    const nextFit = fitScaleFor(state.cardWidth, state.cardHeight);
    if (nextFit > 0 && Number.isFinite(screen) && screen > 0) previewZoom = screen / nextFit;
  }, () => state.cardWidth, captureSizeRatio);
  bindPair(widthRange, widthNumber, (value) => {
    state.cardWidth = clampCardSize(value);
    for (const layer of state.layers) {
      if (isTextLayer(layer)) layer.size = clampFontSize(layer.size, state.cardWidth);
    }
  }, () => state.cardWidth);
  bindPair(heightRange, heightNumber, (value) => {
    state.cardHeight = value;
  }, () => state.cardHeight);
  const selectedTextSizes = () => selectedLayers().filter(isTextLayer).map((layer) => layer.size);
  bindPair(fontScaleRange, fontScaleNumber, (value) => {
    if (!fontBase) {
      fontBase = selectedLayers()
        .filter(isTextLayer)
        .map((layer) => ({ id: layer.id, size: layer.size }));
    }
    const next = scaleFontSizes(
      fontBase.map((item) => item.size),
      value,
      state.cardWidth,
    );
    fontBase.forEach((item, index) => {
      const layer = layerById(item.id);
      if (layer && isTextLayer(layer)) layer.size = next[index] ?? layer.size;
    });
  }, () => {
    const sizes = selectedTextSizes();
    return sizes.length > 0 ? Math.max(...sizes) : FONT_MIN;
  });
  bindPair(titleSizeRange, titleSizeNumber, (value) => {
    panelText("title").size = clampFontSize(value, state.cardWidth);
  }, () => panelText("title").size);
  bindPair(bodySizeRange, bodySizeNumber, (value) => {
    panelText("body").size = clampFontSize(value, state.cardWidth);
  }, () => panelText("body").size);
  bindPair(imageRange, imageNumber, (value) => {
    panelImage().width = value;
  }, () => panelImage().width);
  bindPair(imageRadiusRange, imageRadiusNumber, (value) => {
    panelImage().radius = clampRadius(value);
  }, () => panelImage().radius);
  bindPair(shapeSizeRange, shapeSizeNumber, (value) => {
    const layer = panelShape();
    if (!layer) return;
    const from = { x: layer.x, y: layer.y, width: layer.width, height: layer.height };
    const nodes = layer.nodes ? structuredClone(layer.nodes) : null;
    Object.assign(layer, scaleShapeBox(layer, value));
    if (nodes) layer.nodes = transformNodes(nodes, from, layer);
  }, () => {
    const layer = panelShape();
    return layer ? Math.round(Math.max(layer.width, layer.height)) : SHAPE_MIN;
  });
  bindPair(shapeRadiusRange, shapeRadiusNumber, (value) => {
    const layer = panelShape();
    if (layer) layer.radius = clampRadius(value);
  }, () => panelShape()?.radius ?? 0);
  const withShadow = (layer: ShapeLayer, patch: Partial<ReturnType<typeof shapeShadow>>) => {
    layer.shadow = { ...shapeShadow(layer), ...patch };
  };
  bindPair(shadowSizeRange, shadowSizeNumber, (value) => {
    const layer = panelShape();
    if (layer) withShadow(layer, { size: clampUnit(value, SHADOW_SIZE_MAX) });
  }, () => (panelShape() ? shapeShadow(panelShape()!).size : 0));
  bindPair(shadowBlurRange, shadowBlurNumber, (value) => {
    const layer = panelShape();
    if (layer) withShadow(layer, { blur: clampUnit(value, SHADOW_BLUR_MAX) });
  }, () => (panelShape() ? shapeShadow(panelShape()!).blur : 0));
  bindPair(shadowDistanceRange, shadowDistanceNumber, (value) => {
    const layer = panelShape();
    if (layer) withShadow(layer, { distance: clampUnit(value, SHADOW_DISTANCE_MAX) });
  }, () => (panelShape() ? shapeShadow(panelShape()!).distance : 0));
  bindPair(shadowOpacityRange, shadowOpacityNumber, (value) => {
    const layer = panelShape();
    if (layer) withShadow(layer, { opacity: clampUnit(value, 100) });
  }, () => (panelShape() ? shapeShadow(panelShape()!).opacity : 0));
  const withStroke = (layer: ShapeLayer, patch: Partial<ReturnType<typeof shapeStroke>>) => {
    layer.stroke = { ...shapeStroke(layer), ...patch };
  };
  bindPair(strokeWidthRange, strokeWidthNumber, (value) => {
    const layer = panelShape();
    if (layer) withStroke(layer, { width: clampUnit(value, LINE_WIDTH_MAX) });
  }, () => (panelShape() ? shapeStroke(panelShape()!).width : 0));
  bindPair(strokeOpacityRange, strokeOpacityNumber, (value) => {
    const layer = panelShape();
    if (layer) withStroke(layer, { opacity: clampUnit(value, 100) });
  }, () => (panelShape() ? shapeStroke(panelShape()!).opacity : 100));
  bindPair(blurFromRange, blurFromNumber, (value) => {
    const layer = panelShape();
    if (layer) layer.blurFrom = clampUnit(value, LAYER_BLUR_MAX);
  }, () => clampUnit(panelShape()?.blurFrom ?? 0, LAYER_BLUR_MAX));
  bindPair(blurToRange, blurToNumber, (value) => {
    const layer = panelShape();
    if (layer) layer.blurTo = clampUnit(value, LAYER_BLUR_MAX);
  }, () => clampUnit(panelShape()?.blurTo ?? 0, LAYER_BLUR_MAX));
  for (const range of [blurFromRange, blurToRange]) {
    range.addEventListener("pointerdown", () => {
      range.style.zIndex = "2";
      (range === blurFromRange ? blurToRange : blurFromRange).style.zIndex = "1";
    });
  }
  bindPair(lineWidthRange, lineWidthNumber, (value) => {
    const layer = panelLine();
    if (layer) layer.stroke = Math.min(LINE_WIDTH_MAX, Math.max(LINE_WIDTH_MIN, Math.round(value)));
  }, () => panelLine()?.stroke ?? LINE_WIDTH_DEFAULT);
  bindPair(penWidthRange, penWidthNumber, (value) => {
    const layer = panelPen();
    if (layer) layer.strokeWidth = Math.min(LINE_WIDTH_MAX, Math.max(0, Math.round(value)));
  }, () => panelPen()?.strokeWidth ?? 0);
  const bindSelect = (select: HTMLSelectElement, apply: () => void) => {
    select.addEventListener("focus", () => beginGesture(select));
    select.addEventListener("change", () => {
      apply();
      finishGesture(select);
      void redraw();
    });
    select.addEventListener("blur", () => finishGesture(select));
  };
  bindSelect(shapeBlendSelect, () => {
    const layer = panelShape();
    const blend = SHAPE_BLENDS.find((item) => item === shapeBlendSelect.value);
    if (layer && blend) layer.blend = blend;
  });
  bindSelect(titleFontSelect, () => {
    panelText("title").fontId = titleFontSelect.value;
  });
  bindSelect(bodyFontSelect, () => {
    panelText("body").fontId = bodyFontSelect.value;
  });
  bindSelect(titleWeightSelect, () => {
    panelText("title").weight = Number(titleWeightSelect.value);
  });
  bindSelect(bodyWeightSelect, () => {
    panelText("body").weight = Number(bodyWeightSelect.value);
  });
  for (const button of root.querySelectorAll<HTMLButtonElement>("[data-text-kind]")) {
    button.addEventListener("click", () => {
      const layer = panelText(button.dataset.textKind === "body" ? "body" : "title");
      const style = button.dataset.textStyle as TextToggle | undefined;
      const align = TEXT_ALIGNS.find((item) => item === button.dataset.textAlign);
      beginGesture(button);
      if (style === "bold") layer.weight = isBold(layer) ? REGULAR_WEIGHT : BOLD_WEIGHT;
      else if (style) layer[style] = !layer[style];
      else if (align) layer.align = align;
      finishGesture(button);
      void redraw();
    });
  }
  const snapshotCard = async (): Promise<string> => {
    const offscreen = document.createElement("canvas");
    if (state.code.trim()) {
      await paintForeignObject(
        offscreen,
        studioFragment(await codeDocument()),
        state.cardWidth,
        state.cardHeight,
      );
    } else {
      drawCard(offscreen, state, imageOf);
    }
    const maxEdge = 1080;
    const edge = Math.max(state.cardWidth, state.cardHeight);
    if (edge <= maxEdge) return offscreen.toDataURL("image/png");
    const scale = maxEdge / edge;
    const thumb = document.createElement("canvas");
    thumb.width = Math.max(1, Math.round(state.cardWidth * scale));
    thumb.height = Math.max(1, Math.round(state.cardHeight * scale));
    thumb.getContext("2d")?.drawImage(offscreen, 0, 0, thumb.width, thumb.height);
    return thumb.toDataURL("image/png");
  };

  root.querySelector("#studio-set-baseline")?.addEventListener("click", () => {
    void (async () => {
      const ok = await confirmProceed("현재 레이아웃을 초기화 기준으로 세팅하고 진행하시겠습니까?");
      if (!ok) return;
      actions.onSetBaseline();
      showToast("초기화로 세팅하였습니다.");
    })();
  });
  root.querySelector("#studio-save-library")?.addEventListener("click", () => {
    void (async () => {
      const ok = await confirmProceed("현재 카드를 그래픽 라이브러리에 추가하고 진행하시겠습니까?");
      if (!ok) return;
      const saved = await actions.onAddToLibrary(await snapshotCard());
      showToast(saved ? "그래픽 라이브러리에 추가하였습니다." : "그래픽 라이브러리에 추가하지 못했습니다.");
    })();
  });
  root.querySelector("#studio-reset")?.addEventListener("click", () => {
    recordChange(() => {
      actions.onReset();
      return true;
    });
  });
  titleInput.addEventListener("focus", () => beginGesture(titleInput));
  titleInput.addEventListener("input", () => {
    panelText("title").text = titleInput.value;
    void redraw();
  });
  titleInput.addEventListener("blur", () => finishGesture(titleInput));
  bodyInput.addEventListener("focus", () => beginGesture(bodyInput));
  bodyInput.addEventListener("input", () => {
    panelText("body").text = bodyInput.value;
    void redraw();
  });
  bodyInput.addEventListener("blur", () => finishGesture(bodyInput));
  const bindColor = (
    picker: HTMLInputElement,
    hexField: HTMLInputElement,
    apply: (hex: string) => void,
    read: () => string,
  ) => {
    picker.addEventListener("pointerdown", () => beginGesture(picker));
    picker.addEventListener("change", () => finishGesture(picker));
    picker.addEventListener("input", () => {
      const hex = normalizeHex(picker.value);
      if (!hex) return;
      apply(hex);
      hexField.value = hex;
      void redraw();
    });
    hexField.addEventListener("focus", () => beginGesture(hexField));
    hexField.addEventListener("input", () => {
      const hex = normalizeHex(hexField.value);
      if (!hex) return;
      apply(hex);
      picker.value = hex;
      void redraw();
    });
    hexField.addEventListener("blur", () => {
      if (!normalizeHex(hexField.value)) hexField.value = read();
      finishGesture(hexField);
    });
  };
  bindColor(colorInput, hexInput, (hex) => {
    state.color = hex;
  }, () => state.color);
  bindColor(titleColorInput, titleHexInput, (hex) => {
    const layer = panelText("title");
    layer.color = hex;
    if (layer.gradient) layer.gradient = { ...layer.gradient, from: hex };
  }, () => panelText("title").color);
  bindColor(bodyColorInput, bodyHexInput, (hex) => {
    const layer = panelText("body");
    layer.color = hex;
    if (layer.gradient) layer.gradient = { ...layer.gradient, from: hex };
  }, () => panelText("body").color);
  bindColor(shapeColorInput, shapeHexInput, (hex) => {
    const layer = panelShape();
    if (!layer) return;
    layer.color = hex;
    if (layer.gradient) layer.gradient = { ...layer.gradient, from: hex };
  }, () => panelShape()?.color ?? rgbToHex(0, 0, 0));
  const bindGradient = (
    prefix: string,
    read: () => { color: string; gradient?: LinearGradient | null },
    write: (color: string, gradient: LinearGradient | null) => void,
  ) => {
    const toggle = root.querySelector<HTMLButtonElement>(`#${prefix}-gradient-toggle`);
    const endColor = root.querySelector<HTMLInputElement>(`#${prefix}-end`);
    const endHex = root.querySelector<HTMLInputElement>(`#${prefix}-end-hex`);
    const angleRange = root.querySelector<HTMLInputElement>(`#${prefix}-angle`);
    const angleNumber = root.querySelector<HTMLInputElement>(`#${prefix}-angle-number`);
    if (!toggle || !endColor || !endHex || !angleRange || !angleNumber) return;
    toggle.addEventListener("click", () => {
      const current = read();
      beginGesture(toggle);
      if (current.gradient) write(current.color, null);
      else write(current.color, { angle: 0, from: current.color, to: inkHex(current.color) });
      finishGesture(toggle);
      void redraw();
    });
    bindColor(endColor, endHex, (hex) => {
      const current = read();
      if (!current.gradient) return;
      write(current.color, { ...current.gradient, to: hex });
    }, () => read().gradient?.to ?? rgbToHex(0, 0, 0));
    bindPair(angleRange, angleNumber, (value) => {
      const current = read();
      if (!current.gradient) return;
      const angle = ((Math.round(value) % 360) + 360) % 360;
      write(current.color, { ...current.gradient, angle });
    }, () => read().gradient?.angle ?? 0);
  };
  bindGradient("studio-title", () => panelText("title"), (color, gradient) => {
    const layer = panelText("title");
    layer.color = color;
    layer.gradient = gradient;
  });
  bindGradient("studio-body", () => panelText("body"), (color, gradient) => {
    const layer = panelText("body");
    layer.color = color;
    layer.gradient = gradient;
  });
  bindGradient("studio-shape", () => panelShape() ?? { color: rgbToHex(0, 0, 0), gradient: null }, (color, gradient) => {
    const layer = panelShape();
    if (!layer) return;
    layer.color = color;
    layer.gradient = gradient;
  });
  bindColor(strokeColorInput, strokeHexInput, (hex) => {
    const layer = panelShape();
    if (!layer) return;
    const stroke = shapeStroke(layer);
    layer.stroke = { ...stroke, color: hex, gradient: stroke.gradient ? { ...stroke.gradient, from: hex } : null };
  }, () => (panelShape() ? shapeStroke(panelShape()!).color : rgbToHex(0, 0, 0)));
  bindGradient("studio-stroke", () => {
    const layer = panelShape();
    const stroke = layer ? shapeStroke(layer) : null;
    return { color: stroke?.color ?? rgbToHex(0, 0, 0), gradient: stroke?.gradient ?? null };
  }, (color, gradient) => {
    const layer = panelShape();
    if (!layer) return;
    layer.stroke = { ...shapeStroke(layer), color, gradient };
  });
  bindColor(lineColorInput, lineHexInput, (hex) => {
    const layer = panelLine();
    if (layer) layer.color = hex;
  }, () => panelLine()?.color ?? rgbToHex(0, 0, 0));
  bindColor(penStrokeInput, penStrokeHexInput, (hex) => {
    const layer = panelPen();
    if (layer) layer.stroke = hex;
  }, () => panelPen()?.stroke || rgbToHex(0, 0, 0));
  bindColor(penFillInput, penFillHexInput, (hex) => {
    const layer = panelPen();
    if (layer && penFillToggle.checked) layer.fill = hex;
  }, () => panelPen()?.fill || rgbToHex(0, 0, 0));
  const applyRadius = (raw: string) => {
    state.radius = clampRadius(Number(raw));
    syncRadiusControls();
    void redraw();
  };
  bindSteps(radiusRange, (value) => {
    state.radius = clampRadius(value);
    syncRadiusControls();
  }, () => state.radius);
  radiusRange.addEventListener("pointerdown", () => beginGesture(radiusRange));
  radiusRange.addEventListener("keydown", () => beginGesture(radiusRange));
  radiusRange.addEventListener("pointerup", () => finishGesture(radiusRange));
  radiusRange.addEventListener("pointercancel", () => finishGesture(radiusRange));
  radiusRange.addEventListener("keyup", () => finishGesture(radiusRange));
  radiusRange.addEventListener("input", () => applyRadius(radiusRange.value));
  radiusNumber.addEventListener("focus", () => beginGesture(radiusNumber));
  radiusNumber.addEventListener("input", () => applyRadius(radiusNumber.value));
  radiusNumber.addEventListener("blur", () => finishGesture(radiusNumber));
  radiusNumber.addEventListener("change", () => finishGesture(radiusNumber));

  codeInput.addEventListener("focus", () => beginGesture(codeInput));
  codeInput.addEventListener("input", () => {
    state.code = codeInput.value;
    void redraw();
  });
  codeInput.addEventListener("blur", () => finishGesture(codeInput));

  const applyHistory = (next: StudioState, zoom: number) => {
    Object.assign(state, next);
    previewZoom = zoom;
    syncHistoryButtons();
    void redraw();
  };
  undoButton.addEventListener("click", () => {
    endCrop(false);
    finishGesture();
    const prev = undoStack.pop();
    const zoom = undoZoom.pop();
    if (!prev || zoom === undefined) {
      syncHistoryButtons();
      return;
    }
    redoStack.push(cloneStudio(state));
    redoZoom.push(previewZoom);
    applyHistory(prev, zoom);
  });
  redoButton.addEventListener("click", () => {
    endCrop(false);
    finishGesture();
    const next = redoStack.pop();
    const zoom = redoZoom.pop();
    if (!next || zoom === undefined) {
      syncHistoryButtons();
      return;
    }
    undoStack.push(cloneStudio(state));
    undoZoom.push(previewZoom);
    applyHistory(next, zoom);
  });
  syncHistoryButtons();

  root.querySelector("#studio-tab-design")?.addEventListener("click", () => showPanel("design"));
  root.querySelector("#studio-tab-code")?.addEventListener("click", () => showPanel("code"));
  root.querySelector(".studio__tabs")?.addEventListener("keydown", (event) => {
    if (!(event instanceof KeyboardEvent)) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = state.panel === "design" ? "code" : "design";
    showPanel(next);
    root.querySelector<HTMLButtonElement>(next === "design" ? "#studio-tab-design" : "#studio-tab-code")?.focus();
  });

  const themeGrid = root.querySelector<HTMLElement>(".studio__themes");
  const themeFile = root.querySelector<HTMLInputElement>("#studio-theme-file");
  const themeButtons = () => [...root.querySelectorAll<HTMLButtonElement>("[data-theme-slug]")];
  const renderThemes = () => {
    if (themeGrid) themeGrid.innerHTML = themeOptions(captures, panelImage().src);
  };
  const pickTheme = (button: HTMLButtonElement, focus: boolean) => {
    const src = button.dataset.themeSlug;
    if (!src) return;
    beginGesture(button);
    selectTheme(src, focus);
    finishGesture(button);
  };
  const deleteUpload = async (id: string) => {
    const upload = getUploads().find((item) => item.id === id);
    if (!upload || !(await confirmProceed(`"${upload.name}" 이미지를 테마에서 지울까요? 이 이미지를 쓰던 레이어는 테마 이미지로 바뀝니다.`))) return;
    if (!(await removeUpload(id))) {
      showToast("이미지를 지우지 못했습니다.");
      return;
    }
    renderThemes();
    void redraw();
  };
  themeGrid?.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const remove = target?.closest<HTMLButtonElement>("[data-upload-remove]");
    if (remove) {
      void deleteUpload(remove.dataset.uploadRemove ?? "");
      return;
    }
    if (target?.closest("#studio-theme-add")) {
      themeFile?.click();
      return;
    }
    const button = target?.closest<HTMLButtonElement>("[data-theme-slug]");
    if (button) pickTheme(button, false);
  });
  themeGrid?.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(key)) return;
    if (!(event.target instanceof Element && event.target.matches("[data-theme-slug]"))) return;
    event.preventDefault();
    const themes = themeButtons();
    const index = themes.findIndex((button) => button === event.target);
    const delta = key === "ArrowLeft" || key === "ArrowUp" ? -1 : 1;
    const next = themes[(index + delta + themes.length) % themes.length];
    if (next) pickTheme(next, true);
  });
  themeFile?.addEventListener("change", () => {
    const files = [...(themeFile.files ?? [])].filter((file) => file.type.startsWith("image/"));
    themeFile.value = "";
    if (files.length === 0) return;
    void (async () => {
      const added = (await Promise.all(files.map((file) => addUpload(file)))).filter((item) => item !== null);
      if (added.length < files.length) showToast("이미지를 저장하지 못했습니다.");
      if (added.length === 0) return;
      renderThemes();
      root.querySelector<HTMLButtonElement>("#studio-theme-add")?.focus();
    })();
  });
  themeGrid?.addEventListener("dragstart", (event) => {
    const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("[data-theme-slug]") : null;
    const src = button?.dataset.themeSlug;
    if (!button || !src || !event.dataTransfer) return;
    event.dataTransfer.setData(THEME_DRAG, src);
    event.dataTransfer.effectAllowed = "copy";
    const image = button.querySelector("img");
    if (image) event.dataTransfer.setDragImage(image, image.width / 2, image.height / 2);
  });

  root.querySelector("#studio-copy")?.addEventListener("click", async () => {
    const text = designToCode(state, aspectOf, extraFonts());
    exportCode.textContent = text;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    const button = root.querySelector<HTMLButtonElement>("#studio-copy");
    if (!button) return;
    button.textContent = "복사됨";
    window.setTimeout(() => {
      button.textContent = "현재 디자인을 코드로 복사";
    }, 1200);
  });

  root.querySelector("#studio-download")?.addEventListener("click", () => {
    void (async () => {
      const filename = `ax-studio-${state.cardWidth}x${state.cardHeight}-${state.themeSlug || "theme"}.png`;
      if (!state.code.trim()) {
        downloadCanvas(canvas, filename);
        return;
      }
      const offscreen = document.createElement("canvas");
      await paintForeignObject(
        offscreen,
        studioFragment(await codeDocument()),
        state.cardWidth,
        state.cardHeight,
      );
      downloadCanvas(offscreen, filename);
    })();
  });

  const cardPoint = (event: { clientX: number; clientY: number }) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: rect.width > 0 ? ((event.clientX - rect.left) / rect.width) * state.cardWidth : 0,
      y: rect.height > 0 ? ((event.clientY - rect.top) / rect.height) * state.cardHeight : 0,
    };
  };

  const hitAt = (x: number, y: number): HitBox | null => {
    const pad = 8;
    for (let index = hits.length - 1; index >= 0; index -= 1) {
      const box = hits[index];
      if (!box) continue;
      const layer = layerById(box.id);
      if (layer?.kind === "shape") {
        if (shapeContains(layer, x, y, pad)) return box;
        continue;
      }
      if (layer?.kind === "line") {
        if (lineContains(layer, x, y, pad)) return box;
        continue;
      }
      if (layer?.kind === "pen") {
        if (penContains(layer, x, y, pad)) return box;
        continue;
      }
      if (x >= box.x - pad && y >= box.y - pad && x <= box.x + box.w + pad && y <= box.y + box.h + pad) {
        return box;
      }
    }
    return null;
  };

  const strokeDragBox = (box: HitBox) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const display = canvas.getBoundingClientRect().width;
    const unit = display > 0 ? state.cardWidth / display : 1;
    ctx.save();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    ctx.lineWidth = unit * 3;
    ctx.strokeRect(box.x, box.y, Math.max(unit, box.w), Math.max(unit, box.h));
    ctx.strokeStyle = "rgba(255, 255, 255, 0.92)";
    ctx.lineWidth = unit * 1.5;
    ctx.strokeRect(box.x, box.y, Math.max(unit, box.w), Math.max(unit, box.h));
    ctx.restore();
  };
  const paintDragStroke = () => {
    if (!drag) return;
    for (const box of hits) if (drag.start.has(box.id)) strokeDragBox(box);
  };
  const paintCropGhost = () => {
    const ctx = canvas.getContext("2d");
    const layer = cropping ? layerById(cropping.id) : undefined;
    const source = layer?.kind === "image" ? imageOf(layer) : null;
    if (!cropping || !source || !ctx) return;
    const { full, box } = cropping;
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.drawImage(source, full.x, full.y, full.w, full.h);
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.w, box.h);
    ctx.clip();
    ctx.drawImage(source, full.x, full.y, full.w, full.h);
    ctx.restore();
  };

  type ImageBox = { x: number; y: number; width: number };
  type Point = { x: number; y: number };
  /** copy: the first move duplicates the selection and drags the copies (Option/Alt drag). */
  let drag: { id: string; origin: Point; start: Map<string, DragOrigin>; pointerId: number; copy: boolean } | null = null;
  let tapStart: { x: number; y: number; moved: boolean; shift: boolean } | null = null;
  let lastTap: { id: string; time: number; x: number; y: number } | null = null;
  const touches = new Map<number, { x: number; y: number }>();
  let pinch: { distance: number; mid: Point; layerId: string; image: ImageBox } | null = null;
  let longPress: { timer: number; pointerId: number; x: number; y: number } | null = null;
  let lastPointer: Point | null = null;
  let panelKey = "";

  const imageBox = (layer: ImageLayer): ImageBox => ({ x: layer.x, y: layer.y, width: layer.width });
  type DragOrigin = { x: number; y: number; x2?: number; y2?: number; points?: PenAnchor[] };
  const clampLayerPosition = (layer: StudioLayer, x: number, y: number): Point => {
    if (layer.kind === "image") {
      return {
        x: clampImageOffset(x, state.cardWidth, layer.width),
        y: clampImageOffset(y, state.cardHeight, layerHeight(layer)),
      };
    }
    if (layer.kind === "shape") {
      return {
        x: clampImageOffset(x, state.cardWidth, layer.width),
        y: clampImageOffset(y, state.cardHeight, layer.height),
      };
    }
    if (layer.kind === "title" || layer.kind === "body") {
      return {
        x: clampTextOffset(x, state.cardWidth, layer.size),
        y: clampTextOffset(y, state.cardHeight, layer.size),
      };
    }
    return { x, y };
  };
  const originOf = (layer: StudioLayer): DragOrigin => {
    if (layer.kind === "line") return { x: layer.x, y: layer.y, x2: layer.x2, y2: layer.y2 };
    if (layer.kind === "pen") return { x: 0, y: 0, points: structuredClone(layer.points) };
    if (layer.kind === "shape" && layer.nodes && layer.nodes.length >= 2) {
      return { x: layer.x, y: layer.y, points: structuredClone(layer.nodes) };
    }
    return { x: layer.x, y: layer.y };
  };
  const allowedDelta = (layer: StudioLayer, origin: DragOrigin, dx: number, dy: number): Point => {
    if (layer.kind === "line") {
      const box = lineBounds({ ...layer, x: origin.x, y: origin.y, x2: origin.x2 ?? origin.x, y2: origin.y2 ?? origin.y });
      return {
        x: clampImageOffset(box.x + dx, state.cardWidth, box.w) - box.x,
        y: clampImageOffset(box.y + dy, state.cardHeight, box.h) - box.y,
      };
    }
    if ((layer.kind === "pen" || layer.kind === "shape") && origin.points) {
      const box = nodeBounds(origin.points);
      return {
        x: clampImageOffset(box.x + dx, state.cardWidth, box.width) - box.x,
        y: clampImageOffset(box.y + dy, state.cardHeight, box.height) - box.y,
      };
    }
    const clamped = clampLayerPosition(layer, origin.x + dx, origin.y + dy);
    return { x: clamped.x - origin.x, y: clamped.y - origin.y };
  };
  const placeFrom = (layer: StudioLayer, origin: DragOrigin, dx: number, dy: number) => {
    if (layer.kind === "line") {
      layer.x = roundOffset(origin.x + dx);
      layer.y = roundOffset(origin.y + dy);
      layer.x2 = roundOffset((origin.x2 ?? layer.x2) + dx);
      layer.y2 = roundOffset((origin.y2 ?? layer.y2) + dy);
      return;
    }
    if (layer.kind === "pen" || (layer.kind === "shape" && origin.points)) {
      const points = origin.points ?? (layer.kind === "pen" ? layer.points : layer.nodes ?? []);
      const moved = points.map((point) => ({
        x: roundOffset(point.x + dx),
        y: roundOffset(point.y + dy),
        in: point.in ? { x: roundOffset(point.in.x + dx), y: roundOffset(point.in.y + dy) } : null,
        out: point.out ? { x: roundOffset(point.out.x + dx), y: roundOffset(point.out.y + dy) } : null,
      }));
      if (layer.kind === "pen") layer.points = moved;
      else {
        layer.nodes = moved;
        layer.x = roundOffset(origin.x + dx);
        layer.y = roundOffset(origin.y + dy);
      }
      return;
    }
    const next = clampLayerPosition(layer, origin.x + dx, origin.y + dy);
    layer.x = next.x;
    layer.y = next.y;
  };
  const positionsOf = (ids: Iterable<string>) => {
    const start = new Map<string, DragOrigin>();
    for (const id of ids) {
      const layer = layerById(id);
      if (layer) start.set(id, originOf(layer));
    }
    return start;
  };
  const moveGroup = (start: Map<string, DragOrigin>, dx: number, dy: number) => {
    // Shrink the shared delta to the most constrained item so the group keeps its spacing at card edges.
    const nearer = (a: number, b: number) => (Math.abs(b) < Math.abs(a) ? b : a);
    const moving: { layer: StudioLayer; from: DragOrigin }[] = [];
    for (const [id, from] of start) {
      const layer = layerById(id);
      if (layer) moving.push({ layer, from });
    }
    for (const { layer, from } of moving) {
      const allowed = allowedDelta(layer, from, dx, dy);
      dx = nearer(dx, allowed.x);
      dy = nearer(dy, allowed.y);
    }
    for (const { layer, from } of moving) placeFrom(layer, from, dx, dy);
  };
  const applyImage = (layer: ImageLayer, next: ImageBox) => {
    layer.width = next.width;
    layer.x = clampImageOffset(next.x, state.cardWidth, layer.width);
    layer.y = clampImageOffset(next.y, state.cardHeight, layerHeight(layer));
  };
  /** Pinch and ctrl+wheel resize the topmost image under the point, else the one the panel edits. */
  const imageAt = (point: Point): ImageLayer => {
    for (let index = hits.length - 1; index >= 0; index -= 1) {
      const box = hits[index];
      if (!box || box.kind !== "image") continue;
      if (point.x < box.x || point.y < box.y || point.x > box.x + box.w || point.y > box.y + box.h) continue;
      const layer = layerById(box.id);
      if (layer?.kind === "image") return layer;
    }
    return panelImage();
  };
  const editAnchors = (): PenAnchor[] | null => {
    if (penMode || !penEdit) return null;
    const layer = layerById(penEdit.id);
    if (layer?.kind === "pen") return layer.points;
    if (layer?.kind === "shape" && layer.nodes && layer.nodes.length >= 2) return layer.nodes;
    return null;
  };
  const fitShapeNodes = (layer: ShapeLayer) => {
    if (!layer.nodes || layer.nodes.length < 2) return;
    const box = nodeBounds(layer.nodes);
    layer.x = roundOffset(box.x);
    layer.y = roundOffset(box.y);
    layer.width = Math.max(1, box.width);
    layer.height = Math.max(1, box.height);
  };
  const paintPenChrome = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx || state.code.trim()) return;
    const draw: DrawPath = {
      moveTo: (x, y) => ctx.moveTo(x, y),
      lineTo: (x, y) => ctx.lineTo(x, y),
      quadraticCurveTo: (cx, cy, x, y) => ctx.quadraticCurveTo(cx, cy, x, y),
      bezierCurveTo: (c1x, c1y, c2x, c2y, x, y) => ctx.bezierCurveTo(c1x, c1y, c2x, c2y, x, y),
      closePath: () => ctx.closePath(),
    };
    ctx.save();
    if (penDraft && penDraft.points.length > 0) {
      const first = penDraft.points[0];
      const closingDrag = penDraft.closing;
      const nearFirst = Boolean(
        first &&
          penDraft.points.length >= 2 &&
          !closingDrag &&
          penDraft.dragging === null &&
          penDraft.hover &&
          Math.hypot(penDraft.hover.x - first.x, penDraft.hover.y - first.y) <= PEN_CLOSE,
      );
      const closing = closingDrag || nearFirst;
      if (closing) canvas.dataset.penClose = "true";
      else delete canvas.dataset.penClose;
      const aim = closing && first ? first : penDraft.hover;
      ctx.beginPath();
      tracePen(draw, penDraft.points, false);
      const last = penDraft.points[penDraft.points.length - 1];
      if (last && aim && penDraft.dragging === null) {
        const c1 = last.out ?? last;
        const c2 = closing && first?.in ? first.in : aim;
        ctx.moveTo(last.x, last.y);
        if (last.out || (closing && first?.in)) ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, aim.x, aim.y);
        else ctx.lineTo(aim.x, aim.y);
      }
      ctx.strokeStyle = inkHex(state.color);
      ctx.lineWidth = Math.max(2, state.cardWidth / 400);
      ctx.lineCap = "round";
      ctx.stroke();
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "rgb(64, 101, 248)";
      ctx.fillStyle = inkHex(state.color);
      for (const point of penDraft.points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, Math.max(4, state.cardWidth / 180), 0, Math.PI * 2);
        ctx.fill();
        for (const handle of [point.in, point.out]) {
          if (!handle) continue;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(handle.x, handle.y);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.92)";
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(handle.x, handle.y);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.fillStyle = accent;
          ctx.arc(handle.x, handle.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (closing && first) {
        ctx.beginPath();
        ctx.arc(first.x, first.y, Math.max(12, state.cardWidth / 70), 0, Math.PI * 2);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    } else delete canvas.dataset.penClose;
    const selectedPoints = editAnchors();
    if (selectedPoints) {
      ctx.strokeStyle = inkHex(state.color);
      ctx.lineWidth = Math.max(1, state.cardWidth / 600);
      for (const point of selectedPoints) {
        for (const handle of [point.in, point.out]) {
          if (!handle) continue;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(handle.x, handle.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  };
  const dragPenHandle = (event: PointerEvent, index: number, part: "anchor" | "in" | "out") => {
    const points = editAnchors();
    const basePoint = points?.[index];
    const edit = penEdit;
    if (!points || !basePoint || !edit) return;
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget;
    if (target instanceof HTMLElement) {
      try {
        target.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
    }
    const base = structuredClone(basePoint);
    const origin = cardPoint(event);
    let moved = false;
    const moving = part === "anchor" && edit.active === index;
    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId) return;
      const point = cardPoint(ev);
      if (Math.hypot(point.x - origin.x, point.y - origin.y) >= 4) moved = true;
      const next = structuredClone(base);
      if (part === "anchor" && moving) {
        const dx = point.x - origin.x;
        const dy = point.y - origin.y;
        next.x = roundOffset(base.x + dx);
        next.y = roundOffset(base.y + dy);
        next.in = base.in ? { x: roundOffset(base.in.x + dx), y: roundOffset(base.in.y + dy) } : null;
        next.out = base.out ? { x: roundOffset(base.out.x + dx), y: roundOffset(base.out.y + dy) } : null;
      } else if (part === "anchor") {
        if (Math.hypot(point.x - base.x, point.y - base.y) >= 4) {
          next.out = { x: roundOffset(point.x), y: roundOffset(point.y) };
          if (!ev.altKey) next.in = { x: roundOffset(base.x * 2 - point.x), y: roundOffset(base.y * 2 - point.y) };
        }
      } else {
        next[part] = { x: roundOffset(point.x), y: roundOffset(point.y) };
        const other = part === "in" ? "out" : "in";
        if (!ev.altKey && base[other]) next[other] = { x: roundOffset(base.x * 2 - point.x), y: roundOffset(base.y * 2 - point.y) };
      }
      points[index] = next;
      const shape = layerById(edit.id);
      if (shape?.kind === "shape") fitShapeNodes(shape);
      paint();
    };
    const end = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId || !(target instanceof HTMLElement)) return;
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", end);
      target.removeEventListener("pointercancel", end);
      if (part === "anchor" && !moved && penEdit?.id === edit.id) penEdit.active = index;
      paint();
    };
    if (target instanceof HTMLElement) {
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerup", end);
      target.addEventListener("pointercancel", end);
    }
  };
  paint = () => {
    if (penEdit) {
      const edited = layerById(penEdit.id);
      const alive = edited?.kind === "pen" || (edited?.kind === "shape" && (edited.nodes?.length ?? 0) >= 2);
      if (!alive) penEdit = null;
    }
    for (const id of [...selected]) if (!layerById(id)) selected.delete(id);
    hits = drawCard(canvas, state, imageOf, editing?.id ?? cropping?.id);
    paintCropGhost();
    paintDragStroke();
    paintPenChrome();
    syncOverlay();
    const key = [...selected].join(" ");
    if (key !== panelKey) {
      panelKey = key;
      syncForm();
      syncSizeControls();
      root.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach(paintRangeFill);
    }
  };

  const placeAt = (element: HTMLElement, x: number, y: number) => {
    element.style.left = `${x * viewScale}px`;
    element.style.top = `${y * viewScale}px`;
  };
  const editingLayer = (): TextLayer | null => {
    const layer = editing ? layerById(editing.id) : undefined;
    return layer && isTextLayer(layer) ? layer : null;
  };
  const placeEditor = () => {
    const layer = editingLayer();
    if (!layer) return;
    const fontPx = layer.size * viewScale;
    // iOS zooms the page when a focused field is under 16px, so render at 16px+ and scale down.
    const base = Math.max(16, fontPx);
    const shrink = fontPx / base;
    placeAt(editor, layer.x, layer.y);
    editor.style.font = textFont(layer, base, extraFonts());
    editor.style.textDecoration = layer.underline ? "underline" : "none";
    editor.style.lineHeight = `${(Math.round(layer.size * 1.25) * viewScale) / shrink}px`;
    if (layer.gradient) {
      editor.style.color = "transparent";
      editor.style.backgroundImage = `linear-gradient(${(layer.gradient.angle + 90) % 360}deg, ${layer.gradient.from}, ${layer.gradient.to})`;
      editor.style.backgroundClip = "text";
      editor.style.setProperty("-webkit-background-clip", "text");
    } else {
      editor.style.color = layer.color;
      editor.style.backgroundImage = "";
      editor.style.backgroundClip = "";
      editor.style.setProperty("-webkit-background-clip", "");
    }
    editor.style.width = `${(Math.max(1, state.cardWidth - FONT_SIDE_MARGIN * 2) * viewScale) / shrink}px`;
    editor.style.transform = `scale(${shrink})`;
    editor.style.height = "auto";
    editor.style.height = `${editor.scrollHeight}px`;
  };
  const frameEls = new Map<string, HTMLElement>();
  const syncCropOverlay = () => {
    const crop = cropping && !state.code.trim() ? cropping : null;
    cropFrame.hidden = !crop;
    for (const handle of cropHandles) handle.hidden = !crop;
    if (!crop) return;
    const { box } = crop;
    placeAt(cropFrame, box.x, box.y);
    cropFrame.style.width = `${box.w * viewScale}px`;
    cropFrame.style.height = `${box.h * viewScale}px`;
    for (const handle of cropHandles) {
      const edge = handle.dataset.crop ?? "";
      const x = edge.includes("w") ? box.x : edge.includes("e") ? box.x + box.w : box.x + box.w / 2;
      const y = edge.includes("n") ? box.y : edge.includes("s") ? box.y + box.h : box.y + box.h / 2;
      placeAt(handle, x, y);
    }
  };
  const singleOf = <T extends StudioLayer>(kind: T["kind"]): T | null => {
    const [onlyId] = selected.size === 1 ? [...selected] : [];
    const layer = onlyId ? layerById(onlyId) : undefined;
    return layer?.kind === kind ? (layer as T) : null;
  };
  const singleImage = (): ImageLayer | null => singleOf<ImageLayer>("image");
  const singleShape = (): ShapeLayer | null => singleOf<ShapeLayer>("shape");
  const singleLine = (): LineLayer | null => singleOf<LineLayer>("line");
  const shapeHandleName = (edge: string): ShapeHandle | null => {
    if (edge === "top") return "n";
    if (edge === "right") return "e";
    if (edge === "bottom") return "s";
    if (edge === "left") return "w";
    if (edge === "nw" || edge === "ne" || edge === "se" || edge === "sw") return edge;
    return null;
  };
  let penHandleKey = "";
  const dragStarHandle = (event: PointerEvent, index: number) => {
    const layer = singleShape();
    if (!layer || layer.shape !== "star") return;
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget;
    if (target instanceof HTMLElement) {
      try {
        target.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
    }
    beginGesture(penHandleHost);
    const start = { x: layer.x, y: layer.y, width: layer.width, height: layer.height };
    const center = { x: start.x + start.width / 2, y: start.y + start.height / 2 };
    const outer = index % 2 === 0;
    const angle = -Math.PI / 2 + (index * Math.PI) / 5;
    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId) return;
      const point = cardPoint(ev);
      const dist = Math.hypot(point.x - center.x, point.y - center.y);
      const outerDist = Math.hypot(Math.cos(angle) * (start.width / 2), Math.sin(angle) * (start.height / 2));
      if (outer) {
        const factor = dist / Math.max(1, outerDist);
        const width = clampShapeSize(start.width * factor);
        const height = clampShapeSize(start.height * factor);
        layer.width = width;
        layer.height = height;
        layer.x = roundOffset(center.x - width / 2);
        layer.y = roundOffset(center.y - height / 2);
      } else {
        layer.inner = Math.min(0.92, Math.max(0.08, dist / Math.max(1, outerDist)));
      }
      paint();
    };
    const end = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId || !(target instanceof HTMLElement)) return;
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", end);
      target.removeEventListener("pointercancel", end);
      finishGesture(penHandleHost);
      void redraw();
    };
    if (target instanceof HTMLElement) {
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerup", end);
      target.addEventListener("pointercancel", end);
    }
  };
  const dragRadiusHandle = (event: PointerEvent, index: number) => {
    const layer = singleShape();
    if (!layer || (layer.shape !== "rect" && layer.shape !== "triangle")) return;
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget;
    if (target instanceof HTMLElement) {
      try {
        target.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
    }
    beginGesture(penHandleHost);
    const corners =
      layer.shape === "rect"
        ? [
            { x: layer.x, y: layer.y },
            { x: layer.x + layer.width, y: layer.y },
            { x: layer.x + layer.width, y: layer.y + layer.height },
            { x: layer.x, y: layer.y + layer.height },
          ]
        : trianglePoints(layer);
    const corner = corners[index];
    const origin = cardPoint(event);
    const startRadius = layer.radius;
    const startDist = corner ? Math.hypot(origin.x - corner.x, origin.y - corner.y) : 0;
    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId || !corner) return;
      const point = cardPoint(ev);
      const dist = Math.hypot(point.x - corner.x, point.y - corner.y);
      const limit = Math.min(RADIUS_MAX, layer.width / 2, layer.height / 2);
      layer.radius = Math.round(Math.min(limit, Math.max(0, startRadius + dist - startDist)));
      paint();
    };
    const end = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId || !(target instanceof HTMLElement)) return;
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", end);
      target.removeEventListener("pointercancel", end);
      finishGesture(penHandleHost);
      void redraw();
    };
    if (target instanceof HTMLElement) {
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerup", end);
      target.addEventListener("pointercancel", end);
    }
  };
  const syncPenHandles = (points: PenAnchor[] | null, id: string) => {
    const key = points ? `${id}:${points.length}` : "";
    if (key !== penHandleKey) {
      penHandleKey = key;
      penHandleHost.replaceChildren();
      if (points) {
        points.forEach((_point, index) => {
          for (const part of ["anchor", "in", "out"] as const) {
            const handle = document.createElement("span");
            handle.className = part === "anchor" ? "studio__handle" : "studio__handle studio__handle--curve";
            handle.title = part === "anchor" ? "점" : "휘어짐";
            handle.setAttribute("aria-label", part === "anchor" ? "점" : "휘어짐");
            handle.dataset.penPart = part;
            handle.dataset.penIndex = String(index);
            handle.addEventListener("pointerdown", (event) => dragPenHandle(event, index, part));
            penHandleHost.append(handle);
          }
        });
      }
    }
    if (!points) return;
    for (const handle of penHandleHost.querySelectorAll<HTMLElement>("[data-pen-part]")) {
      const index = Number(handle.dataset.penIndex);
      const point = points[index];
      const part = handle.dataset.penPart;
      const at = !point ? null : part === "in" ? point.in : part === "out" ? point.out : point;
      handle.hidden = !at;
      handle.classList.toggle("studio__handle--active", part === "anchor" && penEdit?.active === index);
      if (!at) continue;
      placeAt(handle, at.x, at.y);
    }
  };
  const syncStarHandles = (layer: ShapeLayer | null) => {
    const key = layer ? `star:${layer.id}` : "";
    if (key !== penHandleKey) {
      penHandleKey = key;
      penHandleHost.replaceChildren();
      if (layer) {
        starPoints(layer, starInner(layer)).forEach((_point, index) => {
          const handle = document.createElement("span");
          const radiusTip = index % 2 === 1;
          handle.className = radiusTip ? "studio__handle studio__handle--radius" : "studio__handle";
          handle.title = radiusTip ? "radius" : "크기";
          handle.setAttribute("aria-label", radiusTip ? "radius" : "크기");
          handle.dataset.starIndex = String(index);
          handle.addEventListener("pointerdown", (event) => dragStarHandle(event, index));
          penHandleHost.append(handle);
        });
      }
    }
    if (!layer) return;
    const tips = starPoints(layer, starInner(layer));
    for (const handle of penHandleHost.querySelectorAll<HTMLElement>("[data-star-index]")) {
      const tip = tips[Number(handle.dataset.starIndex)];
      if (!tip) continue;
      placeAt(handle, tip.x, tip.y);
    }
  };
  const syncRadiusHandles = (layer: ShapeLayer | null) => {
    const points = layer ? radiusHandlePoints(layer) : [];
    const key = points.length > 0 && layer ? `radius:${layer.id}` : "";
    if (key !== penHandleKey) {
      penHandleKey = key;
      penHandleHost.replaceChildren();
      points.forEach((_point, index) => {
        const handle = document.createElement("span");
        handle.className = "studio__handle studio__handle--radius";
        handle.dataset.radiusIndex = String(index);
        handle.title = "radius";
        handle.setAttribute("aria-label", "radius");
        handle.addEventListener("pointerdown", (event) => dragRadiusHandle(event, index));
        penHandleHost.append(handle);
      });
    }
    if (!layer || points.length === 0) return;
    const live = radiusHandlePoints(layer);
    for (const handle of penHandleHost.querySelectorAll<HTMLElement>("[data-radius-index]")) {
      const tip = live[Number(handle.dataset.radiusIndex)];
      if (!tip) continue;
      placeAt(handle, tip.x, tip.y);
    }
  };
  syncOverlay = () => {
    const visible = !editing && !cropping && !state.code.trim();
    const shown = new Set<string>();
    if (visible) {
      for (const id of selected) {
        const box = hits.find((hit) => hit.id === id);
        if (!box) continue;
        let frame = frameEls.get(id);
        if (!frame) {
          frame = document.createElement("div");
          frame.className = "studio__select-frame";
          overlay.prepend(frame);
          frameEls.set(id, frame);
        }
        placeAt(frame, box.x, box.y);
        frame.style.width = `${box.w * viewScale}px`;
        frame.style.height = `${box.h * viewScale}px`;
        shown.add(id);
      }
    }
    for (const [id, frame] of frameEls) {
      if (shown.has(id)) continue;
      frame.remove();
      frameEls.delete(id);
    }
    if (alignBar) {
      alignBar.hidden = shown.size < 1;
      for (const align of LAYER_DISTRIBUTES) {
        const button = alignBar.querySelector<HTMLButtonElement>(`[data-layer-align="${align}"]`);
        if (!button) continue;
        button.disabled = shown.size < 3;
        button.title = shown.size < 3 ? `${LAYER_ALIGN_LABELS[align]} · 세 개 이상 선택` : LAYER_ALIGN_LABELS[align];
      }
    }
    const image = singleImage();
    const shape = singleShape();
    const line = singleLine();
    const sized = shape ?? image;
    const box = sized ? hits.find((hit) => hit.id === sized.id) : undefined;
    const inset = 12 / Math.max(viewScale, 0.001);
    const clampX = (value: number) => Math.min(state.cardWidth - inset, Math.max(inset, value));
    const clampY = (value: number) => Math.min(state.cardHeight - inset, Math.max(inset, value));
    for (const handle of handles) {
      const edge = handle.dataset.handle ?? "";
      const corner = edge === "nw" || edge === "ne" || edge === "se" || edge === "sw";
      const pointEdit = Boolean(editAnchors());
      const starTips = Boolean(shape?.shape === "star" && !pointEdit);
      const show = visible && Boolean(box) && !pointEdit && !starTips && (shape ? true : Boolean(image) && !corner);
      handle.hidden = !show;
      handle.title = "크기";
      handle.setAttribute("aria-label", "크기");
      if (!show || !box) continue;
      const cx = clampX(box.x + box.w / 2);
      const cy = clampY(box.y + box.h / 2);
      if (edge === "top") placeAt(handle, cx, clampY(box.y));
      else if (edge === "bottom") placeAt(handle, cx, clampY(box.y + box.h));
      else if (edge === "left") placeAt(handle, clampX(box.x), cy);
      else if (edge === "right") placeAt(handle, clampX(box.x + box.w), cy);
      else if (edge === "nw") placeAt(handle, clampX(box.x), clampY(box.y));
      else if (edge === "ne") placeAt(handle, clampX(box.x + box.w), clampY(box.y));
      else if (edge === "se") placeAt(handle, clampX(box.x + box.w), clampY(box.y + box.h));
      else if (edge === "sw") placeAt(handle, clampX(box.x), clampY(box.y + box.h));
    }
    for (const handle of lineEnds) {
      const show = visible && Boolean(line);
      handle.hidden = !show;
      if (!show || !line) continue;
      const start = handle.dataset.lineEnd === "start";
      placeAt(handle, start ? line.x : line.x2, start ? line.y : line.y2);
    }
    if (!visible || penMode) syncPenHandles(null, "");
    else if (editAnchors()) syncPenHandles(editAnchors(), penEdit?.id ?? "");
    else if (shape?.shape === "star") syncStarHandles(shape);
    else if (shape && (shape.shape === "rect" || shape.shape === "triangle")) syncRadiusHandles(shape);
    else syncRadiusHandles(null);
    syncCropOverlay();
    placeEditor();
  };

  for (const handle of handles) {
    handle.addEventListener("pointerdown", (event) => {
      const edge = handle.dataset.handle ?? "";
      const shape = singleShape();
      const shapeEdge = shape ? shapeHandleName(edge) : null;
      if (shape && shapeEdge) {
        event.preventDefault();
        try {
          handle.setPointerCapture(event.pointerId);
        } catch {
          /* the pointer can already be inactive */
        }
        beginGesture(handle);
        const start = { x: shape.x, y: shape.y, width: shape.width, height: shape.height };
        const startNodes = shape.nodes ? structuredClone(shape.nodes) : null;
        const origin = cardPoint(event);
        const move = (ev: PointerEvent) => {
          if (ev.pointerId !== event.pointerId) return;
          const point = cardPoint(ev);
          Object.assign(shape, resizeShape(start, shapeEdge, point.x - origin.x, point.y - origin.y, ev.shiftKey));
          if (startNodes) shape.nodes = transformNodes(startNodes, start, shape);
          paint();
        };
        const end = (ev: PointerEvent) => {
          if (ev.pointerId !== event.pointerId) return;
          handle.removeEventListener("pointermove", move);
          handle.removeEventListener("pointerup", end);
          handle.removeEventListener("pointercancel", end);
          finishGesture(handle);
          void redraw();
        };
        handle.addEventListener("pointermove", move);
        handle.addEventListener("pointerup", end);
        handle.addEventListener("pointercancel", end);
        return;
      }
      const layer = singleImage();
      const box = layer ? hits.find((hit) => hit.id === layer.id) : undefined;
      if (!layer || !box) return;
      event.preventDefault();
      try {
        handle.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
      beginGesture(handle);
      const start = imageBox(layer);
      const ratio = box.h / Math.max(1, box.w);
      const anchor =
        edge === "right" ? { x: box.x, y: box.y + box.h / 2 }
        : edge === "left" ? { x: box.x + box.w, y: box.y + box.h / 2 }
        : edge === "bottom" ? { x: box.x + box.w / 2, y: box.y }
        : { x: box.x + box.w / 2, y: box.y + box.h };
      const origin = cardPoint(event);
      const move = (ev: PointerEvent) => {
        if (ev.pointerId !== event.pointerId) return;
        const point = cardPoint(ev);
        const dx = point.x - origin.x;
        const dy = point.y - origin.y;
        const width =
          edge === "right" ? box.w + dx
          : edge === "left" ? box.w - dx
          : edge === "bottom" ? (box.h + dy) / ratio
          : (box.h - dy) / ratio;
        applyImage(layer, scaleImageAround(start, width, anchor.x, anchor.y));
        paint();
      };
      const end = (ev: PointerEvent) => {
        if (ev.pointerId !== event.pointerId) return;
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", end);
        handle.removeEventListener("pointercancel", end);
        finishGesture(handle);
        void redraw();
      };
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", end);
      handle.addEventListener("pointercancel", end);
    });
  }

  for (const handle of lineEnds) {
    handle.addEventListener("pointerdown", (event) => {
      const layer = singleLine();
      if (!layer) return;
      const start = handle.dataset.lineEnd === "start";
      event.preventDefault();
      try {
        handle.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
      beginGesture(handle);
      const move = (ev: PointerEvent) => {
        if (ev.pointerId !== event.pointerId) return;
        const point = cardPoint(ev);
        const pad = 200;
        const x = roundOffset(Math.min(state.cardWidth + pad, Math.max(-pad, point.x)));
        const y = roundOffset(Math.min(state.cardHeight + pad, Math.max(-pad, point.y)));
        if (start) {
          layer.x = x;
          layer.y = y;
        } else {
          layer.x2 = x;
          layer.y2 = y;
        }
        paint();
      };
      const end = (ev: PointerEvent) => {
        if (ev.pointerId !== event.pointerId) return;
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", end);
        handle.removeEventListener("pointercancel", end);
        finishGesture(handle);
        void redraw();
      };
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", end);
      handle.addEventListener("pointercancel", end);
    });
  }

  const openEditor = (layer: TextLayer) => {
    if (state.code.trim()) return;
    editing = { id: layer.id, original: layer.text };
    selected.clear();
    selected.add(layer.id);
    beginGesture(editor);
    editor.value = layer.text;
    editor.hidden = false;
    paint();
    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
  };
  const closeEditor = (commit: boolean) => {
    if (!editing) return;
    const layer = editingLayer();
    if (!commit && layer) layer.text = editing.original;
    editing = null;
    editor.hidden = true;
    paint();
    finishGesture(editor);
    void redraw();
  };
  editor.addEventListener("input", () => {
    const layer = editingLayer();
    if (!layer) return;
    layer.text = layer.kind === "title" ? editor.value.replace(/\n/g, " ") : editor.value;
    paint();
    syncForm();
  });
  editor.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeEditor(false);
    } else if (event.key === "Enter" && (editingLayer()?.kind === "title" || event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      closeEditor(true);
    }
  });
  editor.addEventListener("blur", () => closeEditor(true));

  const registerTap = (id: string, event: PointerEvent) => {
    const repeat =
      lastTap &&
      lastTap.id === id &&
      event.timeStamp - lastTap.time < 400 &&
      Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 24;
    const layer = layerById(id);
    if (repeat && layer && isTextLayer(layer)) {
      lastTap = null;
      openEditor(layer);
      return;
    }
    if (repeat && layer?.kind === "pen" && !penMode && penEdit?.id !== layer.id) {
      lastTap = null;
      enterPenEdit(layer);
      return;
    }
    if (repeat && layer?.kind === "shape" && layer.shape !== "star" && !penMode && penEdit?.id !== layer.id) {
      lastTap = null;
      enterShapeEdit(layer);
      return;
    }
    lastTap = { id, time: event.timeStamp, x: event.clientX, y: event.clientY };
  };

  const cropOwner = new EventTarget();
  const onCropOutside = (event: PointerEvent) => {
    const target = event.target;
    if (target === canvas || (target instanceof Element && target.closest(".studio__handle--crop"))) return;
    endCrop(true);
  };
  const startCrop = (layer: ImageLayer) => {
    if (!imageOf(layer) || state.code.trim()) return;
    finishGesture();
    selected.clear();
    selected.add(layer.id);
    cropping = {
      id: layer.id,
      full: uncroppedRect(layer, aspectOf(layer)),
      box: { x: layer.x, y: layer.y, w: layer.width, h: layerHeight(layer) },
    };
    beginGesture(cropOwner);
    document.addEventListener("pointerdown", onCropOutside, true);
    paint();
  };
  function endCrop(commit: boolean) {
    if (!cropping) return;
    const { id, full, box } = cropping;
    cropping = null;
    document.removeEventListener("pointerdown", onCropOutside, true);
    const layer = layerById(id);
    if (commit && layer?.kind === "image") {
      layer.crop = cropFromBox(full, box);
      layer.width = clampImageWidth(box.w);
      const next = clampLayerPosition(layer, box.x, box.y);
      layer.x = next.x;
      layer.y = next.y;
    }
    finishGesture(cropOwner);
    void redraw();
  }
  const dragCrop = (event: PointerEvent, target: HTMLElement, edge: string | null) => {
    if (!cropping) return;
    event.preventDefault();
    try {
      target.setPointerCapture(event.pointerId);
    } catch {
      /* the pointer can already be inactive */
    }
    const origin = cardPoint(event);
    const start = { ...cropping.box };
    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId || !cropping) return;
      const point = cardPoint(ev);
      const dx = point.x - origin.x;
      const dy = point.y - origin.y;
      cropping.box = edge ? resizeCropBox(cropping.full, start, edge, dx, dy) : moveCropBox(cropping.full, start, dx, dy);
      paint();
    };
    const end = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId) return;
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", end);
      target.removeEventListener("pointercancel", end);
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", end);
    target.addEventListener("pointercancel", end);
  };
  for (const handle of cropHandles) {
    handle.addEventListener("pointerdown", (event) => dragCrop(event, handle, handle.dataset.crop ?? null));
  }

  const commitLayers = (mutate: () => void) => {
    finishGesture();
    const owner = new EventTarget();
    beginGesture(owner);
    mutate();
    finishGesture(owner);
    void redraw();
  };
  const syncPenMode = () => {
    penButton.setAttribute("aria-pressed", penMode ? "true" : "false");
    selectButton.setAttribute("aria-pressed", penMode ? "false" : "true");
    if (penMode) canvas.dataset.pen = "true";
    else {
      delete canvas.dataset.pen;
      delete canvas.dataset.penClose;
    }
  };
  const enterPenEdit = (layer: PenLayer) => {
    penEdit = { id: layer.id, snapshot: structuredClone(layer.points), box: null, active: null };
    selected.clear();
    selected.add(layer.id);
    paint();
  };
  const enterShapeEdit = (layer: ShapeLayer) => {
    if (layer.shape === "star" || penMode || penEdit?.id === layer.id) return;
    const box = { x: layer.x, y: layer.y, width: layer.width, height: layer.height };
    const snapshot = layer.nodes ? structuredClone(layer.nodes) : null;
    if (!layer.nodes) layer.nodes = shapeNodes(layer);
    penEdit = { id: layer.id, snapshot, box, active: null };
    selected.clear();
    selected.add(layer.id);
    paint();
  };
  const commitPenEdit = () => {
    if (!penEdit) return;
    const edit = penEdit;
    penEdit = null;
    const layer = layerById(edit.id);
    if (layer?.kind === "pen" && edit.snapshot) {
      const next = structuredClone(layer.points);
      layer.points = edit.snapshot;
      commitLayers(() => {
        layer.points = next;
      });
      return;
    }
    if (layer?.kind === "shape") {
      const nextNodes = layer.nodes ? structuredClone(layer.nodes) : null;
      const nextBox = { x: layer.x, y: layer.y, width: layer.width, height: layer.height };
      layer.nodes = edit.snapshot ? structuredClone(edit.snapshot) : null;
      if (edit.box) Object.assign(layer, edit.box);
      commitLayers(() => {
        layer.nodes = nextNodes;
        Object.assign(layer, nextBox);
      });
      return;
    }
    paint();
  };
  const cancelPenEdit = () => {
    if (!penEdit) return;
    const layer = layerById(penEdit.id);
    if (layer?.kind === "pen" && penEdit.snapshot) layer.points = structuredClone(penEdit.snapshot);
    if (layer?.kind === "shape") {
      layer.nodes = penEdit.snapshot ? structuredClone(penEdit.snapshot) : null;
      if (penEdit.box) Object.assign(layer, penEdit.box);
    }
    penEdit = null;
    paint();
  };
  const commitPen = (closed: boolean) => {
    const draft = penDraft;
    penDraft = null;
    if (!draft || draft.points.length < 2) {
      paint();
      return;
    }
    const ink = inkHex(state.color);
    commitLayers(() => {
      const layer: PenLayer = {
        id: newLayerId(),
        kind: "pen",
        points: draft.points,
        closed,
        fill: closed ? ink : "",
        stroke: ink,
        strokeWidth: 4,
      };
      state.layers.push(layer);
      selected.clear();
      selected.add(layer.id);
    });
  };
  const finishPenWork = () => {
    if (penDraft) commitPen(false);
    if (penEdit) commitPenEdit();
    penMode = false;
    syncPenMode();
  };
  const addShape = (shape: ShapeName) => {
    finishPenWork();
    const size = Math.max(SHAPE_MIN, Math.min(240, state.cardWidth - 80, state.cardHeight - 80));
    commitLayers(() => {
      const layer: ShapeLayer = {
        id: newLayerId(),
        kind: "shape",
        shape,
        x: roundOffset((state.cardWidth - size) / 2),
        y: roundOffset((state.cardHeight - size) / 2),
        width: size,
        height: size,
        radius: shape === "ellipse" ? 0 : 16,
        color: inkHex(state.color),
        shadow: emptyShadow(),
        stroke: emptyStroke(inkHex(state.color)),
        blend: "normal",
        blurFrom: 0,
        blurTo: 0,
        gradient: null,
      };
      state.layers.push(layer);
      selected.clear();
      selected.add(layer.id);
    });
  };
  const addLine = () => {
    finishPenWork();
    const half = Math.min(160, state.cardWidth / 4);
    commitLayers(() => {
      const layer: LineLayer = {
        id: newLayerId(),
        kind: "line",
        x: roundOffset(state.cardWidth / 2 - half),
        y: roundOffset(state.cardHeight / 2),
        x2: roundOffset(state.cardWidth / 2 + half),
        y2: roundOffset(state.cardHeight / 2),
        stroke: LINE_WIDTH_DEFAULT,
        cap: "butt",
        start: false,
        end: false,
        color: inkHex(state.color),
      };
      state.layers.push(layer);
      selected.clear();
      selected.add(layer.id);
    });
  };
  for (const button of root.querySelectorAll<HTMLButtonElement>("[data-draw]")) {
    // A click would focus the button, and Esc then paints the focus ring. Keep mouse use unfocused.
    button.addEventListener("mousedown", (event) => {
      if (event.button === 0) event.preventDefault();
    });
    button.addEventListener("click", () => {
      const tool = button.dataset.draw;
      if (tool === "select") {
        finishPenWork();
        paint();
        return;
      }
      if (tool === "pen") {
        if (penMode) {
          if (penDraft) commitPen(false);
          penMode = false;
          syncPenMode();
          paint();
          return;
        }
        if (penEdit) commitPenEdit();
        penMode = true;
        setDropper(false);
        syncPenMode();
        return;
      }
      if (tool === "line") addLine();
      else if (tool === "ellipse" || tool === "rect" || tool === "triangle" || tool === "star") addShape(tool);
    });
  }
  for (const button of root.querySelectorAll<HTMLButtonElement>("[data-line-cap]")) {
    button.addEventListener("click", () => {
      const layer = panelLine();
      const cap = button.dataset.lineCap === "round" ? "round" : "butt";
      if (!layer || layer.cap === cap) return;
      beginGesture(button);
      layer.cap = cap;
      finishGesture(button);
      void redraw();
    });
  }
  for (const button of root.querySelectorAll<HTMLButtonElement>("[data-line-arrow]")) {
    button.addEventListener("click", () => {
      const layer = panelLine();
      if (!layer) return;
      beginGesture(button);
      if (button.dataset.lineArrow === "start") layer.start = !layer.start;
      else layer.end = !layer.end;
      finishGesture(button);
      void redraw();
    });
  }
  penFillToggle.addEventListener("change", () => {
    const layer = panelPen();
    if (!layer) return;
    beginGesture(penFillToggle);
    layer.fill = penFillToggle.checked ? normalizeHex(penFillInput.value) ?? inkHex(state.color) : "";
    finishGesture(penFillToggle);
    void redraw();
  });
  const copyLayers = () => {
    const picked = selectedLayers();
    if (picked.length > 0) layerClipboard = structuredClone(picked);
  };
  const pasteLayers = (at: Point | null) => {
    if (layerClipboard.length === 0) return;
    commitLayers(() => {
      const copies = structuredClone(layerClipboard);
      const leftOf = (layer: StudioLayer) =>
        layer.kind === "line" ? Math.min(layer.x, layer.x2) : layer.kind === "pen" ? Math.min(...layer.points.map((point) => point.x)) : layer.x;
      const topOf = (layer: StudioLayer) =>
        layer.kind === "line" ? Math.min(layer.y, layer.y2) : layer.kind === "pen" ? Math.min(...layer.points.map((point) => point.y)) : layer.y;
      const dx = at ? at.x - Math.min(...copies.map(leftOf)) : PASTE_OFFSET;
      const dy = at ? at.y - Math.min(...copies.map(topOf)) : PASTE_OFFSET;
      selected.clear();
      for (const layer of copies) {
        layer.id = newLayerId();
        const from = originOf(layer);
        const allowed = allowedDelta(layer, from, dx, dy);
        placeFrom(layer, from, allowed.x, allowed.y);
        selected.add(layer.id);
      }
      state.layers.push(...copies);
    });
  };
  const restack = (toFront: boolean) => {
    const picked = selectedLayers();
    if (picked.length === 0) return;
    commitLayers(() => {
      const rest = state.layers.filter((layer) => !selected.has(layer.id));
      state.layers = toFront ? [...rest, ...picked] : [...picked, ...rest];
    });
  };
  const alignLayers = (align: LayerAlign) => {
    const boxes = hits.filter((box) => selected.has(box.id));
    if (boxes.length === 0) return;
    const offsets = alignOffsets(boxes, align, { x: 0, y: 0, w: state.cardWidth, h: state.cardHeight });
    commitLayers(() => {
      boxes.forEach((box, index) => {
        const layer = layerById(box.id);
        const offset = offsets[index];
        if (!layer || !offset) return;
        const from = originOf(layer);
        const allowed = allowedDelta(layer, from, offset.dx, offset.dy);
        placeFrom(layer, from, allowed.x, allowed.y);
      });
    });
  };
  alignBar?.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("[data-layer-align]") : null;
    if (button && !button.disabled) alignLayers(button.dataset.layerAlign as LayerAlign);
  });
  /** Copies stack on top in their original order; the copies become the selection and the drag moves them. */
  const duplicateDragged = (current: NonNullable<typeof drag>) => {
    const copies = state.layers
      .filter((layer) => current.start.has(layer.id))
      .map((layer) => ({ from: layer.id, layer: { ...structuredClone(layer), id: newLayerId() } }));
    state.layers.push(...copies.map((item) => item.layer));
    selected.clear();
    for (const { layer } of copies) selected.add(layer.id);
    current.id = copies.find((item) => item.from === current.id)?.layer.id ?? current.id;
    current.start = positionsOf(selected);
    current.copy = false;
  };
  // Each kind keeps one layer so the panel always has something to edit.
  const canDelete = (picked: StudioLayer[]) =>
    (["title", "body", "image"] as const).every(
      (kind) =>
        !picked.some((layer) => layer.kind === kind) ||
        state.layers.some((layer) => layer.kind === kind && !selected.has(layer.id)),
    );
  const deleteLayers = () => {
    const picked = selectedLayers();
    if (picked.length === 0 || !canDelete(picked)) return;
    commitLayers(() => {
      state.layers = state.layers.filter((layer) => !selected.has(layer.id));
      selected.clear();
    });
  };

  layerMenu?.remove();
  const shortcut = (key: string) => (IS_MAC ? `⌘${key}` : `Ctrl+${key}`);
  const menuItems: { action: string; label: string; hint?: string }[] = [
    { action: "copy", label: "복사", hint: shortcut("C") },
    { action: "paste", label: "붙여넣기", hint: shortcut("V") },
    { action: "front", label: "맨 위로 보내기" },
    { action: "back", label: "맨 밑으로 보내기" },
    { action: "crop", label: "크롭하기" },
    { action: "delete", label: "삭제", hint: IS_MAC ? "⌫" : "Delete" },
  ];
  const menu = document.createElement("div");
  menu.className = "nav-popover studio-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "객체 메뉴");
  menu.hidden = true;
  menu.innerHTML = menuItems
    .map(
      (item) =>
        `<button type="button" class="nav-popover__item" role="menuitem" data-layer-action="${item.action}">${item.label}${
          item.hint ? `<span class="studio-menu__hint">${item.hint}</span>` : ""
        }</button>`,
    )
    .join("");
  document.body.append(menu);
  layerMenu = menu;
  let menuPoint: Point | null = null;
  const menuButton = (action: string) => menu.querySelector<HTMLButtonElement>(`[data-layer-action="${action}"]`);
  const menuButtons = () => [...menu.querySelectorAll<HTMLButtonElement>("[data-layer-action]")].filter((b) => !b.hidden && !b.disabled);

  const onMenuOutside = (event: PointerEvent) => {
    if (event.target instanceof Node && menu.contains(event.target)) return;
    closeLayerMenu();
  };
  function closeLayerMenu() {
    if (menu.hidden) return;
    if (document.activeElement instanceof HTMLElement && menu.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    menu.hidden = true;
    document.removeEventListener("pointerdown", onMenuOutside, true);
  }
  const openLayerMenu = (clientX: number, clientY: number) => {
    const point = cardPoint({ clientX, clientY });
    const hit = hitAt(point.x, point.y);
    if (!hit) selected.clear();
    else if (!selected.has(hit.id)) {
      selected.clear();
      selected.add(hit.id);
    }
    menuPoint = point;
    paint();
    const picked = selectedLayers();
    const enable = (action: string, on: boolean) => {
      const button = menuButton(action);
      if (button) button.disabled = !on;
    };
    enable("copy", picked.length > 0);
    enable("paste", layerClipboard.length > 0);
    enable("front", picked.length > 0);
    enable("back", picked.length > 0);
    const crop = menuButton("crop");
    if (crop) {
      crop.hidden = !singleImage();
      const image = singleImage();
      crop.disabled = !image || !imageOf(image);
    }
    const remove = menuButton("delete");
    if (remove) {
      remove.disabled = picked.length === 0 || !canDelete(picked);
      remove.title = picked.length > 0 && remove.disabled ? "타이틀·본문·이미지는 하나씩 남아 있어야 합니다." : "";
    }
    menu.hidden = false;
    const margin = 8;
    const { width, height } = menu.getBoundingClientRect();
    const left = clientX + width + margin > window.innerWidth ? clientX - width : clientX;
    const top = clientY + height + margin > window.innerHeight ? clientY - height : clientY;
    menu.style.left = `${Math.max(margin, left)}px`;
    menu.style.top = `${Math.max(margin, top)}px`;
    document.addEventListener("pointerdown", onMenuOutside, true);
    menuButtons()[0]?.focus({ preventScroll: true });
  };
  menu.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("[data-layer-action]") : null;
    if (!button || button.disabled) return;
    const at = menuPoint;
    closeLayerMenu();
    const action = button.dataset.layerAction;
    if (action === "copy") copyLayers();
    else if (action === "paste") pasteLayers(at);
    else if (action === "front" || action === "back") restack(action === "front");
    else if (action === "delete") deleteLayers();
    else if (action === "crop") {
      const layer = singleImage();
      if (layer) startCrop(layer);
    }
  });
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      closeLayerMenu();
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const buttons = menuButtons();
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    buttons[(index + step + buttons.length) % buttons.length]?.focus();
  });
  stage.addEventListener("scroll", closeLayerMenu);

  const cancelLongPress = () => {
    if (longPress) window.clearTimeout(longPress.timer);
    longPress = null;
  };
  const startLongPress = (event: PointerEvent) => {
    cancelLongPress();
    const { clientX, clientY, pointerId } = event;
    const timer = window.setTimeout(() => {
      longPress = null;
      if (drag?.pointerId === pointerId) {
        moveGroup(drag.start, 0, 0);
        drag = null;
        delete canvas.dataset.dragging;
        finishGesture(canvas);
      }
      tapStart = null;
      openLayerMenu(clientX, clientY);
    }, LONG_PRESS_MS);
    longPress = { timer, pointerId, x: clientX, y: clientY };
  };

  const pinchMetrics = () => {
    const [a, b] = [...touches.values()];
    if (!a || !b) return null;
    return {
      distance: Math.hypot(b.x - a.x, b.y - a.y),
      mid: cardPoint({ clientX: (a.x + b.x) / 2, clientY: (a.y + b.y) / 2 }),
    };
  };
  const startPinch = () => {
    const metrics = pinchMetrics();
    if (!metrics) return;
    cancelLongPress();
    drag = null;
    tapStart = null;
    delete canvas.dataset.dragging;
    beginGesture(canvas);
    const layer = imageAt(metrics.mid);
    pinch = { ...metrics, layerId: layer.id, image: imageBox(layer) };
    paint();
  };

  const sampleDropper = (point: { x: number; y: number }) => {
    const ctx = canvas.getContext("2d");
    if (!ctx || canvas.width < 1 || canvas.height < 1) return;
    const x = Math.min(canvas.width - 1, Math.max(0, Math.floor(point.x)));
    const y = Math.min(canvas.height - 1, Math.max(0, Math.floor(point.y)));
    let pixel: Uint8ClampedArray;
    try {
      pixel = ctx.getImageData(x, y, 1, 1).data;
    } catch {
      showToast("이 색은 읽을 수 없습니다.");
      setDropper(false);
      return;
    }
    if ((pixel[3] ?? 0) === 0) return;
    const hex = rgbToHex(pixel[0] ?? 0, pixel[1] ?? 0, pixel[2] ?? 0);
    const texts = selectedLayers().filter(isTextLayer);
    const vectors = selectedLayers().filter((layer) => layer.kind === "shape" || layer.kind === "line" || layer.kind === "pen");
    if (texts.length === 0 && vectors.length > 0) {
      recordChange(() => {
        let changed = false;
        for (const layer of vectors) {
          if (layer.kind === "pen") {
            const next = layer.stroke ? "stroke" : "fill";
            if (layer[next] === hex) continue;
            layer[next] = hex;
          } else if (layer.color === hex && !(layer.kind === "shape" && layer.gradient)) continue;
          else {
            layer.color = hex;
            if (layer.kind === "shape" && layer.gradient) layer.gradient = { ...layer.gradient, from: hex };
          }
          changed = true;
        }
        return changed;
      });
      syncForm();
      setDropper(false);
      void redraw();
      return;
    }
    recordChange(() => {
      if (texts.length === 0) {
        if (state.color === hex) return false;
        state.color = hex;
        return true;
      }
      let changed = false;
      for (const layer of texts) {
        if (layer.color === hex && !layer.gradient) continue;
        layer.color = hex;
        if (layer.gradient) layer.gradient = { ...layer.gradient, from: hex };
        changed = true;
      }
      return changed;
    });
    syncForm();
    setDropper(false);
    void redraw();
  };

  canvas.addEventListener("pointerdown", (event) => {
    if (state.code.trim()) return;
    const mouse = event.pointerType === "mouse";
    // Right click and macOS ctrl+click open the layer menu through contextmenu instead.
    if (mouse && (event.button !== 0 || (IS_MAC && event.ctrlKey))) return;
    window.getSelection()?.removeAllRanges();
    closeLayerMenu();
    if (editing) closeEditor(true);
    if (cropping) {
      const point = cardPoint(event);
      const { box } = cropping;
      const inside = point.x >= box.x && point.y >= box.y && point.x <= box.x + box.w && point.y <= box.y + box.h;
      if (inside) dragCrop(event, canvas, null);
      else endCrop(true);
      return;
    }
    if (penMode && event.button === 0) {
      event.preventDefault();
      const point = cardPoint(event);
      if (event.altKey && penDraft) {
        const index = penPointIndex(penDraft.points, point.x, point.y, PEN_CLOSE);
        if (index >= 0) {
          penDraft.points = restartPenAt(penDraft.points, index);
          penDraft.dragging = null;
          penDraft.hover = point;
          paint();
          return;
        }
      }
      const first = penDraft?.points[0];
      if (!event.altKey && penDraft && first && penDraft.points.length >= 2 && Math.hypot(point.x - first.x, point.y - first.y) <= PEN_CLOSE) {
        penDraft.closing = true;
        penDraft.dragging = null;
        penDraft.pointerId = event.pointerId;
        penDraft.hover = point;
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch {
          /* the pointer can already be inactive */
        }
        paint();
        return;
      }
      if (!penDraft) {
        selected.clear();
        penDraft = { points: [], hover: point, pointerId: event.pointerId, dragging: null, closing: false };
      }
      penDraft.points.push({ x: roundOffset(point.x), y: roundOffset(point.y), in: null, out: null });
      penDraft.dragging = penDraft.points.length - 1;
      penDraft.pointerId = event.pointerId;
      penDraft.hover = point;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
      paint();
      return;
    }
    if (event.pointerType === "touch") {
      touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
      if (touches.size === 2 && hasImage()) {
        startPinch();
        return;
      }
      if (touches.size > 1) return;
      startLongPress(event);
    }
    const point = cardPoint(event);
    const hit = hitAt(point.x, point.y);
    if (penEdit && hit?.id === penEdit.id) {
      paint();
      return;
    }
    if (penEdit) commitPenEdit();
    if (!mouse) {
      selected.clear();
      if (hit) selected.add(hit.id);
    } else if (event.shiftKey) {
      if (hit && selected.has(hit.id)) selected.delete(hit.id);
      else if (hit) selected.add(hit.id);
    } else if (!hit) selected.clear();
    else if (!selected.has(hit.id)) {
      selected.clear();
      selected.add(hit.id);
    }
    if (!hit || (mouse && !selected.has(hit.id))) {
      tapStart = null;
      paint();
      return;
    }
    tapStart = { x: event.clientX, y: event.clientY, moved: false, shift: event.shiftKey };
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      /* the pointer can already be inactive */
    }
    beginGesture(canvas);
    drag = {
      id: hit.id,
      origin: point,
      start: positionsOf(mouse ? selected : [hit.id]),
      pointerId: event.pointerId,
      copy: mouse && event.altKey,
    };
    canvas.dataset.dragging = "true";
    paint();
  });
  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (state.code.trim() || cropping) return;
    cancelLongPress();
    if (editing) closeEditor(true);
    openLayerMenu(event.clientX, event.clientY);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (touches.has(event.pointerId)) touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (
      longPress?.pointerId === event.pointerId &&
      Math.hypot(event.clientX - longPress.x, event.clientY - longPress.y) > 8
    ) {
      cancelLongPress();
    }
    if (pinch) {
      const metrics = touches.has(event.pointerId) ? pinchMetrics() : null;
      const layer = layerById(pinch.layerId);
      if (!metrics || layer?.kind !== "image") return;
      const factor = metrics.distance / Math.max(1, pinch.distance);
      const scaled = scaleImageAround(pinch.image, pinch.image.width * factor, pinch.mid.x, pinch.mid.y);
      applyImage(layer, {
        x: scaled.x + metrics.mid.x - pinch.mid.x,
        y: scaled.y + metrics.mid.y - pinch.mid.y,
        width: scaled.width,
      });
      paint();
      return;
    }
    if (tapStart && Math.hypot(event.clientX - tapStart.x, event.clientY - tapStart.y) > 6) tapStart.moved = true;
    const point = cardPoint(event);
    lastPointer = point;
    if (penMode && penDraft) {
      penDraft.hover = point;
      if (penDraft.closing && penDraft.pointerId === event.pointerId) {
        const first = penDraft.points[0];
        if (first && Math.hypot(point.x - first.x, point.y - first.y) >= 4) {
          first.in = { x: roundOffset(point.x), y: roundOffset(point.y) };
          first.out = { x: roundOffset(first.x * 2 - point.x), y: roundOffset(first.y * 2 - point.y) };
        }
        paint();
        return;
      }
      const index = penDraft.dragging;
      const anchor = index === null ? undefined : penDraft.points[index];
      if (anchor && penDraft.pointerId === event.pointerId && Math.hypot(point.x - anchor.x, point.y - anchor.y) >= 4) {
        anchor.out = { x: roundOffset(point.x), y: roundOffset(point.y) };
        anchor.in = { x: roundOffset(anchor.x * 2 - point.x), y: roundOffset(anchor.y * 2 - point.y) };
      }
      paint();
      return;
    }
    if (!drag || drag.pointerId !== event.pointerId) {
      canvas.dataset.hover = hitAt(point.x, point.y) ? "true" : "false";
      return;
    }
    if (drag.copy) {
      if (!tapStart?.moved) return;
      duplicateDragged(drag);
    }
    moveGroup(drag.start, point.x - drag.origin.x, point.y - drag.origin.y);
    paint();
  });
  canvas.addEventListener("pointerleave", () => {
    lastPointer = null;
  });
  const endDrag = (event: PointerEvent) => {
    touches.delete(event.pointerId);
    if (longPress?.pointerId === event.pointerId) cancelLongPress();
    if (pinch) {
      if (touches.size < 2) {
        pinch = null;
        finishGesture(canvas);
        void redraw();
      }
      return;
    }
    if (penDraft && penDraft.pointerId === event.pointerId) {
      const closing = penDraft.closing && event.type === "pointerup";
      penDraft.dragging = null;
      penDraft.pointerId = null;
      penDraft.closing = false;
      if (closing) {
        commitPen(true);
        return;
      }
      paint();
      return;
    }
    if (!drag || drag.pointerId !== event.pointerId) return;
    const id = drag.id;
    drag = null;
    delete canvas.dataset.dragging;
    finishGesture(canvas);
    if (event.type === "pointerup" && tapStart && !tapStart.moved && !tapStart.shift) {
      if (selected.size > 1) {
        selected.clear();
        selected.add(id);
      }
      registerTap(id, event);
    }
    tapStart = null;
    paint();
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  const wheelOwner = new EventTarget();
  let wheelTimer = 0;
  canvas.addEventListener(
    "wheel",
    (event) => {
      // Trackpad pinch arrives as a ctrl+wheel event in Chromium and Firefox; off the Mac, ctrl+wheel zooms the preview.
      if (!IS_MAC || !event.ctrlKey || state.code.trim() || cropping || !hasImage()) return;
      event.preventDefault();
      beginGesture(wheelOwner);
      const point = cardPoint(event);
      const layer = imageAt(point);
      applyImage(layer, scaleImageAround(imageBox(layer), layer.width * Math.exp(-event.deltaY * 0.01), point.x, point.y));
      paint();
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        finishGesture(wheelOwner);
        void redraw();
      }, 250);
    },
    { passive: false },
  );

  stage.addEventListener(
    "wheel",
    (event) => {
      if (!(IS_MAC ? event.metaKey : event.ctrlKey)) return;
      event.preventDefault();
      const delta = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * 33 : event.deltaY;
      previewZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, previewZoom * Math.exp(-delta * 0.002)));
      updateScale();
    },
    { passive: false },
  );

  type SafariGesture = Event & { scale: number; clientX: number; clientY: number };
  const safariOwner = new EventTarget();
  let safariPinch: { layerId: string; image: ImageBox; anchor: Point } | null = null;
  canvas.addEventListener("gesturestart", (event) => {
    event.preventDefault();
    if (pinch || state.code.trim() || cropping || !hasImage()) return;
    beginGesture(safariOwner);
    const anchor = cardPoint(event as SafariGesture);
    const layer = imageAt(anchor);
    safariPinch = { layerId: layer.id, image: imageBox(layer), anchor };
  });
  canvas.addEventListener("gesturechange", (event) => {
    event.preventDefault();
    if (!safariPinch || pinch) return;
    const { layerId, image, anchor } = safariPinch;
    const layer = layerById(layerId);
    if (layer?.kind !== "image") return;
    applyImage(layer, scaleImageAround(image, image.width * (event as SafariGesture).scale, anchor.x, anchor.y));
    paint();
  });
  canvas.addEventListener("gestureend", (event) => {
    event.preventDefault();
    if (!safariPinch) return;
    safariPinch = null;
    finishGesture(safariOwner);
    void redraw();
  });

  stage.addEventListener("pointerdown", (event) => {
    if (event.target === canvas || selected.size === 0) return;
    if (event.target instanceof Element && event.target.closest(".studio__handle")) return;
    selected.clear();
    paint();
  });

  const insertImage = async (src: string, at: Point) => {
    const url = srcUrl(src);
    const image = url ? await loadImage(url).catch(() => null) : null;
    const aspect = image && image.naturalWidth > 0 ? image.naturalHeight / image.naturalWidth : 1;
    if (editing) closeEditor(true);
    if (cropping) endCrop(true);
    commitLayers(() => {
      const width = clampImageWidth(state.cardWidth / 2);
      const layer: ImageLayer = { id: newLayerId(), kind: "image", src, x: 0, y: 0, width, radius: IMAGE_RADIUS_DEFAULT, crop: null };
      Object.assign(layer, clampLayerPosition(layer, at.x - width / 2, at.y - (width * aspect) / 2));
      state.layers.push(layer);
      selected.clear();
      selected.add(layer.id);
    });
  };
  const dragsTheme = (event: DragEvent) => !state.code.trim() && !!event.dataTransfer?.types.includes(THEME_DRAG);
  stage.addEventListener("dragover", (event) => {
    if (!dragsTheme(event)) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    stage.dataset.dropping = "true";
  });
  stage.addEventListener("dragleave", (event) => {
    if (!(event.relatedTarget instanceof Node && stage.contains(event.relatedTarget))) delete stage.dataset.dropping;
  });
  stage.addEventListener("drop", (event) => {
    delete stage.dataset.dropping;
    if (!dragsTheme(event)) return;
    const src = event.dataTransfer?.getData(THEME_DRAG);
    if (!src) return;
    event.preventDefault();
    void insertImage(src, cardPoint(event));
  });
  themeGrid?.addEventListener("dragend", () => delete stage.dataset.dropping);

  const applyControlsWidth = (value: number) => {
    const studioWidth = studio.getBoundingClientRect().width;
    const room = CONTROLS_MIN + PREVIEW_MIN + SPLITTER_WIDTH;
    const requested = Number.isFinite(value) ? value : state.controlsWidth;
    state.controlsWidth = studioWidth >= room
      ? clampControlsWidth(requested, studioWidth)
      : Math.max(CONTROLS_MIN, Math.round(requested));
    studio.style.setProperty("--studio-controls-width", `${state.controlsWidth}px`);
    splitter.setAttribute("aria-valuenow", String(state.controlsWidth));
    splitter.setAttribute(
      "aria-valuemax",
      String(studioWidth >= room ? Math.max(CONTROLS_MIN, Math.round(studioWidth) - PREVIEW_MIN - SPLITTER_WIDTH) : state.controlsWidth),
    );
    updateScale();
  };
  applyControlsWidth(state.controlsWidth);

  const deviceBox = root.querySelector<HTMLElement>("#studio-device");
  const deviceButtons = [...root.querySelectorAll<HTMLButtonElement>(".studio-devices__btn")];
  const deviceThumb = root.querySelector<HTMLElement>("#studio-device-thumb");
  const deviceFrame = deviceBox?.parentElement;
  const placeDeviceThumb =
    deviceBox && deviceThumb && deviceFrame ? overlayScrollbar(deviceBox, deviceThumb, deviceFrame) : null;
  const syncDevice = () => {
    if (!deviceBox) return;
    const device = activeDevice();
    deviceBox.dataset.device = device;
    deviceBox.dataset.framed = device === largestDevice() ? "false" : "true";
    for (const button of deviceButtons) {
      button.setAttribute("aria-pressed", button.dataset.device === device ? "true" : "false");
    }
    applyControlsWidth(state.controlsWidth);
    placeDeviceThumb?.();
  };
  syncDevice();
  for (const button of deviceButtons) {
    button.addEventListener("click", () => {
      studioDevice = button.dataset.device as Device;
      syncDevice();
    });
  }
  stopDeviceWatch?.();
  const deviceQueries = [window.matchMedia(TABLET_QUERY), window.matchMedia(DESKTOP_QUERY)];
  for (const query of deviceQueries) query.addEventListener("change", syncDevice);
  stopDeviceWatch = () => {
    for (const query of deviceQueries) query.removeEventListener("change", syncDevice);
  };

  stopHistoryShortcut?.();
  const historyShortcut = (event: KeyboardEvent) => {
    if (!(event.metaKey || event.ctrlKey) || event.altKey) return;
    // event.code keeps the shortcut working when a Korean IME turns Z/Y into "ㅋ"/"ㅛ".
    const redo = (event.code === "KeyZ" && event.shiftKey) || (event.code === "KeyY" && event.ctrlKey && !event.shiftKey);
    const undo = event.code === "KeyZ" && !event.shiftKey;
    if (!undo && !redo) return;
    const button = redo ? redoButton : undoButton;
    if (!button.isConnected || button.disabled) return;
    const target = event.target;
    const typing =
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        target.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button])"));
    if (typing) return;
    event.preventDefault();
    button.click();
  };
  document.addEventListener("keydown", historyShortcut);
  stopHistoryShortcut = () => document.removeEventListener("keydown", historyShortcut);

  stopStudioKeys?.();
  const nudgeOwner = new EventTarget();
  let nudgeTimer = 0;
  const arrows: Record<string, Point> = {
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
  };
  const studioKeys = (event: KeyboardEvent) => {
    if (!canvas.isConnected) return;
    const mod = (event.metaKey || event.ctrlKey) && !event.altKey;
    // event.code keeps +/- and C/V working under a Korean IME and covers the numpad keys.
    const zoom =
      !mod ? null
      : event.code === "Equal" || event.code === "NumpadAdd" ? zoomIn
      : event.code === "Minus" || event.code === "NumpadSubtract" ? zoomOut
      : null;
    if (zoom) {
      event.preventDefault();
      zoom.click();
      return;
    }
    const target = event.target;
    const onCard = target === document.body || (target instanceof Node && stage.contains(target));
    if (editing || state.code.trim()) return;
    const typing =
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        target.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button], [type=file])"));
    if (event.key === "Escape" && !mod && !event.altKey && !typing) {
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && focused.closest(".studio__draw")) focused.blur();
    }
    if (penEdit && !mod && !event.altKey && !typing && (event.key === "Enter" || event.key === "Escape")) {
      event.preventDefault();
      if (event.key === "Enter") commitPenEdit();
      else cancelPenEdit();
      return;
    }
    if (penMode && !mod && !event.altKey && !typing && (event.key === "Enter" || event.key === "Escape")) {
      event.preventDefault();
      if (event.key === "Enter") commitPen(false);
      else {
        penDraft = null;
        penMode = false;
        syncPenMode();
        paint();
      }
      return;
    }
    if (penDraft && !mod && !typing && (event.key === "Delete" || event.key === "Backspace")) {
      event.preventDefault();
      penDraft.points.pop();
      if (penDraft.points.length === 0) penDraft = null;
      paint();
      return;
    }
    if (dropper && event.key === "Escape" && !mod && !event.altKey) {
      event.preventDefault();
      setDropper(false);
      return;
    }
    if (!mod && !event.altKey && !event.shiftKey && !cropping && !typing && event.code === "KeyI") {
      event.preventDefault();
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && focused.closest(".studio__preset")) focused.blur();
      setDropper(!dropper);
      return;
    }
    // Backspace is the Delete key on Mac keyboards.
    if (!mod && !cropping && !typing && (event.key === "Delete" || event.key === "Backspace") && selected.size > 0) {
      event.preventDefault();
      if (canDelete(selectedLayers())) deleteLayers();
      else showToast("타이틀·본문·이미지는 하나씩 남아 있어야 합니다.");
      return;
    }
    if (mod && !cropping) {
      if (typing || window.getSelection()?.toString()) return;
      if (event.code === "KeyC" && selected.size > 0) {
        event.preventDefault();
        copyLayers();
      } else if (event.code === "KeyV" && layerClipboard.length > 0) {
        event.preventDefault();
        pasteLayers(lastPointer);
      }
      return;
    }
    if (!onCard) return;
    if (cropping) {
      if (event.key !== "Enter" && event.key !== "Escape") return;
      event.preventDefault();
      endCrop(event.key === "Enter");
      return;
    }
    if (mod) return;
    const arrow = arrows[event.key];
    if (!arrow || event.altKey || selected.size === 0) return;
    event.preventDefault();
    const step = event.shiftKey ? NUDGE_SHIFT_STEP : NUDGE_STEP;
    beginGesture(nudgeOwner);
    moveGroup(positionsOf(selected), arrow.x * step, arrow.y * step);
    // The pending nudge is committed by the undo click itself, so undo must be clickable right away.
    undoButton.disabled = false;
    paint();
    window.clearTimeout(nudgeTimer);
    nudgeTimer = window.setTimeout(() => {
      finishGesture(nudgeOwner);
      void redraw();
    }, 400);
  };
  const presetTarget = (event: Event) =>
    event.target instanceof Element ? event.target.closest<HTMLElement>(".studio__preset") : null;
  const onDropperPointer = (event: PointerEvent) => {
    if (!dropper || event.button !== 0) return;
    const rect = canvas.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside) {
      const preset = presetTarget(event);
      if (preset) blockPresetClick = true;
      setDropper(false);
      if (preset) {
        event.preventDefault();
        event.stopPropagation();
        preset.blur();
      }
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    closeLayerMenu();
    if (editing) closeEditor(true);
    sampleDropper(cardPoint(event));
  };
  const onDropperClick = (event: MouseEvent) => {
    const preset = presetTarget(event);
    if (!preset) {
      blockPresetClick = false;
      return;
    }
    if (!dropper && !blockPresetClick) return;
    blockPresetClick = false;
    setDropper(false);
    event.preventDefault();
    event.stopPropagation();
    preset.blur();
  };
  document.addEventListener("keydown", studioKeys);
  document.addEventListener("pointerdown", onDropperPointer, true);
  document.addEventListener("click", onDropperClick, true);
  stopStudioKeys = () => {
    document.removeEventListener("keydown", studioKeys);
    document.removeEventListener("pointerdown", onDropperPointer, true);
    document.removeEventListener("click", onDropperClick, true);
  };

  splitter.addEventListener("pointerdown", (event) => {
    if (studio.getBoundingClientRect().width < 768) return;
    try {
      splitter.setPointerCapture(event.pointerId);
    } catch {
      /* the pointer can already be inactive */
    }
    const originX = event.clientX;
    const originWidth = state.controlsWidth;
    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId) return;
      applyControlsWidth(originWidth + ev.clientX - originX);
    };
    const end = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId) return;
      splitter.removeEventListener("pointermove", move);
      splitter.removeEventListener("pointerup", end);
      splitter.removeEventListener("pointercancel", end);
    };
    splitter.addEventListener("pointermove", move);
    splitter.addEventListener("pointerup", end);
    splitter.addEventListener("pointercancel", end);
  });
  splitter.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const step = event.shiftKey ? 48 : 16;
    applyControlsWidth(state.controlsWidth + (event.key === "ArrowRight" ? step : -step));
  });

  root.querySelector("#studio-controls")?.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  previewObserver?.disconnect();
  previewObserver = new ResizeObserver(() => updateScale());
  previewObserver.observe(stage);
  void redraw();
}
