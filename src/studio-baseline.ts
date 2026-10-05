/**
 * The layout saved by "초기화로 세팅". Browser-local, not written to the vault.
 * 초기화 restores this snapshot. 리셋 deletes it.
 */
import type { StudioState } from "./shared/studio.ts";

const KEY = "ax-studio-baseline";

function isStudioState(value: unknown): value is StudioState {
  if (!value || typeof value !== "object") return false;
  const state = value as StudioState;
  return (
    typeof state.presetId === "string" &&
    typeof state.cardWidth === "number" &&
    typeof state.cardHeight === "number" &&
    typeof state.title === "string" &&
    typeof state.body === "string" &&
    typeof state.themeSlug === "string" &&
    typeof state.color === "string" &&
    typeof state.radius === "number" &&
    typeof state.code === "string" &&
    (state.panel === "design" || state.panel === "code") &&
    typeof state.controlsWidth === "number" &&
    typeof state.titleSize === "number" &&
    typeof state.bodySize === "number" &&
    typeof state.titleX === "number" &&
    typeof state.titleY === "number" &&
    typeof state.bodyX === "number" &&
    typeof state.bodyY === "number" &&
    typeof state.titleFontId === "string" &&
    typeof state.bodyFontId === "string" &&
    typeof state.titleColor === "string" &&
    typeof state.bodyColor === "string" &&
    typeof state.imageWidth === "number" &&
    typeof state.imageX === "number" &&
    typeof state.imageY === "number"
  );
}

export function readBaseline(): StudioState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return isStudioState(parsed) ? parsed : null;
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
