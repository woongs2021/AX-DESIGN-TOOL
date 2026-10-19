/**
 * Conference tab: size presets, the conference.json contract, and the built-in layouts.
 * Internal and public builds both write conference.json. Without that file the tab is not shown.
 */
import {
  clampFontSize,
  clampImageWidth,
  clampTextOffset,
  CONTROLS_DEFAULT,
  DEFAULT_BODY,
  DEFAULT_TITLE,
  rgbToHex,
  type ImageLayer,
  type StudioBackground,
  type StudioState,
  type TextLayer,
} from "./studio.ts";
import type { StudioPreset } from "./studio-presets.ts";

export type ConferencePrint = { width: number; height: number; dpi: number };
export type ConferencePreset = StudioPreset & {
  /** Background id in conference.json. */
  background: string;
  /** Print-resolution PNG. Null when the preset has no print size. */
  print: ConferencePrint | null;
  /** Long edge of the video export when the browser encoder cannot take the card size. */
  videoFallbackEdge: number;
};

export const CONFERENCE_PRESETS: readonly ConferencePreset[] = [
  { id: "conf-instagram", name: "Instagram", width: 2160, height: 2160, background: "instagram", print: null, videoFallbackEdge: 1920 },
  { id: "conf-poster", name: "Poster", width: 2880, height: 3840, background: "poster", print: null, videoFallbackEdge: 2880 },
  { id: "conf-slide", name: "Slide", width: 3840, height: 2160, background: "slide", print: null, videoFallbackEdge: 1920 },
  {
    id: "conf-banner-x",
    name: "X배너",
    width: 1280,
    height: 3840,
    background: "banner-x",
    print: { width: 3543, height: 10630, dpi: 150 },
    videoFallbackEdge: 2880,
  },
  {
    id: "conf-banner-l",
    name: "L배너",
    width: 3840,
    height: 640,
    background: "banner-l",
    print: { width: 21260, height: 3543, dpi: 100 },
    videoFallbackEdge: 1920,
  },
];

export const DEFAULT_CONFERENCE_PRESET_ID = "conf-instagram";
export const CONFERENCE_SRC_PREFIX = "conf:";

export function conferencePresetById(id: string): ConferencePreset {
  return CONFERENCE_PRESETS.find((preset) => preset.id === id) ?? CONFERENCE_PRESETS[0]!;
}

export type ConferenceMedia = { path: string; width: number | null; height: number | null; bytes: number };
export type ConferenceBackground = {
  id: string;
  image: (ConferenceMedia & { dpi: number | null }) | null;
  video: (ConferenceMedia & { durationSec: number | null }) | null;
  thumbPath: string | null;
};
export type ConferenceSource = {
  id: string;
  label: string;
  path: string;
  thumbPath: string;
  format: "png" | "svg";
  width: number;
  height: number;
  bytes: number;
};
export type ConferenceIndex = {
  version: 1;
  backgrounds: ConferenceBackground[];
  speakers: ConferenceSource[];
  logos: ConferenceSource[];
};

export function conferenceSrc(source: Pick<ConferenceSource, "id">): string {
  return `${CONFERENCE_SRC_PREFIX}${source.id}`;
}

/** Background id from a Graphic Resources file name. Null when the name matches no preset. */
export function backgroundIdFor(fileName: string): string | null {
  const name = fileName.toLowerCase();
  if (name.startsWith("insta")) return "instagram";
  if (name.startsWith("poster")) return "poster";
  if (name.startsWith("slide")) return "slide";
  if (name.startsWith("x_banner")) return "banner-x";
  if (name.startsWith("l_banner")) return "banner-l";
  return null;
}

const LOGO_WORDS: readonly [string, string][] = [
  ["브루넬한인회로고", "logo-brunel-korean-society"],
  ["브루넬심벌", "logo-brunel-symbol"],
  ["브루넬로고", "logo-brunel"],
  ["성균관대로고", "logo-skku"],
  ["홍익대학교로고", "logo-hongik"],
  ["디스닷로고", "logo-disdot"],
  ["qr코드", "qr-code"],
];

/** English slug for an SVG file name; "홍익대학교 로고-01" → "logo-hongik-1". Null when no word is known. */
export function logoSlug(fileName: string): string | null {
  const base = fileName.replace(/\.svg$/i, "").normalize("NFC");
  const compact = base.replace(/\s+/g, "").toLowerCase();
  const word = LOGO_WORDS.find(([korean]) => compact.startsWith(korean));
  if (!word) return null;
  const number = compact.slice(word[0].length).match(/(\d+)$/);
  return number ? `${word[1]}-${Number(number[1])}` : word[1];
}

/** "001.png" → "speaker-001". */
export function speakerSlug(fileName: string): string | null {
  const base = fileName.replace(/\.png$/i, "").toLowerCase();
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(base) ? `speaker-${base}` : null;
}

export function backgroundHasVideo(index: ConferenceIndex | null, id: string): boolean {
  return Boolean(index?.backgrounds.find((item) => item.id === id)?.video);
}

/** The preset's background, keeping video when the new background has one. */
export function presetBackground(
  index: ConferenceIndex | null,
  presetId: string,
  current: StudioBackground | null | undefined,
): StudioBackground {
  const id = conferencePresetById(presetId).background;
  const mode = current?.mode === "video" && backgroundHasVideo(index, id) ? "video" : "image";
  return { id, mode };
}

/** Video export sizes: the card size first, then the preset's fallback edge on the same ratio. Both even. */
export function videoExportSizes(presetId: string, cardWidth: number, cardHeight: number): { width: number; height: number }[] {
  const even = (value: number) => Math.max(2, Math.round(value / 2) * 2);
  const first = { width: even(cardWidth), height: even(cardHeight) };
  const scale = conferencePresetById(presetId).videoFallbackEdge / Math.max(cardWidth, cardHeight);
  const fallback = { width: even(cardWidth * scale), height: even(cardHeight * scale) };
  return fallback.width === first.width && fallback.height === first.height ? [first] : [first, fallback];
}

/** Print size for the current card: the preset's print width, height on the card's ratio. */
export function printSize(presetId: string, cardWidth: number, cardHeight: number): ConferencePrint | null {
  const preset = conferencePresetById(presetId);
  const print = preset.print;
  if (!print) return null;
  // At the preset size the print matches the original background exactly (3543 × 10630, not × 10629).
  if (cardWidth === preset.width && cardHeight === preset.height) return { ...print };
  const scale = print.width / Math.max(1, cardWidth);
  return { width: print.width, height: Math.max(1, Math.round(cardHeight * scale)), dpi: print.dpi };
}

/** Built-in layout for a preset: white title and body top left, the first speaker bottom right. */
export function createConferenceState(presetId: string, index: ConferenceIndex | null): StudioState {
  const preset = conferencePresetById(presetId);
  const { width, height } = preset;
  const margin = Math.round(Math.min(width, height) * 0.08);
  const titleSize = clampFontSize(Math.min(width * 0.06, height * 0.16), width);
  const bodySize = clampFontSize(titleSize * 0.36, width);
  const ink = rgbToHex(255, 255, 255);
  const speaker = index?.speakers[0] ?? index?.logos[0] ?? null;
  const src = speaker ? conferenceSrc(speaker) : "";
  const aspect = speaker ? speaker.height / Math.max(1, speaker.width) : 1;
  const imageHeight = Math.min(height * 0.62, width * 0.5 * aspect);
  const imageWidth = clampImageWidth(imageHeight / aspect);
  const image: ImageLayer = {
    id: "image",
    kind: "image",
    src,
    x: Math.round(width - imageWidth - margin),
    y: Math.round(height - imageWidth * aspect),
    width: imageWidth,
    radius: 0,
    crop: null,
  };
  const text = (kind: "title" | "body", size: number, y: number): TextLayer => ({
    id: kind,
    kind,
    text: kind === "title" ? DEFAULT_TITLE : DEFAULT_BODY,
    x: clampTextOffset(margin, width, size),
    y: clampTextOffset(y, height, size),
    size,
    fontId: kind === "title" ? "montserrat" : "pretendard",
    color: ink,
    weight: kind === "title" ? 600 : 400,
    italic: false,
    underline: false,
    align: "left",
  });
  return {
    presetId: preset.id,
    cardWidth: width,
    cardHeight: height,
    themeSlug: src,
    color: rgbToHex(16, 42, 74),
    radius: 0,
    code: "",
    panel: "design",
    controlsWidth: CONTROLS_DEFAULT,
    background: presetBackground(index, preset.id, null),
    layers: [image, text("body", bodySize, margin + Math.round(titleSize * 1.6)), text("title", titleSize, margin)],
  };
}
