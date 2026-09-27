import "./shared/tokens.css";
import "./styles/base.css";
import type { FilterState } from "./shared/filter.ts";
import type { SiteIndex } from "./shared/index-types.ts";
import {
  createStudioState,
  resetStudioState,
  normalizeHex,
  parseRgb,
  rgbToHex,
  type StudioState,
} from "./shared/studio.ts";
import { readPins, togglePin } from "./pins.ts";
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

const MODE_KEY = "design-llm-wiki-mode";
const DATA_URL = "./data/index.json";

type Mode = "light" | "dark";
type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; index: SiteIndex };

let loadState: LoadState = { status: "loading" };
let filters: FilterState = {
  query: "",
  platforms: [],
  screenTypes: [],
  uiPatterns: [],
  tags: [],
  tones: [],
};
let pinnedSlugs = readPins();
let archiveTab: ArchiveTab = "all";
let studioState: StudioState | null = null;
let appliedTheme: string | null = null;
let route: Route = parseHash();

function readStoredMode(): Mode {
  return localStorage.getItem(MODE_KEY) === "dark" ? "dark" : "light";
}

function applyMode(mode: Mode): void {
  document.documentElement.dataset.theme = "cool";
  document.documentElement.dataset.mode = mode;
  localStorage.setItem(MODE_KEY, mode);
}

function navLink(label: string, href: string, current: boolean): string {
  return `<a class="nav-link${current ? " nav-link--current" : ""}" href="${href}" ${current ? 'aria-current="page"' : ""}>${label}</a>`;
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

function ensureStudio(theme: string | null, captures: SiteIndex["captures"]): StudioState {
  const valid = theme && captures.some((capture) => capture.slug === theme) ? theme : null;
  if (!studioState) {
    studioState = createStudioState(valid ?? captures[0]?.slug ?? "", defaultStudioColor());
    appliedTheme = theme;
    return studioState;
  }
  if (theme && theme !== appliedTheme && valid) {
    studioState.themeSlug = valid;
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
        ${navLink("Archive", hrefFor({ name: "archive" }), route.name === "archive" || route.name === "capture")}
        ${navLink("Online Marketing Studio", hrefFor({ name: "studio", theme: null }), route.name === "studio")}
        ${navLink("History", hrefFor({ name: "history" }), route.name === "history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${nextModeLabel}" title="${nextModeLabel}">
          ${modeToggleIcon(mode)}
        </button>
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
      </section>
    `;
  }

  const index = loadState.index;
  switch (route.name) {
    case "archive":
      return renderArchive(index, filters, pinnedSlugs, archiveTab);
    case "capture":
      return renderCaptureDetail(index, route.slug, pinnedSlugs);
    case "studio":
      return renderStudio(ensureStudio(route.theme, index.captures), index.captures);
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

  app.querySelector("#mode-toggle")?.addEventListener("click", () => {
    applyMode(readStoredMode() === "dark" ? "light" : "dark");
    render();
  });

  if (loadState.status !== "ready") return;

  if (route.name === "archive") {
    bindArchive(app, filters, {
      onFilterChange: (next) => {
        const active = document.activeElement as HTMLElement | null;
        const restore = active?.id === "archive-search" ? "search" : null;
        filters = next;
        render();
        if (restore === "search") {
          const search =
            document.querySelector<HTMLInputElement>("#archive-search");
          search?.focus();
          const len = search?.value.length ?? 0;
          search?.setSelectionRange(len, len);
        }
      },
      onClearFilters: () => {
        filters = {
          query: "",
          platforms: [],
          screenTypes: [],
          uiPatterns: [],
          tags: [],
          tones: [],
        };
        render();
        document.querySelector<HTMLInputElement>("#archive-search")?.focus();
      },
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
    bindStudio(app, studioState, loadState.index.captures, () => {
      if (!studioState) return;
      resetStudioState(studioState, defaultStudioColor());
      render();
      document.querySelector<HTMLButtonElement>("#studio-reset")?.focus();
    });
  }
}

async function loadIndex(): Promise<void> {
  loadState = { status: "loading" };
  render();
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`${DATA_URL} → HTTP ${response.status}`);
    }
    const index = (await response.json()) as SiteIndex;
    if (!index || !Array.isArray(index.captures) || !index.facets) {
      throw new Error("Index JSON is missing captures or facets");
    }
    loadState = { status: "ready", index };
  } catch (error) {
    loadState = {
      status: "error",
      message: error instanceof Error ? error.message : String(error),
    };
  }
  render();
}

onRouteChange((next) => {
  if (isLegacyStudioHash(window.location.hash)) {
    window.location.replace(hrefFor({ name: "studio", theme: null }));
    return;
  }
  route = next;
  render();
});

void loadIndex();
