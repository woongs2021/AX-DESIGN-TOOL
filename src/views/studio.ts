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
  RADIUS_MAX,
  RADIUS_MIN,
  studioFragment,
  studioSrcdoc,
  wrapText,
  type StudioDocumentInput,
  type StudioState,
} from "../shared/studio.ts";
import { presetById, STUDIO_PRESETS } from "../shared/studio-presets.ts";

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
    fontStack: fontStack(state.fontId, extraFonts()),
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

  const stack = fontStack(state.fontId, extraFonts());
  const maxText = Math.max(1, width - FONT_SIDE_MARGIN * 2);
  ctx.textBaseline = "top";

  const paintText = (
    kind: "title" | "body",
    text: string,
    x: number,
    y: number,
    size: number,
    weight: number,
    color: string,
  ): void => {
    if (!text.trim()) return;
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px ${stack}`;
    const lines = wrapText(text.trim(), maxText, (value) => ctx.measureText(value).width);
    const lineHeight = Math.round(size * 1.25);
    let widest = 0;
    lines.forEach((line, index) => {
      ctx.fillText(line, x, y + index * lineHeight);
      widest = Math.max(widest, ctx.measureText(line).width);
    });
    hits.push({ kind, x, y, w: Math.max(widest, size), h: Math.max(lines.length, 1) * lineHeight });
  };

  paintText("body", state.body, state.bodyX, state.bodyY, state.bodySize, 400, state.bodyColor);
  paintText("title", state.title, state.titleX, state.titleY, state.titleSize, 600, state.titleColor);
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
  const fontOptions = fonts
    .map(
      (font) =>
        `<option value="${escapeHtml(font.id)}"${font.id === state.fontId ? " selected" : ""}>${escapeHtml(font.label)}</option>`,
    )
    .join("");

  return `
    <section class="studio" style="--studio-controls-width:${state.controlsWidth}px">
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
              <input id="studio-title-color" class="studio__color-picker" type="color" value="${escapeHtml(state.titleColor)}" aria-label="타이틀 컬러 피커" />
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
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${escapeHtml(state.body)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker" type="color" value="${escapeHtml(state.bodyColor)}" aria-label="본문 컬러 피커" />
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
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮길 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-font">폰트</label>
            <select id="studio-font" class="studio__control">${fontOptions}</select>
          </div>
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
          <p class="studio__hint">프리뷰에서 이미지를 드래그해 옮길 수 있습니다.</p>
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
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${CONTROLS_MIN}" aria-valuenow="${state.controlsWidth}" tabindex="0"></div>

      <div class="studio__preview">
        <div class="studio__stage" id="studio-stage">
          <div class="studio__fit" id="studio-fit">
            <div class="studio__scaler" id="studio-scaler">
              <canvas id="studio-canvas" aria-label="카드 프리뷰"></canvas>
              <iframe id="studio-iframe" title="카드 코드 프리뷰" sandbox="" referrerpolicy="no-referrer" hidden></iframe>
              <div class="studio__safe" id="studio-safe" hidden></div>
            </div>
          </div>
        </div>
        <div class="studio__bar">
          <p class="studio__meta" id="studio-meta" aria-live="polite"></p>
          <button type="button" class="button" id="studio-download">PNG 다운로드</button>
        </div>
      </div>
    </section>
  `;
}

export function bindStudio(
  root: HTMLElement,
  state: StudioState,
  captures: CaptureRecord[],
): void {
  if (captures.length === 0) return;
  const presetSelect = root.querySelector<HTMLSelectElement>("#studio-preset");
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
  const fontSelect = root.querySelector<HTMLSelectElement>("#studio-font");
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
  const exportCode = root.querySelector<HTMLElement>("#studio-export");
  const splitter = root.querySelector<HTMLElement>("#studio-splitter");
  const studio = root.querySelector<HTMLElement>(".studio");
  if (
    !presetSelect ||
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
    !fontSelect ||
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

  const updateScale = () => {
    const bounds = stage.getBoundingClientRect();
    const pad = 48;
    const scale = Math.min(
      Math.max(bounds.width - pad, 1) / state.cardWidth,
      Math.max(bounds.height - pad, 1) / state.cardHeight,
    );
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
    fit.style.width = `${state.cardWidth * safeScale}px`;
    fit.style.height = `${state.cardHeight * safeScale}px`;
    scaler.style.width = `${state.cardWidth}px`;
    scaler.style.height = `${state.cardHeight}px`;
    scaler.style.transform = `scale(${safeScale})`;
  };

  let themeImage: HTMLImageElement | null = null;
  let imageAspect = 1;
  let hits: HitBox[] = [];

  const imageDrawHeight = () => state.imageWidth * imageAspect;

  const clampLayout = () => {
    state.cardWidth = clampCardSize(state.cardWidth);
    state.cardHeight = clampCardSize(state.cardHeight);
    state.titleSize = clampFontSize(state.titleSize, state.cardWidth);
    state.bodySize = clampFontSize(state.bodySize, state.cardWidth);
    state.imageWidth = clampImageWidth(state.imageWidth);
    state.titleX = clampTextOffset(state.titleX, state.cardWidth, state.titleSize);
    state.titleY = clampTextOffset(state.titleY, state.cardHeight, state.titleSize);
    state.bodyX = clampTextOffset(state.bodyX, state.cardWidth, state.bodySize);
    state.bodyY = clampTextOffset(state.bodyY, state.cardHeight, state.bodySize);
    state.imageX = clampImageOffset(state.imageX, state.cardWidth, state.imageWidth);
    state.imageY = clampImageOffset(state.imageY, state.cardHeight, imageDrawHeight());
  };

  const writeControl = (range: HTMLInputElement, number: HTMLInputElement, value: number) => {
    range.value = String(value);
    if (document.activeElement !== number) number.value = String(value);
  };

  const syncSizeControls = () => {
    const fontMax = String(maxFontSize(state.cardWidth));
    for (const input of [titleSizeRange, titleSizeNumber, bodySizeRange, bodySizeNumber]) {
      input.min = "5";
      input.max = fontMax;
    }
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

  const redraw = async (): Promise<void> => {
    const token = ++drawToken;
    clampLayout();
    syncSizeControls();
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

    const family = fontStack(state.fontId, extraFonts()).split(",")[0]?.replaceAll('"', "").trim();
    if (family) {
      try {
        await Promise.all([
          document.fonts.load(`600 ${state.titleSize}px "${family}"`),
          document.fonts.load(`400 ${state.bodySize}px "${family}"`),
        ]);
      } catch {
        /* the canvas stack falls through to the next family */
      }
    }
    if (token !== drawToken) return;

    const url = themeUrl();
    if (state.code.trim()) {
      canvas.hidden = true;
      iframe.hidden = false;
      const themeData = url ? await themeDataUrl(url) : "";
      if (token !== drawToken) return;
      iframe.srcdoc = studioSrcdoc(documentInput(state, themeData));
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
    hits = drawCard(canvas, state, themeImage);
  };

  const bindPair = (
    range: HTMLInputElement,
    number: HTMLInputElement,
    apply: (value: number) => void,
    read: () => number,
  ) => {
    range.addEventListener("input", () => {
      apply(Number(range.value));
      void redraw();
    });
    const commitNumber = () => {
      clampLayout();
      number.value = String(read());
    };
    number.addEventListener("input", () => {
      if (number.value.trim() === "") return;
      apply(Number(number.value));
      void redraw();
    });
    number.addEventListener("change", commitNumber);
    number.addEventListener("blur", commitNumber);
  };

  presetSelect.addEventListener("change", () => {
    const preset = presetById(presetSelect.value);
    state.presetId = preset.id;
    state.cardWidth = preset.width;
    state.cardHeight = preset.height;
    void redraw();
  });
  bindPair(widthRange, widthNumber, (value) => {
    state.cardWidth = value;
  }, () => state.cardWidth);
  bindPair(heightRange, heightNumber, (value) => {
    state.cardHeight = value;
  }, () => state.cardHeight);
  bindPair(titleSizeRange, titleSizeNumber, (value) => {
    state.titleSize = value;
  }, () => state.titleSize);
  bindPair(bodySizeRange, bodySizeNumber, (value) => {
    state.bodySize = value;
  }, () => state.bodySize);
  bindPair(imageRange, imageNumber, (value) => {
    state.imageWidth = value;
  }, () => state.imageWidth);
  fontSelect.addEventListener("change", () => {
    state.fontId = fontSelect.value;
    void redraw();
  });
  titleInput.addEventListener("input", () => {
    state.title = titleInput.value;
    void redraw();
  });
  bodyInput.addEventListener("input", () => {
    state.body = bodyInput.value;
    void redraw();
  });
  const bindColor = (
    picker: HTMLInputElement,
    hexField: HTMLInputElement,
    apply: (hex: string) => void,
    read: () => string,
  ) => {
    picker.addEventListener("input", () => {
      const hex = normalizeHex(picker.value);
      if (!hex) return;
      apply(hex);
      hexField.value = hex;
      void redraw();
    });
    hexField.addEventListener("input", () => {
      const hex = normalizeHex(hexField.value);
      if (!hex) return;
      apply(hex);
      picker.value = hex;
      void redraw();
    });
    hexField.addEventListener("blur", () => {
      if (!normalizeHex(hexField.value)) hexField.value = read();
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
  radiusRange.addEventListener("input", () => applyRadius(radiusRange.value));
  radiusNumber.addEventListener("input", () => applyRadius(radiusNumber.value));

  codeInput.addEventListener("input", () => {
    state.code = codeInput.value;
    void redraw();
  });

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
      if (slug) selectTheme(slug, false);
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
    if (slug) selectTheme(slug, true);
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

  const cardPoint = (event: PointerEvent) => {
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

  let drag: { kind: HitBox["kind"]; dx: number; dy: number; pointerId: number } | null = null;
  canvas.addEventListener("pointerdown", (event) => {
    if (state.code.trim()) return;
    const point = cardPoint(event);
    const hit = hitAt(point.x, point.y);
    if (!hit) return;
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      /* the pointer can already be inactive */
    }
    drag = { kind: hit.kind, dx: point.x - hit.x, dy: point.y - hit.y, pointerId: event.pointerId };
    canvas.dataset.dragging = "true";
  });
  canvas.addEventListener("pointermove", (event) => {
    const point = cardPoint(event);
    if (!drag || drag.pointerId !== event.pointerId) {
      canvas.dataset.hover = hitAt(point.x, point.y) ? "true" : "false";
      return;
    }
    const x = point.x - drag.dx;
    const y = point.y - drag.dy;
    if (drag.kind === "title") {
      state.titleX = clampTextOffset(x, state.cardWidth, state.titleSize);
      state.titleY = clampTextOffset(y, state.cardHeight, state.titleSize);
    } else if (drag.kind === "body") {
      state.bodyX = clampTextOffset(x, state.cardWidth, state.bodySize);
      state.bodyY = clampTextOffset(y, state.cardHeight, state.bodySize);
    } else {
      state.imageX = clampImageOffset(x, state.cardWidth, state.imageWidth);
      state.imageY = clampImageOffset(y, state.cardHeight, imageDrawHeight());
    }
    hits = drawCard(canvas, state, themeImage);
  });
  const endDrag = (event: PointerEvent) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    drag = null;
    delete canvas.dataset.dragging;
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  const applyControlsWidth = (value: number) => {
    const studioWidth = studio.getBoundingClientRect().width;
    const room = CONTROLS_MIN + PREVIEW_MIN + 10;
    const requested = Number.isFinite(value) ? value : state.controlsWidth;
    state.controlsWidth = studioWidth >= room
      ? clampControlsWidth(requested, studioWidth)
      : Math.max(CONTROLS_MIN, Math.round(requested));
    studio.style.setProperty("--studio-controls-width", `${state.controlsWidth}px`);
    splitter.setAttribute("aria-valuenow", String(state.controlsWidth));
    splitter.setAttribute(
      "aria-valuemax",
      String(studioWidth >= room ? Math.max(CONTROLS_MIN, Math.round(studioWidth) - PREVIEW_MIN - 10) : state.controlsWidth),
    );
    updateScale();
  };
  applyControlsWidth(state.controlsWidth);

  splitter.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 1023px)").matches) return;
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
