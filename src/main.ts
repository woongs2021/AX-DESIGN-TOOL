import "./shared/tokens.css";
import "./styles/base.css";
import type { SiteIndex } from "./shared/index-types.ts";
import {
  applyStudioBaseline,
  createStudioState,
  DEFAULT_THEME_SLUG,
  normalizeHex,
  normalizeStudioState,
  setStudioTheme,
  parseRgb,
  rgbToHex,
  type StudioState,
} from "./shared/studio.ts";
import { readPins, togglePin } from "./pins.ts";
import { clearBaseline, readBaseline, writeBaseline } from "./studio-baseline.ts";
import { addSavedCard, getSavedCards, loadSavedCards } from "./saved-cards.ts";
import { loadUploads } from "./studio-uploads.ts";
import { confirmProceed, showToast } from "./feedback.ts";
import { hrefFor, isLegacyStudioHash, onRouteChange, parseHash, type Route } from "./router.ts";
import {
  bindArchive,
  renderArchive,
  type ArchiveTab,
} from "./views/archive.ts";
import { bindCaptureDetail, renderCaptureDetail } from "./views/capture.ts";
import { renderHistory } from "./views/history.ts";
import { renderNotFound } from "./views/placeholders.ts";
import { bindStudio, renderStudio } from "./views/studio.ts";

const MODE_KEY = "ax-design-studio-mode";
const DATA_URL = "./data/index.json";

type Mode = "light" | "dark";
type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; index: SiteIndex };

let loadState: LoadState = { status: "loading" };
let pinnedSlugs = readPins();
let archiveTab: ArchiveTab = "all";
let studioState: StudioState | null = null;
let appliedTheme: string | null = null;
let appliedCard: string | null = null;
let route: Route = parseHash();

function readStoredMode(): Mode {
  const stored = localStorage.getItem(MODE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

function applyMode(mode: Mode): void {
  document.documentElement.dataset.theme = "cool";
  document.documentElement.dataset.mode = mode;
  localStorage.setItem(MODE_KEY, mode);
}

function navLink(label: string, href: string, current: boolean): string {
  return `<a class="nav-link${current ? " nav-link--current" : ""}" href="${href}" ${current ? 'aria-current="page"' : ""}>${label}</a>`;
}

function settingsIcon(): string {
  return `
    <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="M19.4 13.1a7.7 7.7 0 0 0 .05-2.2l1.8-1.4-2-3.4-2.2.7a8 8 0 0 0-1.9-1.1L14.6 3h-5.2l-.55 2.7a8 8 0 0 0-1.9 1.1l-2.2-.7-2 3.4 1.8 1.4a7.7 7.7 0 0 0 .05 2.2l-1.8 1.4 2 3.4 2.2-.7a8 8 0 0 0 1.9 1.1l.55 2.7h5.2l.55-2.7a8 8 0 0 0 1.9-1.1l2.2.7 2-3.4-1.8-1.4Z" />
    </svg>
  `;
}

function modeToggleIcon(mode: Mode): string {
  if (mode === "dark") {
    return `
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `;
  }
  return `
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `;
}

function defaultStudioColor(): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--soft").trim();
  const parsed = parseRgb(raw);
  if (parsed) return rgbToHex(parsed.r, parsed.g, parsed.b);
  const fallback = normalizeHex(raw);
  return fallback ?? rgbToHex(216, 241, 255);
}

function knownTheme(theme: string, captures: SiteIndex["captures"]): string | null {
  return captures.some((capture) => capture.slug === theme) ? theme : null;
}

function ensureStudio(
  theme: string | null,
  cardId: string | null,
  captures: SiteIndex["captures"],
): StudioState {
  const valid = theme ? knownTheme(theme, captures) : null;
  if (cardId && cardId !== appliedCard) {
    const saved = getSavedCards().find((card) => card.id === cardId);
    const savedState = saved ? normalizeStudioState(structuredClone(saved.state)) : null;
    if (savedState) {
      studioState = savedState;
      if (!knownTheme(studioState.themeSlug, captures)) {
        studioState.themeSlug = captures[0]?.slug ?? "";
      }
      appliedCard = cardId;
      appliedTheme = theme;
      return studioState;
    }
  }
  if (!cardId) appliedCard = null;
  if (!studioState) {
    const baseline = readBaseline();
    studioState = baseline
      ? structuredClone(baseline)
      : createStudioState(
          valid ?? knownTheme(DEFAULT_THEME_SLUG, captures) ?? captures[0]?.slug ?? "",
          defaultStudioColor(),
        );
    if (baseline && valid) setStudioTheme(studioState, valid);
    if (baseline && !knownTheme(studioState.themeSlug, captures)) {
      studioState.themeSlug = valid ?? captures[0]?.slug ?? "";
    }
    appliedTheme = theme;
    return studioState;
  }
  if (theme && theme !== appliedTheme && valid) {
    setStudioTheme(studioState, valid);
    appliedTheme = theme;
  }
  return studioState;
}

function shell(mainHtml: string): string {
  const mode = readStoredMode();
  const nextModeLabel = mode === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환";
  const studio = route.name === "studio";
  return `
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${navLink("Graphic Library", hrefFor({ name: "archive" }), route.name === "archive" || route.name === "capture")}
        ${navLink("Online Marketing Studio", hrefFor({ name: "studio", theme: null, card: null }), route.name === "studio")}
        ${navLink("History", hrefFor({ name: "history" }), route.name === "history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${nextModeLabel}" title="${nextModeLabel}">
          ${modeToggleIcon(mode)}
        </button>
        <div class="nav-settings">
          <button type="button" class="button button--secondary" id="nav-settings" aria-label="설정" aria-haspopup="menu" aria-expanded="false" aria-controls="nav-settings-menu">
            ${settingsIcon()}
          </button>
          <div class="nav-popover" id="nav-settings-menu" role="menu" hidden>
            <button type="button" class="nav-popover__item" id="nav-reset" role="menuitem">리셋</button>
          </div>
        </div>
      </div>
    </header>
    <main class="shell${studio ? " shell--studio" : ""}" id="main">${mainHtml}</main>
  `;
}

function renderMain(): string {
  if (loadState.status === "loading") {
    return `
      <section class="state-panel state-panel--canvas" aria-busy="true">
        <h1 class="state-panel__title">Loading index</h1>
        <p class="state-panel__text">Reading build JSON. Markdown is never fetched by the browser.</p>
      </section>
    `;
  }
  if (loadState.status === "error") {
    return `
      <section class="state-panel state-panel--soft" role="alert">
        <h1 class="state-panel__title">Index failed to load</h1>
        <p class="state-panel__text">${loadState.message}</p>
        <p class="state-panel__text">Run <code>npm run build -- --target=internal</code> before <code>npm run dev</code>.</p>
        <p class="state-panel__text"><button type="button" class="button" id="index-retry">다시 불러오기</button></p>
      </section>
    `;
  }

  const index = loadState.index;
  switch (route.name) {
    case "archive":
      return renderArchive(index, pinnedSlugs, archiveTab, getSavedCards());
    case "capture":
      return renderCaptureDetail(index, route.slug, pinnedSlugs);
    case "studio":
      return renderStudio(ensureStudio(route.theme, route.card, index.captures), index.captures);
    case "history":
      return renderHistory(index);
    case "notfound":
      return renderNotFound(route.path);
  }
}

function render(): void {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("#app not found");
  applyMode(readStoredMode());
  pinnedSlugs = readPins();
  app.innerHTML = shell(renderMain());

  app.querySelector("#index-retry")?.addEventListener("click", () => {
    void loadIndex();
  });

  app.querySelector("#mode-toggle")?.addEventListener("click", () => {
    applyMode(readStoredMode() === "dark" ? "light" : "dark");
    render();
  });
  bindSettingsMenu(app);

  if (loadState.status !== "ready") return;

  if (route.name === "archive") {
    bindArchive(app, {
      onTabChange: (tab) => {
        archiveTab = tab;
        render();
        document
          .querySelector<HTMLElement>(`[data-archive-tab="${tab}"]`)
          ?.focus();
      },
    });
  }

  if (route.name === "capture") {
    bindCaptureDetail(app, (slug) => {
      pinnedSlugs = togglePin(slug);
      render();
    });
  }

  if (route.name === "studio" && loadState.status === "ready" && studioState) {
    bindStudio(app, studioState, loadState.index.captures, {
      onReset: () => {
        if (!studioState) return;
        applyStudioBaseline(studioState, readBaseline(), defaultStudioColor());
        render();
        document.querySelector<HTMLButtonElement>("#studio-reset")?.focus();
      },
      onSetBaseline: () => {
        if (!studioState) return;
        writeBaseline(structuredClone(studioState));
      },
      onAddToLibrary: (thumbnail) => {
        if (!studioState) return Promise.resolve(false);
        return addSavedCard(studioState, thumbnail).then((card) => card !== null);
      },
    });
  }
}

function bindSettingsMenu(app: HTMLElement): void {
  const button = app.querySelector<HTMLButtonElement>("#nav-settings");
  const menu = app.querySelector<HTMLElement>("#nav-settings-menu");
  const wrap = app.querySelector<HTMLElement>(".nav-settings");
  if (!button || !menu || !wrap) return;
  const close = () => {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", onDoc);
    document.removeEventListener("keydown", onKey);
  };
  const onDoc = (event: MouseEvent) => {
    if (event.target instanceof Node && wrap.contains(event.target)) return;
    close();
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") close();
  };
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = menu.hidden;
    if (!open) {
      close();
      return;
    }
    menu.hidden = false;
    button.setAttribute("aria-expanded", "true");
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
  });
  app.querySelector("#nav-reset")?.addEventListener("click", () => {
    close();
    void (async () => {
      const ok = await confirmProceed("세팅한 초기화 기준을 지우고 진행하시겠습니까?");
      if (!ok) return;
      clearBaseline();
      appliedCard = null;
      if (studioState) {
        const captures = loadState.status === "ready" ? loadState.index.captures : [];
        const theme = knownTheme(DEFAULT_THEME_SLUG, captures) ?? studioState.themeSlug;
        studioState = createStudioState(theme, defaultStudioColor());
      }
      if (route.name === "studio" && route.card) {
        route = { name: "studio", theme: null, card: null };
        history.replaceState(null, "", hrefFor(route));
      }
      render();
      showToast("리셋하였습니다.");
    })();
  });
}

async function readIndex(): Promise<SiteIndex> {
  const response = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`${DATA_URL} → HTTP ${response.status}`);
  const text = await response.text();
  // A rebuild deletes dist/internal for a moment. Vite then answers with index.html.
  if (text.trimStart().startsWith("<")) {
    throw new Error("index.json 대신 HTML이 왔습니다. 데이터 빌드가 끝나는 중일 수 있습니다.");
  }
  const index = JSON.parse(text) as SiteIndex;
  if (!index || !Array.isArray(index.captures) || !index.facets) {
    throw new Error("Index JSON is missing captures or facets");
  }
  return index;
}

async function loadIndex(): Promise<void> {
  loadState = { status: "loading" };
  render();
  let lastError: unknown;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const index = await readIndex();
      await Promise.all([loadSavedCards(), loadUploads()]);
      loadState = { status: "ready", index };
      render();
      return;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => window.setTimeout(resolve, 400));
    }
  }
  loadState = {
    status: "error",
    message: lastError instanceof Error ? lastError.message : String(lastError),
  };
  render();
}

onRouteChange((next) => {
  if (isLegacyStudioHash(window.location.hash)) {
    window.location.replace(hrefFor({ name: "studio", theme: null, card: null }));
    return;
  }
  route = next;
  render();
});

void loadIndex();
