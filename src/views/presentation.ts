/**
 * PowerPoint-style shell around the shared studio editor.
 * The left rail is the ten pages. The right side is the selected Slide.
 */
import { PAGE_ENTER_EVENT, PRESENT_LAYOUT_EVENT } from "../shared/presentation-files.ts";
import { syncPresentationProject } from "./presentation-project.ts";
import {
  bindStudio,
  conferenceStudioConfig,
  notePageClip,
  pageClipIsCurrent,
  renderStudio,
  renderStudioScene,
  renderStudioStill,
  studioImagesReady,
  type StudioConfig,
} from "./studio.ts";
import type { ConferenceIndex } from "../shared/conference.ts";
import { scenesHtml } from "../shared/scene-html.ts";
import { scenesPdf } from "../shared/scene-pdf.ts";
import { slidesPptx, type SlideScene } from "../shared/slides-pptx.ts";
import { showToast } from "../feedback.ts";
import {
  createBlankPage,
  createTypedPage,
  duplicatePresentationPage,
  insertPresentationPage,
  movePresentationPages,
  pageTitle,
  removePresentationPage,
  removePresentationPages,
  reorderPresentationPage,
  type PresentationDeck,
  type PresentationPage,
  type PresentationTone,
  type PresentationType,
} from "../shared/presentation.ts";

const TYPE_LABEL: Record<PresentationType, string> = { 1: "유형 1", 2: "유형 2", 3: "유형 3" };
const RAIL_KEY = "ax-presentation-rail";
const RAIL_OPEN_KEY = "ax-presentation-rail-open";
const RAIL_MIN = 160;
const RAIL_DEFAULT = 188;
const STAGE_MIN = 480;
const SAMPLE_KEY = "ax-presentation-sample";
let stopPageKeys: (() => void) | null = null;
let stopPageClip: (() => void) | null = null;
let stopPageMenu: (() => void) | null = null;
let railObserver: ResizeObserver | null = null;
let stopRailTogglePlace: (() => void) | null = null;
/** Page list offset, kept across re-renders so a click does not move the list. */
let railScroll = { top: 0, left: 0 };
let thumbMirror = 0;
let thumbJob = 0;
let ignorePageClick = false;
let renameAt: number | null = null;
let pickedType: PresentationType = 1;
const typeThumbCache = new Map<string, string>();
const typeThumbPending = new Set<string>();
type PageClip = { kind: "type"; type: PresentationType } | { kind: "pages"; pages: PresentationPage[] };
let pageClip: PageClip | null = null;
const IS_MAC = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
const PAGE_LONG_PRESS_MS = 500;
type PageMenuAnchor = { kind: "page"; at: number } | { kind: "type"; type: PresentationType };
type PageMenuRequest = { x: number; y: number; anchor: PageMenuAnchor };
let pendingPageMenu: PageMenuRequest | null = null;
let pageLongPress: { timer: number; pointerId: number; x: number; y: number } | null = null;
/** The press that opened the page menu must not also drag the page. */
let blockPageDrag = false;
/** Shift+click range, by page id. It always holds the selected page; fewer than two means a single page. */
const pickedIds = new Set<string>();
let pickAnchor: string | null = null;

function pickedAts(deck: PresentationDeck): number[] {
  const ats = deck.pages.flatMap((page, at) => (pickedIds.has(page.id) ? [at] : []));
  return ats.length > 1 ? ats : [deck.selected];
}

function clearPicked(): void {
  pickedIds.clear();
  pickAnchor = null;
}

function pickRange(deck: PresentationDeck, at: number): void {
  const anchorAt = deck.pages.findIndex((page) => page.id === pickAnchor);
  const from = anchorAt >= 0 ? anchorAt : deck.selected;
  pickAnchor = deck.pages[from]?.id ?? null;
  pickedIds.clear();
  for (let step = Math.min(from, at); step <= Math.max(from, at); step += 1) {
    const page = deck.pages[step];
    if (page) pickedIds.add(page.id);
  }
}

function cancelPageLongPress(): void {
  if (pageLongPress) window.clearTimeout(pageLongPress.timer);
  pageLongPress = null;
}

function pageAts(deck: PresentationDeck, at: number): number[] {
  const source = deck.pages[at];
  if (!source) return [];
  return pickedIds.size > 1 && pickedIds.has(source.id) ? pickedAts(deck) : [at];
}

function copyPageType(type: PresentationType): void {
  pageClip = { kind: "type", type };
  notePageClip();
}

function copyPageAt(deck: PresentationDeck, at: number): boolean {
  const pages = pageAts(deck, at).flatMap((item) => deck.pages[item] ?? []);
  if (!pages.length) return false;
  pageClip = { kind: "pages", pages: pages.map(duplicatePresentationPage) };
  notePageClip();
  return true;
}

function cutPageAt(deck: PresentationDeck, at: number, remember: () => void, onChange: () => void): boolean {
  const ats = pageAts(deck, at);
  const pages = ats.flatMap((item) => deck.pages[item] ?? []);
  if (!pages.length) return false;
  remember();
  const before = snapDeck(deck);
  if (!removePresentationPages(deck, ats)) {
    showToast("페이지는 한 장 이상 남아야 합니다.");
    return false;
  }
  markDeck(before);
  pageClip = { kind: "pages", pages: pages.map((page) => structuredClone(page)) };
  notePageClip();
  clearPicked();
  onChange();
  document.querySelector<HTMLButtonElement>(`[data-deck-page="${deck.selected}"]`)?.focus({ preventScroll: true });
  return true;
}

function pastePageClip(deck: PresentationDeck, index: ConferenceIndex, remember: () => void, onChange: () => void): boolean {
  if (!pageClip) return false;
  remember();
  const created = pageClip.kind === "type"
    ? [createTypedPage(pageClip.type, index, appTone())]
    : pageClip.pages.map((page) => (deck.pages.some((item) => item.id === page.id) ? duplicatePresentationPage(page) : structuredClone(page)));
  markDeck(snapDeck(deck));
  for (const page of created) insertPresentationPage(deck, deck.selected, page);
  clearPicked();
  if (created.length > 1) {
    for (const page of created) pickedIds.add(page.id);
    pickAnchor = created[0]?.id ?? null;
  }
  onChange();
  document.querySelector<HTMLButtonElement>(`[data-deck-page="${deck.selected}"]`)?.focus({ preventScroll: true });
  return true;
}

function deletePageAt(deck: PresentationDeck, at: number, remember: () => void, onChange: () => void): boolean {
  const ats = pageAts(deck, at);
  if (!ats.length) return false;
  remember();
  const before = snapDeck(deck);
  if (!(ats.length > 1 ? removePresentationPages(deck, ats) : removePresentationPage(deck, at))) return false;
  clearPicked();
  markDeck(before);
  onChange();
  document.querySelector<HTMLButtonElement>(`[data-deck-page="${deck.selected}"]`)?.focus({ preventScroll: true });
  return true;
}

/** Page add, delete, move, and rename. Slide edits keep the studio's per-page history. */
type DeckSnap = { pages: PresentationPage[]; names: string[]; selected: number };
const DECK_HISTORY_LIMIT = 50;
let stopDeckKeys: (() => void) | null = null;
let historyDeck: PresentationDeck | null = null;
const deckUndo: DeckSnap[] = [];
const deckRedo: DeckSnap[] = [];

function snapDeck(deck: PresentationDeck): DeckSnap {
  return { pages: [...deck.pages], names: deck.pages.map((page) => page.name), selected: deck.selected };
}

function markDeck(snap: DeckSnap): void {
  deckUndo.push(snap);
  if (deckUndo.length > DECK_HISTORY_LIMIT) deckUndo.shift();
  deckRedo.length = 0;
}

function restoreDeck(deck: PresentationDeck, snap: DeckSnap): void {
  deck.pages.splice(0, deck.pages.length, ...snap.pages);
  snap.pages.forEach((page, at) => {
    page.name = snap.names[at] ?? "";
  });
  deck.selected = Math.min(Math.max(0, snap.selected), deck.pages.length - 1);
}

function readRailWidth(): number {
  try {
    const value = Number(localStorage.getItem(RAIL_KEY));
    if (Number.isFinite(value) && value >= RAIL_MIN) return Math.round(value);
  } catch {
    /* Keep the default page-list width. */
  }
  return RAIL_DEFAULT;
}

function readRailOpen(): boolean {
  try {
    return localStorage.getItem(RAIL_OPEN_KEY) !== "closed";
  } catch {
    return true;
  }
}

function readSampleScale(): number {
  try {
    const raw = localStorage.getItem(SAMPLE_KEY);
    if (raw == null || raw === "") return 1;
    const value = Number(raw);
    if (Number.isFinite(value)) return Math.min(1, Math.max(0, value));
  } catch {
    /* Keep the enlarged preview at its full size. */
  }
  return 1;
}

/** Shrinks only the enlarged type image. Its current 16:9 size is the maximum. */
function bindSampleHeight(root: HTMLElement): void {
  const types = root.querySelector<HTMLElement>(".deck__types");
  const splitter = root.querySelector<HTMLElement>("#deck-type-splitter");
  if (!types || !splitter) return;
  let scale = readSampleScale();
  const travel = () => {
    const style = getComputedStyle(types);
    const width = types.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    return Math.max(1, width * (9 / 16));
  };
  const apply = (next: number) => {
    scale = Math.round(Math.min(1, Math.max(0, next)) * 1000) / 1000;
    if (scale >= 0.999) types.style.removeProperty("--deck-sample-scale");
    else types.style.setProperty("--deck-sample-scale", String(scale));
    const shown = Math.round(scale * 100);
    splitter.setAttribute("aria-valuenow", String(shown));
    splitter.setAttribute("aria-valuetext", `${shown}%`);
    try {
      localStorage.setItem(SAMPLE_KEY, String(scale));
    } catch {
      /* The size still applies until the next reload. */
    }
  };
  apply(scale);
  splitter.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    try {
      splitter.setPointerCapture(event.pointerId);
    } catch {
      /* the pointer can already be inactive */
    }
    const distance = travel();
    const originY = event.clientY;
    const origin = scale;
    splitter.classList.add("is-dragging");
    const previousCursor = document.documentElement.style.cursor;
    document.documentElement.style.cursor = "row-resize";
    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId) return;
      apply(origin + (ev.clientY - originY) / distance);
    };
    const end = (ev: PointerEvent) => {
      if (ev.pointerId !== event.pointerId) return;
      splitter.classList.remove("is-dragging");
      document.documentElement.style.cursor = previousCursor;
      splitter.removeEventListener("pointermove", move);
      splitter.removeEventListener("pointerup", end);
      splitter.removeEventListener("pointercancel", end);
    };
    splitter.addEventListener("pointermove", move);
    splitter.addEventListener("pointerup", end);
    splitter.addEventListener("pointercancel", end);
  });
  splitter.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const step = event.shiftKey ? 0.15 : 0.05;
    apply(scale + (event.key === "ArrowDown" ? step : -step));
  });
}

export function presentationStudioConfig(index: ConferenceIndex, historyKey: string, pageId = ""): StudioConfig {
  const base = conferenceStudioConfig(index);
  const slide = base.presets.find((item) => item.id === "conf-slide") ?? base.presets[0];
  return {
    id: "presentation",
    historyKey,
    ...(pageId ? { pageId } : {}),
    presets: slide ? [slide] : base.presets,
    presetThumbs: base.presetThumbs,
    groups: [
      ...base.groups.map((group) => ({ ...group, hidden: true })),
      { id: "page", label: "이 페이지", items: [] },
    ],
    conference: index,
  };
}

export function renderPresentation(deck: PresentationDeck, index: ConferenceIndex): string {
  const page = deck.pages[deck.selected] ?? deck.pages[0];
  if (!page) return "";
  const tone = appTone();
  const types = ([1, 2, 3] as const)
    .map((type) => {
      const sample = createTypedPage(type, index, tone);
      const cached = typeThumbCache.get(typeThumbKey(type, tone));
      return `
        <button type="button" class="deck__type" data-deck-type="${type}" aria-pressed="${pickedType === type ? "true" : "false"}" aria-label="${TYPE_LABEL[type]}">
          <span class="deck__thumb" style="background:${escapeHtml(sample.state.color)}"><img alt=""${cached ? ` src="${cached}"` : ""}></span>
          <span class="deck__meta">유형 ${type}</span>
        </button>`;
    })
    .join("");
  const picked = createTypedPage(pickedType, index, tone);
  const pickedThumb = typeThumbCache.get(typeThumbKey(pickedType, tone));
  const sample = `
        <button type="button" class="deck__sample" data-deck-sample="${pickedType}" aria-label="${TYPE_LABEL[pickedType]} 프리뷰. 복사해서 페이지 뒤에 붙여넣습니다.">
          <span class="deck__thumb" style="background:${escapeHtml(picked.state.color)}"><img alt=""${pickedThumb ? ` src="${pickedThumb}"` : ""}></span>
        </button>`;
  if (!pickedIds.has(page.id) || ![...pickedIds].every((id) => deck.pages.some((item) => item.id === id))) clearPicked();
  const range = pickedIds.size > 1;
  const pages = deck.pages
    .map((item, at) => {
      const current = at === deck.selected;
      const picked = range && pickedIds.has(item.id);
      const title = escapeHtml(pageTitle(item));
      const thumb = current
        ? `<canvas class="deck__thumb-live" width="960" height="540" aria-hidden="true"></canvas>`
        : item.thumb
          ? `<img alt="" src="${item.thumb}">`
          : `<span class="deck__thumb-title">${title}</span>`;
      const label = pageName(item, at);
      const meta = renameAt === at
        ? `<input class="deck__name" data-deck-name="${at}" value="${escapeHtml(label)}" aria-label="페이지 이름" />`
        : `<span class="deck__meta" data-deck-name="${at}">${escapeHtml(label)}</span>`;
      return `
        <div class="deck__page${picked ? " deck__page--picked" : ""}">
          <button type="button" class="deck__open" data-deck-page="${at}"${current ? ' aria-current="true"' : ""} aria-label="${escapeHtml(label)} ${title}${picked ? " (선택됨)" : ""}">
            <span class="deck__thumb" style="background:${escapeHtml(item.state.color)}">${thumb}</span>
          </button>
          ${meta}
        </div>`;
    })
    .join("");
  const config = presentationStudioConfig(index, `presentation:${page.id}`, page.id);
  const rail = readRailWidth();
  const railOpen = readRailOpen();
  const railToggle = `<button type="button" class="deck__rail-toggle" id="deck-rail-toggle" aria-expanded="${railOpen ? "true" : "false"}" aria-controls="deck-rail" aria-label="${railOpen ? "페이지 프리뷰 접기" : "페이지 프리뷰 펼치기"}" title="${railOpen ? "페이지 프리뷰 접기" : "페이지 프리뷰 펼치기"}"><svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6 8.5 12l6 6"/></svg></button>`;
  return `
    <div class="deck" data-rail="${railOpen ? "open" : "closed"}" style="--deck-rail:${rail}px">
      <div class="deck__rail-host">
        <aside class="deck__rail" id="deck-rail" aria-label="프레젠테이션 페이지">
          <div class="deck__types" role="group" aria-label="페이지 유형">
            <div class="deck__types-row">${types}</div>
            ${sample}
          </div>
          <div class="deck__type-splitter" id="deck-type-splitter" role="separator" aria-orientation="horizontal" aria-label="확대 프리뷰 높이" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" tabindex="0"></div>
          <div class="deck__pages">${pages}</div>
        </aside>
        <div class="deck__scroll-thumb" hidden></div>
      </div>
      <div class="deck__splitter" id="deck-splitter" role="separator" aria-orientation="vertical" aria-label="페이지 프리뷰 너비" aria-valuemin="${RAIL_MIN}" aria-valuenow="${rail}" tabindex="0">${railToggle}</div>
      <div class="deck__stage">
        ${renderStudio(page.state, config)}
      </div>
    </div>`;
}

/** Drops the page menu when the presentation view is rebuilt or left. */
export function releasePresentationMenu(): void {
  stopPageMenu?.();
  stopPageMenu = null;
  detachPresent();
}

let presenting = false;
let presentDeck: PresentationDeck | null = null;
let presentChange: (() => void) | null = null;
let presentShield: HTMLElement | null = null;
let presentMenu: HTMLElement | null = null;
let stopPresentKeys: (() => void) | null = null;
let presentReplay = 0;
const PRESENT_LONG_PRESS_MS = 500;

let presentOwnsFullscreen = false;

function refitPresent(): void {
  requestAnimationFrame(() => document.dispatchEvent(new Event(PRESENT_LAYOUT_EVENT)));
}

function requestPresentFullscreen(): void {
  const root = document.documentElement;
  if (document.fullscreenElement === root) {
    presentOwnsFullscreen = true;
    return;
  }
  if (!root.requestFullscreen) return;
  void root.requestFullscreen().then(() => {
    if (!presenting) {
      if (document.fullscreenElement === root) void document.exitFullscreen()?.catch(() => {});
      return;
    }
    presentOwnsFullscreen = document.fullscreenElement === root;
  }).catch(() => {
    presentOwnsFullscreen = false;
  });
}

function releasePresentFullscreen(): void {
  const owned = presentOwnsFullscreen;
  presentOwnsFullscreen = false;
  if (owned && document.fullscreenElement) void document.exitFullscreen().catch(() => {});
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    if (presenting) refitPresent();
    return;
  }
  if (!presentOwnsFullscreen) return;
  presentOwnsFullscreen = false;
  if (presenting) leavePresentationMode();
});

/** Leaves the full-screen presentation when the route is no longer the deck. */
export function leavePresentationMode(): void {
  const was = presenting;
  presenting = false;
  presentReplay += 1;
  detachPresent();
  document.documentElement.classList.remove("is-presenting");
  releasePresentFullscreen();
  if (was) refitPresent();
}

function detachPresent(): void {
  stopPresentKeys?.();
  stopPresentKeys = null;
  presentShield?.remove();
  presentShield = null;
  presentMenu?.remove();
  presentMenu = null;
}

function presentStep(delta: number): void {
  const deck = presentDeck;
  const change = presentChange;
  if (!delta || !deck || !change) return;
  const next = deck.selected + delta;
  if (!deck.pages[next]) return;
  presentReplay += 1;
  presentMenu?.remove();
  presentMenu = null;
  clearPicked();
  deck.selected = next;
  change();
}

function openPresentMenu(x: number, y: number): void {
  presentMenu?.remove();
  const menu = document.createElement("div");
  menu.className = "nav-popover studio-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "프레젠테이션");
  menu.innerHTML = `<button type="button" class="nav-popover__item" role="menuitem">끄기<span class="studio-menu__hint">Esc</span></button>`;
  menu.querySelector("button")?.addEventListener("click", () => leavePresentationMode());
  document.body.append(menu);
  presentMenu = menu;
  const box = menu.getBoundingClientRect();
  menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - box.width - 8))}px`;
  menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - box.height - 8))}px`;
  menu.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
}

function showPresent(replay: boolean): void {
  presenting = true;
  document.documentElement.classList.add("is-presenting");
  if (replay) requestPresentFullscreen();
  refitPresent();
  detachPresent();
  const shield = document.createElement("div");
  shield.className = "present-shield";
  shield.setAttribute("aria-hidden", "true");
  document.body.append(shield);
  presentShield = shield;
  let press: { id: number; x: number; y: number; moved: boolean; opened: boolean; timer: number } | null = null;
  const endPress = () => {
    if (!press) return;
    window.clearTimeout(press.timer);
    press = null;
  };
  shield.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    if (presentMenu) {
      presentMenu.remove();
      presentMenu = null;
      return;
    }
    const current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, opened: false, timer: 0 };
    current.timer = window.setTimeout(() => {
      current.opened = true;
      openPresentMenu(current.x, current.y);
    }, PRESENT_LONG_PRESS_MS);
    press = current;
    try {
      shield.setPointerCapture(event.pointerId);
    } catch {
      /* the pointer can already be inactive */
    }
  });
  shield.addEventListener("pointermove", (event) => {
    if (!press || event.pointerId !== press.id || press.moved) return;
    if (Math.hypot(event.clientX - press.x, event.clientY - press.y) < 8) return;
    press.moved = true;
    window.clearTimeout(press.timer);
  });
  shield.addEventListener("pointerup", (event) => {
    if (!press || event.pointerId !== press.id) return;
    const done = press;
    endPress();
    if (done.opened) return;
    const dx = event.clientX - done.x;
    const dy = event.clientY - done.y;
    if (Math.abs(dx) >= 64 && Math.abs(dx) > Math.abs(dy)) {
      presentStep(dx < 0 ? 1 : -1);
      return;
    }
    if (Math.hypot(dx, dy) <= 8) presentStep(event.clientX < window.innerWidth / 2 ? -1 : 1);
  });
  shield.addEventListener("pointercancel", endPress);
  shield.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (press) press.opened = true;
    endPress();
    openPresentMenu(event.clientX, event.clientY);
  });
  let wheeled = 0;
  const onWheel = (event: WheelEvent) => {
    if (Math.abs(event.deltaX) < 24 || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    const now = performance.now();
    if (now - wheeled < 450) return;
    wheeled = now;
    event.preventDefault();
    presentStep(event.deltaX > 0 ? 1 : -1);
  };
  shield.addEventListener("wheel", onWheel, { passive: false });
  const onKey = (event: KeyboardEvent) => {
    if (!presenting) return;
    if (event.metaKey || event.ctrlKey || event.altKey) {
      const edit =
        event.code === "KeyZ" ||
        event.code === "KeyY" ||
        event.code === "KeyC" ||
        event.code === "KeyV" ||
        event.code === "KeyX" ||
        event.code === "KeyG" ||
        event.code === "KeyL";
      if (!edit) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      leavePresentationMode();
      return;
    }
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp" || event.key === "Backspace";
    if (event.key === "Home") {
      event.preventDefault();
      event.stopImmediatePropagation();
      const deck = presentDeck;
      if (!deck || deck.selected === 0) return;
      presentStep(-deck.selected);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      event.stopImmediatePropagation();
      const deck = presentDeck;
      if (!deck) return;
      presentStep(deck.pages.length - 1 - deck.selected);
      return;
    }
    if (!forward && !back && event.key !== "Delete" && event.code !== "KeyI") return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.repeat || event.key === "Delete" || event.code === "KeyI") return;
    presentStep(forward ? 1 : -1);
  };
  document.addEventListener("keydown", onKey, true);
  stopPresentKeys = () => document.removeEventListener("keydown", onKey, true);
  if (!replay) return;
  const token = ++presentReplay;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (presenting && token === presentReplay) document.dispatchEvent(new Event(PAGE_ENTER_EVENT));
    });
  });
}

export function bindPresentation(
  root: HTMLElement,
  deck: PresentationDeck,
  index: ConferenceIndex,
  actions: Parameters<typeof bindStudio>[3],
  onChange: () => void,
): void {
  stopPageKeys?.();
  stopPageKeys = null;
  stopPageClip?.();
  stopPageClip = null;
  stopPageMenu?.();
  stopPageMenu = null;
  stopDeckKeys?.();
  stopDeckKeys = null;
  if (historyDeck !== deck) {
    historyDeck = deck;
    deckUndo.length = 0;
    deckRedo.length = 0;
  }
  railObserver?.disconnect();
  railObserver = null;
  stopRailTogglePlace?.();
  stopRailTogglePlace = null;
  thumbMirror += 1;
  presentDeck = deck;
  presentChange = onChange;
  const page = deck.pages[deck.selected];
  if (!page) return;
  const deckRoot = root.querySelector<HTMLElement>(".deck");
  const config = presentationStudioConfig(index, `presentation:${page.id}`, page.id);
  const remember = () => {
    const canvas = document.querySelector<HTMLCanvasElement>("#studio-canvas");
    if (!canvas || canvas.width !== page.state.cardWidth || canvas.height !== page.state.cardHeight) return;
    if (!studioImagesReady(page.state, config)) return;
    const thumb = snapshotThumb();
    if (!thumb) return;
    page.thumb = thumb;
  };
  bindPageOrder(root, deck, remember, onChange);
  bindPageNames(root, deck, remember, onChange);
  root.querySelectorAll<HTMLButtonElement>("[data-deck-type]").forEach((button) => {
    button.addEventListener("dragstart", (event) => event.preventDefault());
    button.addEventListener("click", (event) => {
      if (ignorePageClick || event.ctrlKey) return;
      const type = Number(button.dataset.deckType);
      if (type !== 1 && type !== 2 && type !== 3) return;
      if (pickedType === type) return;
      pickedType = type;
      remember();
      onChange();
      document.querySelector<HTMLButtonElement>(`[data-deck-sample="${type}"]`)?.focus({ preventScroll: true });
    });
  });
  const sampleButton = root.querySelector<HTMLButtonElement>("[data-deck-sample]");
  sampleButton?.addEventListener("dragstart", (event) => event.preventDefault());
  sampleButton?.addEventListener("click", (event) => {
    if (ignorePageClick || event.ctrlKey) return;
    sampleButton.focus({ preventScroll: true });
  });
  const deckEl = root.querySelector<HTMLElement>(".deck");
  const railSplitter = root.querySelector<HTMLElement>("#deck-splitter");
  if (deckEl && railSplitter) {
    const applyRail = (value: number) => {
      const room = deckEl.getBoundingClientRect().width;
      const fitted = room >= RAIL_MIN + STAGE_MIN + 6;
      const max = fitted ? Math.max(RAIL_MIN, Math.round(room) - STAGE_MIN - 6) : Math.max(RAIL_MIN, Math.round(value));
      const next = Math.min(max, Math.max(RAIL_MIN, Math.round(value)));
      deckEl.style.setProperty("--deck-rail", `${next}px`);
      railSplitter.setAttribute("aria-valuenow", String(next));
      railSplitter.setAttribute("aria-valuemax", String(max));
      try {
        localStorage.setItem(RAIL_KEY, String(next));
      } catch {
        /* The width still applies until the next reload. */
      }
    };
    applyRail(readRailWidth());
    const railToggleButton = root.querySelector<HTMLButtonElement>("#deck-rail-toggle");
    const syncRail = (open: boolean) => {
      deckEl.dataset.rail = open ? "open" : "closed";
      railToggleButton?.setAttribute("aria-expanded", open ? "true" : "false");
      const label = open ? "페이지 프리뷰 접기" : "페이지 프리뷰 펼치기";
      railToggleButton?.setAttribute("aria-label", label);
      if (railToggleButton) railToggleButton.title = label;
      try {
        localStorage.setItem(RAIL_OPEN_KEY, open ? "open" : "closed");
      } catch {
        /* The rail still toggles for this view. */
      }
      if (open) applyRail(readRailWidth());
      requestAnimationFrame(() => document.dispatchEvent(new Event(PRESENT_LAYOUT_EVENT)));
    };
    railToggleButton?.addEventListener("click", () => {
      syncRail(deckEl.dataset.rail === "closed");
    });
    const placeRailToggle = () => {
      const panel = root.querySelector<HTMLElement>("#studio-panel-toggle");
      if (!railToggleButton || !panel) return;
      const top = Math.round(panel.getBoundingClientRect().top - deckEl.getBoundingClientRect().top);
      railToggleButton.style.top = `${Math.max(8, top)}px`;
    };
    placeRailToggle();
    const placeObserver = new ResizeObserver(() => placeRailToggle());
    const devices = root.querySelector<HTMLElement>(".studio-devices");
    if (devices) placeObserver.observe(devices);
    const onPlace = () => placeRailToggle();
    window.addEventListener("resize", onPlace);
    root.querySelector("#studio-panel-toggle")?.addEventListener("click", () => requestAnimationFrame(placeRailToggle));
    stopRailTogglePlace = () => {
      placeObserver.disconnect();
      window.removeEventListener("resize", onPlace);
    };
    railSplitter.addEventListener("pointerdown", (event) => {
      if (event.target instanceof Element && event.target.closest("#deck-rail-toggle")) return;
      if (deckEl.dataset.rail === "closed") return;
      if (deckEl.getBoundingClientRect().width < 768) return;
      try {
        railSplitter.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
      const originX = event.clientX;
      const origin = Number(railSplitter.getAttribute("aria-valuenow")) || RAIL_DEFAULT;
      const move = (ev: PointerEvent) => {
        if (ev.pointerId !== event.pointerId) return;
        applyRail(origin + ev.clientX - originX);
      };
      const end = (ev: PointerEvent) => {
        if (ev.pointerId !== event.pointerId) return;
        railSplitter.removeEventListener("pointermove", move);
        railSplitter.removeEventListener("pointerup", end);
        railSplitter.removeEventListener("pointercancel", end);
      };
      railSplitter.addEventListener("pointermove", move);
      railSplitter.addEventListener("pointerup", end);
      railSplitter.addEventListener("pointercancel", end);
    });
    railSplitter.addEventListener("keydown", (event) => {
      if (deckEl.dataset.rail === "closed") return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const current = Number(railSplitter.getAttribute("aria-valuenow")) || RAIL_DEFAULT;
      const step = event.shiftKey ? 48 : 16;
      applyRail(current + (event.key === "ArrowRight" ? step : -step));
    });
  }
  bindSampleHeight(root);

  bindStudio(root, page.state, config, actions);
  root.querySelector<HTMLButtonElement>("#studio-add-page")?.addEventListener("click", () => {
    remember();
    markDeck(snapDeck(deck));
    insertPresentationPage(deck, deck.selected, createBlankPage(appTone()));
    clearPicked();
    onChange();
    const button = document.querySelector<HTMLButtonElement>(`[data-deck-page="${deck.selected}"]`);
    button?.focus({ preventScroll: true });
    button?.scrollIntoView({ block: "nearest" });
  });
  root.querySelector<HTMLButtonElement>("#studio-deck-export")?.addEventListener("click", () => {
    remember();
    openDeckExport(deck, index);
  });
  root.querySelector<HTMLButtonElement>("#studio-present")?.addEventListener("click", () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    showPresent(true);
  });
  if (presenting) showPresent(false);
  startThumbMirror();
  paintMissingThumbs(root, deck, index);
  paintTypeThumbs(root, index);
  bindRailScroll(root);
  bindPageClip(deckRoot, deck, index, remember, onChange);
  bindPageMenu(deckRoot, deck, index, remember, onChange);
  bindDeckKeys(deckRoot, deck, remember, onChange);
  syncPresentationProject(deck, onChange);
  const onPageKeys = (event: KeyboardEvent) => {
    if (!deckRoot?.isConnected) {
      stopPageKeys?.();
      stopPageKeys = null;
      thumbMirror += 1;
      return;
    }
    if (event.defaultPrevented) return;
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    if (event.altKey || event.metaKey || event.ctrlKey) return;
    const target = event.target;
    if (target instanceof Element && !target.closest(".deck") && target !== document.body) return;
    if (
      target instanceof HTMLElement &&
      (target.isContentEditable || target.matches("textarea, input, select"))
    ) {
      return;
    }
    if (target instanceof Element && target.closest("#deck-splitter, #deck-type-splitter, #studio-splitter, dialog")) return;
    const next = deck.selected + (event.key === "ArrowDown" ? 1 : -1);
    if (!deck.pages[next]) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    remember();
    clearPicked();
    deck.selected = next;
    onChange();
    const button = document.querySelector<HTMLButtonElement>(`[data-deck-page="${next}"]`);
    button?.focus({ preventScroll: true });
    button?.scrollIntoView({ block: "nearest" });
  };
  document.addEventListener("keydown", onPageKeys);
  stopPageKeys = () => document.removeEventListener("keydown", onPageKeys);
}

function bindPageOrder(
  root: HTMLElement,
  deck: PresentationDeck,
  remember: () => void,
  onChange: () => void,
): void {
  const pagesEl = root.querySelector<HTMLElement>(".deck__pages");
  if (!pagesEl) return;
  const across = () => getComputedStyle(pagesEl).flexDirection.startsWith("row");
  const insertionIndex = (clientX: number, clientY: number): number => {
    const horizontal = across();
    const buttons = [...pagesEl.querySelectorAll<HTMLElement>(".deck__page")];
    for (const item of buttons) {
      const rect = item.getBoundingClientRect();
      const mid = horizontal ? rect.left + rect.width / 2 : rect.top + rect.height / 2;
      if ((horizontal ? clientX : clientY) < mid) {
        return Number(item.querySelector<HTMLElement>("[data-deck-page]")?.dataset.deckPage);
      }
    }
    return buttons.length;
  };
  pagesEl.querySelectorAll<HTMLElement>(".deck__page").forEach((button) => {
    button.addEventListener("dragstart", (event) => event.preventDefault());
    // Keep the rail where the user scrolled it. Default focus would jump the list.
    button.addEventListener("mousedown", (event) => {
      if (event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest(".deck__meta, .deck__name")) return;
      event.preventDefault();
    });
    button.addEventListener("click", (event) => {
      if (ignorePageClick || event.ctrlKey) return;
      const target = event.target;
      if (target instanceof Element && target.closest(".deck__meta, .deck__name")) return;
      const at = Number(button.querySelector<HTMLElement>("[data-deck-page]")?.dataset.deckPage);
      if (!Number.isInteger(at) || !deck.pages[at]) return;
      const hadRange = pickedIds.size > 1;
      if (event.shiftKey) pickRange(deck, at);
      else clearPicked();
      if (at === deck.selected && !event.shiftKey && !hadRange) {
        document.querySelector<HTMLButtonElement>(`[data-deck-page="${at}"]`)?.focus({ preventScroll: true });
        document.dispatchEvent(new Event(PAGE_ENTER_EVENT));
        return;
      }
      remember();
      deck.selected = at;
      onChange();
      document.querySelector<HTMLButtonElement>(`[data-deck-page="${at}"]`)?.focus({ preventScroll: true });
    });
    button.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      blockPageDrag = false;
      const target = event.target;
      if (target instanceof Element && target.closest(".deck__meta, .deck__name")) return;
      const from = Number(button.querySelector<HTMLElement>("[data-deck-page]")?.dataset.deckPage);
      if (!Number.isInteger(from) || !deck.pages[from]) return;
      const block = pickedIds.size > 1 && pickedIds.has(deck.pages[from].id) ? pickedAts(deck) : null;
      const items = [...pagesEl.querySelectorAll<HTMLElement>(".deck__page")];
      const carried = block ? block.flatMap((at) => items[at] ?? []) : [button];
      const originX = event.clientX;
      const originY = event.clientY;
      try {
        button.setPointerCapture(event.pointerId);
      } catch {
        /* the pointer can already be inactive */
      }
      let dragging = false;
      let ghost: HTMLElement | null = null;
      let marker: HTMLElement | null = null;
      const eatClick = (click: Event) => {
        click.preventDefault();
        click.stopPropagation();
      };
      const placeMarker = (at: number) => {
        if (!marker) return;
        const horizontal = across();
        const buttons = [...pagesEl.querySelectorAll<HTMLElement>(".deck__page")];
        const edge = at >= buttons.length ? buttons[buttons.length - 1] : buttons[at];
        if (!edge) return;
        const rect = edge.getBoundingClientRect();
        const host = pagesEl.getBoundingClientRect();
        const after = at >= buttons.length;
        if (horizontal) {
          marker.style.left = `${(after ? rect.right : rect.left) - host.left - 1}px`;
          marker.style.top = `${rect.top - host.top}px`;
          marker.style.width = "2px";
          marker.style.height = `${rect.height}px`;
        } else {
          marker.style.top = `${(after ? rect.bottom + 4 : rect.top - 5) - host.top}px`;
          marker.style.left = "0";
          marker.style.width = "100%";
          marker.style.height = "2px";
        }
      };
      const scrollList = (clientX: number, clientY: number) => {
        const horizontal = across();
        const scroller = pagesEl;
        if (!scroller) return;
        const box = scroller.getBoundingClientRect();
        const point = horizontal ? clientX : clientY;
        const edge = horizontal ? box.left : box.top;
        const far = horizontal ? box.right : box.bottom;
        if (point < edge + 36) {
          if (horizontal) scroller.scrollLeft -= 14;
          else scroller.scrollTop -= 14;
        } else if (point > far - 36) {
          if (horizontal) scroller.scrollLeft += 14;
          else scroller.scrollTop += 14;
        }
      };
      const move = (ev: PointerEvent) => {
        if (ev.pointerId !== event.pointerId || blockPageDrag) return;
        if (!dragging) {
          if (Math.hypot(ev.clientX - originX, ev.clientY - originY) < 5) return;
          cancelPageLongPress();
          dragging = true;
          ignorePageClick = true;
          document.addEventListener("click", eatClick, true);
          document.documentElement.classList.add("deck-dragging");
          for (const item of carried) item.classList.add("deck__page--dragging");
          ghost = button.cloneNode(true) as HTMLElement;
          ghost.classList.add("deck__page--ghost");
          if (block) ghost.dataset.count = String(block.length);
          ghost.removeAttribute("aria-current");
          const box = button.getBoundingClientRect();
          ghost.style.width = `${box.width}px`;
          ghost.style.left = `${box.left}px`;
          ghost.style.top = `${box.top}px`;
          const source = button.querySelector("canvas");
          const copy = ghost.querySelector("canvas");
          if (source instanceof HTMLCanvasElement && copy instanceof HTMLCanvasElement) {
            copy.width = source.width;
            copy.height = source.height;
            copy.getContext("2d")?.drawImage(source, 0, 0);
          }
          document.body.append(ghost);
          marker = document.createElement("div");
          marker.className = "deck__drop";
          pagesEl.append(marker);
        }
        if (ghost) {
          ghost.style.left = `${ev.clientX - ghost.offsetWidth / 2}px`;
          ghost.style.top = `${ev.clientY - 28}px`;
        }
        placeMarker(insertionIndex(ev.clientX, ev.clientY));
        scrollList(ev.clientX, ev.clientY);
      };
      const finish = (ev: PointerEvent) => {
        if (ev.pointerId !== event.pointerId) return;
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerup", finish);
        button.removeEventListener("pointercancel", finish);
        ghost?.remove();
        marker?.remove();
        for (const item of carried) item.classList.remove("deck__page--dragging");
        document.documentElement.classList.remove("deck-dragging");
        if (blockPageDrag) return;
        cancelPageLongPress();
        if (!dragging && Math.hypot(ev.clientX - originX, ev.clientY - originY) >= 5) {
          dragging = true;
          ignorePageClick = true;
          document.addEventListener("click", eatClick, true);
        }
        if (!dragging) return;
        window.setTimeout(() => {
          ignorePageClick = false;
          document.removeEventListener("click", eatClick, true);
        }, 0);
        if (ev.type === "pointercancel") return;
        const was = deck.selected;
        remember();
        const before = snapDeck(deck);
        const to = insertionIndex(ev.clientX, ev.clientY);
        if (!block) clearPicked();
        const moved = block ? movePresentationPages(deck, block, to) : reorderPresentationPage(deck, from, to);
        if (moved) markDeck(before);
        if (!moved && from !== was) deck.selected = from;
        if (moved || deck.selected !== was) onChange();
      };
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerup", finish);
      button.addEventListener("pointercancel", finish);
    });
  });
}

function pageName(page: PresentationPage, at: number): string {
  const custom = page.name.trim();
  return custom || `page ${at + 1}`;
}

function bindPageNames(
  root: HTMLElement,
  deck: PresentationDeck,
  remember: () => void,
  onChange: () => void,
): void {
  const input = root.querySelector<HTMLInputElement>(".deck__name");
  if (input) {
    const at = Number(input.dataset.deckName);
    let closed = false;
    const commit = (save: boolean) => {
      if (closed) return;
      closed = true;
      renameAt = null;
      const page = deck.pages[at];
      if (save && page) {
        const next = input.value.trim().slice(0, 80);
        const name = next && next !== `page ${at + 1}` ? next : "";
        if (name !== page.name) markDeck(snapDeck(deck));
        page.name = name;
      }
      onChange();
    };
    input.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.key === "Enter") {
        event.preventDefault();
        commit(true);
      } else if (event.key === "Escape") {
        event.preventDefault();
        commit(false);
      }
    });
    input.addEventListener("blur", () => {
      window.setTimeout(() => commit(true), 0);
    });
    input.focus();
    input.select();
  }
  let clickTimer = 0;
  root.querySelectorAll<HTMLElement>(".deck__pages .deck__meta").forEach((label) => {
    const at = Number(label.dataset.deckName);
    label.addEventListener("click", (event) => {
      event.preventDefault();
      window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => {
        if (!Number.isInteger(at) || !deck.pages[at] || deck.selected === at) return;
        remember();
        clearPicked();
        deck.selected = at;
        onChange();
      }, 250);
    });
    label.addEventListener("dblclick", (event) => {
      event.preventDefault();
      window.clearTimeout(clickTimer);
      if (!Number.isInteger(at) || !deck.pages[at]) return;
      renameAt = at;
      if (deck.selected !== at) {
        remember();
        deck.selected = at;
      }
      onChange();
    });
  });
}

function typeThumbKey(type: PresentationType, tone: PresentationTone): string {
  return type === 1 ? "1" : `${type}:${tone}`;
}

function paintTypeThumbs(root: HTMLElement, index: ConferenceIndex): void {
  const tone = appTone();
  for (const type of [1, 2, 3] as const) {
    const key = typeThumbKey(type, tone);
    const cached = typeThumbCache.get(key);
    const images = `[data-deck-type="${type}"] img, [data-deck-sample="${type}"] img`;
    if (cached) {
      root.querySelectorAll<HTMLImageElement>(images).forEach((image) => {
        image.src = cached;
      });
      continue;
    }
    if (typeThumbPending.has(key)) continue;
    typeThumbPending.add(key);
    const sample = createTypedPage(type, index, tone);
    void renderStudioStill(sample.state, presentationStudioConfig(index, "presentation:type"))
      .then((url) => {
        typeThumbCache.set(key, url);
        document.querySelectorAll<HTMLImageElement>(images).forEach((image) => {
          image.src = url;
        });
      })
      .catch(() => undefined)
      .finally(() => typeThumbPending.delete(key));
  }
}

function bindRailScroll(root: HTMLElement): void {
  const host = root.querySelector<HTMLElement>(".deck__rail-host");
  const pages = root.querySelector<HTMLElement>(".deck__pages");
  const thumb = root.querySelector<HTMLElement>(".deck__scroll-thumb");
  if (!host || !pages || !thumb) return;
  pages.scrollTop = railScroll.top;
  pages.scrollLeft = railScroll.left;
  let hideTimer = 0;
  const place = () => {
    const max = pages.scrollHeight - pages.clientHeight;
    const top = pages.getBoundingClientRect().top - host.getBoundingClientRect().top;
    if (max <= 1) {
      thumb.hidden = true;
      return;
    }
    thumb.hidden = false;
    const thumbHeight = Math.max(32, (pages.clientHeight / pages.scrollHeight) * pages.clientHeight);
    const travel = Math.max(0, pages.clientHeight - thumbHeight);
    thumb.style.top = `${top}px`;
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${(pages.scrollTop / max) * travel}px)`;
  };
  pages.addEventListener("scroll", () => {
    railScroll = { top: pages.scrollTop, left: pages.scrollLeft };
    place();
    host.classList.add("is-scrolling");
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => host.classList.remove("is-scrolling"), 700);
  });
  place();
  railObserver = new ResizeObserver(place);
  railObserver.observe(pages);
}

function menuAnchor(target: EventTarget | null): PageMenuAnchor | null {
  if (!(target instanceof Element) || target.closest("input, textarea, select")) return null;
  const typeButton = target.closest<HTMLElement>("[data-deck-type], [data-deck-sample]");
  if (typeButton) {
    const type = Number(typeButton.dataset.deckType ?? typeButton.dataset.deckSample);
    if (type !== 1 && type !== 2 && type !== 3) return null;
    return { kind: "type", type };
  }
  const page = target.closest<HTMLElement>(".deck__page");
  const at = Number(page?.querySelector<HTMLElement>("[data-deck-page]")?.dataset.deckPage);
  if (!page || !Number.isInteger(at)) return null;
  return { kind: "page", at };
}

function bindPageMenu(
  deckRoot: HTMLElement | null,
  deck: PresentationDeck,
  index: ConferenceIndex,
  remember: () => void,
  onChange: () => void,
): void {
  if (!deckRoot) return;
  const shortcut = (key: string) => (IS_MAC ? `⌘${key}` : `Ctrl+${key}`);
  const items: { action: string; label: string; hint: string }[] = [
    { action: "copy", label: "복사", hint: shortcut("C") },
    { action: "cut", label: "잘라내기", hint: shortcut("X") },
    { action: "paste", label: "붙여넣기", hint: shortcut("V") },
    { action: "delete", label: "삭제", hint: IS_MAC ? "⌫" : "Delete" },
  ];
  const menu = document.createElement("div");
  menu.className = "nav-popover studio-menu deck-page-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "페이지 메뉴");
  menu.hidden = true;
  menu.innerHTML = items
    .map(
      (item) =>
        `<button type="button" class="nav-popover__item" role="menuitem" data-page-action="${item.action}">${item.label}<span class="studio-menu__hint">${item.hint}</span></button>`,
    )
    .join("");
  document.body.append(menu);
  let anchor: PageMenuAnchor | null = null;
  const itemButton = (action: string) => menu.querySelector<HTMLButtonElement>(`[data-page-action="${action}"]`);
  const visibleButtons = () => [...menu.querySelectorAll<HTMLButtonElement>("[data-page-action]")].filter((button) => !button.hidden && !button.disabled);
  const close = () => {
    if (menu.hidden) return;
    if (document.activeElement instanceof HTMLElement && menu.contains(document.activeElement)) document.activeElement.blur();
    menu.hidden = true;
    document.removeEventListener("pointerdown", onOutside, true);
  };
  const onOutside = (event: PointerEvent) => {
    if (event.target instanceof Node && menu.contains(event.target)) return;
    close();
  };
  const show = (request: PageMenuRequest) => {
    anchor = request.anchor;
    const pageAnchor = request.anchor.kind === "page" ? request.anchor : null;
    const ats = pageAnchor ? pageAts(deck, pageAnchor.at) : [];
    const canRemove = pageAnchor != null && ats.length > 0 && ats.length < deck.pages.length;
    const enable = (action: string, on: boolean, shown: boolean) => {
      const button = itemButton(action);
      if (!button) return;
      button.hidden = !shown;
      button.disabled = !on;
    };
    enable("copy", true, true);
    enable("cut", canRemove, pageAnchor != null);
    enable("paste", pageClip != null, true);
    enable("delete", canRemove, pageAnchor != null);
    menu.hidden = false;
    const margin = 8;
    const { width, height } = menu.getBoundingClientRect();
    const left = request.x + width + margin > window.innerWidth ? request.x - width : request.x;
    const top = request.y + height + margin > window.innerHeight ? request.y - height : request.y;
    menu.style.left = `${Math.max(margin, left)}px`;
    menu.style.top = `${Math.max(margin, top)}px`;
    document.addEventListener("pointerdown", onOutside, true);
    visibleButtons()[0]?.focus({ preventScroll: true });
  };
  const open = (request: PageMenuRequest) => {
    if (request.anchor.kind === "page") {
      const page = deck.pages[request.anchor.at];
      const inRange = Boolean(page && pickedIds.size > 1 && pickedIds.has(page.id));
      if (page && !inRange && deck.selected !== request.anchor.at) {
        remember();
        clearPicked();
        deck.selected = request.anchor.at;
        pendingPageMenu = request;
        onChange();
        return;
      }
    }
    show(request);
  };
  const eatClick = (event: Event) => {
    document.removeEventListener("click", eatClick, true);
    ignorePageClick = false;
    if (event.target instanceof Element && event.target.closest(".deck-page-menu")) return;
    event.preventDefault();
    event.stopPropagation();
  };
  const beginHold = (event: PointerEvent, next: PageMenuAnchor) => {
    cancelPageLongPress();
    const { clientX, clientY, pointerId } = event;
    const timer = window.setTimeout(() => {
      if (pageLongPress?.pointerId !== pointerId) return;
      pageLongPress = null;
      blockPageDrag = true;
      ignorePageClick = true;
      document.addEventListener("click", eatClick, true);
      open({ x: clientX, y: clientY, anchor: next });
    }, PAGE_LONG_PRESS_MS);
    pageLongPress = { timer, pointerId, x: clientX, y: clientY };
  };
  const onContext = (event: MouseEvent) => {
    if (!deckRoot.isConnected) {
      stopPageMenu?.();
      stopPageMenu = null;
      return;
    }
    const next = menuAnchor(event.target);
    if (!(event.target instanceof Element) || !event.target.closest(".deck__rail") || !next) return;
    event.preventDefault();
    event.stopPropagation();
    open({ x: event.clientX, y: event.clientY, anchor: next });
  };
  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || event.ctrlKey) return;
    ignorePageClick = false;
    const next = menuAnchor(event.target);
    if (!(event.target instanceof Element) || !event.target.closest(".deck__rail") || !next) return;
    beginHold(event, next);
  };
  const onPointerMove = (event: PointerEvent) => {
    const press = pageLongPress;
    if (!press || press.pointerId !== event.pointerId) return;
    if (Math.hypot(event.clientX - press.x, event.clientY - press.y) < 5) return;
    cancelPageLongPress();
  };
  const onPointerEnd = (event: PointerEvent) => {
    if (pageLongPress?.pointerId === event.pointerId) cancelPageLongPress();
  };
  const onMenuKey = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const buttons = visibleButtons();
    const at = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    buttons[(at + step + buttons.length) % buttons.length]?.focus();
  };
  const onMenuClick = (event: MouseEvent) => {
    const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("[data-page-action]") : null;
    if (!button || button.disabled || !anchor) return;
    const action = button.dataset.pageAction;
    const target = anchor;
    close();
    if (action === "copy") {
      if (target.kind === "type") copyPageType(target.type);
      else copyPageAt(deck, target.at);
    } else if (action === "cut" && target.kind === "page") cutPageAt(deck, target.at, remember, onChange);
    else if (action === "paste") pastePageClip(deck, index, remember, onChange);
    else if (action === "delete" && target.kind === "page") deletePageAt(deck, target.at, remember, onChange);
  };
  menu.addEventListener("click", onMenuClick);
  menu.addEventListener("keydown", onMenuKey);
  deckRoot.addEventListener("pointerdown", onPointerDown);
  deckRoot.addEventListener("pointermove", onPointerMove);
  deckRoot.addEventListener("pointerup", onPointerEnd);
  deckRoot.addEventListener("pointercancel", onPointerEnd);
  deckRoot.addEventListener("scroll", close, true);
  document.addEventListener("contextmenu", onContext, true);
  stopPageMenu = () => {
    close();
    cancelPageLongPress();
    menu.remove();
    deckRoot.removeEventListener("pointerdown", onPointerDown);
    deckRoot.removeEventListener("pointermove", onPointerMove);
    deckRoot.removeEventListener("pointerup", onPointerEnd);
    deckRoot.removeEventListener("pointercancel", onPointerEnd);
    deckRoot.removeEventListener("scroll", close, true);
    document.removeEventListener("contextmenu", onContext, true);
  };
  if (pendingPageMenu) {
    const request = pendingPageMenu;
    pendingPageMenu = null;
    show(request);
  }
}

function bindPageClip(
  deckRoot: HTMLElement | null,
  deck: PresentationDeck,
  index: ConferenceIndex,
  remember: () => void,
  onChange: () => void,
): void {
  const onClip = (event: KeyboardEvent) => {
    if (!deckRoot?.isConnected) {
      stopPageClip?.();
      stopPageClip = null;
      return;
    }
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
    if (event.code !== "KeyC" && event.code !== "KeyX" && event.code !== "KeyV") return;
    const target = event.target;
    if (!(target instanceof Element) || !target.closest(".deck__rail")) return;
    if (target instanceof HTMLElement && (target.isContentEditable || target.matches("textarea, input, select"))) return;
    if (event.code === "KeyC" || event.code === "KeyX") {
      const typeButton = target.closest<HTMLElement>("[data-deck-type], [data-deck-sample]");
      const pageButton = target.closest<HTMLElement>("[data-deck-page]");
      if (typeButton && event.code === "KeyC") {
        const type = Number(typeButton.dataset.deckType ?? typeButton.dataset.deckSample);
        if (type !== 1 && type !== 2 && type !== 3) return;
        copyPageType(type);
      } else if (pageButton) {
        const at = Number(pageButton.dataset.deckPage);
        if (event.code === "KeyX") {
          if (!cutPageAt(deck, at, remember, onChange)) {
            event.preventDefault();
            return;
          }
        } else if (!copyPageAt(deck, at)) return;
      } else {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!pageClipIsCurrent() || !pastePageClip(deck, index, remember, onChange)) return;
    event.preventDefault();
    event.stopPropagation();
  };
  document.addEventListener("keydown", onClip, true);
  stopPageClip = () => document.removeEventListener("keydown", onClip, true);
}

/** Delete removes the focused page. Cmd+Z in the rail, or once the slide has nothing left to undo, steps the deck history. */
function bindDeckKeys(
  deckRoot: HTMLElement | null,
  deck: PresentationDeck,
  remember: () => void,
  onChange: () => void,
): void {
  const focusSelected = () => {
    document.querySelector<HTMLButtonElement>(`[data-deck-page="${deck.selected}"]`)?.focus({ preventScroll: true });
  };
  const onKeys = (event: KeyboardEvent) => {
    if (!deckRoot?.isConnected) {
      stopDeckKeys?.();
      stopDeckKeys = null;
      return;
    }
    const target = event.target;
    if (target instanceof HTMLElement && (target.isContentEditable || target.matches("textarea, input, select"))) return;
    if (target instanceof Element && target.closest(".confirm-backdrop")) return;
    const inRail = target instanceof Element && Boolean(target.closest(".deck__rail"));
    if (event.key === "Delete" || event.key === "Backspace") {
      if (event.metaKey || event.ctrlKey || event.altKey || !(target instanceof Element)) return;
      const pageButton = target.closest<HTMLElement>("[data-deck-page]");
      if (!pageButton) return;
      event.preventDefault();
      event.stopPropagation();
      const at = Number(pageButton.dataset.deckPage);
      deletePageAt(deck, at, remember, onChange);
      return;
    }
    if (!(event.metaKey || event.ctrlKey) || event.altKey) return;
    const redo = (event.code === "KeyZ" && event.shiftKey) || (event.code === "KeyY" && event.ctrlKey && !event.shiftKey);
    const undo = event.code === "KeyZ" && !event.shiftKey;
    if (!undo && !redo) return;
    const from = undo ? deckUndo : deckRedo;
    if (from.length === 0) return;
    const studioButton = document.querySelector<HTMLButtonElement>(undo ? "#studio-undo" : "#studio-redo");
    if (!inRail && studioButton && !studioButton.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    const snap = from.pop();
    if (!snap) return;
    remember();
    (undo ? deckRedo : deckUndo).push(snapDeck(deck));
    restoreDeck(deck, snap);
    onChange();
    focusSelected();
  };
  document.addEventListener("keydown", onKeys, true);
  stopDeckKeys = () => document.removeEventListener("keydown", onKeys, true);
}

type ExportFormat = "pdf" | "pptx" | "keynote" | "html";
const EXPORT_FORMATS: { id: ExportFormat; label: string; hint: string }[] = [
  { id: "pdf", label: "PDF", hint: ".pdf" },
  { id: "pptx", label: "PowerPoint", hint: ".pptx" },
  { id: "keynote", label: "Keynote", hint: "Keynote에서 바로 열리는 .pptx" },
  { id: "html", label: "HTML", hint: "배경 영상까지 재생되는 프레젠테이션 .html" },
];
const EXPORT_FILES: Record<"pdf" | "pptx" | "html", { extension: string; type: string; description: string }> = {
  pdf: { extension: ".pdf", type: "application/pdf", description: "PDF" },
  pptx: { extension: ".pptx", type: "application/vnd.openxmlformats-officedocument.presentationml.presentation", description: "PowerPoint" },
  html: { extension: ".html", type: "text/html", description: "HTML" },
};
const exportFile = (format: ExportFormat) => EXPORT_FILES[format === "keynote" ? "pptx" : format];

type SavePicker = (options: {
  suggestedName: string;
  types: { description: string; accept: Record<string, string[]> }[];
}) => Promise<{
  createWritable: () => Promise<{ write: (data: Blob) => Promise<void>; close: () => Promise<void> }>;
  getFile: () => Promise<File>;
  remove?: () => Promise<void>;
}>;

/** Renders every page in deck order, builds the chosen file, then asks where to save it. */
function openDeckExport(deck: PresentationDeck, index: ConferenceIndex): void {
  if (document.querySelector(".deck-export")) return;
  const pages = [...deck.pages];
  const backdrop = document.createElement("div");
  backdrop.className = "confirm-backdrop";
  backdrop.innerHTML = `
      <form class="confirm-dialog mcp-dialog deck-export" role="dialog" aria-modal="true" aria-labelledby="deck-export-title" novalidate>
        <div class="mcp-dialog__head">
          <h2 class="mcp-dialog__title" id="deck-export-title">전체 다운로드</h2>
          <button type="button" class="studio__zoom-btn" data-export="close" aria-label="닫기"><svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg></button>
        </div>
        <fieldset class="deck-export__formats">
          <legend class="deck-export__legend">포맷</legend>
          ${EXPORT_FORMATS.map(
            (format, at) => `
          <label class="deck-export__format">
            <input type="radio" name="format" value="${format.id}"${at === 0 ? " checked" : ""} />
            <span class="deck-export__format-label">${format.label}</span>
            <span class="deck-export__format-hint">${format.hint}</span>
          </label>`,
          ).join("")}
        </fieldset>
        <p class="mcp-dialog__hint">${pages.length}개 페이지를 순서대로 담습니다.</p>
        <div class="deck-export__progress" hidden>
          <div class="deck-export__bar"><span class="deck-export__fill"></span></div>
          <p class="deck-export__status" role="status" aria-live="polite"></p>
        </div>
        <div class="confirm-dialog__actions">
          <button type="submit" class="button" data-export="run">다운로드</button>
        </div>
      </form>
  `;
  const form = backdrop.querySelector<HTMLFormElement>("form");
  const run = backdrop.querySelector<HTMLButtonElement>("[data-export='run']");
  const progress = backdrop.querySelector<HTMLElement>(".deck-export__progress");
  const fill = backdrop.querySelector<HTMLElement>(".deck-export__fill");
  const status = backdrop.querySelector<HTMLElement>(".deck-export__status");
  const radios = [...backdrop.querySelectorAll<HTMLInputElement>("input[name='format']")];
  if (!form || !run || !progress || !fill || !status) return;
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  let closed = false;
  let job = 0;
  let saveFile: (() => Promise<void>) | null = null;
  const close = () => {
    if (closed) return;
    closed = true;
    job += 1;
    backdrop.remove();
    previous?.focus({ preventScroll: true });
  };
  backdrop.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  });
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  backdrop.querySelector("[data-export='close']")?.addEventListener("click", close);
  const seconds = (ms: number) => `${Math.max(1, Math.round(ms / 1000))}초`;
  const show = (percent: number, note: string) => {
    const value = Math.min(100, Math.round(percent));
    fill.style.width = `${value}%`;
    status.textContent = `${value}% · ${note}`;
  };
  const ready = (label: string) => {
    run.disabled = false;
    run.textContent = label;
  };
  const save = async (blob: Blob, name: string, format: ExportFormat) => {
    const done = (fileName: string) => {
      saveFile = null;
      close();
      showToast(`${fileName} (${EXPORT_FORMATS.find((item) => item.id === format)?.label ?? ""}) 다운로드가 완료되었습니다.`);
    };
    const viaDownload = () => {
      show(100, "저장할 폴더를 고른 뒤 저장을 눌러 주세요.");
      run.disabled = true;
      // The save window gives no event; the page loses focus while it is open and gets it back once it closes.
      const watching = document.hasFocus();
      const started = performance.now();
      let away = false;
      const poll = window.setInterval(() => {
        if (closed) {
          window.clearInterval(poll);
          return;
        }
        const focused = document.hasFocus();
        if (!focused) away = true;
        const spent = performance.now() - started;
        const finished = away ? focused : !watching ? spent > 1500 : spent > 1500 && focused;
        if (!finished && spent < 600_000) return;
        window.clearInterval(poll);
        done(name);
      }, 200);
      downloadFile(blob, name);
    };
    // Electron (the Cursor browser) creates the picked file but denies the write; its download opens a save window instead.
    const picker = /\bElectron\//.test(navigator.userAgent)
      ? undefined
      : (window as unknown as { showSaveFilePicker?: SavePicker }).showSaveFilePicker;
    if (!picker) {
      viaDownload();
      return;
    }
    const file = exportFile(format);
    try {
      const handle = await picker({
        suggestedName: name,
        types: [{ description: file.description, accept: { [file.type]: [file.extension] } }],
      });
      try {
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        const written = await handle.getFile();
        if (written.size !== blob.size) throw new Error("size");
        done(written.name || name);
      } catch {
        await handle.remove?.().catch(() => undefined);
        viaDownload();
      }
    } catch (error) {
      const cancelled = error instanceof DOMException && error.name === "AbortError";
      show(100, cancelled ? "저장을 취소했습니다. 저장 위치를 다시 고를 수 있습니다." : "저장할 폴더를 골라 주세요.");
      ready("저장 위치 선택");
    }
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (saveFile) {
      run.disabled = true;
      void saveFile();
      return;
    }
    const format = (radios.find((radio) => radio.checked)?.value ?? "pdf") as ExportFormat;
    const mine = ++job;
    radios.forEach((radio) => {
      radio.disabled = true;
    });
    run.disabled = true;
    run.textContent = "변환 중";
    progress.hidden = false;
    const started = performance.now();
    show(0, `변환 준비 중 · 0 / ${pages.length}`);
    void (async () => {
      try {
        const scenes: SlideScene[] = [];
        for (let at = 0; at < pages.length; at += 1) {
          const item = pages[at];
          if (!item) continue;
          scenes.push(await renderStudioScene(item.state, presentationStudioConfig(index, `presentation:${item.id}`)));
          if (mine !== job) return;
          const spent = performance.now() - started;
          const left = (spent / (at + 1)) * (pages.length - at - 1);
          show(((at + 1) / pages.length) * 90, `${at + 1} / ${pages.length} 페이지 · 경과 ${seconds(spent)} · 남은 시간 약 ${seconds(left)}`);
        }
        show(95, "파일로 묶는 중");
        await new Promise((resolve) => window.setTimeout(resolve, 50));
        const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
        const file = exportFile(format);
        const name = `ax-presentation-${stamp}${file.extension}`;
        const asBlob = (bytes: Uint8Array) => {
          const copy = new ArrayBuffer(bytes.byteLength);
          new Uint8Array(copy).set(bytes);
          return new Blob([copy], { type: file.type });
        };
        const blob =
          format === "html"
            ? await scenesHtml(scenes, "AX Presentation")
            : asBlob(format === "pdf" ? await scenesPdf(scenes) : slidesPptx(scenes, "AX Presentation"));
        if (mine !== job) return;
        show(100, `변환 완료 · 걸린 시간 ${seconds(performance.now() - started)}`);
        saveFile = () => save(blob, name, format);
        await saveFile();
      } catch {
        if (mine !== job) return;
        show(0, "변환하지 못했습니다. 다시 시도해 주세요.");
        radios.forEach((radio) => {
          radio.disabled = false;
        });
        ready("다운로드");
      }
    })();
  });
  document.body.append(backdrop);
  radios[0]?.focus();
}

function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function appTone(): PresentationTone {
  return document.documentElement.dataset.mode === "light" ? "light" : "dark";
}

function startThumbMirror(): void {
  const mirror = ++thumbMirror;
  const tick = () => {
    if (mirror !== thumbMirror) return;
    const live = document.querySelector<HTMLCanvasElement>(".deck__thumb-live");
    const source = document.querySelector<HTMLCanvasElement>("#studio-canvas");
    if (!live?.isConnected) return;
    if (source && source.width > 2 && source.height > 2) {
      const width = 960;
      const height = Math.max(1, Math.round((width * source.height) / source.width));
      if (live.width !== width || live.height !== height) {
        live.width = width;
        live.height = height;
      }
      live.getContext("2d")?.drawImage(source, 0, 0, width, height);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function paintMissingThumbs(root: HTMLElement, deck: PresentationDeck, index: ConferenceIndex): void {
  const job = ++thumbJob;
  void (async () => {
    for (let at = 0; at < deck.pages.length; at += 1) {
      if (job !== thumbJob) return;
      const item = deck.pages[at];
      if (!item || item.thumb || at === deck.selected) continue;
      const url = await renderStudioStill(item.state, presentationStudioConfig(index, `presentation:${item.id}`)).catch(() => "");
      if (job !== thumbJob || !url || deck.pages[at] !== item || item.thumb) continue;
      item.thumb = url;
      const slot = root.querySelector(`[data-deck-page="${at}"] .deck__thumb`);
      if (!slot?.isConnected || slot.querySelector("canvas")) continue;
      slot.replaceChildren();
      const image = document.createElement("img");
      image.alt = "";
      image.src = url;
      slot.append(image);
    }
  })();
}

function snapshotThumb(): string {
  const canvas = document.querySelector<HTMLCanvasElement>("#studio-canvas");
  if (!canvas || canvas.width < 2 || canvas.height < 2) return "";
  const thumb = document.createElement("canvas");
  thumb.width = 960;
  thumb.height = Math.max(1, Math.round((960 * canvas.height) / canvas.width));
  thumb.getContext("2d")?.drawImage(canvas, 0, 0, thumb.width, thumb.height);
  return thumb.toDataURL("image/jpeg", 0.9);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    if (char === "&") return "&amp;";
    if (char === "<") return "&lt;";
    if (char === ">") return "&gt;";
    if (char === '"') return "&quot;";
    return "&#39;";
  });
}
