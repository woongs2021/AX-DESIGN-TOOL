import assert from "node:assert/strict";
import { hrefFor, isLegacyStudioHash, parseHash } from "../src/router.ts";
import {
  clampCardSize,
  scaleCardSize,
  createStudioState,
  DEFAULT_BODY,
  DEFAULT_TITLE,
  resetStudioState,
  clampFontSize,
  clampImageWidth,
  clampRadius,
  designToCode,
  fontLabelFromPath,
  inkContrast,
  maxFontSize,
  pickInk,
  sanitizeStudioCode,
  scaleImageAround,
  substituteStudioCode,
  wrapText,
} from "../src/shared/studio.ts";
import { DEFAULT_PRESET_ID, presetById, STUDIO_PRESETS } from "../src/shared/studio-presets.ts";

assert.equal(STUDIO_PRESETS.length, 8);
assert.equal(new Set(STUDIO_PRESETS.map((preset) => preset.id)).size, 8);
assert.equal(DEFAULT_PRESET_ID, "ig-feed-square");
assert.deepEqual(
  STUDIO_PRESETS.find((preset) => preset.id === DEFAULT_PRESET_ID),
  { id: "ig-feed-square", name: "Instagram Feed", width: 1080, height: 1080 },
);
assert.deepEqual(presetById("yt-banner").safe, { width: 1546, height: 423 });
assert.equal(presetById("missing").id, DEFAULT_PRESET_ID);

assert.equal(clampRadius(28), 28);
assert.equal(clampRadius(150), 120);
assert.equal(clampRadius(-3), 0);
assert.equal(clampRadius(Number.NaN), 0);

assert.equal(clampCardSize(50), 100);
assert.deepEqual(scaleCardSize(1080, 1080, 540), { cardWidth: 540, cardHeight: 540 });
assert.deepEqual(scaleCardSize(1080, 1920, 540), { cardWidth: 540, cardHeight: 960 });
assert.deepEqual(scaleCardSize(1080, 1920, 3000), { cardWidth: 2250, cardHeight: 4000 });
assert.deepEqual(scaleCardSize(1080, 1080, 50), { cardWidth: 100, cardHeight: 100 });
assert.equal(clampCardSize(1080), 1080);
assert.equal(clampCardSize(9000), 4000);
assert.equal(clampImageWidth(10), 100);
assert.equal(clampImageWidth(4001), 4000);
assert.equal(maxFontSize(1080), 1060);
assert.deepEqual(scaleImageAround({ x: 0, y: 0, width: 1000 }, 500, 0, 0), { x: 0, y: 0, width: 500 });
assert.deepEqual(scaleImageAround({ x: 0, y: 0, width: 1000 }, 500, 1000, 400), { x: 500, y: 200, width: 500 });
assert.deepEqual(scaleImageAround({ x: 100, y: 100, width: 200 }, 50, 200, 200), { x: 150, y: 150, width: 100 });
assert.equal(maxFontSize(100), 80);
assert.equal(clampFontSize(4, 1080), 5);
assert.equal(clampFontSize(2000, 1080), 1060);
assert.equal(clampFontSize(40, 100), 40);
assert.equal(fontLabelFromPath("fonts/Noto_Sans.woff2"), "Noto Sans");
assert.equal(fontLabelFromPath("fonts/Pretendard.ttf"), "Pretendard");

const draft = createStudioState("capsule-pattern", "#ffffff");
assert.equal(draft.title, DEFAULT_TITLE);
assert.equal(draft.body, DEFAULT_BODY);
draft.title = "바꿈";
draft.body = "";
resetStudioState(draft, "#ffffff");
assert.equal(draft.title, DEFAULT_TITLE);
assert.equal(draft.body, DEFAULT_BODY);
assert.equal(draft.themeSlug, "capsule-pattern");

const widthOf = (line: string) => line.length * 10;
assert.deepEqual(wrapText("hello world", 50, widthOf), ["hello", "world"]);
assert.deepEqual(wrapText("가나다라", 30, widthOf), ["가나다", "라"]);
assert.deepEqual(wrapText("", 40, widthOf), [""]);

for (const color of ["#ffffff", "#000000", "#d8f1ff", "#808080", "#ff00aa", "rgb(20, 40, 80)"]) {
  const ink = pickInk(color);
  assert.ok(ink === "rgb(0, 0, 0)" || ink === "rgb(255, 255, 255)");
  assert.ok(inkContrast(color, ink) >= 4.5, `${ink} on ${color}`);
}
assert.equal(pickInk("#ffffff"), "rgb(0, 0, 0)");
assert.equal(pickInk("#000000"), "rgb(255, 255, 255)");

const exported = designToCode();
assert.equal(exported, designToCode());
assert.match(exported, /\{\{title\}\}/);
assert.match(exported, /\{\{body\}\}/);
assert.match(exported, /\{\{themeImage\}\}/);

const rendered = substituteStudioCode(exported, {
  title: "A<B",
  body: "본문",
  themeImage: "data:image/gif;base64,aaaa",
});
assert.equal(rendered.includes("A<B"), false);
assert.match(rendered, /A&lt;B/);
assert.match(rendered, /본문/);
assert.equal(sanitizeStudioCode(`<div onclick="alert(1)"><script>alert(1)</script>ok</div>`), "<div>ok</div>");

assert.deepEqual(parseHash("#/studio"), { name: "studio", theme: null });
assert.deepEqual(parseHash("#/studio?theme=capsule-pattern"), {
  name: "studio",
  theme: "capsule-pattern",
});
assert.deepEqual(parseHash("#/intake"), { name: "studio", theme: null });
assert.deepEqual(parseHash("#/design-system"), { name: "studio", theme: null });
assert.deepEqual(parseHash("#/stats"), { name: "studio", theme: null });
assert.equal(isLegacyStudioHash("#/intake"), true);
assert.equal(isLegacyStudioHash("#/studio"), false);
assert.equal(hrefFor({ name: "studio", theme: "warm-earth-oval" }), "#/studio?theme=warm-earth-oval");

console.log("OK: studio preset, size, font, radius, wrap, ink, code, and route checks");
