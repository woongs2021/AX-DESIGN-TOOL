/**
 * Layouts saved by "초기화로 세팅", one per card size preset. Browser-local, not written to the vault.
 * 초기화 restores the current preset's snapshot. 리셋 deletes all of them.
 */
import { normalizeStudioState, type StudioState } from "./shared/studio.ts";

const KEY = "ax-studio-baselines";
/** Before presets had their own baseline, a single layout was stored here. */
const LEGACY_KEY = "ax-studio-baseline";

function readAll(): Record<string, unknown> {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const value = JSON.parse(raw) as unknown;
      if (value && typeof value === "object") return value as Record<string, unknown>;
    }
    const legacy = localStorage.getItem(LEGACY_KEY);
    const state = legacy ? normalizeStudioState(JSON.parse(legacy) as unknown) : null;
    if (state) return { [state.presetId]: state };
  } catch {
    /* unreadable storage counts as no baseline */
  }
  return {};
}

export function readBaseline(presetId: string): StudioState | null {
  const state = normalizeStudioState(readAll()[presetId]);
  return state && state.presetId === presetId ? state : null;
}

export function writeBaseline(state: StudioState): void {
  localStorage.setItem(KEY, JSON.stringify({ ...readAll(), [state.presetId]: state }));
  localStorage.removeItem(LEGACY_KEY);
}

export function clearBaseline(): void {
  localStorage.removeItem(KEY);
  localStorage.removeItem(LEGACY_KEY);
}
