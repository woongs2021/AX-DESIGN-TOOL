/**
 * One HTML file that plays the deck as a presentation. Slides are SVG with live, selectable text;
 * background videos play behind them. Fonts, pictures, and videos are embedded, so the file works offline.
 */

import { faceCovers, loadFace, subsetTrueType, type LoadedFace } from "./font-files.ts";
import type { SceneColor, SceneFill, SceneItem, SlideScene } from "./slides-pptx.ts";

const num = (value: number) => String(Math.round(value * 100) / 100);
const paint = (color: SceneColor) => `#${color.hex}`;
const escapeXml = (value: string) =>
  value.replace(/[&<>"]/g, (char) => (char === "&" ? "&amp;" : char === "<" ? "&lt;" : char === ">" ? "&gt;" : "&quot;"));

/** base64 in pieces, so large videos never become one string while the file is built. */
function base64Parts(bytes: Uint8Array): string[] {
  const parts: string[] = [];
  const step = 0x8000 * 3;
  for (let at = 0; at < bytes.length; at += step) {
    const chunk = bytes.subarray(at, at + step);
    let binary = "";
    for (let index = 0; index < chunk.length; index += 0x8000) binary += String.fromCharCode(...chunk.subarray(index, index + 0x8000));
    parts.push(btoa(binary));
  }
  return parts;
}

const dataUrl = (type: string, bytes: Uint8Array) => `data:${type};base64,${base64Parts(bytes).join("")}`;
const family = (face: LoadedFace) => `ax-${face.label}`;

function fillAttrs(fill: SceneFill | null, defs: string[], id: string, box: { x: number; y: number; w: number; h: number }): string {
  if (!fill) return ' fill="none"';
  if (fill.kind === "solid") return ` fill="${paint(fill.color)}"${fill.color.alpha < 1 ? ` fill-opacity="${num(fill.color.alpha)}"` : ""}`;
  const rad = (fill.angle * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const half = (Math.abs(dx) * box.w + Math.abs(dy) * box.h) / 2;
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const stop = (offset: number, color: SceneColor) =>
    `<stop offset="${offset}" stop-color="${paint(color)}"${color.alpha < 1 ? ` stop-opacity="${num(color.alpha)}"` : ""}/>`;
  defs.push(
    `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${num(cx - dx * half)}" y1="${num(cy - dy * half)}" x2="${num(cx + dx * half)}" y2="${num(cy + dy * half)}">${stop(0, fill.from)}${stop(1, fill.to)}</linearGradient>`,
  );
  return ` fill="url(#${id})"`;
}

function shapeSvg(item: Extract<SceneItem, { kind: "shape" }>, defs: string[], id: string): string {
  const { x, y, w, h, geometry } = item;
  const stroke = item.stroke
    ? ` stroke="${paint(item.stroke.color)}" stroke-width="${num(item.stroke.width)}" stroke-linejoin="round" stroke-linecap="round"${item.stroke.color.alpha < 1 ? ` stroke-opacity="${num(item.stroke.color.alpha)}"` : ""}`
    : "";
  const attrs = `${fillAttrs(item.fill, defs, id, item)}${stroke}`;
  if (geometry.type === "ellipse") return `<ellipse cx="${num(x + w / 2)}" cy="${num(y + h / 2)}" rx="${num(w / 2)}" ry="${num(h / 2)}"${attrs}/>`;
  if (geometry.type === "rect") {
    const r = Math.max(0, Math.min(geometry.radius, w / 2, h / 2));
    return `<rect x="${num(x)}" y="${num(y)}" width="${num(w)}" height="${num(h)}"${r > 0 ? ` rx="${num(r)}"` : ""}${attrs}/>`;
  }
  const d = geometry.commands
    .map((cmd) => {
      if (cmd.op === "Z") return "Z";
      if (cmd.op === "Q") return `Q${num(cmd.cx)} ${num(cmd.cy)} ${num(cmd.x)} ${num(cmd.y)}`;
      if (cmd.op === "C") return `C${num(cmd.c1x)} ${num(cmd.c1y)} ${num(cmd.c2x)} ${num(cmd.c2y)} ${num(cmd.x)} ${num(cmd.y)}`;
      return `${cmd.op}${num(cmd.x)} ${num(cmd.y)}`;
    })
    .join("");
  return `<path d="${d}"${attrs}/>`;
}

const PLAYER_CSS = `
html, body { margin: 0; height: 100%; background: black; overflow: hidden; }
body { display: grid; place-items: center; font-family: system-ui, sans-serif; }
.deck { position: relative; width: min(100vw, calc(100vh * var(--ratio))); aspect-ratio: var(--ratio); }
.slide { position: absolute; inset: 0; overflow: hidden; visibility: hidden; }
.slide.is-current { visibility: visible; }
.slide video, .slide svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.slide video { object-fit: cover; }
.slide text { white-space: pre; }
.count { position: fixed; right: 16px; bottom: 12px; color: white; opacity: 0; font-size: 13px; transition: opacity 0.3s; pointer-events: none; text-shadow: 0 1px 2px black; }
body.is-moving .count { opacity: 0.7; }
body.is-moving { cursor: default; }
body:not(.is-moving) { cursor: none; }
`;

const PLAYER_JS = `
const slides = [...document.querySelectorAll(".slide")];
const count = document.querySelector(".count");
const decoded = new Map();
const videoUrl = (id) => {
  if (!decoded.has(id)) {
    const source = document.getElementById(id);
    const binary = atob(source.textContent.trim());
    const bytes = new Uint8Array(binary.length);
    for (let at = 0; at < binary.length; at += 1) bytes[at] = binary.charCodeAt(at);
    decoded.set(id, URL.createObjectURL(new Blob([bytes], { type: source.dataset.type })));
    source.textContent = "";
  }
  return decoded.get(id);
};
const prepare = (slide) => {
  const video = slide?.querySelector("video[data-video]");
  if (video && !video.src) video.src = videoUrl(video.dataset.video);
};
let current = -1;
const show = (next) => {
  next = Math.max(0, Math.min(slides.length - 1, next));
  if (next === current) return;
  slides.forEach((slide, at) => {
    slide.classList.toggle("is-current", at === next);
    const video = slide.querySelector("video");
    if (video && at !== next) video.pause();
  });
  current = next;
  prepare(slides[next]);
  const video = slides[next].querySelector("video");
  if (video) {
    video.currentTime = 0;
    video.play().catch(() => {});
  }
  count.textContent = (next + 1) + " / " + slides.length;
  history.replaceState(null, "", "#" + (next + 1));
  setTimeout(() => prepare(slides[next + 1]), 300);
};
document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) show(current + 1);
  else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(event.key)) show(current - 1);
  else if (event.key === "Home") show(0);
  else if (event.key === "End") show(slides.length - 1);
  else if (event.key === "f" || event.key === "F") {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  } else return;
  event.preventDefault();
});
document.addEventListener("click", (event) => {
  if (String(getSelection() ?? "")) return;
  show(event.clientX < innerWidth / 4 ? current - 1 : current + 1);
});
let still = 0;
document.addEventListener("mousemove", () => {
  document.body.classList.add("is-moving");
  clearTimeout(still);
  still = setTimeout(() => document.body.classList.remove("is-moving"), 1500);
});
show((Number(location.hash.slice(1)) || 1) - 1);
`;

/** Fetches background videos, so it needs the same network access as the editor. */
export async function scenesHtml(scenes: readonly SlideScene[], title: string): Promise<Blob> {
  if (scenes.length === 0) throw new Error("slides");
  const first = scenes[0];
  const used = new Map<string, { face: LoadedFace; gids: Set<number> }>();
  const use = (face: LoadedFace, codePoint: number) => {
    let entry = used.get(face.label);
    if (!entry) {
      entry = { face, gids: new Set() };
      used.set(face.label, entry);
    }
    entry.gids.add(face.font.glyph(codePoint));
  };
  const videos = new Map<string, string>();
  const slides: string[] = [];
  let gradient = 0;
  for (const scene of scenes) {
    const defs: string[] = [];
    const body: string[] = [];
    for (const item of scene.items) {
      if (item.kind === "picture") {
        body.push(`<image href="${dataUrl("image/png", item.png)}" x="${num(item.x)}" y="${num(item.y)}" width="${num(item.w)}" height="${num(item.h)}" preserveAspectRatio="none"/>`);
      } else if (item.kind === "line") {
        const { segment, color } = item;
        const opacity = color.alpha < 1 ? ` opacity="${num(color.alpha)}"` : "";
        body.push(
          `<g${opacity}><line x1="${num(segment.x1)}" y1="${num(segment.y1)}" x2="${num(segment.x2)}" y2="${num(segment.y2)}" stroke="${paint(color)}" stroke-width="${num(item.width)}" stroke-linecap="${item.round ? "round" : "butt"}"/>${item.heads
            .map((head) => `<polygon points="${head.map((point) => `${num(point.x)},${num(point.y)}`).join(" ")}" fill="${paint(color)}"/>`)
            .join("")}</g>`,
        );
      } else if (item.kind === "shape") {
        gradient += 1;
        body.push(shapeSvg(item, defs, `g${gradient}`));
      } else {
        const primary = await loadFace(item.font, item.weight, item.italic);
        const fallback = await loadFace("Pretendard", item.weight, item.italic);
        const lines = item.lines.map((line, row) => {
          const xs = item.xs[row] ?? [];
          const points = Array.from(line);
          const positions: string[] = [];
          points.forEach((point, at) => {
            const codePoint = point.codePointAt(0) ?? 32;
            use(faceCovers(primary.font, codePoint) ? primary : fallback, codePoint);
            for (let unit = 0; unit < point.length; unit += 1) positions.push(num(item.x + (xs[at] ?? 0)));
          });
          return `<tspan x="${positions.join(" ")}" y="${num(item.y + row * item.lineHeight + item.baseline)}">${escapeXml(line)}</tspan>`;
        });
        const opacity = item.color.alpha < 1 ? ` fill-opacity="${num(item.color.alpha)}"` : "";
        const style = item.italic ? ' font-style="italic"' : "";
        body.push(
          `<text font-family='"${family(primary)}", "${family(fallback)}"' font-size="${num(item.size)}"${style} fill="${paint(item.color)}"${opacity}>${lines.join("")}</text>`,
        );
        if (item.underline) {
          const thickness = Math.max(1, Math.round(item.size / 16));
          item.xs.forEach((xs, row) => {
            const left = xs[0] ?? 0;
            const right = xs[xs.length - 1] ?? left;
            body.push(
              `<rect x="${num(item.x + left)}" y="${num(item.y + row * item.lineHeight + item.size * 0.98)}" width="${num(right - left)}" height="${thickness}" fill="${paint(item.color)}"${opacity}/>`,
            );
          });
        }
      }
    }
    const poster = dataUrl("image/jpeg", scene.background);
    let video = "";
    if (scene.video) {
      let id = videos.get(scene.video);
      if (!id) {
        id = `video-${videos.size + 1}`;
        videos.set(scene.video, id);
      }
      video = `<video data-video="${id}" poster="${poster}" muted loop playsinline preload="auto"></video>`;
    }
    const backdrop = video ? "" : `<image href="${poster}" width="${scene.width}" height="${scene.height}" preserveAspectRatio="none"/>`;
    slides.push(
      `<section class="slide">${video}<svg viewBox="0 0 ${scene.width} ${scene.height}" xmlns="http://www.w3.org/2000/svg">${defs.length > 0 ? `<defs>${defs.join("")}</defs>` : ""}${backdrop}${body.join("")}</svg></section>`,
    );
  }

  const faces = [...used.values()].map(({ face, gids }) => {
    const font = dataUrl("font/ttf", subsetTrueType(face.font, gids));
    return `@font-face { font-family: "${family(face)}"; src: url(${font}) format("truetype");${face.italic ? " font-style: italic;" : ""} }`;
  });
  const parts: BlobPart[] = [
    `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeXml(title)}</title>
<style>${faces.join("\n")}${PLAYER_CSS}</style>
</head>
<body>
<main class="deck" style="--ratio: ${first ? `${first.width} / ${first.height}` : "16 / 9"}">
${slides.join("\n")}
</main>
<div class="count" aria-live="polite"></div>
`,
  ];
  for (const [url, id] of videos) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`video ${url}`);
    const blob = await response.blob();
    parts.push(`<script type="application/octet-stream" id="${id}" data-type="${escapeXml(blob.type || "video/mp4")}">`);
    parts.push(...base64Parts(new Uint8Array(await blob.arrayBuffer())));
    parts.push("</script>\n");
  }
  parts.push(`<script>${PLAYER_JS}</script>\n</body>\n</html>\n`);
  return new Blob(parts, { type: "text/html" });
}
