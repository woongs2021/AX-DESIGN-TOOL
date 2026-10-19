import assert from "node:assert/strict";
import { PNG } from "pngjs";
import {
  backgroundIdFor,
  CONFERENCE_PRESETS,
  conferencePresetById,
  conferenceSrc,
  createConferenceState,
  logoSlug,
  presetBackground,
  printSize,
  speakerSlug,
  videoExportSizes,
  type ConferenceIndex,
} from "../src/shared/conference.ts";
import { createPngEncoder, crc32, pixelsPerMeter, printStrips } from "../src/shared/print-png.ts";
import { designToCode, normalizeStudioState } from "../src/shared/studio.ts";
import { hrefFor, parseHash } from "../src/router.ts";

const store = new Map<string, string>();
Object.assign(globalThis, {
  localStorage: {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, String(value)),
    removeItem: (key: string) => void store.delete(key),
  },
});
const { baselineStore, CONFERENCE_BASELINE_KEY, clearBaseline, writeBaseline } = await import("../src/studio-baseline.ts");

const media = (path: string) => ({ path, width: 100, height: 100, bytes: 1 });
const index: ConferenceIndex = {
  version: 1,
  backgrounds: [
    { id: "instagram", image: { ...media("i.png"), dpi: 72 }, video: { ...media("i.mp4"), durationSec: 5 }, thumbPath: null },
    { id: "banner-l", image: { ...media("l.png"), dpi: 100 }, video: null, thumbPath: null },
    { id: "banner-x", image: { ...media("x.png"), dpi: 150 }, video: { ...media("x.mp4"), durationSec: 5 }, thumbPath: null },
  ],
  speakers: [{ id: "speaker-001", label: "001", path: "s.png", thumbPath: "s.webp", format: "png", width: 1000, height: 2000, bytes: 1 }],
  logos: [{ id: "logo-skku-1", label: "성균관대로고 1", path: "l.svg", thumbPath: "l.svg", format: "svg", width: 1080, height: 1080, bytes: 1 }],
};

// Presets and names
assert.deepEqual(
  CONFERENCE_PRESETS.map((preset) => `${preset.width}x${preset.height}`),
  ["2160x2160", "2880x3840", "3840x2160", "1280x3840", "3840x640"],
);
assert.ok(CONFERENCE_PRESETS.every((preset) => preset.width <= 4000 && preset.height <= 4000));
assert.equal(conferencePresetById("nope").id, "conf-instagram");
assert.equal(backgroundIdFor("Insta_1x1_2160x2160.mp4"), "instagram");
assert.equal(backgroundIdFor("x_banner_1x3_1280×3840.mp4"), "banner-x");
assert.equal(backgroundIdFor("L_banner_6x1_5400x900mm_100dpi.png"), "banner-l");
assert.equal(backgroundIdFor("Slide_16x9_3840x2160_compressed.mp4"), "slide");
assert.equal(backgroundIdFor("readme.txt"), null);
assert.equal(logoSlug("홍익대학교 로고-01.svg"), "logo-hongik-1");
assert.equal(logoSlug("성균관대로고 3.svg".normalize("NFD")), "logo-skku-3");
assert.equal(logoSlug("브루넬한인회로고.svg"), "logo-brunel-korean-society");
assert.equal(logoSlug("브루넬로고2.svg"), "logo-brunel-2");
assert.equal(logoSlug("qr코드-01.svg"), "qr-code-1");
assert.equal(logoSlug("모르는파일.svg"), null);
assert.equal(speakerSlug("001.png"), "speaker-001");
assert.equal(conferenceSrc({ id: "speaker-001" }), "conf:speaker-001");

// Background follows the preset; video mode survives only where the background has a video
assert.deepEqual(presetBackground(index, "conf-banner-x", { id: "instagram", mode: "video" }), { id: "banner-x", mode: "video" });
assert.deepEqual(presetBackground(index, "conf-banner-l", { id: "instagram", mode: "video" }), { id: "banner-l", mode: "image" });
assert.deepEqual(presetBackground(index, "conf-instagram", null), { id: "instagram", mode: "image" });

// Video sizes: card size first, then the fallback edge on the same ratio, both even
assert.deepEqual(videoExportSizes("conf-instagram", 2160, 2160), [{ width: 2160, height: 2160 }, { width: 1920, height: 1920 }]);
assert.deepEqual(videoExportSizes("conf-poster", 2880, 3840), [{ width: 2880, height: 3840 }, { width: 2160, height: 2880 }]);
assert.deepEqual(videoExportSizes("conf-banner-x", 1280, 3840), [{ width: 1280, height: 3840 }, { width: 960, height: 2880 }]);
assert.ok(videoExportSizes("conf-slide", 1001, 563).every((size) => size.width % 2 === 0 && size.height % 2 === 0));

// Print sizes match the original backgrounds
assert.deepEqual(printSize("conf-banner-x", 1280, 3840), { width: 3543, height: 10630, dpi: 150 });
assert.deepEqual(printSize("conf-banner-x", 1280, 2560), { width: 3543, height: 7086, dpi: 150 });
assert.deepEqual(printSize("conf-banner-l", 3840, 640), { width: 21260, height: 3543, dpi: 100 });
assert.equal(printSize("conf-instagram", 2160, 2160), null);
const strips = printStrips(21260, 3543);
assert.equal(strips.reduce((sum, strip) => sum + strip.h, 0), 3543);
assert.ok(strips.every((strip) => strip.h * 21260 <= 8_000_000));
assert.deepEqual(printStrips(10, 5, 20), [{ y: 0, h: 2 }, { y: 2, h: 2 }, { y: 4, h: 1 }]);

// Streamed PNG decodes to the same pixels and carries the dpi
assert.equal(crc32(new TextEncoder().encode("IEND")), 0xae426082);
const width = 7;
const height = 5;
const pixels = new Uint8Array(width * height * 4).map((_, i) => (i * 37) % 256);
const encoder = createPngEncoder(width, height, 150);
for (const strip of printStrips(width, height, 14)) {
  await encoder.writeRows(pixels.subarray(strip.y * width * 4, (strip.y + strip.h) * width * 4), strip.h);
}
const file = Buffer.concat(await encoder.finish());
const decoded = PNG.sync.read(file);
assert.equal(decoded.width, width);
assert.equal(decoded.height, height);
assert.deepEqual(new Uint8Array(decoded.data), pixels);
const phys = file.indexOf("pHYs");
assert.ok(phys > 0);
assert.equal(file.readUInt32BE(phys + 4), pixelsPerMeter(150));
assert.equal(file[phys + 12], 1);

// Built-in layout and saved state
const state = createConferenceState("conf-banner-l", index);
assert.equal(state.cardWidth, 3840);
assert.deepEqual(state.background, { id: "banner-l", mode: "image" });
const image = state.layers.find((layer) => layer.kind === "image");
assert.equal(image?.kind === "image" ? image.src : "", "conf:speaker-001");
assert.ok(image && image.kind === "image" && image.y + image.width * 2 <= state.cardHeight + 1);
const tinted = structuredClone(state);
const tintedImage = tinted.layers.find((layer) => layer.kind === "image");
if (tintedImage?.kind === "image") tintedImage.tint = "#ffffff";
const restored = normalizeStudioState(JSON.parse(JSON.stringify(tinted)));
assert.deepEqual(restored?.background, { id: "banner-l", mode: "image" });
assert.equal(restored?.layers.find((layer) => layer.kind === "image")?.kind === "image" ? (restored.layers.find((layer) => layer.kind === "image") as { tint?: string }).tint : null, "#ffffff");
assert.ok(designToCode(state, () => 2).includes('<img class="studio-bg" src="{{image:background}}"'));
assert.ok(designToCode({ ...state, background: { id: "instagram", mode: "video" } }, () => 2).includes("<video class=\"studio-bg\""));

// Conference keeps its own baseline store; clearing Online Studio leaves it alone
const conference = baselineStore(CONFERENCE_BASELINE_KEY, (presetId) => createConferenceState(presetId, index));
const edited = createConferenceState("conf-poster", index);
edited.color = "#123456";
conference.write(edited);
writeBaseline(createConferenceState("conf-poster", index));
clearBaseline();
assert.equal(conference.read("conf-poster")?.color, "#123456");
conference.clear();
assert.equal(conference.read("conf-poster")?.color, createConferenceState("conf-poster", index).color);
assert.ok(store.has(CONFERENCE_BASELINE_KEY) === false);

// Route
assert.deepEqual(parseHash("#/conference"), { name: "conference", card: null });
assert.deepEqual(parseHash("#/conference?card=abc"), { name: "conference", card: "abc" });
assert.equal(hrefFor({ name: "conference", card: null }), "#/conference");
assert.equal(hrefFor({ name: "conference", card: "abc" }), "#/conference?card=abc");

console.log("OK: conference presets, slugs, backgrounds, video and print sizes, PNG encoder, baselines, and routes");
