import assert from "node:assert/strict";
import { hrefFor, isLegacyStudioHash, parseHash } from "../src/router.ts";
import {
  clampCardSize,
  scaleCardSize,
  createStudioState,
  DEFAULT_BODY,
  DEFAULT_TITLE,
  applyStudioBaseline,
  resetStudioState,
  clampFontSize,
  clampImageOffset,
  clampImageWidth,
  clampRadius,
  clampTextOffset,
  cropFromBox,
  designToCode,
  ensureLayer,
  firstLayer,
  fontLabelFromPath,
  imageLayerHeight,
  moveCropBox,
  newLayerId,
  normalizeStudioState,
  resizeCropBox,
  uncroppedRect,
  inkContrast,
  maxFontSize,
  pickInk,
  sanitizeStudioCode,
  scaleImageAround,
  setStudioTheme,
  substituteStudioCode,
  wrapText,
  type ImageLayer,
  type StudioState,
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
assert.equal(clampTextOffset(71.5, 1080, 100), 71.5);
assert.equal(clampTextOffset(72 - 0.5, 1080, 100), 71.5);
assert.equal(clampTextOffset(71.3, 1080, 100), 71.5);
assert.equal(clampTextOffset(-0.5, 1080, 100), 0);
assert.equal(clampImageOffset(-10.5, 1080, 1080), -10.5);
assert.equal(clampImageOffset(1040.5, 1080, 1080), 1040);
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

const home = createStudioState("black-mountain-red-horizon", "#d8f1ff");
assert.deepEqual(home.layers.map((layer) => layer.kind), ["image", "body", "title"]);
const homeTitle = firstLayer(home, "title");
const homeBody = firstLayer(home, "body");
const homeImage = firstLayer(home, "image");
assert.ok(homeTitle && homeBody && homeImage);
assert.deepEqual(
  { text: homeTitle.text, fontId: homeTitle.fontId, size: homeTitle.size, x: homeTitle.x, y: homeTitle.y, color: homeTitle.color },
  { text: "Hello", fontId: "montserrat", size: 100, x: 71, y: 99, color: "#000000" },
);
assert.deepEqual(
  { text: homeBody.text, fontId: homeBody.fontId, size: homeBody.size, x: homeBody.x, y: homeBody.y, color: homeBody.color },
  {
    text: "헤르메스의 대표 브랜드 에셋입니다.\n에이전트의 그래픽 결과물을 합성하였습니다.",
    fontId: "pretendard",
    size: 32,
    x: 77,
    y: 209,
    color: "#000000",
  },
);
assert.deepEqual({ width: homeImage.width, x: homeImage.x, y: homeImage.y, crop: homeImage.crop }, { width: 1080, x: 0, y: 0, crop: null });

const titleText = (state: StudioState) => firstLayer(state, "title")?.text;
const draft = createStudioState("capsule-pattern", "#ffffff");
assert.equal(titleText(draft), DEFAULT_TITLE);
assert.equal(firstLayer(draft, "body")?.text, DEFAULT_BODY);
ensureLayer(draft, "title").text = "바꿈";
ensureLayer(draft, "body").text = "";
draft.layers.push({ ...structuredClone(ensureLayer(draft, "title")), id: newLayerId() });
resetStudioState(draft, "#ffffff");
assert.equal(titleText(draft), DEFAULT_TITLE);
assert.equal(firstLayer(draft, "body")?.text, DEFAULT_BODY);
assert.equal(draft.layers.length, 3);
assert.equal(draft.themeSlug, "capsule-pattern");

const baseline = createStudioState("capsule-pattern", "#ffffff");
ensureLayer(baseline, "title").text = "세팅";
ensureLayer(baseline, "title").x = 120;
ensureLayer(draft, "title").text = "다른 값";
applyStudioBaseline(draft, baseline, "#ffffff");
assert.equal(titleText(draft), "세팅");
assert.equal(firstLayer(draft, "title")?.x, 120);
ensureLayer(draft, "title").text = "다시";
applyStudioBaseline(draft, null, "#ffffff");
assert.equal(titleText(draft), DEFAULT_TITLE);
assert.equal(draft.themeSlug, "capsule-pattern");

// Cards and baselines saved before layers keep their content.
const legacy = normalizeStudioState({
  themeSlug: "capsule-pattern",
  color: "#ffffff",
  title: "옛 제목",
  titleX: 40,
  titleColor: "#123456",
  body: "옛 본문",
  bodySize: 20,
  fontId: "montserrat",
  imageWidth: 900,
  imageX: 10,
});
assert.ok(legacy);
assert.deepEqual(legacy.layers.map((layer) => layer.kind), ["image", "body", "title"]);
assert.equal(firstLayer(legacy, "title")?.text, "옛 제목");
assert.equal(firstLayer(legacy, "title")?.x, 40);
assert.equal(firstLayer(legacy, "title")?.color, "#123456");
assert.equal(firstLayer(legacy, "title")?.fontId, "montserrat");
assert.equal(firstLayer(legacy, "body")?.size, 20);
assert.equal(firstLayer(legacy, "image")?.width, 900);
assert.equal(normalizeStudioState({ color: "#ffffff" }), null);
const partial = normalizeStudioState({ themeSlug: "x", color: "#ffffff", layers: [{ id: "t2", kind: "title", text: "a", x: 1, y: 2, size: 30, fontId: "pretendard", color: "#000000" }, { kind: "bogus" }] });
assert.ok(partial);
assert.deepEqual(partial.layers.map((layer) => layer.kind), ["image", "title", "body"]);
assert.equal(firstLayer(partial, "title")?.id, "t2");
assert.equal(firstLayer(partial, "image")?.src, "x");

// Text style: the title starts SemiBold, the body Regular, everything else off and left-aligned.
assert.deepEqual(
  { weight: homeTitle.weight, italic: homeTitle.italic, underline: homeTitle.underline, align: homeTitle.align },
  { weight: 600, italic: false, underline: false, align: "left" },
);
assert.equal(homeBody.weight, 400);
assert.equal(firstLayer(legacy, "title")?.weight, 600);
assert.equal(firstLayer(partial, "title")?.weight, 600);
const weighted = normalizeStudioState({ themeSlug: "x", color: "#ffffff", layers: [{ id: "w", kind: "body", text: "a", x: 0, y: 0, size: 20, fontId: "pretendard", color: "#000000", weight: 300 }, { id: "v", kind: "title", text: "a", x: 0, y: 0, size: 20, fontId: "pretendard", color: "#000000", weight: 650 }] });
assert.equal(firstLayer(weighted!, "body")?.weight, 300);
assert.equal(firstLayer(weighted!, "title")?.weight, 600);
const styled = normalizeStudioState({ themeSlug: "x", color: "#ffffff", layers: [{ id: "b", kind: "body", text: "a", x: 0, y: 0, size: 20, fontId: "pretendard", color: "#000000", weight: 700, italic: true, underline: true, align: "center" }, { id: "t", kind: "title", text: "b", x: 0, y: 0, size: 20, fontId: "pretendard", color: "#000000", weight: 400, align: "sideways" }] });
assert.ok(styled);
const styledBody = firstLayer(styled, "body");
assert.deepEqual(
  { weight: styledBody?.weight, italic: styledBody?.italic, underline: styledBody?.underline, align: styledBody?.align },
  { weight: 700, italic: true, underline: true, align: "center" },
);
assert.equal(firstLayer(styled, "title")?.weight, 400);
assert.equal(firstLayer(styled, "title")?.align, "left");
const styledCode = designToCode(styled);
assert.match(styledCode, /font-weight: 700; font-style: italic; text-decoration: underline; text-align: center;/);
assert.match(styledCode, /font-weight: 400;/);

// Each image keeps its own source; the theme only follows the bottom image.
const sources = createStudioState("x", "#ffffff");
const extra: ImageLayer = { ...ensureLayer(sources, "image"), id: "extra", src: "upload:abc" };
sources.layers.push(extra);
setStudioTheme(sources, "y");
assert.equal(sources.themeSlug, "y");
assert.equal(firstLayer(sources, "image")?.src, "y");
assert.equal(extra.src, "upload:abc");
const sourceCode = designToCode(sources, (layer) => (layer.src === "y" ? 1 : 0.5));
assert.match(sourceCode, /\{\{themeImage\}\}/);
assert.match(sourceCode, /\{\{image:upload:abc\}\}/);
const sourceRendered = substituteStudioCode(sourceCode, {
  title: "",
  body: "",
  themeImage: "data:image/png;base64,theme",
  images: { "upload:abc": "data:image/png;base64,extra" },
});
assert.match(sourceRendered, /base64,theme/);
assert.match(sourceRendered, /base64,extra/);

// Crop keeps the source so it can grow back out.
const cropImage: ImageLayer = { id: "i", kind: "image", src: "x", x: 100, y: 50, width: 400, crop: null };
const full = uncroppedRect(cropImage, 0.5);
assert.deepEqual(full, { x: 100, y: 50, w: 400, h: 200 });
assert.equal(cropFromBox(full, full), null);
const box = resizeCropBox(full, full, "nw", 100, 50);
assert.deepEqual(box, { x: 200, y: 100, w: 300, h: 150 });
assert.deepEqual(resizeCropBox(full, full, "e", -1000, 0).w, 100);
assert.deepEqual(resizeCropBox(full, box, "w", -500, 0).x, 100);
assert.deepEqual(moveCropBox(full, box, 500, 500), { x: 200, y: 100, w: 300, h: 150 });
assert.deepEqual(moveCropBox(full, box, -500, -500), { x: 100, y: 50, w: 300, h: 150 });
const crop = cropFromBox(full, box);
assert.deepEqual(crop, { x: 0.25, y: 0.25, w: 0.75, h: 0.75 });
const cropped: ImageLayer = { ...cropImage, x: box.x, y: box.y, width: box.w, crop };
assert.equal(imageLayerHeight(cropped, 0.5), 150);
assert.deepEqual(uncroppedRect(cropped, 0.5), full);

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

const exported = designToCode(home);
assert.equal(exported, designToCode(home));
assert.match(exported, /\{\{title\}\}/);
assert.match(exported, /\{\{body\}\}/);
assert.match(exported, /\{\{themeImage\}\}/);

// Markup follows stacking order; only the first title and body stay placeholders.
const stacked = createStudioState("capsule-pattern", "#ffffff");
const extraTitle = { ...structuredClone(ensureLayer(stacked, "title")), id: newLayerId(), text: "둘째 <b>" };
stacked.layers.push(extraTitle);
ensureLayer(stacked, "image").crop = { x: 0.25, y: 0.25, w: 0.5, h: 0.5 };
const stackedCode = designToCode(stacked);
const order = ["{{themeImage}}", "{{body}}", "{{title}}", "둘째 &lt;b&gt;"].map((needle) => stackedCode.indexOf(needle));
assert.ok(order.every((at, index) => at >= 0 && (index === 0 || at > (order[index - 1] ?? 0))), String(order));
assert.match(stackedCode, /studio-crop/);

const rendered = substituteStudioCode(exported, {
  title: "A<B",
  body: "본문",
  themeImage: "data:image/gif;base64,aaaa",
});
assert.equal(rendered.includes("A<B"), false);
assert.match(rendered, /A&lt;B/);
assert.match(rendered, /본문/);
assert.equal(sanitizeStudioCode(`<div onclick="alert(1)"><script>alert(1)</script>ok</div>`), "<div>ok</div>");

assert.deepEqual(parseHash("#/studio"), { name: "studio", theme: null, card: null });
assert.deepEqual(parseHash("#/studio?theme=capsule-pattern"), {
  name: "studio",
  theme: "capsule-pattern",
  card: null,
});
assert.deepEqual(parseHash("#/studio?card=saved-abc"), {
  name: "studio",
  theme: null,
  card: "saved-abc",
});
assert.deepEqual(parseHash("#/intake"), { name: "studio", theme: null, card: null });
assert.deepEqual(parseHash("#/design-system"), { name: "studio", theme: null, card: null });
assert.deepEqual(parseHash("#/stats"), { name: "studio", theme: null, card: null });
assert.equal(isLegacyStudioHash("#/intake"), true);
assert.equal(isLegacyStudioHash("#/studio"), false);
assert.equal(hrefFor({ name: "studio", theme: "warm-earth-oval", card: null }), "#/studio?theme=warm-earth-oval");
assert.equal(hrefFor({ name: "studio", theme: "warm-earth-oval", card: "saved-abc" }), "#/studio?card=saved-abc");

console.log("OK: studio preset, size, font, radius, wrap, ink, code, and route checks");
