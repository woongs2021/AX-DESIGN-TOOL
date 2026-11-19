/**
 * Ten Slide pages (3840×2160) from the Figma Presentation examples.
 * Reading order is frames 1, 2, 3, 4, 5, 6, 7, 8, 11, 14 of a 1920×1080 board.
 * Positions and type sizes are that board doubled onto the 4K slide.
 * English display uses Montserrat. Korean uses Pretendard.
 */
import { conferenceSrc, type ConferenceIndex, type ConferenceSource } from "./conference.ts";
import {
  clampFontSize,
  clampImageOffset,
  clampImageWidth,
  clampTextOffset,
  CONTROLS_DEFAULT,
  bareCardColor,
  cardIsBare,
  normalizeStudioState,
  rgbToHex,
  type ImageLayer,
  type StudioState,
  type TextAlign,
  type TextLayer,
} from "./studio.ts";
import type { LinearGradient, ShapeLayer } from "./studio-shapes.ts";
import PRESENTATION_DEFAULTS from "./presentation-defaults.json";
import TYPE1_TEMPLATE from "./presentation-type1.json";
import TYPE3_TEMPLATE from "./presentation-type3.json";

export const PRESENTATION_DECK_KEY = "ax-presentation-deck";
/** Dev server route that rewrites presentation-defaults.json. */
export const PRESENTATION_DEFAULTS_ROUTE = "/__presentation-defaults";
export const SLIDE_W = 3840;
export const SLIDE_H = 2160;

const DECK_VERSION = 3;
const DISPLAY = "montserrat";
const KO = "pretendard";

const INK = rgbToHex(252, 252, 255);
const AZURE = rgbToHex(64, 101, 248);
const NIGHT = rgbToHex(0, 28, 51);
const BLACK = rgbToHex(1, 1, 2);
const NAVY = rgbToHex(22, 66, 124);
const MIST = rgbToHex(242, 242, 242);
const DEW = rgbToHex(161, 208, 246);
const WASH = rgbToHex(208, 215, 232);
const GLOW = rgbToHex(97, 105, 255);

export type PresentationType = 1 | 2 | 3;
export type PresentationTone = "light" | "dark";
export type PresentationRole = "divider" | "content" | "eod";

export type PresentationPage = {
  id: string;
  type: PresentationType;
  tone: PresentationTone | null;
  role: PresentationRole;
  state: StudioState;
  /** Custom rail label. Empty shows the positional name, page 1, page 2, … */
  name: string;
  /** In-memory preview. Not written to storage. */
  thumb: string;
};

export type PresentationDeck = { selected: number; pages: PresentationPage[] };

type Palette = { bg: string; bgTo: string; title: string; body: string };
type Layout = "title" | "words" | "photo" | "agenda" | "section" | "mosaic";
type Spec = {
  id: string;
  type: PresentationType;
  tone: PresentationTone | null;
  role: PresentationRole;
  layout: Layout;
  title: string;
  aside: string;
  body: string;
  captionAt: 0 | 1 | 2 | null;
  caption: string;
};

const SPECS: readonly Spec[] = [
  {
    id: "page-01",
    type: 2,
    tone: "dark",
    role: "content",
    layout: "title",
    title: "생성형 AI에서 에이전틱 AI, 그리고 AX까지: UX 디자인 프로세스의 확장",
    aside: "",
    body: "From Generative AI to Agentic AI and AX:\nExpanding the UX Design Process",
    captionAt: null,
    caption: "",
  },
  {
    id: "page-02",
    type: 2,
    tone: "dark",
    role: "content",
    layout: "words",
    title: "AI",
    aside: "AX",
    body: "",
    captionAt: null,
    caption: "",
  },
  {
    id: "page-03",
    type: 2,
    tone: "dark",
    role: "content",
    layout: "words",
    title: "Creativity",
    aside: "Curiosity",
    body: "",
    captionAt: null,
    caption: "",
  },
  {
    id: "page-04",
    type: 1,
    tone: null,
    role: "divider",
    layout: "photo",
    title: "",
    aside: "",
    body: "",
    captionAt: null,
    caption: "",
  },
  {
    id: "page-05",
    type: 3,
    tone: "light",
    role: "content",
    layout: "agenda",
    title: "TODAY\u2019s AGENDA",
    aside: "",
    body: "3 Agendas",
    captionAt: null,
    caption: "",
  },
  {
    id: "page-06",
    type: 3,
    tone: "light",
    role: "content",
    layout: "agenda",
    title: "TODAY\u2019s AGENDA",
    aside: "",
    body: "3 Agendas",
    captionAt: 0,
    caption: "Visual Design\nCapabilities",
  },
  {
    id: "page-07",
    type: 3,
    tone: "light",
    role: "content",
    layout: "agenda",
    title: "TODAY\u2019s AGENDA",
    aside: "",
    body: "3 Agendas",
    captionAt: 1,
    caption: "Vibe coding\nCapabilities",
  },
  {
    id: "page-08",
    type: 3,
    tone: "light",
    role: "content",
    layout: "agenda",
    title: "TODAY\u2019s AGENDA",
    aside: "",
    body: "3 Agendas",
    captionAt: 2,
    caption: "Pathfinding\nAbility",
  },
  {
    id: "page-09",
    type: 1,
    tone: null,
    role: "divider",
    layout: "section",
    title: "WE ARE IN THE AI ARA",
    aside: "",
    body: "",
    captionAt: null,
    caption: "",
  },
  {
    id: "page-10",
    type: 3,
    tone: "light",
    role: "content",
    layout: "mosaic",
    title: "WE SEE\nAI-ISH\nDESIGNS",
    aside: "",
    body: "",
    captionAt: null,
    caption: "",
  },
];

/** Dark and light families from the Figma cool-tone board. */
function paletteOf(tone: PresentationTone): Palette {
  if (tone === "dark") {
    return { bg: BLACK, bgTo: NAVY, title: INK, body: INK };
  }
  return { bg: WASH, bgTo: GLOW, title: NIGHT, body: NIGHT };
}

/** The ten built-in pages. */
export function createPresentationDeck(index: ConferenceIndex | null): PresentationDeck {
  return { selected: 0, pages: SPECS.map((spec, at) => buildPage(spec, index, at)) };
}

let defaultPages: unknown = PRESENTATION_DEFAULTS.pages;

/** The deck set with “기본값으로 세팅”, or the built-in pages when none is set. */
export function defaultPresentationDeck(index: ConferenceIndex | null): PresentationDeck {
  const deck = parseDeck({ version: DECK_VERSION, selected: 0, pages: structuredClone(defaultPages) }, false);
  return deck ?? createPresentationDeck(index);
}

export function loadPresentationDeck(index: ConferenceIndex | null): PresentationDeck {
  try {
    const raw = localStorage.getItem(PRESENTATION_DECK_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    const deck = parseDeck(parsed);
    if (deck) return deck;
  } catch {
    /* A broken save falls back to the default pages. */
  }
  return defaultPresentationDeck(index);
}

/** Default pages with deck page `at` set as it is now. A page new to the defaults goes after its nearest earlier neighbour. */
export function defaultsWithPage(deck: PresentationDeck, at: number, index: ConferenceIndex | null): PresentationPage[] {
  const pages = defaultPresentationDeck(index).pages;
  const page = deck.pages[at];
  if (!page) return pages;
  const found = pages.findIndex((item) => item.id === page.id);
  if (found >= 0) {
    pages[found] = page;
    return pages;
  }
  let insert = 0;
  for (let before = at - 1; before >= 0; before -= 1) {
    const hit = pages.findIndex((item) => item.id === deck.pages[before]?.id);
    if (hit >= 0) {
      insert = hit + 1;
      break;
    }
  }
  pages.splice(insert, 0, page);
  return pages;
}

/** Writes the pages to presentation-defaults.json through the dev server. */
export async function writePresentationDefaults(pages: PresentationPage[]): Promise<boolean> {
  const body = { version: DECK_VERSION, selected: 0, pages: pages.map(storedPage) };
  try {
    const response = await fetch(PRESENTATION_DEFAULTS_ROUTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) return false;
  } catch {
    return false;
  }
  defaultPages = structuredClone(body.pages);
  return true;
}

/** Moves a page so it lands at `to`, the slot before that index. The moved page stays selected. */
export function reorderPresentationPage(deck: PresentationDeck, from: number, to: number): boolean {
  if (!Number.isInteger(from) || !Number.isInteger(to)) return false;
  if (from < 0 || from >= deck.pages.length || to < 0 || to > deck.pages.length) return false;
  if (to === from || to === from + 1) return false;
  const [page] = deck.pages.splice(from, 1);
  if (!page) return false;
  const insert = to > from ? to - 1 : to;
  deck.pages.splice(insert, 0, page);
  deck.selected = insert;
  return true;
}

/** Moves pages `ats` as one block, in deck order, to the slot before index `to`. The selected page stays selected. */
export function movePresentationPages(deck: PresentationDeck, ats: readonly number[], to: number): boolean {
  const moving = [...new Set(ats)].filter((at) => Number.isInteger(at) && deck.pages[at]).sort((a, b) => a - b);
  if (!moving.length || !Number.isInteger(to) || to < 0 || to > deck.pages.length) return false;
  const current = deck.pages[deck.selected];
  const block = moving.map((at) => deck.pages[at]!);
  const rest = deck.pages.filter((_, at) => !moving.includes(at));
  const insert = to - moving.filter((at) => at < to).length;
  const next = [...rest.slice(0, insert), ...block, ...rest.slice(insert)];
  if (next.every((page, at) => page === deck.pages[at])) return false;
  deck.pages.splice(0, deck.pages.length, ...next);
  deck.selected = current ? next.indexOf(current) : insert;
  return true;
}

/** Removes pages `ats`. At least one page stays. The page after the block, or the new last page, is selected. */
export function removePresentationPages(deck: PresentationDeck, ats: readonly number[]): boolean {
  const removing = new Set(ats.filter((at) => Number.isInteger(at) && deck.pages[at]));
  if (!removing.size || removing.size >= deck.pages.length) return false;
  const first = Math.min(...removing);
  const kept = deck.pages.filter((_, at) => !removing.has(at));
  deck.pages.splice(0, deck.pages.length, ...kept);
  deck.selected = Math.min(first, kept.length - 1);
  return true;
}

export function savePresentationDeck(deck: PresentationDeck): void {
  const body = {
    version: DECK_VERSION,
    selected: deck.selected,
    pages: deck.pages.map(storedPage),
  };
  localStorage.setItem(PRESENTATION_DECK_KEY, JSON.stringify(body));
}

function storedPage({ id, type, tone, role, state, name }: PresentationPage) {
  const label = name.trim();
  return label ? { id, type, tone, role, state, name: label } : { id, type, tone, role, state };
}

export function clearPresentationDeck(): void {
  localStorage.removeItem(PRESENTATION_DECK_KEY);
}

/** Rebuilds one page in another type. The designed type restores that frame. */
export function retargetPage(page: PresentationPage, type: PresentationType, index: ConferenceIndex | null, at: number): void {
  const spec = SPECS.find((item) => item.id === page.id);
  const native = spec?.type === type ? spec : null;
  const title = layerText(page.state, "title");
  const body = layerText(page.state, "body");
  const nextSpec: Spec = native ?? {
    id: page.id,
    type,
    tone: type === 1 ? null : (page.tone ?? spec?.tone ?? "dark"),
    role: type === 1 ? (at === SPECS.length - 1 ? "eod" : "divider") : "content",
    layout: type === 1 ? "section" : type === 2 ? "title" : "agenda",
    title: title || spec?.title || "AX",
    aside: "",
    body: body || spec?.body || "",
    captionAt: null,
    caption: "",
  };
  const next = buildPage(nextSpec, index, at);
  page.type = next.type;
  page.tone = next.tone;
  page.role = next.role;
  page.state = next.state;
  page.thumb = "";
}

/** Matches type 2 and 3 pages to the app light or dark mode. Type 1 keeps its picture. A card color left on the black or white default follows the mode. An empty page keeps a custom floor. */
export function syncPresentationMode(deck: PresentationDeck, tone: PresentationTone): void {
  const floor = bareCardColor(tone);
  const defaults = new Set([bareCardColor("dark"), bareCardColor("light")]);
  for (const page of deck.pages) {
    if (!(cardIsBare(page.state) || page.type === 1 || page.tone === tone)) {
      applyPresentationTone(page, tone);
      page.thumb = "";
    }
    if (defaults.has(page.state.color) && page.state.color !== floor) {
      page.state.color = floor;
      page.thumb = "";
    }
  }
}

/** Empty pages follow the app mode: black in dark, white in light. Pages with content stay put. */
export function recolorBarePages(deck: PresentationDeck, tone: PresentationTone): boolean {
  let changed = false;
  for (const page of deck.pages) {
    if (!cardIsBare(page.state)) continue;
    const color = bareCardColor(tone);
    if (page.state.color === color) continue;
    page.state.color = color;
    page.thumb = "";
    changed = true;
  }
  return changed;
}

/** Recolors a type 2 or 3 page. Graphic ink, captions, and veils stay put. */
export function applyPresentationTone(page: PresentationPage, tone: PresentationTone): void {
  if (page.type === 1) return;
  const pal = paletteOf(tone);
  page.tone = tone;
  page.state.color = pal.bg;
  for (const layer of page.state.layers) {
    if (layer.id.startsWith("ink") || layer.id.startsWith("caption") || layer.id.startsWith("veil") || layer.id === "arrow") continue;
    if (layer.kind === "title") layer.color = pal.title;
    else if (layer.kind === "body") layer.color = pal.body;
    else if (layer.kind === "shape" && layer.id === "ground") {
      layer.color = pal.bg;
      layer.gradient = { angle: 120, from: pal.bg, to: pal.bgTo };
    }
  }
}

const TYPE_EXAMPLE: Record<PresentationType, string> = { 1: "page-04", 2: "page-01", 3: "page-05" };

/** An empty slide. The floor is black in dark mode and white in light mode. */
export function createBlankPage(tone: PresentationTone): PresentationPage {
  return {
    id: `page-${crypto.randomUUID()}`,
    type: 1,
    tone: null,
    role: "content",
    name: "",
    thumb: "",
    state: {
      presetId: "conf-slide",
      cardWidth: SLIDE_W,
      cardHeight: SLIDE_H,
      themeSlug: "",
      color: bareCardColor(tone),
      radius: 0,
      code: "",
      panel: "design",
      controlsWidth: CONTROLS_DEFAULT,
      layers: [],
    },
  };
}

/** A fresh page in one of the three predictable layouts. Type 1 copies the saved divider. Type 3 copies the saved page 7 design. */
export function createTypedPage(type: PresentationType, index: ConferenceIndex | null, tone: PresentationTone): PresentationPage {
  if (type === 1 || type === 3) {
    const page = structuredClone(type === 1 ? TYPE1_TEMPLATE : TYPE3_TEMPLATE) as PresentationPage;
    page.id = `page-${crypto.randomUUID()}`;
    page.name = "";
    page.thumb = "";
    if (type === 3) page.tone = tone;
    return page;
  }
  const spec = SPECS.find((item) => item.id === TYPE_EXAMPLE[type]) ?? SPECS[0];
  const page = buildPage(spec, index, 0);
  page.id = `page-${crypto.randomUUID()}`;
  if (page.type !== 1) applyPresentationTone(page, tone);
  return page;
}

/** A new page with the same design and a new id. */
export function duplicatePresentationPage(source: PresentationPage): PresentationPage {
  const page = structuredClone(source);
  page.id = `page-${crypto.randomUUID()}`;
  return page;
}

/** Inserts a page after `after` and selects it. */
export function insertPresentationPage(deck: PresentationDeck, after: number, page: PresentationPage): void {
  const index = (Number.isInteger(after) ? Math.min(deck.pages.length - 1, Math.max(-1, after)) : deck.pages.length - 1) + 1;
  deck.pages.splice(index, 0, page);
  deck.selected = index;
}

/** Removes one page. The last page stays. The page after it, or the new last page, is selected. */
export function removePresentationPage(deck: PresentationDeck, at: number): boolean {
  if (!Number.isInteger(at) || at < 0 || at >= deck.pages.length || deck.pages.length <= 1) return false;
  deck.pages.splice(at, 1);
  deck.selected = Math.min(at, deck.pages.length - 1);
  return true;
}

export function pageTitle(page: PresentationPage): string {
  const text = layerText(page.state, "title").replace(/\s+/g, " ").trim();
  if (text) return text;
  if (SPECS.find((item) => item.id === page.id)?.layout === "photo") return "사진";
  if (page.type === 1 && page.state.background) return "사진";
  return "AX";
}

function buildPage(spec: Spec, index: ConferenceIndex | null, _at: number): PresentationPage {
  const tone = spec.type === 1 ? null : spec.tone;
  const layers = layoutOf(spec, index);
  const image = layers.find((layer) => layer.kind === "image");
  const state: StudioState = {
    presetId: "conf-slide",
    cardWidth: SLIDE_W,
    cardHeight: SLIDE_H,
    themeSlug: image?.kind === "image" ? image.src : "",
    color: cardColor(spec),
    radius: 0,
    code: "",
    panel: "design",
    controlsWidth: CONTROLS_DEFAULT,
    ...(spec.layout === "photo" || spec.layout === "section" ? { background: { id: "slide", mode: "image" as const } } : {}),
    layers,
  };
  return { id: spec.id, type: spec.type, tone, role: spec.role, state, name: "", thumb: "" };
}

function cardColor(spec: Spec): string {
  if (spec.layout === "title") return NAVY;
  if (spec.layout === "words" || spec.layout === "photo" || spec.layout === "section") return BLACK;
  if (spec.layout === "mosaic") return DEW;
  return spec.tone === "dark" ? BLACK : WASH;
}

function layoutOf(spec: Spec, index: ConferenceIndex | null): StudioState["layers"] {
  const layers = spec.layout === "title"
    ? titleLayers(spec)
    : spec.layout === "words"
      ? wordLayers(spec)
      : spec.layout === "photo"
        ? []
        : spec.layout === "agenda"
          ? agendaLayers(spec, index)
          : spec.layout === "section"
            ? sectionLayers(spec)
            : mosaicLayers(spec, index);
  return withRequired(layers);
}

/** A newly built page starts with one image, body, and title. A saved page keeps the layers it has. */
function withRequired(layers: StudioState["layers"]): StudioState["layers"] {
  const next = [...layers];
  if (!next.some((layer) => layer.kind === "image")) {
    next.unshift({ id: "image", kind: "image", src: "", x: 0, y: 0, width: 100, radius: 0, crop: null, opacity: 0 });
  }
  if (!next.some((layer) => layer.kind === "body")) next.push(textAt("body", "body", "", 32, INK, KO, "left", 0, 0, 400));
  if (!next.some((layer) => layer.kind === "title")) next.push(textAt("title", "title", "", 32, INK, DISPLAY, "left", 0, 0, 400));
  return next;
}

function titleLayers(spec: Spec): StudioState["layers"] {
  const footers = [
    { id: "footer-1", text: "Speech", fontId: DISPLAY, x: 126 },
    { id: "footer-2", text: "Woonghee Park", fontId: KO, x: 1230 },
    { id: "footer-3", text: "AX Design", fontId: KO, x: 2472 },
    { id: "footer-4", text: "2026", fontId: DISPLAY, x: 3635 },
  ];
  return [
    panel("ground", 0, 0, SLIDE_W, SLIDE_H, NAVY),
    textAt("body", "body", spec.body, px(52), INK, DISPLAY, "left", px(56), px(161), 400),
    ...footers.map((item) => textAt(item.id, "body", item.text, px(18), INK, item.fontId, "left", item.x, px(1010), 700)),
    textAt("title", "title", spec.title, px(64), INK, KO, "left", px(56), px(69), 300),
  ];
}

function wordLayers(spec: Spec): StudioState["layers"] {
  const wide = spec.title.length > 4;
  const size = px(wide ? 100 : 200);
  const y = px(540) - size / 2;
  const layers: StudioState["layers"] = [panel("ground", 0, 0, SLIDE_W, SLIDE_H, BLACK)];
  if (!wide) {
    layers.push({
      id: "arrow",
      kind: "line",
      x: px(745),
      y: px(540),
      x2: px(1115),
      y2: px(540),
      stroke: 12,
      cap: "butt",
      start: false,
      end: true,
      color: AZURE,
    });
  }
  layers.push(
    textAt("ink", "title", spec.title, size, AZURE, DISPLAY, "left", px(wide ? 48 : 475), y, 400),
    textAt("ink-2", "title", spec.aside, size, AZURE, DISPLAY, "left", px(wide ? 1158 : 1044), y, 400),
  );
  return layers;
}

function agendaLayers(spec: Spec, index: ConferenceIndex | null): StudioState["layers"] {
  const slots = [
    { x: px(69), w: px(570) },
    { x: px(675), w: px(570) },
    { x: px(1281), w: px(571) },
  ];
  const y = px(360);
  const height = px(430);
  const centers = [px(354), px(960), px(1567)];
  const layers: StudioState["layers"] = [
    panel("ground", 0, 0, SLIDE_W, SLIDE_H, WASH, 100, { angle: 120, from: WASH, to: GLOW }),
  ];
  slots.forEach((slot, at) => {
    layers.push(framed(at === 0 ? "image" : `image-${at + 1}`, sourceAt(index, at), slot.x, y, slot.w, height));
  });
  layers.push(textAt("body", "body", spec.body, px(18), NIGHT, DISPLAY, "left", px(63), px(1010), 700));
  if (spec.captionAt !== null && spec.caption) {
    const slot = slots[spec.captionAt];
    const center = centers[spec.captionAt] ?? 0;
    if (slot) {
      layers.push(panel(`veil-${spec.captionAt}`, slot.x, y, slot.w, height, rgbToHex(0, 0, 0), 60));
      layers.push(
        textAt(
          "caption",
          "body",
          spec.caption,
          px(52),
          MIST,
          DISPLAY,
          "center",
          center - measure(spec.caption, px(52)) / 2,
          px(517),
          400,
        ),
      );
    }
  }
  layers.push(textAt("title", "title", spec.title, px(100), NIGHT, DISPLAY, "left", px(56), px(56), 400));
  return layers;
}

function sectionLayers(spec: Spec): StudioState["layers"] {
  const size = px(100);
  return [
    panel("dim", 0, 0, SLIDE_W, SLIDE_H, rgbToHex(0, 0, 0), 40),
    textAt("title", "title", spec.title, size, INK, DISPLAY, "left", (SLIDE_W - measure(spec.title, size)) / 2, px(471), 400),
  ];
}

function mosaicLayers(spec: Spec, index: ConferenceIndex | null): StudioState["layers"] {
  const frames = [
    { x: 0, y: px(58), w: px(688), h: px(516) },
    { x: px(688), y: px(58), w: px(687), h: px(518) },
    { x: 0, y: px(574), w: px(688), h: px(448) },
    { x: px(688), y: px(573), w: px(687), h: px(449) },
  ];
  return [
    panel("ground", 0, 0, SLIDE_W, SLIDE_H, DEW),
    ...frames.map((frame, at) => framed(at === 0 ? "image" : `image-${at + 1}`, sourceAt(index, at), frame.x, frame.y, frame.w, frame.h)),
    textAt("title", "title", spec.title, px(100), BLACK, DISPLAY, "right", px(1441), px(56), 400),
  ];
}

function sourceAt(index: ConferenceIndex | null, slot: number): ConferenceSource | null {
  const pool = index?.speakers.length ? index.speakers : (index?.logos ?? []);
  if (!pool.length) return null;
  return pool[slot % pool.length] ?? null;
}

function framed(id: string, source: ConferenceSource | null, x: number, y: number, width: number, height: number): ImageLayer {
  const frame = height / Math.max(1, width);
  const aspect = source && source.width > 0 ? source.height / source.width : frame;
  const crop = aspect >= frame
    ? { x: 0, y: (1 - frame / aspect) / 2, w: 1, h: frame / aspect }
    : { x: (1 - aspect / frame) / 2, y: 0, w: aspect / frame, h: 1 };
  return {
    id,
    kind: "image",
    src: source ? conferenceSrc(source) : "",
    x: clampImageOffset(x, SLIDE_W, width),
    y: clampImageOffset(y, SLIDE_H, height),
    width: clampImageWidth(width),
    radius: 0,
    crop,
  };
}

function panel(
  id: string,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  opacity = 100,
  gradient?: LinearGradient,
): ShapeLayer {
  return {
    id,
    kind: "shape",
    shape: "rect",
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width),
    height: Math.round(height),
    radius: 0,
    color,
    ...(opacity < 100 ? { opacity } : {}),
    ...(gradient ? { gradient } : {}),
  };
}

function textAt(
  id: string,
  kind: "title" | "body",
  value: string,
  size: number,
  color: string,
  fontId: string,
  align: TextAlign,
  x: number,
  y: number,
  weight: number,
): TextLayer {
  const fontSize = clampFontSize(size, SLIDE_W);
  return {
    id,
    kind,
    text: value,
    x: clampTextOffset(x, SLIDE_W, fontSize),
    y: clampTextOffset(y, SLIDE_H, fontSize),
    size: fontSize,
    fontId,
    color,
    weight,
    italic: false,
    underline: false,
    align,
  };
}

function measure(text: string, size: number): number {
  const longest = text.split("\n").reduce((max, line) => Math.max(max, line.length), 0);
  const korean = /[가-힣]/.test(text);
  return longest * size * (korean ? 0.92 : 0.56);
}

function layerText(state: StudioState, kind: "title" | "body"): string {
  const layer = state.layers.find((item) => item.kind === kind);
  return layer && layer.kind === kind ? layer.text : "";
}

/** `legacy` drops old saves that hold only some of the built-in pages. */
function parseDeck(raw: unknown, legacy = true): PresentationDeck | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as { version?: unknown; selected?: unknown; pages?: unknown };
  if (value.version !== DECK_VERSION || !Array.isArray(value.pages) || value.pages.length < 1) return null;
  const specIds = new Set(SPECS.map((item) => item.id));
  const pages: PresentationPage[] = [];
  const seen = new Set<string>();
  for (const item of value.pages) {
    if (!item || typeof item !== "object") return null;
    const page = item as { id?: unknown; type?: unknown; tone?: unknown; role?: unknown; state?: unknown; name?: unknown };
    if (typeof page.id !== "string" || !page.id || seen.has(page.id)) return null;
    seen.add(page.id);
    if (page.type !== 1 && page.type !== 2 && page.type !== 3) return null;
    if (page.role !== "divider" && page.role !== "content" && page.role !== "eod") return null;
    const tone = page.tone === "light" || page.tone === "dark" ? page.tone : null;
    const state = normalizeStudioState(page.state);
    if (!state) return null;
    const name = typeof page.name === "string" ? page.name.trim().slice(0, 80) : "";
    pages.push({ id: page.id, type: page.type, tone: page.type === 1 ? null : tone, role: page.role, state, name, thumb: "" });
  }
  const onlySpecs = pages.every((page) => specIds.has(page.id));
  if (legacy && onlySpecs && pages.length !== SPECS.length) return null;
  const selected = typeof value.selected === "number" && value.selected >= 0 && value.selected < pages.length ? Math.round(value.selected) : 0;
  return { selected, pages };
}

function px(value: number): number {
  return Math.round(value * 2);
}
