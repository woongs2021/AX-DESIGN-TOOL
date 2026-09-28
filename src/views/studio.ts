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
  designToCode,
  fontLabelFromPath,
  fontStack,
  FONT_SIDE_MARGIN,
  IMAGE_MAX,
  inkHex,
  IMAGE_MIN,
  maxFontSize,
  normalizeHex,
  PREVIEW_MIN,
  SPLITTER_WIDTH,
  RADIUS_MAX,
  RADIUS_MIN,
  scaleCardSize,
  scaleImageAround,
  studioFragment,
  studioSrcdoc,
  wrapText,
  type StudioDocumentInput,
  type StudioState,
} from "../shared/studio.ts";
import { presetById, STUDIO_PRESETS } from "../shared/studio-presets.ts";

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;
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
  return { ...state };
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
type HitBox = { kind: "title" | "body" | "image"; x: number; y: number; w: number; h: number };

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

function documentInput(state: StudioState, themeImage: string): StudioDocumentInput {
  return {
    title: state.title,
    body: state.body,
    themeImage,
    color: state.color,
    radius: state.radius,
    width: state.cardWidth,
    height: state.cardHeight,
    code: state.code,
    titleFontStack: fontStack(state.titleFontId, extraFonts()),
    bodyFontStack: fontStack(state.bodyFontId, extraFonts()),
    titleSize: state.titleSize,
    bodySize: state.bodySize,
    titleX: state.titleX,
    titleY: state.titleY,
    bodyX: state.bodyX,
    bodyY: state.bodyY,
    imageWidth: state.imageWidth,
    imageX: state.imageX,
    imageY: state.imageY,
    titleColor: state.titleColor,
    bodyColor: state.bodyColor,
  };
}

function drawCard(
  canvas: HTMLCanvasElement,
  state: StudioState,
  image: HTMLImageElement | null,
  hidden?: HitBox["kind"],
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
  if (image && image.naturalWidth > 0) {
    const drawWidth = state.imageWidth;
    const drawHeight = drawWidth * (image.naturalHeight / image.naturalWidth);
    ctx.drawImage(image, state.imageX, state.imageY, drawWidth, drawHeight);
    hits.push({ kind: "image", x: state.imageX, y: state.imageY, w: drawWidth, h: drawHeight });
  }

  const maxText = Math.max(1, width - FONT_SIDE_MARGIN * 2);
  ctx.textBaseline = "top";

  const paintText = (
    kind: "title" | "body",
    text: string,
    x: number,
    y: number,
    size: number,
    weight: number,
    stack: string,
    color: string,
  ): void => {
    if (!text.trim()) return;
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px ${stack}`;
    const lines = wrapText(text.trim(), maxText, (value) => ctx.measureText(value).width);
    const lineHeight = Math.round(size * 1.25);
    let widest = 0;
    lines.forEach((line, index) => {
      if (kind !== hidden) ctx.fillText(line, x, y + index * lineHeight);
      widest = Math.max(widest, ctx.measureText(line).width);
    });
    hits.push({ kind, x, y, w: Math.max(widest, size), h: Math.max(lines.length, 1) * lineHeight });
  };

  const extras = extraFonts();
  paintText("body", state.body, state.bodyX, state.bodyY, state.bodySize, 400, fontStack(state.bodyFontId, extras), state.bodyColor);
  paintText("title", state.title, state.titleX, state.titleY, state.titleSize, 600, fontStack(state.titleFontId, extras), state.titleColor);
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

export function renderStudio(state: StudioState, captures: CaptureRecord[]): string {
  if (captures.length === 0) {
    return `
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;
  }

  const ink = inkHex(state.color);
  state.titleColor = normalizeHex(String(state.titleColor ?? "")) ?? ink;
  state.bodyColor = normalizeHex(String(state.bodyColor ?? "")) ?? ink;
  const legacyFont = (state as StudioState & { fontId?: string }).fontId;
  if (!state.titleFontId) state.titleFontId = legacyFont || "pretendard";
  if (!state.bodyFontId) state.bodyFontId = legacyFont || "pretendard";
  const preset = presetById(state.presetId);
  const options = STUDIO_PRESETS.map(
    (item) =>
      `<option value="${escapeHtml(item.id)}"${item.id === preset.id ? " selected" : ""}>${escapeHtml(item.name)} · ${item.width}×${item.height}</option>`,
  ).join("");
  const themes = captures
    .map((capture) => {
      const selected = capture.slug === state.themeSlug;
      return `
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${escapeHtml(capture.slug)}"
          aria-checked="${selected ? "true" : "false"}"
          tabindex="${selected ? "0" : "-1"}"
        >
          <img src="${escapeHtml(assetUrl(capture.asset.path))}" alt="${escapeHtml(capture.title)}" />
        </button>
      `;
    })
    .join("");
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

        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${designSelected ? "" : " hidden"}>
          <div class="studio__field">
            <label for="studio-preset">카드 크기 프리셋</label>
            <select id="studio-preset" class="studio__control">${options}</select>
          </div>
          <div class="studio__field">
            <label for="studio-size">너비·높이 함께</label>
            <div class="studio__radius">
              <input id="studio-size" type="range" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${CARD_MIN}" max="${CARD_MAX}" step="1" value="${state.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${escapeHtml(state.title)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker studio__color-picker--text" type="color" value="${escapeHtml(state.titleColor)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${escapeHtml(state.titleColor)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${fontMax}" step="1" value="${state.titleSize}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${fontMax}" step="1" value="${state.titleSize}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${fontOptions(state.titleFontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${escapeHtml(state.body)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker studio__color-picker--text" type="color" value="${escapeHtml(state.bodyColor)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${escapeHtml(state.bodyColor)}" spellcheck="false" aria-label="본문 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${fontMax}" step="1" value="${state.bodySize}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${fontMax}" step="1" value="${state.bodySize}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${fontOptions(state.bodyFontId)}</select>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮기고, 더블 클릭(탭)해 바로 수정할 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${themes}</div>
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${IMAGE_MIN}" max="${IMAGE_MAX}" step="1" value="${state.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${IMAGE_MIN}" max="${IMAGE_MAX}" step="1" value="${state.imageWidth}" aria-label="카드 이미지 크기 수치" />
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
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${RADIUS_MIN}" max="${RADIUS_MAX}" step="1" value="${state.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${designSelected ? " hidden" : ""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${escapeHtml(state.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
      </form>
      <div class="studio__scroll-thumb" id="studio-scroll-thumb" hidden></div>
      </div>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${CONTROLS_MIN}" aria-valuenow="${state.controlsWidth}" tabindex="0"></div>

      <div class="studio__preview">
        <div class="studio__stage" id="studio-stage">
          <div class="studio__stage-frame">
            <div class="studio__fit" id="studio-fit">
              <div class="studio__scaler" id="studio-scaler">
                <canvas id="studio-canvas" aria-label="카드 프리뷰"></canvas>
                <iframe id="studio-iframe" title="카드 코드 프리뷰" sandbox="" referrerpolicy="no-referrer" hidden></iframe>
                <div class="studio__safe" id="studio-safe" hidden></div>
              </div>
              <div class="studio__overlay">
                <div class="studio__select-frame" data-frame="image" hidden></div>
                <div class="studio__select-frame" data-frame="title" hidden></div>
                <div class="studio__select-frame" data-frame="body" hidden></div>
                <span class="studio__handle" data-handle="top" hidden></span>
                <span class="studio__handle" data-handle="right" hidden></span>
                <span class="studio__handle" data-handle="bottom" hidden></span>
                <span class="studio__handle" data-handle="left" hidden></span>
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
  onReset: () => void,
): void {
  if (captures.length === 0) return;
  const presetSelect = root.querySelector<HTMLSelectElement>("#studio-preset");
  const sizeRange = root.querySelector<HTMLInputElement>("#studio-size");
  const sizeNumber = root.querySelector<HTMLInputElement>("#studio-size-number");
  const widthRange = root.querySelector<HTMLInputElement>("#studio-width");
  const widthNumber = root.querySelector<HTMLInputElement>("#studio-width-number");
  const heightRange = root.querySelector<HTMLInputElement>("#studio-height");
  const heightNumber = root.querySelector<HTMLInputElement>("#studio-height-number");
  const titleInput = root.querySelector<HTMLInputElement>("#studio-title");
  const titleColorInput = root.querySelector<HTMLInputElement>("#studio-title-color");
  const titleHexInput = root.querySelector<HTMLInputElement>("#studio-title-hex");
  const titleSizeRange = root.querySelector<HTMLInputElement>("#studio-title-size");
  const titleSizeNumber = root.querySelector<HTMLInputElement>("#studio-title-size-number");
  const bodyInput = root.querySelector<HTMLTextAreaElement>("#studio-body");
  const bodyColorInput = root.querySelector<HTMLInputElement>("#studio-body-color");
  const bodyHexInput = root.querySelector<HTMLInputElement>("#studio-body-hex");
  const bodySizeRange = root.querySelector<HTMLInputElement>("#studio-body-size");
  const bodySizeNumber = root.querySelector<HTMLInputElement>("#studio-body-size-number");
  const titleFontSelect = root.querySelector<HTMLSelectElement>("#studio-title-font");
  const bodyFontSelect = root.querySelector<HTMLSelectElement>("#studio-body-font");
  const imageRange = root.querySelector<HTMLInputElement>("#studio-image-width");
  const imageNumber = root.querySelector<HTMLInputElement>("#studio-image-width-number");
  const colorInput = root.querySelector<HTMLInputElement>("#studio-color");
  const hexInput = root.querySelector<HTMLInputElement>("#studio-hex");
  const radiusRange = root.querySelector<HTMLInputElement>("#studio-radius");
  const radiusNumber = root.querySelector<HTMLInputElement>("#studio-radius-number");
  const codeInput = root.querySelector<HTMLTextAreaElement>("#studio-code");
  const canvas = root.querySelector<HTMLCanvasElement>("#studio-canvas");
  const iframe = root.querySelector<HTMLIFrameElement>("#studio-iframe");
  const meta = root.querySelector<HTMLElement>("#studio-meta");
  const safe = root.querySelector<HTMLElement>("#studio-safe");
  const scaler = root.querySelector<HTMLElement>("#studio-scaler");
  const fit = root.querySelector<HTMLElement>("#studio-fit");
  const stage = root.querySelector<HTMLElement>("#studio-stage");
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
  const frames = [...root.querySelectorAll<HTMLElement>(".studio__select-frame")];
  const editor = root.querySelector<HTMLTextAreaElement>("#studio-editor");
  const handles = [...root.querySelectorAll<HTMLElement>(".studio__handle")];
  if (
    !editor ||
    !presetSelect ||
    !sizeRange ||
    !sizeNumber ||
    !widthRange ||
    !widthNumber ||
    !heightRange ||
    !heightNumber ||
    !titleInput ||
    !titleColorInput ||
    !titleHexInput ||
    !titleSizeRange ||
    !titleSizeNumber ||
    !bodyInput ||
    !bodyColorInput ||
    !bodyHexInput ||
    !bodySizeRange ||
    !bodySizeNumber ||
    !titleFontSelect ||
    !bodyFontSelect ||
    !imageRange ||
    !imageNumber ||
    !colorInput ||
    !hexInput ||
    !radiusRange ||
    !radiusNumber ||
    !codeInput ||
    !canvas ||
    !iframe ||
    !meta ||
    !safe ||
    !scaler ||
    !fit ||
    !stage ||
    !zoomOut ||
    !zoomIn ||
    !zoomLabel ||
    !undoButton ||
    !redoButton ||
    !scrollThumb ||
    !controlsWrap ||
    !exportCode ||
    !splitter ||
    !studio
  ) {
    return;
  }

  const themeUrl = () => {
    const capture = captures.find((item) => item.slug === state.themeSlug) ?? captures[0];
    return capture ? assetUrl(capture.asset.path) : "";
  };

  let drawToken = 0;
  let viewScale = 1;
  const selected = new Set<HitBox["kind"]>();
  let editing: { kind: "title" | "body"; original: string } | null = null;
  let paint = () => {};
  let syncOverlay = () => {};

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

  const controls = root.querySelector<HTMLElement>("#studio-controls");
  if (controls) overlayScrollbar(controls, scrollThumb, controlsWrap);

  const syncHistoryButtons = () => {
    const undo = document.querySelector<HTMLButtonElement>("#studio-undo");
    const redo = document.querySelector<HTMLButtonElement>("#studio-redo");
    if (undo) undo.disabled = undoStack.length === 0;
    if (redo) redo.disabled = redoStack.length === 0;
  };
  let gestureOwner: EventTarget | null = null;
  const finishGesture = (owner?: EventTarget) => {
    if (owner && gestureOwner !== owner) return;
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
  const paintRangeFill = (range: HTMLInputElement) => {
    const min = Number(range.min);
    const max = Number(range.max);
    const value = Number(range.value);
    const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
    range.style.setProperty("--range-fill", `${Math.min(100, Math.max(0, pct))}%`);
  };
  let sizeRatio = state.cardHeight / Math.max(1, state.cardWidth);
  let sizeBase = { cardWidth: state.cardWidth, imageWidth: state.imageWidth, imageX: state.imageX, imageY: state.imageY };
  const captureSizeRatio = () => {
    sizeRatio = state.cardHeight / Math.max(1, state.cardWidth);
    sizeBase = { cardWidth: state.cardWidth, imageWidth: state.imageWidth, imageX: state.imageX, imageY: state.imageY };
  };

  let themeImage: HTMLImageElement | null = null;
  let imageAspect = 1;
  let hits: HitBox[] = [];

  const imageDrawHeight = () => state.imageWidth * imageAspect;

  const clampLayout = () => {
    state.cardWidth = clampCardSize(state.cardWidth);
    state.cardHeight = clampCardSize(state.cardHeight);
    state.imageWidth = clampImageWidth(state.imageWidth);
  };

  const writeControl = (range: HTMLInputElement, number: HTMLInputElement, value: number) => {
    range.value = String(value);
    if (document.activeElement !== number) number.value = String(value);
  };

  const syncSizeControls = () => {
    const fontCap = maxFontSize(state.cardWidth);
    const titleMax = String(Math.max(fontCap, state.titleSize));
    const bodyMax = String(Math.max(fontCap, state.bodySize));
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
    writeControl(titleSizeRange, titleSizeNumber, state.titleSize);
    writeControl(bodySizeRange, bodySizeNumber, state.bodySize);
    writeControl(imageRange, imageNumber, state.imageWidth);
  };

  const syncRadiusControls = () => {
    radiusRange.value = String(state.radius);
    radiusRange.setAttribute("aria-valuenow", String(state.radius));
    radiusNumber.value = String(state.radius);
    root.style.setProperty("--studio-card-radius", `${state.radius}px`);
  };

  const selectTheme = (slug: string, focus: boolean) => {
    state.themeSlug = slug;
    for (const button of root.querySelectorAll<HTMLButtonElement>("[data-theme-slug]")) {
      const selected = button.dataset.themeSlug === slug;
      button.setAttribute("aria-checked", selected ? "true" : "false");
      button.tabIndex = selected ? 0 : -1;
      if (selected && focus) button.focus();
    }
    void redraw();
  };

  const showPanel = (panel: StudioState["panel"]) => {
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

  const syncForm = () => {
    presetSelect.value = state.presetId;
    if (document.activeElement !== titleInput) titleInput.value = state.title;
    if (document.activeElement !== bodyInput) bodyInput.value = state.body;
    if (document.activeElement !== titleHexInput) {
      titleColorInput.value = state.titleColor;
      titleHexInput.value = state.titleColor;
    }
    if (document.activeElement !== bodyHexInput) {
      bodyColorInput.value = state.bodyColor;
      bodyHexInput.value = state.bodyColor;
    }
    if (document.activeElement !== hexInput) {
      colorInput.value = state.color;
      hexInput.value = state.color;
    }
    titleFontSelect.value = state.titleFontId;
    bodyFontSelect.value = state.bodyFontId;
    if (document.activeElement !== codeInput) codeInput.value = state.code;
    for (const button of root.querySelectorAll<HTMLButtonElement>("[data-theme-slug]")) {
      const selected = button.dataset.themeSlug === state.themeSlug;
      button.setAttribute("aria-checked", selected ? "true" : "false");
      button.tabIndex = selected ? 0 : -1;
    }
  };

  const redraw = async (): Promise<void> => {
    const token = ++drawToken;
    clampLayout();
    syncForm();
    syncSizeControls();
    root.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach(paintRangeFill);
    const preset = presetById(state.presetId);
    const matchesPreset = state.cardWidth === preset.width && state.cardHeight === preset.height;
    const safeNote = matchesPreset && preset.safe ? ` · 안전 영역 ${preset.safe.width} × ${preset.safe.height}` : "";
    meta.textContent = `${state.cardWidth} × ${state.cardHeight} · ${preset.name}${safeNote}`;
    exportCode.textContent = designToCode();
    syncRadiusControls();
    updateScale();

    if (matchesPreset && preset.safe) {
      safe.hidden = false;
      safe.style.width = `${preset.safe.width}px`;
      safe.style.height = `${preset.safe.height}px`;
    } else {
      safe.hidden = true;
    }

    const loadFace = (fontId: string, weight: number, size: number) => {
      const family = fontStack(fontId, extraFonts()).split(",")[0]?.replaceAll('"', "").trim();
      if (!family) return Promise.resolve();
      return document.fonts.load(`${weight} ${size}px "${family}"`);
    };
    try {
      await Promise.all([
        loadFace(state.titleFontId, 600, state.titleSize),
        loadFace(state.bodyFontId, 400, state.bodySize),
      ]);
    } catch {
      /* the canvas stack falls through to the next family */
    }
    if (token !== drawToken) return;

    const url = themeUrl();
    if (state.code.trim()) {
      canvas.hidden = true;
      iframe.hidden = false;
      const themeData = url ? await themeDataUrl(url) : "";
      if (token !== drawToken) return;
      iframe.srcdoc = studioSrcdoc(documentInput(state, themeData));
      syncOverlay();
      return;
    }

    iframe.hidden = true;
    canvas.hidden = false;
    if (url) {
      try {
        themeImage = await loadImage(url);
        if (themeImage.naturalWidth > 0) imageAspect = themeImage.naturalHeight / themeImage.naturalWidth;
      } catch {
        themeImage = null;
        imageAspect = 1;
      }
    } else {
      themeImage = null;
      imageAspect = 1;
    }
    if (token !== drawToken) return;
    clampLayout();
    paint();
  };

  const bindPair = (
    range: HTMLInputElement,
    number: HTMLInputElement,
    apply: (value: number) => void,
    read: () => number,
  ) => {
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

  presetSelect.addEventListener("focus", () => beginGesture(presetSelect));
  presetSelect.addEventListener("change", () => {
    const preset = presetById(presetSelect.value);
    state.presetId = preset.id;
    state.cardWidth = preset.width;
    state.cardHeight = preset.height;
    finishGesture(presetSelect);
    void redraw();
  });
  presetSelect.addEventListener("blur", () => finishGesture(presetSelect));
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
    state.imageWidth = clampImageWidth(sizeBase.imageWidth * factor);
    const imageFactor = state.imageWidth / Math.max(1, sizeBase.imageWidth);
    state.imageX = Math.round(sizeBase.imageX * imageFactor);
    state.imageY = Math.round(sizeBase.imageY * imageFactor);
    const nextFit = fitScaleFor(state.cardWidth, state.cardHeight);
    if (nextFit > 0 && Number.isFinite(screen) && screen > 0) previewZoom = screen / nextFit;
  }, () => state.cardWidth);
  bindPair(widthRange, widthNumber, (value) => {
    state.cardWidth = clampCardSize(value);
    state.titleSize = clampFontSize(state.titleSize, state.cardWidth);
    state.bodySize = clampFontSize(state.bodySize, state.cardWidth);
  }, () => state.cardWidth);
  bindPair(heightRange, heightNumber, (value) => {
    state.cardHeight = value;
  }, () => state.cardHeight);
  bindPair(titleSizeRange, titleSizeNumber, (value) => {
    state.titleSize = clampFontSize(value, state.cardWidth);
  }, () => state.titleSize);
  bindPair(bodySizeRange, bodySizeNumber, (value) => {
    state.bodySize = clampFontSize(value, state.cardWidth);
  }, () => state.bodySize);
  bindPair(imageRange, imageNumber, (value) => {
    state.imageWidth = value;
  }, () => state.imageWidth);
  const bindSelect = (select: HTMLSelectElement, apply: () => void) => {
    select.addEventListener("focus", () => beginGesture(select));
    select.addEventListener("change", () => {
      apply();
      finishGesture(select);
      void redraw();
    });
    select.addEventListener("blur", () => finishGesture(select));
  };
  bindSelect(titleFontSelect, () => {
    state.titleFontId = titleFontSelect.value;
  });
  bindSelect(bodyFontSelect, () => {
    state.bodyFontId = bodyFontSelect.value;
  });
  root.querySelector("#studio-reset")?.addEventListener("click", () => {
    finishGesture();
    const before = cloneStudio(state);
    const beforeZoom = previewZoom;
    onReset();
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
  });
  titleInput.addEventListener("focus", () => beginGesture(titleInput));
  titleInput.addEventListener("input", () => {
    state.title = titleInput.value;
    void redraw();
  });
  titleInput.addEventListener("blur", () => finishGesture(titleInput));
  bodyInput.addEventListener("focus", () => beginGesture(bodyInput));
  bodyInput.addEventListener("input", () => {
    state.body = bodyInput.value;
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
    state.titleColor = hex;
  }, () => state.titleColor);
  bindColor(bodyColorInput, bodyHexInput, (hex) => {
    state.bodyColor = hex;
  }, () => state.bodyColor);
  const applyRadius = (raw: string) => {
    state.radius = clampRadius(Number(raw));
    syncRadiusControls();
    void redraw();
  };
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

  const themes = [...root.querySelectorAll<HTMLButtonElement>("[data-theme-slug]")];
  for (const button of themes) {
    button.addEventListener("click", () => {
      const slug = button.dataset.themeSlug;
      if (!slug || slug === state.themeSlug) return;
      beginGesture(button);
      selectTheme(slug, false);
      finishGesture(button);
    });
  }
  root.querySelector(".studio__themes")?.addEventListener("keydown", (event) => {
    if (!(event instanceof KeyboardEvent)) return;
    const key = event.key;
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(key)) return;
    event.preventDefault();
    const index = themes.findIndex((button) => button.dataset.themeSlug === state.themeSlug);
    const delta = key === "ArrowLeft" || key === "ArrowUp" ? -1 : 1;
    const next = themes[(index + delta + themes.length) % themes.length];
    const slug = next?.dataset.themeSlug;
    if (!slug || slug === state.themeSlug) return;
    beginGesture(next);
    selectTheme(slug, true);
    finishGesture(next);
  });

  root.querySelector("#studio-copy")?.addEventListener("click", async () => {
    const text = designToCode();
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
      const url = themeUrl();
      const themeData = url ? await themeDataUrl(url) : "";
      const offscreen = document.createElement("canvas");
      await paintForeignObject(
        offscreen,
        studioFragment(documentInput(state, themeData)),
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
    for (const box of hits) if (drag.kinds.includes(box.kind)) strokeDragBox(box);
  };

  type ImageBox = { x: number; y: number; width: number };
  type Point = { x: number; y: number };
  let drag: {
    kind: HitBox["kind"];
    kinds: HitBox["kind"][];
    origin: Point;
    start: Map<HitBox["kind"], Point>;
    pointerId: number;
  } | null = null;
  let tapStart: { x: number; y: number; moved: boolean; shift: boolean } | null = null;
  let lastTap: { kind: HitBox["kind"]; time: number; x: number; y: number } | null = null;
  const touches = new Map<number, { x: number; y: number }>();
  let pinch: { distance: number; mid: { x: number; y: number }; image: ImageBox } | null = null;

  const imageBox = (): ImageBox => ({ x: state.imageX, y: state.imageY, width: state.imageWidth });
  const positionOf = (kind: HitBox["kind"]): Point =>
    kind === "title" ? { x: state.titleX, y: state.titleY }
    : kind === "body" ? { x: state.bodyX, y: state.bodyY }
    : { x: state.imageX, y: state.imageY };
  const clampPosition = (kind: HitBox["kind"], x: number, y: number): Point =>
    kind === "title" ? {
      x: clampTextOffset(x, state.cardWidth, state.titleSize),
      y: clampTextOffset(y, state.cardHeight, state.titleSize),
    }
    : kind === "body" ? {
      x: clampTextOffset(x, state.cardWidth, state.bodySize),
      y: clampTextOffset(y, state.cardHeight, state.bodySize),
    }
    : {
      x: clampImageOffset(x, state.cardWidth, state.imageWidth),
      y: clampImageOffset(y, state.cardHeight, imageDrawHeight()),
    };
  const setPosition = (kind: HitBox["kind"], point: Point) => {
    if (kind === "title") {
      state.titleX = point.x;
      state.titleY = point.y;
    } else if (kind === "body") {
      state.bodyX = point.x;
      state.bodyY = point.y;
    } else {
      state.imageX = point.x;
      state.imageY = point.y;
    }
  };
  const applyImage = (next: ImageBox) => {
    state.imageWidth = next.width;
    state.imageX = clampImageOffset(next.x, state.cardWidth, state.imageWidth);
    state.imageY = clampImageOffset(next.y, state.cardHeight, imageDrawHeight());
  };
  paint = () => {
    hits = drawCard(canvas, state, themeImage, editing?.kind);
    paintDragStroke();
    syncOverlay();
  };

  const placeAt = (element: HTMLElement, x: number, y: number) => {
    element.style.left = `${x * viewScale}px`;
    element.style.top = `${y * viewScale}px`;
  };
  const placeEditor = () => {
    if (!editing) return;
    const title = editing.kind === "title";
    const size = title ? state.titleSize : state.bodySize;
    const fontPx = size * viewScale;
    // iOS zooms the page when a focused field is under 16px, so render at 16px+ and scale down.
    const base = Math.max(16, fontPx);
    const shrink = fontPx / base;
    placeAt(editor, title ? state.titleX : state.bodyX, title ? state.titleY : state.bodyY);
    editor.style.font = `${title ? 600 : 400} ${base}px ${fontStack(title ? state.titleFontId : state.bodyFontId, extraFonts())}`;
    editor.style.lineHeight = `${(Math.round(size * 1.25) * viewScale) / shrink}px`;
    editor.style.color = title ? state.titleColor : state.bodyColor;
    editor.style.width = `${(Math.max(1, state.cardWidth - FONT_SIDE_MARGIN * 2) * viewScale) / shrink}px`;
    editor.style.transform = `scale(${shrink})`;
    editor.style.height = "auto";
    editor.style.height = `${editor.scrollHeight}px`;
  };
  syncOverlay = () => {
    const visible = !editing && !state.code.trim();
    for (const frame of frames) {
      const box = hits.find((hit) => hit.kind === frame.dataset.frame);
      const show = visible && Boolean(box) && selected.has(frame.dataset.frame as HitBox["kind"]);
      frame.hidden = !show;
      if (show && box) {
        placeAt(frame, box.x, box.y);
        frame.style.width = `${box.w * viewScale}px`;
        frame.style.height = `${box.h * viewScale}px`;
      }
    }
    const box = hits.find((hit) => hit.kind === "image");
    const show = visible && selected.size === 1 && selected.has("image") && Boolean(box);
    for (const handle of handles) handle.hidden = !show;
    if (show && box) {
      const inset = 12 / Math.max(viewScale, 0.001);
      const clampX = (value: number) => Math.min(state.cardWidth - inset, Math.max(inset, value));
      const clampY = (value: number) => Math.min(state.cardHeight - inset, Math.max(inset, value));
      const cx = clampX(box.x + box.w / 2);
      const cy = clampY(box.y + box.h / 2);
      for (const handle of handles) {
        const edge = handle.dataset.handle;
        if (edge === "top") placeAt(handle, cx, clampY(box.y));
        else if (edge === "bottom") placeAt(handle, cx, clampY(box.y + box.h));
        else if (edge === "left") placeAt(handle, clampX(box.x), cy);
        else placeAt(handle, clampX(box.x + box.w), cy);
      }
    }
    placeEditor();
  };

  for (const handle of handles) {
    handle.addEventListener("pointerdown", (event) => {
      const box = hits.find((hit) => hit.kind === "image");
      if (!box) return;
      event.preventDefault();
      try {
        handle.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
      beginGesture(handle);
      const edge = handle.dataset.handle;
      const start = imageBox();
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
          : edge === "bottom" ? (box.h + dy) / imageAspect
          : (box.h - dy) / imageAspect;
        applyImage(scaleImageAround(start, width, anchor.x, anchor.y));
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

  const openEditor = (kind: "title" | "body") => {
    if (state.code.trim()) return;
    editing = { kind, original: state[kind] };
    selected.clear();
    beginGesture(editor);
    editor.value = state[kind];
    editor.hidden = false;
    paint();
    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
  };
  const closeEditor = (commit: boolean) => {
    if (!editing) return;
    if (!commit) state[editing.kind] = editing.original;
    editing = null;
    editor.hidden = true;
    paint();
    finishGesture(editor);
    void redraw();
  };
  editor.addEventListener("input", () => {
    if (!editing) return;
    state[editing.kind] = editing.kind === "title" ? editor.value.replace(/\n/g, " ") : editor.value;
    paint();
    syncForm();
  });
  editor.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeEditor(false);
    } else if (event.key === "Enter" && (editing?.kind === "title" || event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      closeEditor(true);
    }
  });
  editor.addEventListener("blur", () => closeEditor(true));

  const registerTap = (kind: HitBox["kind"], event: PointerEvent) => {
    const repeat =
      lastTap &&
      lastTap.kind === kind &&
      event.timeStamp - lastTap.time < 400 &&
      Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 24;
    if (repeat && kind !== "image") {
      lastTap = null;
      openEditor(kind);
      return;
    }
    lastTap = { kind, time: event.timeStamp, x: event.clientX, y: event.clientY };
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
    drag = null;
    tapStart = null;
    delete canvas.dataset.dragging;
    beginGesture(canvas);
    pinch = { ...metrics, image: imageBox() };
    paint();
  };

  canvas.addEventListener("pointerdown", (event) => {
    if (state.code.trim()) return;
    if (editing) closeEditor(true);
    if (event.pointerType === "touch") {
      touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
      if (touches.size === 2 && themeImage) {
        startPinch();
        return;
      }
      if (touches.size > 1) return;
    }
    const point = cardPoint(event);
    const hit = hitAt(point.x, point.y);
    const mouse = event.pointerType === "mouse";
    if (!mouse) selected.clear();
    else if (event.shiftKey) {
      if (hit && selected.has(hit.kind)) selected.delete(hit.kind);
      else if (hit) selected.add(hit.kind);
    } else if (!hit) selected.clear();
    else if (!selected.has(hit.kind)) {
      selected.clear();
      selected.add(hit.kind);
    }
    if (!hit || (mouse && !selected.has(hit.kind))) {
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
    const kinds = mouse ? [...selected] : [hit.kind];
    drag = {
      kind: hit.kind,
      kinds,
      origin: point,
      start: new Map(kinds.map((kind) => [kind, positionOf(kind)])),
      pointerId: event.pointerId,
    };
    canvas.dataset.dragging = "true";
    paint();
  });
  canvas.addEventListener("pointermove", (event) => {
    if (touches.has(event.pointerId)) touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch) {
      const metrics = touches.has(event.pointerId) ? pinchMetrics() : null;
      if (!metrics) return;
      const factor = metrics.distance / Math.max(1, pinch.distance);
      const scaled = scaleImageAround(pinch.image, pinch.image.width * factor, pinch.mid.x, pinch.mid.y);
      applyImage({
        x: scaled.x + metrics.mid.x - pinch.mid.x,
        y: scaled.y + metrics.mid.y - pinch.mid.y,
        width: scaled.width,
      });
      paint();
      return;
    }
    if (tapStart && Math.hypot(event.clientX - tapStart.x, event.clientY - tapStart.y) > 6) tapStart.moved = true;
    const point = cardPoint(event);
    if (!drag || drag.pointerId !== event.pointerId) {
      canvas.dataset.hover = hitAt(point.x, point.y) ? "true" : "false";
      return;
    }
    // Shrink the shared delta to the most constrained item so the group keeps its spacing at card edges.
    const nearer = (a: number, b: number) => (Math.abs(b) < Math.abs(a) ? b : a);
    let dx = point.x - drag.origin.x;
    let dy = point.y - drag.origin.y;
    for (const [kind, start] of drag.start) {
      const clamped = clampPosition(kind, start.x + dx, start.y + dy);
      dx = nearer(dx, clamped.x - start.x);
      dy = nearer(dy, clamped.y - start.y);
    }
    for (const [kind, start] of drag.start) setPosition(kind, clampPosition(kind, start.x + dx, start.y + dy));
    paint();
  });
  const endDrag = (event: PointerEvent) => {
    touches.delete(event.pointerId);
    if (pinch) {
      if (touches.size < 2) {
        pinch = null;
        finishGesture(canvas);
        void redraw();
      }
      return;
    }
    if (!drag || drag.pointerId !== event.pointerId) return;
    const kind = drag.kind;
    drag = null;
    delete canvas.dataset.dragging;
    finishGesture(canvas);
    if (event.type === "pointerup" && tapStart && !tapStart.moved && !tapStart.shift) {
      if (selected.size > 1) {
        selected.clear();
        selected.add(kind);
      }
      registerTap(kind, event);
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
      // Trackpad pinch arrives as a ctrl+wheel event in Chromium and Firefox.
      if (!event.ctrlKey || state.code.trim() || !themeImage) return;
      event.preventDefault();
      beginGesture(wheelOwner);
      const point = cardPoint(event);
      applyImage(scaleImageAround(imageBox(), state.imageWidth * Math.exp(-event.deltaY * 0.01), point.x, point.y));
      paint();
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        finishGesture(wheelOwner);
        void redraw();
      }, 250);
    },
    { passive: false },
  );

  type SafariGesture = Event & { scale: number; clientX: number; clientY: number };
  const safariOwner = new EventTarget();
  let safariPinch: { image: ImageBox; anchor: { x: number; y: number } } | null = null;
  canvas.addEventListener("gesturestart", (event) => {
    event.preventDefault();
    if (pinch || state.code.trim() || !themeImage) return;
    beginGesture(safariOwner);
    safariPinch = { image: imageBox(), anchor: cardPoint(event as SafariGesture) };
  });
  canvas.addEventListener("gesturechange", (event) => {
    event.preventDefault();
    if (!safariPinch || pinch) return;
    const { image, anchor } = safariPinch;
    applyImage(scaleImageAround(image, image.width * (event as SafariGesture).scale, anchor.x, anchor.y));
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
    syncOverlay();
  });

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
