/**
 * The layout saved by "초기화로 세팅". Browser-local, not written to the vault.
 * 초기화 restores this snapshot. 리셋 deletes it.
 */
import { normalizeStudioState, type StudioState } from "./shared/studio.ts";

const KEY = "ax-studio-baseline";

export function readBaseline(): StudioState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return normalizeStudioState(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function writeBaseline(state: StudioState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function clearBaseline(): void {
  localStorage.removeItem(KEY);
}
