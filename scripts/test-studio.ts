import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { inflateSync } from "node:zlib";
import BUILTIN_BASELINES from "../src/shared/studio-defaults.json";
import { hrefFor, isLegacyStudioHash, parseHash } from "../src/router.ts";
import {
  alignOffsets,
  canGroupLayers,
  canUngroupLayers,
  copiedGroups,
  groupedIds,
  groupLayers,
  imageAdjust,
  imageAdjustFilter,
  imageBlur,
  layerBlurBottom,
  layerOpacity,
  selectionBounds,
  selectionOutlines,
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
  IMAGE_RADIUS_DEFAULT,
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
  scaleFontSizes,
  scaleImageAround,
  shiftAxisDelta,
  shiftAxisPoint,
  ungroupLayers,
  isTextLayer,
  setStudioTheme,
  substituteStudioCode,
  wrapText,
  type ImageLayer,
  type StudioState,
} from "../src/shared/studio.ts";
import { applySpeakerOrder, instagramDeck, speakerSlides, speakerSrcOf } from "../src/shared/conference.ts";
import { cardPdf } from "../src/shared/card-pdf.ts";
import { GIF_LONG_EDGE, createGifEncoder, gifFrameDelays, gifSize } from "../src/shared/card-gif.ts";
import { GifReader } from "omggif";
import { DEFAULT_PRESET_ID, presetById, STUDIO_PRESETS } from "../src/shared/studio-presets.ts";
import { lineContains, lineFade, lineFadeStops, nodeBounds, parseGradient, parseVectorLayer, penContains, radiusHandlePoints, restartPenAt, resizeShape, scaleShapeBox, shadowOffset, shapeBlend, shapeContains, shapeNodes, shapeStroke, starInner, starPoints, transformNodes, vectorSvg } from "../src/shared/studio-shapes.ts";

assert.equal(STUDIO_PRESETS.length, 8);
assert.equal(new Set(STUDIO_PRESETS.map((preset) => preset.id)).size, 8);
assert.equal(DEFAULT_PRESET_ID, "ig-feed-square");
assert.deepEqual(
  STUDIO_PRESETS.find((preset) => preset.id === DEFAULT_PRESET_ID),
  { id: "ig-feed-square", name: "Instagram Feed", width: 1080, height: 1080 },
);
assert.equal(presetById("yt-banner").width, 2560);
assert.equal(presetById("yt-banner").height, 1440);
assert.equal(presetById("missing").id, DEFAULT_PRESET_ID);
for (const preset of STUDIO_PRESETS) {
  const builtin = normalizeStudioState((BUILTIN_BASELINES as Record<string, unknown>)[preset.id]);
  assert.ok(builtin, `built-in baseline for ${preset.id}`);
  assert.equal(builtin.presetId, preset.id);
  assert.deepEqual([builtin.cardWidth, builtin.cardHeight], [preset.width, preset.height]);
  assert.ok(existsSync(`obsidian/captures/${builtin.themeSlug}/capture.png`), `theme ${builtin.themeSlug}`);
  assert.ok(existsSync(`src/styles/presets/${preset.id}.webp`), `preset thumb ${preset.id}`);
}

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
assert.deepEqual(scaleFontSizes([100, 32], 200, 1080), [200, 64]);
assert.deepEqual(scaleFontSizes([100, 50], 150, 1080), [150, 75]);
assert.deepEqual(scaleFontSizes([100, 5], 50, 1080), [100, 5]);
assert.deepEqual(scaleFontSizes([80, 40], 10, 1080), [10, 5]);
assert.deepEqual(scaleFontSizes([1000, 200], 2000, 1080), [1060, 212]);
assert.deepEqual(scaleFontSizes([], 40, 1080), []);
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

// Alignment lines each box up on the card, including a single selection.
const card = { x: 0, y: 0, w: 1080, h: 1080 };
const alignBoxes = [
  { x: 100, y: 50, w: 200, h: 100 },
  { x: 400, y: 300, w: 100, h: 40 },
];
assert.deepEqual(alignOffsets(alignBoxes, "left", card), [{ dx: -100, dy: 0 }, { dx: -400, dy: 0 }]);
assert.deepEqual(alignOffsets(alignBoxes, "right", card), [{ dx: 780, dy: 0 }, { dx: 580, dy: 0 }]);
assert.deepEqual(alignOffsets(alignBoxes, "hcenter", card), [{ dx: 340, dy: 0 }, { dx: 90, dy: 0 }]);
assert.deepEqual(alignOffsets(alignBoxes, "top", card), [{ dx: 0, dy: -50 }, { dx: 0, dy: -300 }]);
assert.deepEqual(alignOffsets(alignBoxes, "bottom", card), [{ dx: 0, dy: 930 }, { dx: 0, dy: 740 }]);
assert.deepEqual(alignOffsets(alignBoxes, "vcenter", card), [{ dx: 0, dy: 440 }, { dx: 0, dy: 220 }]);
assert.deepEqual(alignOffsets([{ x: 71, y: 99, w: 280, h: 125 }], "hcenter", card), [{ dx: 329, dy: 0 }]);
// Several objects line up inside their own group, not the card.
const group = selectionBounds(alignBoxes);
assert.deepEqual(group, { x: 100, y: 50, w: 400, h: 290 });
assert.deepEqual(alignOffsets(alignBoxes, "left", group), [{ dx: 0, dy: 0 }, { dx: -300, dy: 0 }]);
assert.deepEqual(alignOffsets(alignBoxes, "right", group), [{ dx: 200, dy: 0 }, { dx: 0, dy: 0 }]);
assert.deepEqual(alignOffsets(alignBoxes, "hcenter", group), [{ dx: 100, dy: 0 }, { dx: -150, dy: 0 }]);
assert.deepEqual(alignOffsets(alignBoxes, "top", group), [{ dx: 0, dy: 0 }, { dx: 0, dy: -250 }]);
assert.deepEqual(alignOffsets(alignBoxes, "bottom", group), [{ dx: 0, dy: 190 }, { dx: 0, dy: 0 }]);
assert.deepEqual(alignOffsets(alignBoxes, "vcenter", group), [{ dx: 0, dy: 95 }, { dx: 0, dy: -125 }]);
// Even spacing keeps the outer boxes and gives every gap the same size, in position order.
const spaceBoxes = [
  { x: 600, y: 0, w: 100, h: 100 },
  { x: 0, y: 500, w: 100, h: 300 },
  { x: 150, y: 120, w: 50, h: 50 },
];
assert.deepEqual(alignOffsets(spaceBoxes, "hspace", card), [{ dx: 0, dy: 0 }, { dx: 0, dy: 0 }, { dx: 175, dy: 0 }]);
assert.deepEqual(alignOffsets(spaceBoxes, "vspace", card), [{ dx: 0, dy: 0 }, { dx: 0, dy: 0 }, { dx: 0, dy: 155 }]);

// Each size preset resets inside its own size, and a baseline keeps the panel as it is.
const story = createStudioState("capsule-pattern", "#ffffff", "ig-story");
assert.deepEqual([story.presetId, story.cardWidth, story.cardHeight], ["ig-story", 1080, 1920]);
story.cardWidth = 900;
ensureLayer(story, "title").text = "바꿈";
resetStudioState(story, "#ffffff");
assert.deepEqual([story.presetId, story.cardWidth, story.cardHeight], ["ig-story", 1080, 1920]);
assert.equal(titleText(story), DEFAULT_TITLE);
const storyBaseline = createStudioState("capsule-pattern", "#ffffff", "ig-story");
storyBaseline.controlsWidth = 500;
ensureLayer(storyBaseline, "title").text = "스토리";
story.controlsWidth = 420;
applyStudioBaseline(story, storyBaseline, "#ffffff");
assert.equal(titleText(story), "스토리");
assert.equal(story.controlsWidth, 420);

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
assert.equal(ensureLayer(sources, "image")?.radius, IMAGE_RADIUS_DEFAULT);
assert.match(sourceCode, /border-radius: 12px/);
const rounded = normalizeStudioState({ themeSlug: "x", color: "#ffffff", layers: [{ id: "i", kind: "image", src: "x", x: 0, y: 0, width: 200, radius: 40 }] });
assert.equal(firstLayer(rounded!, "image")?.radius, 40);
const legacyRadius = normalizeStudioState({ themeSlug: "x", color: "#ffffff", layers: [{ id: "i", kind: "image", src: "x", x: 0, y: 0, width: 200 }] });
assert.equal(firstLayer(legacyRadius!, "image")?.radius, 12);

// Crop keeps the source so it can grow back out.
const cropImage: ImageLayer = { id: "i", kind: "image", src: "x", x: 100, y: 50, width: 400, radius: 12, crop: null };
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

const square = { x: 10, y: 20, width: 100, height: 40 };
const stretched = resizeShape(square, "e", 30, 0, false);
assert.equal(stretched.width, 130);
assert.equal(stretched.height, 40);
assert.equal(stretched.x, 10);
const uniform = resizeShape(square, "e", 20, 0, true);
assert.equal(uniform.width, uniform.height);
assert.equal(uniform.y, 20 + 20 - uniform.height / 2);
const corner = resizeShape(square, "se", 10, 50, false);
assert.equal(corner.width, 110);
assert.equal(corner.height, 90);
const squared = resizeShape({ x: 0, y: 0, width: 80, height: 80 }, "se", -20, -10, true);
assert.equal(squared.width, squared.height);
assert.ok(squared.width >= 8);
const scaled = scaleShapeBox({ x: 0, y: 0, width: 100, height: 50 }, 200);
assert.equal(scaled.width, 200);
assert.equal(scaled.height, 100);
assert.equal(scaled.x, -50);
assert.equal(scaled.y, -25);

const shapeState = normalizeStudioState({
  themeSlug: "x",
  color: "#ffffff",
  layers: [
    { id: "s", kind: "shape", shape: "ellipse", x: 4, y: 6, width: 40, height: 20, radius: 4, color: "#112233" },
    { id: "l", kind: "line", x: 0, y: 10, x2: 40, y2: 10, stroke: 6, cap: "round", start: true, end: false, color: "#abcdef" },
    {
      id: "p",
      kind: "pen",
      closed: true,
      fill: "#222222",
      stroke: "#333333",
      strokeWidth: 2,
      points: [
        { x: 0, y: 0, in: null, out: null },
        { x: 20, y: 0, in: null, out: { x: 30, y: 10 } },
        { x: 10, y: 20, in: null, out: null },
      ],
    },
  ],
});
assert.ok(shapeState);
assert.deepEqual(
  shapeState.layers.filter((layer) => !isTextLayer(layer) && layer.kind !== "image").map((layer) => layer.kind),
  ["shape", "line", "pen"],
);
assert.equal(isTextLayer(shapeState.layers.find((layer) => layer.kind === "shape")!), false);
const drawn = designToCode(shapeState);
assert.match(drawn, /<ellipse /);
assert.match(drawn, /stroke-linecap="round"/);
assert.match(drawn, /<path /);
assert.equal(shapeContains({ id: "s", kind: "shape", shape: "ellipse", x: 0, y: 0, width: 40, height: 20, radius: 0, color: "#000000" }, 20, 10), true);
assert.equal(shapeContains({ id: "s", kind: "shape", shape: "ellipse", x: 0, y: 0, width: 40, height: 20, radius: 0, color: "#000000" }, 0, 0), false);
assert.equal(lineContains({ id: "l", kind: "line", x: 0, y: 10, x2: 40, y2: 10, stroke: 4, cap: "butt", start: false, end: false, color: "#000000" }, 20, 10), true);
assert.equal(lineContains({ id: "l", kind: "line", x: 0, y: 10, x2: 40, y2: 10, stroke: 4, cap: "butt", start: false, end: false, color: "#000000" }, 20, 40), false);
assert.deepEqual(lineFadeStops(0, 0), [
  { offset: 0, alpha: 1 },
  { offset: 1, alpha: 1 },
]);
assert.deepEqual(lineFadeStops(40, 0), [
  { offset: 0, alpha: 0 },
  { offset: 0.4, alpha: 1 },
  { offset: 1, alpha: 1 },
]);
assert.deepEqual(lineFadeStops(100, 100), [
  { offset: 0, alpha: 0 },
  { offset: 0.5, alpha: 1 },
  { offset: 1, alpha: 0 },
]);
const fadedLine = parseVectorLayer(
  { id: "fade", kind: "line", x: 0, y: 0, x2: 80, y2: 0, stroke: 8, cap: "butt", start: false, end: true, color: "#112233", fadeStart: 25, fadeEnd: 0 },
  "#000000",
);
assert.equal(fadedLine?.kind, "line");
if (fadedLine?.kind === "line") {
  assert.equal(lineFade(fadedLine).start, 25);
  assert.equal(lineFade(fadedLine).end, 0);
  assert.equal(fadedLine.fadeEnd, undefined);
  const svg = vectorSvg(fadedLine);
  assert.match(svg, /gradientUnits="userSpaceOnUse"/);
  assert.match(svg, /stop-opacity="0"/);
  assert.match(svg, /stroke="url\(#line-fade-fade\)"/);
  assert.match(svg, /fill="url\(#line-fade-fade\)"/);
}
const plainLine = parseVectorLayer(
  { id: "plain", kind: "line", x: 0, y: 0, x2: 10, y2: 0, stroke: 4, color: "#000000" },
  "#000000",
);
assert.equal(plainLine?.kind === "line" ? plainLine.fadeStart : 1, undefined);
assert.doesNotMatch(plainLine ? vectorSvg(plainLine) : "", /linearGradient/);

const across = shiftAxisDelta(12, 3, true, null);
assert.deepEqual(across, { dx: 12, dy: 0, axis: "x" });
assert.deepEqual(shiftAxisDelta(12, 30, true, across.axis), { dx: 12, dy: 0, axis: "x" });
assert.deepEqual(shiftAxisDelta(2, 20, true, null), { dx: 0, dy: 20, axis: "y" });
assert.deepEqual(shiftAxisDelta(12, 3, false, "x"), { dx: 12, dy: 3, axis: null });
assert.deepEqual(shiftAxisPoint({ x: 40, y: 18 }, { x: 10, y: 10 }, true, null), { x: 40, y: 10, axis: "x" });
assert.deepEqual(shiftAxisDelta(1, 1, true, null), { dx: 1, dy: 1, axis: null });

const grouped = createStudioState("black-mountain-red-horizon", "#000000");
const groupIds = grouped.layers.slice(0, 2).map((layer) => layer.id);
assert.equal(groupLayers(grouped, [groupIds[0] ?? ""]), false);
assert.equal(groupLayers(grouped, groupIds), true);
assert.deepEqual(groupedIds(grouped, groupIds[0] ?? ""), groupIds);
assert.equal(canGroupLayers(grouped, groupIds), false);
const thirdId = grouped.layers[2]?.id ?? "";
assert.equal(groupLayers(grouped, [...groupIds, thirdId]), true);
assert.equal(canUngroupLayers(grouped, groupIds), false);
assert.equal(ungroupLayers(grouped, [...groupIds, thirdId]), true);
assert.equal(grouped.groups, undefined);
assert.equal(groupLayers(grouped, groupIds), true);
const outlineBoxes = [
  { id: groupIds[0] ?? "", x: 10, y: 20, w: 30, h: 40 },
  { id: groupIds[1] ?? "", x: 50, y: 10, w: 20, h: 20 },
  { id: thirdId, x: 0, y: 80, w: 10, h: 10 },
];
const united = selectionOutlines(grouped, groupIds, outlineBoxes);
assert.equal(united.length, 1);
assert.deepEqual(united[0]?.box, { x: 10, y: 10, w: 60, h: 50 });
const withThird = selectionOutlines(grouped, [...groupIds, thirdId], outlineBoxes);
assert.equal(withThird.length, 2);
assert.deepEqual(withThird[1]?.box, { x: 0, y: 80, w: 10, h: 10 });
assert.equal(ungroupLayers(grouped, groupIds), true);
const split = selectionOutlines(grouped, groupIds, outlineBoxes);
assert.equal(split.length, 2);
assert.deepEqual(
  split.map((item) => item.box),
  [
    { x: 10, y: 20, w: 30, h: 40 },
    { x: 50, y: 10, w: 20, h: 20 },
  ],
);
assert.equal(groupLayers(grouped, groupIds), true);
const stored = normalizeStudioState(JSON.parse(JSON.stringify({ ...grouped, groups: [...(grouped.groups ?? []), ["missing", "gone"]] })));
assert.ok(stored);
assert.deepEqual(stored.groups, [groupIds]);
const copies = copiedGroups(stored.groups, new Map(groupIds.map((id) => [id, `${id}-copy`])));
assert.deepEqual(copies, [groupIds.map((id) => `${id}-copy`)]);
resetStudioState(grouped, grouped.color);
assert.equal(grouped.groups, undefined);
assert.equal(
  penContains(
    {
      id: "p",
      kind: "pen",
      closed: true,
      fill: "#111111",
      stroke: "",
      strokeWidth: 0,
      points: [
        { x: 0, y: 0, in: null, out: null },
        { x: 30, y: 0, in: null, out: null },
        { x: 0, y: 30, in: null, out: null },
      ],
    },
    5,
    5,
  ),
  true,
);
assert.equal(parseVectorLayer({ kind: "bogus" }, "#000000"), null);
const keptShape = shapeState.layers.find((layer) => layer.kind === "shape");
assert.equal(keptShape?.kind === "shape" ? keptShape.shadow?.size : -1, 0);
assert.equal(keptShape?.kind === "shape" ? keptShape.shadow?.opacity : -1, 55);
assert.equal(keptShape?.kind === "shape" ? keptShape.stroke?.width : -1, 0);
assert.equal(keptShape?.kind === "shape" ? keptShape.blend : "", "normal");
assert.equal(keptShape?.kind === "shape" ? keptShape.gradient : "missing", null);
const shaded = normalizeStudioState({
  themeSlug: "x",
  color: "#ffffff",
  layers: [
    {
      id: "shade",
      kind: "shape",
      shape: "rect",
      x: 0,
      y: 0,
      width: 80,
      height: 40,
      radius: 0,
      color: "#112233",
      shadow: { size: 4, blur: 8, distance: 10 },
      blend: "multiply",
      opacity: 25,
      blurFrom: 8,
      blurTo: 8,
      blurBottom: 20,
      gradient: { angle: 0, from: "#000000", to: "#ffffff" },
    },
    {
      id: "fade",
      kind: "title",
      text: "Hi",
      x: 0,
      y: 0,
      size: 20,
      fontId: "pretendard",
      color: "#111111",
      gradient: { angle: 90, from: "#000000", to: "#ffffff" },
      blend: "screen",
      shadow: { size: 4, blur: 8, distance: 10, opacity: 40 },
    },
    {
      id: "photo",
      kind: "image",
      src: "x",
      x: 12,
      y: 16,
      width: 120,
      radius: 8,
      blend: "overlay",
      opacity: 40,
      blur: 12,
      blurBottom: 24,
      shadow: { size: 6, blur: 4, distance: 12, opacity: 50 },
    },
  ],
});
assert.ok(shaded);
const shadedTitle = shaded.layers.find((layer) => layer.kind === "title");
assert.equal(shadedTitle && isTextLayer(shadedTitle) ? shadedTitle.blend : "", "screen");
assert.equal(shadedTitle && isTextLayer(shadedTitle) ? shadedTitle.shadow?.blur : 0, 8);
assert.equal(shadedTitle && isTextLayer(shadedTitle) ? shadedTitle.shadow?.opacity : 0, 40);
const shadeCode = designToCode(shaded);
assert.match(shadeCode, /mix-blend-mode: multiply/);
assert.match(shadeCode, /mix-blend-mode: screen/);
assert.match(shadeCode, /mix-blend-mode: overlay/);
assert.match(shadeCode, /text-shadow:/);
assert.match(shadeCode, /box-shadow: [\d.]+px [\d.]+px 4px 6px rgba\(0, 0, 0, 0\.5\)/);
const shadedImage = shaded.layers.find((layer) => layer.kind === "image");
assert.equal(shadedImage?.kind === "image" ? shadedImage.blend : "", "overlay");
assert.equal(shadedImage?.kind === "image" ? shadedImage.shadow?.size : 0, 6);
assert.equal(shadedImage?.kind === "image" ? shadedImage.shadow?.opacity : 0, 50);
assert.equal(shadedImage?.kind === "image" ? layerOpacity(shadedImage) : 0, 40);
assert.equal(shadedImage?.kind === "image" ? imageBlur(shadedImage) : 0, 12);
assert.equal(shadedImage?.kind === "image" ? layerBlurBottom(shadedImage) : 0, 24);
assert.equal(shaded.layers.find((layer) => layer.kind === "shape" && layer.blurBottom === 20) ? 20 : 0, 20);
assert.match(shadeCode, /opacity: 0\.4/);
assert.match(shadeCode, /filter: blur\(12px\)/);
assert.match(shadeCode, /filter: blur\(24px\)/);
assert.match(shadeCode, /mask-image: linear-gradient\(to bottom, transparent, #000\)/);
assert.match(shadeCode, /stdDeviation="10"/);
assert.match(shadeCode, /opacity: 0\.25/);
assert.equal(layerOpacity({}), 100);
assert.equal(imageBlur({}), 0);
assert.equal(
  imageAdjustFilter(imageAdjust({ brightness: 20, contrast: 0, saturation: -100, hue: 30 })),
  "brightness(120%) saturate(0%) hue-rotate(30deg)",
);
const tuned = normalizeStudioState({
  themeSlug: "x",
  color: "#ffffff",
  layers: [{ id: "i", kind: "image", src: "x", x: 0, y: 0, width: 100, brightness: 20, contrast: 0, saturation: 15, hue: -40 }],
});
assert.ok(tuned);
const tunedImage = tuned.layers.find((layer) => layer.kind === "image");
assert.equal(tunedImage?.kind === "image" ? tunedImage.brightness : 0, 20);
assert.equal(tunedImage?.kind === "image" ? tunedImage.contrast : 0, undefined);
assert.equal(tunedImage?.kind === "image" ? tunedImage.saturation : 0, 15);
assert.equal(tunedImage?.kind === "image" ? tunedImage.hue : 0, -40);
assert.match(designToCode(tuned), /filter: brightness\(120%\) saturate\(115%\) hue-rotate\(-40deg\)/);
assert.equal(layerBlurBottom({}), 0);
assert.match(shadeCode, /linearGradient/);
assert.match(shadeCode, /background-clip: text/);
const drop = shadowOffset(100);
assert.equal(drop.x, drop.y);
assert.ok(drop.x > 60 && drop.x < 80);
const cornered = restartPenAt(
  [
    { x: 0, y: 0, in: null, out: { x: 8, y: 0 } },
    { x: 20, y: 0, in: { x: 12, y: 4 }, out: { x: 28, y: -4 } },
    { x: 40, y: 10, in: null, out: null },
  ],
  1,
);
assert.equal(cornered.length, 2);
assert.equal(cornered[1]?.out, null);
assert.deepEqual(cornered[1]?.in, { x: 12, y: 4 });
assert.equal(parseGradient({ angle: 400, from: "#abcdef", to: "#112233" })?.angle, 40);
assert.equal(
  shapeBlend({ id: "s", kind: "shape", shape: "rect", x: 0, y: 0, width: 10, height: 10, radius: 0, color: "#000000" }),
  "normal",
);
assert.equal(
  shapeStroke({ id: "s", kind: "shape", shape: "rect", x: 0, y: 0, width: 10, height: 10, radius: 0, color: "#112233" }).width,
  0,
);
const stroked = parseVectorLayer(
  {
    id: "edge",
    kind: "shape",
    shape: "rect",
    x: 0,
    y: 0,
    width: 40,
    height: 20,
    radius: 0,
    color: "#112233",
    shadow: { size: 2, blur: 0, distance: 0, opacity: 40 },
    stroke: { width: 6, opacity: 50, color: "#abcdef", gradient: { angle: 0, from: "#000000", to: "#ffffff" } },
  },
  "#000000",
);
assert.equal(stroked?.kind === "shape" ? stroked.shadow?.opacity : 0, 40);
assert.equal(stroked?.kind === "shape" ? stroked.stroke?.width : 0, 6);
assert.equal(stroked?.kind === "shape" ? stroked.stroke?.opacity : 0, 50);
if (stroked) {
  const markup = vectorSvg(stroked);
  assert.match(markup, /stroke-width="6"/);
  assert.match(markup, /stroke-opacity="0.5"/);
  assert.match(markup, /flood-opacity="0.4"/);
  assert.match(markup, /linearGradient/);
}

const sharpRect = {
  id: "r",
  kind: "shape" as const,
  shape: "rect" as const,
  x: 10,
  y: 20,
  width: 40,
  height: 30,
  radius: 0,
  color: "#112233",
};
const radiusTips = radiusHandlePoints(sharpRect);
const roundedTips = radiusHandlePoints({ ...sharpRect, radius: 12 });
assert.equal(radiusTips.length, 4);
assert.equal(roundedTips.length, 4);
assert.ok(radiusTips[0] && radiusTips[0].x > sharpRect.x && radiusTips[0].y > sharpRect.y);
assert.ok(roundedTips[0] && radiusTips[0] && roundedTips[0].x > radiusTips[0].x && roundedTips[0].y > radiusTips[0].y);
assert.equal(radiusHandlePoints({ ...sharpRect, shape: "triangle" }).length, 3);
assert.equal(radiusHandlePoints({ ...sharpRect, shape: "ellipse" }).length, 0);
assert.equal(radiusHandlePoints({ ...sharpRect, shape: "star" }).length, 0);
assert.equal(radiusHandlePoints({ ...sharpRect, nodes: shapeNodes(sharpRect) }).length, 0);
assert.equal(shapeNodes(sharpRect).length, 4);
assert.equal(shapeNodes({ ...sharpRect, radius: 8 }).length, 8);
assert.equal(shapeNodes({ ...sharpRect, shape: "ellipse" }).length, 4);
assert.ok(shapeNodes({ ...sharpRect, shape: "ellipse" })[0]?.out);
const starBox = { x: 0, y: 0, width: 100, height: 100 };
const innerTip = starPoints(starBox, 0.5)[1];
const defaultTip = starPoints(starBox)[1];
assert.ok(innerTip && defaultTip && Math.abs(innerTip.y - 50) > Math.abs(defaultTip.y - 50));
assert.equal(starInner({ ...sharpRect, shape: "star", inner: 0.2 }), 0.2);
const moved = transformNodes(shapeNodes(sharpRect), sharpRect, { x: 0, y: 0, width: 80, height: 60 });
assert.equal(moved[0]?.x, 0);
assert.equal(nodeBounds(shapeNodes(sharpRect)).width > 30, true);
const starred = parseVectorLayer({ id: "star", kind: "shape", shape: "star", x: 0, y: 0, width: 80, height: 80, radius: 0, color: "#112233", inner: 0.5 }, "#000000");
assert.equal(starred?.kind === "shape" ? starred.inner : 0, 0.5);

const speakerSrcs = ["conf:speaker-001", "conf:speaker-002", "conf:speaker-003", "conf:speaker-004"];
const speakerMaster = createStudioState("conf:speaker-001", "#102a4a");
speakerMaster.layers.push({ id: "logo", kind: "image", src: "conf:logo-skku-4", x: 10, y: 10, width: 200, radius: 0, crop: null });
const title = speakerMaster.layers.find((layer) => layer.kind === "title");
if (title?.kind === "title") title.text = "AI + DESIGN FUTURE";
const deck = speakerSlides(speakerMaster, speakerSrcs);
assert.equal(deck.index, 0);
assert.equal(deck.slides.length, 4);
assert.equal(speakerSrcOf(deck.slides[0]!), "conf:speaker-001");
assert.equal(speakerSrcOf(deck.slides[2]!), "conf:speaker-003");
assert.equal(deck.slides[2]!.themeSlug, "conf:speaker-003");
const copiedTitle = deck.slides[2]!.layers.find((layer) => layer.kind === "title");
assert.equal(copiedTitle?.kind === "title" ? copiedTitle.text : "", "AI + DESIGN FUTURE");
const copiedLogo = deck.slides[2]!.layers.find((layer) => layer.kind === "image" && layer.src.startsWith("conf:logo"));
assert.equal(copiedLogo?.kind === "image" ? copiedLogo.src : "", "conf:logo-skku-4");
const customThird = structuredClone(deck.slides[2]!);
const customTitle = customThird.layers.find((layer) => layer.kind === "title");
if (customTitle?.kind === "title") customTitle.text = "ONLY THREE";
const mixed = instagramDeck(speakerMaster, speakerSrcs, { "conf:speaker-003": customThird });
const mixedTitle = (index: number) => {
  const layer = mixed.slides[index]?.layers.find((item) => item.kind === "title");
  return layer?.kind === "title" ? layer.text : "";
};
assert.equal(mixed.index, 0);
assert.equal(mixedTitle(0), "AI + DESIGN FUTURE");
assert.equal(mixedTitle(2), "ONLY THREE");
assert.equal(speakerSrcOf(mixed.slides[1]!), "conf:speaker-002");
assert.notEqual(mixed.slides[2], customThird);
const third = createStudioState("conf:speaker-003", "#102a4a");
const fromThird = speakerSlides(third, speakerSrcs);
assert.equal(fromThird.index, 2);
assert.equal(speakerSrcOf(fromThird.slides[2]!), "conf:speaker-003");
assert.equal(speakerSrcOf(fromThird.slides[0]!), "conf:speaker-001");
const reordered = applySpeakerOrder(speakerSrcs, ["conf:speaker-004", "conf:speaker-002", "conf:missing"]);
assert.deepEqual(reordered, ["conf:speaker-004", "conf:speaker-002", "conf:speaker-001", "conf:speaker-003"]);
assert.deepEqual(applySpeakerOrder(speakerSrcs, []), speakerSrcs);
assert.deepEqual(speakerSrcs, ["conf:speaker-001", "conf:speaker-002", "conf:speaker-003", "conf:speaker-004"]);

assert.equal(GIF_LONG_EDGE, 1080);
assert.deepEqual(gifSize(2160, 2160), { width: 1080, height: 1080 });
assert.deepEqual(gifSize(100, 50), { width: 100, height: 50 });
assert.deepEqual(gifSize(1280, 3840), { width: 360, height: 1080 });
const delays = gifFrameDelays(5.04);
assert.equal(delays.length, 50);
assert.equal(delays.reduce((sum, delay) => sum + delay, 0), 504);
assert.ok(delays.every((delay) => delay >= 1));

function solidFrame(width: number, height: number, red: number, green: number, blue: number, alpha = 255): Uint8ClampedArray {
  const pixels = new Uint8ClampedArray(width * height * 4);
  for (let index = 0; index < width * height; index += 1) {
    pixels[index * 4] = red;
    pixels[index * 4 + 1] = green;
    pixels[index * 4 + 2] = blue;
    pixels[index * 4 + 3] = alpha;
  }
  return pixels;
}
const gifEncoder = createGifEncoder(2, 2, 2);
gifEncoder.add(solidFrame(2, 2, 220, 10, 10), 10);
gifEncoder.add(solidFrame(2, 2, 10, 10, 220), 10);
const gifBytes = gifEncoder.finish();
const netscape = new TextEncoder().encode("NETSCAPE2.0");
const netscapeAt = gifBytes.findIndex((_, index) => netscape.every((byte, offset) => gifBytes[index + offset] === byte));
assert.ok(netscapeAt > 0);
assert.equal(gifBytes[netscapeAt + 13], 0);
assert.equal(gifBytes[netscapeAt + 14], 0);
const gifReader = new GifReader(gifBytes);
assert.equal(gifReader.width, 2);
assert.equal(gifReader.numFrames(), 2);
const gifFrame = new Uint8Array(2 * 2 * 4);
gifReader.decodeAndBlitFrameRGBA(0, gifFrame);
assert.ok((gifFrame[0] ?? 0) > 180 && (gifFrame[1] ?? 255) < 40 && (gifFrame[2] ?? 255) < 40);
gifReader.decodeAndBlitFrameRGBA(1, gifFrame);
assert.ok((gifFrame[2] ?? 0) > 180 && (gifFrame[0] ?? 255) < 40);
const clear = solidFrame(2, 1, 0, 200, 0);
clear[7] = 0;
const clearGif = createGifEncoder(2, 1, 1);
clearGif.add(clear, 5);
const clearBytes = clearGif.finish();
assert.ok(clearBytes.includes(0x21) && clearBytes.includes(0xf9));

function pdfStream(pdf: Uint8Array, token: string): Uint8Array {
  const needle = new TextEncoder().encode(token);
  const stream = new TextEncoder().encode("stream\n");
  const endMark = new TextEncoder().encode("\nendstream");
  const find = (from: number, mark: Uint8Array) => {
    for (let index = from; index <= pdf.length - mark.length; index += 1) {
      if (mark.every((byte, offset) => pdf[index + offset] === byte)) return index;
    }
    return -1;
  };
  const at = find(0, needle);
  assert.ok(at >= 0);
  const start = find(at, stream);
  assert.ok(start >= 0);
  const end = find(start + stream.length, endMark);
  assert.ok(end >= 0);
  return pdf.slice(start + stream.length, end);
}
const opaquePdf = await cardPdf(solidFrame(2, 1, 255, 0, 0), 2, 1);
assert.ok(new TextDecoder().decode(opaquePdf.slice(0, 8)).startsWith("%PDF"));
assert.ok(new TextDecoder("latin1").decode(opaquePdf).includes("/MediaBox [0 0 2 1]"));
assert.equal(new TextDecoder("latin1").decode(opaquePdf).includes("/SMask"), false);
assert.deepEqual([...inflateSync(pdfStream(opaquePdf, "/Filter /FlateDecode"))], [255, 0, 0, 255, 0, 0]);
const faded = solidFrame(1, 1, 0, 0, 255, 0);
const fadedPdf = await cardPdf(faded, 1, 1);
assert.ok(new TextDecoder("latin1").decode(fadedPdf).includes("/SMask 6 0 R"));

console.log("OK: studio preset, size, font, radius, wrap, ink, code, and route checks");
