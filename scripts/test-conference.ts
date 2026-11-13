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
import { designToCode, normalizeStudioState, rgbToHex } from "../src/shared/studio.ts";
import { createPresentationDeck, createTypedPage, defaultPresentationDeck, defaultsWithPage, duplicatePresentationPage, insertPresentationPage, loadPresentationDeck, movePresentationPages, removePresentationPage, removePresentationPages, reorderPresentationPage, savePresentationDeck, syncPresentationMode } from "../src/shared/presentation.ts";
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
  ["2160x2160", "2880x3840", "3840x2160", "2400x2400", "1280x3840", "3840x1024"],
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
assert.deepEqual(presetBackground(index, "conf-slide-front", null), { id: "instagram", mode: "image" });

// Video sizes: card size first, then the fallback edge on the same ratio, both even
assert.deepEqual(videoExportSizes("conf-instagram", 2160, 2160), [{ width: 2160, height: 2160 }, { width: 1920, height: 1920 }]);
assert.deepEqual(videoExportSizes("conf-poster", 2880, 3840), [{ width: 2880, height: 3840 }, { width: 2160, height: 2880 }]);
assert.deepEqual(videoExportSizes("conf-banner-x", 1280, 3840), [{ width: 1280, height: 3840 }, { width: 960, height: 2880 }]);
assert.ok(videoExportSizes("conf-slide", 1001, 563).every((size) => size.width % 2 === 0 && size.height % 2 === 0));

// Print sizes match the original backgrounds
assert.deepEqual(printSize("conf-banner-x", 1280, 3840), { width: 3543, height: 10630, dpi: 150 });
assert.deepEqual(printSize("conf-banner-x", 1280, 2560), { width: 3543, height: 7086, dpi: 150 });
assert.deepEqual(printSize("conf-banner-l", 3840, 1024), { width: 17717, height: 4724, dpi: 100 });
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
assert.deepEqual(parseHash("#/presentation"), { name: "presentation" });
assert.equal(hrefFor({ name: "presentation" }), "#/presentation");

const deck = createPresentationDeck(index);
assert.equal(deck.pages.length, 10);
assert.equal(deck.pages[0]?.type, 2);
assert.equal(deck.pages[0]?.role, "content");
assert.equal(deck.pages[0]?.state.cardWidth, 3840);
assert.equal(deck.pages[0]?.state.cardHeight, 2160);
assert.equal(deck.pages[0]?.state.background ?? null, null);
assert.equal(deck.pages[1]?.type, 2);
assert.equal(deck.pages[1]?.state.background ?? null, null);
assert.equal(deck.pages[3]?.type, 1);
assert.equal(deck.pages[3]?.role, "divider");
assert.deepEqual(deck.pages[3]?.state.background, { id: "slide", mode: "image" });
assert.equal(deck.pages[4]?.type, 3);
assert.equal(deck.pages[4]?.state.layers.filter((layer) => layer.kind === "image").length, 3);
assert.equal(deck.pages[8]?.type, 1);
assert.equal(deck.pages[8]?.role, "divider");
assert.equal(deck.pages[9]?.type, 3);
assert.equal(deck.pages[9]?.role, "content");
savePresentationDeck(deck);
const loaded = loadPresentationDeck(index);
const titleText = (pages: typeof deck.pages, at: number) => {
  const layer = pages[at]?.state.layers.find((item) => item.kind === "title");
  return layer?.kind === "title" ? layer.text : "";
};
assert.equal(titleText(loaded.pages, 4), titleText(deck.pages, 4));
assert.equal(titleText(loaded.pages, 1), "AI");
assert.equal(titleText(loaded.pages, 3), "");
const bodyText = (pages: typeof deck.pages, at: number) => {
  const layer = pages[at]?.state.layers.find((item) => item.kind === "body");
  return layer?.kind === "body" ? layer.text : "";
};
assert.equal(bodyText(loaded.pages, 1), "");
assert.equal(titleText(deck.pages, 0), "생성형 AI에서 에이전틱 AI, 그리고 AX까지: UX 디자인 프로세스의 확장");
assert.equal(titleText(deck.pages, 1), "AI");
assert.equal(titleText(deck.pages, 4), "TODAY\u2019s AGENDA");
assert.equal(titleText(deck.pages, 8), "WE ARE IN THE AI ARA");
const titleSize = (at: number) => {
  const layer = deck.pages[at]?.state.layers.find((item) => item.kind === "title");
  return layer?.kind === "title" ? layer.size : 0;
};
assert.equal(titleSize(0), 128);
assert.equal(titleSize(1), 400);
assert.equal(titleSize(4), 200);
const photoColor = deck.pages[3]?.state.color;
syncPresentationMode(deck, "light");
assert.equal(deck.pages[3]?.tone, null);
assert.equal(deck.pages[3]?.state.color, photoColor);
assert.ok(deck.pages.filter((page) => page.type !== 1).every((page) => page.tone === "light"));
const lightTitle = deck.pages[0]?.state.layers.find((layer) => layer.kind === "title");
assert.equal(lightTitle?.kind === "title" ? lightTitle.color : "", rgbToHex(0, 28, 51));
syncPresentationMode(deck, "dark");
assert.ok(deck.pages.filter((page) => page.type !== 1).every((page) => page.tone === "dark"));
assert.equal(deck.pages[3]?.tone, null);
assert.equal(reorderPresentationPage(deck, 0, 0), false);
assert.equal(reorderPresentationPage(deck, 0, 1), false);
assert.equal(reorderPresentationPage(deck, 0, 3), true);
assert.equal(deck.selected, 2);
assert.equal(titleText(deck.pages, 0), "AI");
assert.equal(titleText(deck.pages, 2), "생성형 AI에서 에이전틱 AI, 그리고 AX까지: UX 디자인 프로세스의 확장");
savePresentationDeck(deck);
const reordered = loadPresentationDeck(index);
assert.equal(reordered.selected, 2);
assert.equal(titleText(reordered.pages, 0), "AI");
assert.equal(titleText(reordered.pages, 2), "생성형 AI에서 에이전틱 AI, 그리고 AX까지: UX 디자인 프로세스의 확장");
assert.equal(reordered.pages.map((page) => page.id).join(","), deck.pages.map((page) => page.id).join(","));
const typed = createTypedPage(2, index, "dark");
assert.equal(typed.type, 2);
assert.notEqual(typed.id, "page-01");
assert.equal(titleText([typed], 0), "생성형 AI에서 에이전틱 AI, 그리고 AX까지: UX 디자인 프로세스의 확장");
const copied = duplicatePresentationPage(deck.pages[0]);
assert.notEqual(copied.id, deck.pages[0]?.id);
assert.equal(titleText([copied], 0), titleText(deck.pages, 0));
insertPresentationPage(deck, 0, typed);
assert.equal(deck.selected, 1);
assert.equal(deck.pages[1]?.id, typed.id);
savePresentationDeck(deck);
const extended = loadPresentationDeck(index);
assert.equal(extended.pages.length, deck.pages.length);
assert.equal(extended.pages[1]?.id, typed.id);
assert.equal(extended.selected, 1);
assert.equal(extended.pages[0]?.name, "");
deck.pages[0].name = "Opening";
savePresentationDeck(deck);
const named = loadPresentationDeck(index);
assert.equal(named.pages[0]?.name, "Opening");
assert.equal(named.pages[1]?.name, "");
const beforeRemove = deck.pages.length;
assert.equal(removePresentationPage(deck, 1), true);
assert.equal(deck.pages.length, beforeRemove - 1);
assert.notEqual(deck.pages[1]?.id, typed.id);
assert.equal(deck.selected, 1);
assert.equal(removePresentationPage(deck, deck.pages.length - 1), true);
assert.equal(deck.selected, deck.pages.length - 1);
assert.equal(removePresentationPage({ selected: 0, pages: [typed] }, 0), false);

// Page ranges move and delete as one block in deck order
const ranged = createPresentationDeck(index);
const ids = ranged.pages.map((page) => page.id);
ranged.selected = 2;
assert.equal(movePresentationPages(ranged, [1, 2, 3], 1), false);
assert.equal(movePresentationPages(ranged, [1, 2, 3], 4), false);
assert.equal(movePresentationPages(ranged, [3, 1, 2], 7), true);
assert.deepEqual(ranged.pages.map((page) => page.id), [ids[0], ids[4], ids[5], ids[6], ids[1], ids[2], ids[3], ids[7], ids[8], ids[9]]);
assert.equal(ranged.pages[ranged.selected]?.id, ids[2]);
assert.equal(movePresentationPages(ranged, [4, 5, 6], 0), true);
assert.deepEqual(ranged.pages.slice(0, 4).map((page) => page.id), [ids[1], ids[2], ids[3], ids[0]]);
assert.equal(removePresentationPages(ranged, [0, 1, 2]), true);
assert.equal(ranged.pages.length, 7);
assert.equal(ranged.pages[ranged.selected]?.id, ids[0]);
assert.equal(removePresentationPages(ranged, ranged.pages.map((_, at) => at)), false);

// Default pages: one page replaces its twin by id, or lands after its nearest earlier neighbour
const fresh = defaultPresentationDeck(index);
const defaultCount = fresh.pages.length;
assert.ok(defaultCount >= 1);
fresh.pages[1].name = "Edited";
assert.equal(defaultsWithPage(fresh, 1, index)[1]?.name, "Edited");
assert.equal(defaultsWithPage(fresh, 1, index).length, defaultCount);
const added = createTypedPage(3, index, "dark");
insertPresentationPage(fresh, 2, added);
const merged = defaultsWithPage(fresh, 3, index);
assert.equal(merged.length, defaultCount + 1);
assert.equal(merged[3]?.id, added.id);
assert.equal(merged[2]?.id, fresh.pages[2]?.id);

console.log("OK: conference presets, slugs, backgrounds, video and print sizes, PNG encoder, baselines, and routes");
