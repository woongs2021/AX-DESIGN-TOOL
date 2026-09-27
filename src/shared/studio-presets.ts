export type StudioPreset = {
  id: string;
  name: string;
  width: number;
  height: number;
  /** Preview-only guide. Not painted into the downloaded PNG. */
  safe?: { width: number; height: number };
};

export const DEFAULT_PRESET_ID = "ig-feed-square";

export const STUDIO_PRESETS: readonly StudioPreset[] = [
  { id: "ig-feed-square", name: "Instagram Feed", width: 1080, height: 1080 },
  { id: "ig-feed-portrait", name: "Instagram Feed Portrait", width: 1080, height: 1350 },
  { id: "ig-story", name: "Instagram Story / Reels", width: 1080, height: 1920 },
  { id: "fb-feed", name: "Facebook Feed", width: 1200, height: 630 },
  { id: "fb-cover", name: "Facebook Cover", width: 1640, height: 624 },
  { id: "yt-thumbnail", name: "YouTube Thumbnail", width: 1280, height: 720 },
  {
    id: "yt-banner",
    name: "YouTube Channel Cover",
    width: 2560,
    height: 1440,
    safe: { width: 1546, height: 423 },
  },
  { id: "yt-shorts", name: "YouTube Shorts", width: 1080, height: 1920 },
];

export function presetById(id: string): StudioPreset {
  return STUDIO_PRESETS.find((preset) => preset.id === id) ?? STUDIO_PRESETS[0]!;
}
