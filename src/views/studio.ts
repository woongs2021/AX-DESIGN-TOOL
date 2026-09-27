import { assetUrl, escapeHtml } from "../lib/dom.ts";
import type { CaptureRecord } from "../shared/index-types.ts";
import {
  clampRadius,
  coverRect,
  designToCode,
  normalizeHex,
  pickInk,
  RADIUS_MAX,
  RADIUS_MIN,
  studioFragment,
  studioSrcdoc,
  wrapText,
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

function drawCard(
  canvas: HTMLCanvasElement,
  state: StudioState,
  image: HTMLImageElement | null,
): void {
  const preset = presetById(state.presetId);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = preset.width;
  canvas.height = preset.height;
  ctx.clearRect(0, 0, preset.width, preset.height);
  ctx.save();
  roundedPath(ctx, preset.width, preset.height, state.radius);
  ctx.clip();
  ctx.fillStyle = state.color;
  ctx.fillRect(0, 0, preset.width, preset.height);

  const band = Math.round(preset.height * 0.28);
  const imageHeight = preset.height - band;
  if (image && image.naturalWidth > 0) {
    const dest = coverRect(image.naturalWidth, image.naturalHeight, preset.width, imageHeight);
    ctx.drawImage(image, dest.x, dest.y, dest.w, dest.h);
  }

  const ink = pickInk(state.color);
  const pad = Math.round(preset.width * 0.05);
  const maxText = preset.width - pad * 2;
  let y = imageHeight + pad;
  ctx.fillStyle = ink;
  ctx.textBaseline = "top";

  const drawLines = (text: string, size: number, weight: number, gap: number) => {
    if (!text.trim() || maxText <= 0) return;
    ctx.font = `${weight} ${size}px "Pretendard Variable", Pretendard, system-ui, sans-serif`;
    const lineHeight = Math.round(size * 1.25);
    for (const line of wrapText(text.trim(), maxText, (value) => ctx.measureText(value).width)) {
      if (y + lineHeight > preset.height - pad / 2) break;
      ctx.fillText(line, pad, y);
      y += lineHeight;
    }
    y += gap;
  };

  drawLines(state.title, Math.max(16, Math.round(preset.width * 0.046)), 600, Math.round(preset.width * 0.012));
  drawLines(state.body, Math.max(14, Math.round(preset.width * 0.026)), 400, 0);
  ctx.restore();
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

  return `
    <section class="studio">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${designSelected ? "true" : "false"}" tabindex="${designSelected ? "0" : "-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${designSelected ? "false" : "true"}" tabindex="${designSelected ? "-1" : "0"}">Code</button>
        </div>

        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${designSelected ? "" : " hidden"}>
          <div class="studio__field">
            <label for="studio-preset">카드 크기</label>
            <select id="studio-preset" class="studio__control">${options}</select>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${escapeHtml(state.title)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${escapeHtml(state.body)}</textarea>
          </div>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${themes}</div>
          </div>
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
  const titleInput = root.querySelector<HTMLInputElement>("#studio-title");
  const bodyInput = root.querySelector<HTMLTextAreaElement>("#studio-body");
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
  if (
    !presetSelect ||
    !titleInput ||
    !bodyInput ||
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
    !exportCode
  ) {
    return;
  }

  const themeUrl = () => {
    const capture = captures.find((item) => item.slug === state.themeSlug) ?? captures[0];
    return capture ? assetUrl(capture.asset.path) : "";
  };

  let drawToken = 0;

  const updateScale = () => {
    const preset = presetById(state.presetId);
    const bounds = stage.getBoundingClientRect();
    const pad = 48;
    const scale = Math.min(
      Math.max(bounds.width - pad, 1) / preset.width,
      Math.max(bounds.height - pad, 1) / preset.height,
    );
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
    fit.style.width = `${preset.width * safeScale}px`;
    fit.style.height = `${preset.height * safeScale}px`;
    scaler.style.width = `${preset.width}px`;
    scaler.style.height = `${preset.height}px`;
    scaler.style.transform = `scale(${safeScale})`;
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
    const preset = presetById(state.presetId);
    const safeNote = preset.safe ? ` · 안전 영역 ${preset.safe.width} × ${preset.safe.height}` : "";
    meta.textContent = `${preset.width} × ${preset.height} · ${preset.name}${safeNote}`;
    exportCode.textContent = designToCode();
    syncRadiusControls();
    updateScale();

    if (preset.safe) {
      safe.hidden = false;
      safe.style.width = `${preset.safe.width}px`;
      safe.style.height = `${preset.safe.height}px`;
    } else {
      safe.hidden = true;
    }

    const url = themeUrl();
    if (state.code.trim()) {
      canvas.hidden = true;
      iframe.hidden = false;
      const themeImage = url ? await themeDataUrl(url) : "";
      if (token !== drawToken) return;
      iframe.srcdoc = studioSrcdoc({
        title: state.title,
        body: state.body,
        themeImage,
        color: state.color,
        radius: state.radius,
        width: preset.width,
        height: preset.height,
        code: state.code,
      });
      return;
    }

    iframe.hidden = true;
    canvas.hidden = false;
    let image: HTMLImageElement | null = null;
    if (url) {
      try {
        image = await loadImage(url);
      } catch {
        image = null;
      }
    }
    if (token !== drawToken) return;
    drawCard(canvas, state, image);
  }

  presetSelect.addEventListener("change", () => {
    state.presetId = presetSelect.value;
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
  colorInput.addEventListener("input", () => {
    const hex = normalizeHex(colorInput.value);
    if (!hex) return;
    state.color = hex;
    hexInput.value = hex;
    void redraw();
  });
  hexInput.addEventListener("input", () => {
    const hex = normalizeHex(hexInput.value);
    if (!hex) return;
    state.color = hex;
    colorInput.value = hex;
    void redraw();
  });
  hexInput.addEventListener("blur", () => {
    if (!normalizeHex(hexInput.value)) hexInput.value = state.color;
  });
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
      const preset = presetById(state.presetId);
      const filename = `ax-studio-${preset.id}-${state.themeSlug || "theme"}.png`;
      if (!state.code.trim()) {
        downloadCanvas(canvas, filename);
        return;
      }
      const url = themeUrl();
      const themeImage = url ? await themeDataUrl(url) : "";
      const offscreen = document.createElement("canvas");
      await paintForeignObject(
        offscreen,
        studioFragment({
          title: state.title,
          body: state.body,
          themeImage,
          color: state.color,
          radius: state.radius,
          width: preset.width,
          height: preset.height,
          code: state.code,
        }),
        preset.width,
        preset.height,
      );
      downloadCanvas(offscreen, filename);
    })();
  });

  root.querySelector("#studio-controls")?.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  previewObserver?.disconnect();
  previewObserver = new ResizeObserver(() => updateScale());
  previewObserver.observe(stage);
  void redraw();
}
