/**
 * Layouts saved by "초기화로 세팅", one per card size preset. Browser-local, not written to the vault.
 * 초기화 restores the current preset's snapshot. 리셋 deletes all of them.
 * Without a saved snapshot, the preset falls back to its built-in layout.
 * Online Studio and Conference keep separate stores so one tab's baseline never resets the other.
 */
import { normalizeStudioState, type StudioState } from "./shared/studio.ts";
import BUILTIN_BASELINES from "./shared/studio-defaults.json";

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

export function readBaseline(presetId: string): StudioState | null {
  return studioBaselines.read(presetId);
}

export function writeBaseline(state: StudioState): void {
  studioBaselines.write(state);
}

export function clearBaseline(): void {
  studioBaselines.clear();
}
