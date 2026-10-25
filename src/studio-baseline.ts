/**
 * Layouts saved by "초기화로 세팅", one per card size preset. Browser-local, not written to the vault.
 * 초기화 restores the current preset's snapshot. 리셋 deletes all of them.
 * Without a saved snapshot, the preset falls back to its built-in layout.
 * Online Studio and Conference keep separate stores so one tab's baseline never resets the other.
 */
import { DEFAULT_CONFERENCE_PRESET_ID } from "./shared/conference.ts";
import { normalizeStudioState, type StudioState } from "./shared/studio.ts";
import BUILTIN_BASELINES from "./shared/studio-defaults.json";
import CONFERENCE_DEFAULTS from "./shared/conference-defaults.json";

export type BaselineStore = {
  read: (presetId: string) => StudioState | null;
  write: (state: StudioState) => void;
  clear: () => void;
};

function matching(raw: unknown, presetId: string): StudioState | null {
  const state = normalizeStudioState(structuredClone(raw));
  return state && state.presetId === presetId ? state : null;
}

/** legacyKey: before presets had their own baseline, a single layout was stored there. */
export function baselineStore(key: string, builtin: (presetId: string) => unknown, legacyKey?: string): BaselineStore {
  const readAll = (): Record<string, unknown> => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const value = JSON.parse(raw) as unknown;
        if (value && typeof value === "object") return value as Record<string, unknown>;
      }
      const legacy = legacyKey ? localStorage.getItem(legacyKey) : null;
      const state = legacy ? normalizeStudioState(JSON.parse(legacy) as unknown) : null;
      if (state) return { [state.presetId]: state };
    } catch {
      /* unreadable storage counts as no baseline */
    }
    return {};
  };
  return {
    read: (presetId) => matching(readAll()[presetId], presetId) ?? matching(builtin(presetId), presetId),
    write: (state) => {
      localStorage.setItem(key, JSON.stringify({ ...readAll(), [state.presetId]: state }));
      if (legacyKey) localStorage.removeItem(legacyKey);
    },
    clear: () => {
      localStorage.removeItem(key);
      if (legacyKey) localStorage.removeItem(legacyKey);
    },
  };
}

const studioBaselines = baselineStore(
  "ax-studio-baselines",
  (presetId) => (BUILTIN_BASELINES as Record<string, unknown>)[presetId],
  "ax-studio-baseline",
);

export const CONFERENCE_BASELINE_KEY = "ax-conference-baselines";

const conferenceBaselines = CONFERENCE_DEFAULTS.baselines as Record<string, unknown>;
const conferenceCards = CONFERENCE_DEFAULTS.instagramCards as Record<string, unknown>;
const conferenceOrder = CONFERENCE_DEFAULTS.instagramOrder;

/** Layout saved in the app, or the built-in card for presets that have one. */
export function conferenceBuiltinBaseline(presetId: string): unknown | null {
  return conferenceBaselines[presetId] ?? null;
}

/** The layout saved with “초기화로 세팅”, without falling back to the built-in card. */
export function readStoredConferenceBaseline(presetId: string): StudioState | null {
  try {
    const raw = localStorage.getItem(CONFERENCE_BASELINE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as unknown;
    if (!value || typeof value !== "object") return null;
    return matching((value as Record<string, unknown>)[presetId], presetId);
  } catch {
    return null;
  }
}

export function readBaseline(presetId: string): StudioState | null {
  return studioBaselines.read(presetId);
}

export function writeBaseline(state: StudioState): void {
  studioBaselines.write(state);
}

export function clearBaseline(): void {
  studioBaselines.clear();
}

const INSTAGRAM_CARD_KEY = "ax-conference-instagram-cards";

function readInstagramCardMap(): Record<string, unknown> {
  try {
    const raw = localStorage.getItem(INSTAGRAM_CARD_KEY);
    if (!raw) return {};
    const value = JSON.parse(raw) as unknown;
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return value as Record<string, unknown>;
  } catch {
    return {};
  }
}

function asInstagramCard(raw: unknown): StudioState | null {
  const state = normalizeStudioState(structuredClone(raw));
  return state?.presetId === DEFAULT_CONFERENCE_PRESET_ID ? state : null;
}

/** The layout saved for one Instagram speaker card. Keyed by that card's speaker src. */
export function readInstagramCard(src: string): StudioState | null {
  if (!src) return null;
  const raw = readInstagramCardMap()[src];
  if (raw !== undefined) {
    const stored = asInstagramCard(raw);
    if (stored) return stored;
  }
  return asInstagramCard(conferenceCards[src]);
}

export function writeInstagramCard(src: string, state: StudioState): void {
  if (!src) return;
  try {
    const all = readInstagramCardMap();
    all[src] = state;
    localStorage.setItem(INSTAGRAM_CARD_KEY, JSON.stringify(all));
  } catch {
    /* a full store still keeps the card for this visit */
  }
}

export function clearInstagramCards(): void {
  localStorage.removeItem(INSTAGRAM_CARD_KEY);
}

const INSTAGRAM_ORDER_KEY = "ax-conference-instagram-order";

function storedInstagramOrder(): string[] {
  try {
    const raw = localStorage.getItem(INSTAGRAM_ORDER_KEY);
    if (!raw) return [];
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch {
    return [];
  }
}

/** Speaker srcs in the order the Instagram cards are shown. An empty store uses the built-in order. */
export function readInstagramOrder(): string[] {
  const stored = storedInstagramOrder();
  return stored.length > 0 ? stored : [...conferenceOrder];
}

export function writeInstagramOrder(srcs: readonly string[]): void {
  try {
    localStorage.setItem(INSTAGRAM_ORDER_KEY, JSON.stringify([...srcs]));
  } catch {
    /* the order still holds for this visit */
  }
}

export function clearInstagramOrder(): void {
  localStorage.removeItem(INSTAGRAM_ORDER_KEY);
}
