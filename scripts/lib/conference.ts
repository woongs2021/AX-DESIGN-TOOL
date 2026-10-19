/**
 * Conference resources: phase 2-resources/ → <outRoot>/assets/conference/ + data/conference.json.
 * The internal build copies originals under the Git 100MB limit. The public build writes
 * edit-size JPEG stills and videos whose long edge is 1920, so GitHub Pages can publish them.
 */
import { spawnSync } from "node:child_process";
import { constants, copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";
import {
  backgroundIdFor,
  CONFERENCE_PRESETS,
  logoSlug,
  speakerSlug,
  type ConferenceBackground,
  type ConferenceIndex,
  type ConferenceSource,
} from "../../src/shared/conference.ts";
import { GIT_MAX_FILE_BYTES } from "../../src/shared/limits.ts";
import { stableStringify } from "../../src/shared/stable-json.ts";
import { probeWithFfprobe } from "./probe-asset.ts";

export const CONFERENCE_SOURCE_DIR = "phase 2-resources";
const THUMB_WIDTH = 480;
const THUMB_QUALITY = 80;
const SVG_EDGE = 1080;
const WEB_JPEG_QUALITY = 80;
const WEB_VIDEO_LONG_EDGE = 1920;

function editBox(id: string): { width: number; height: number } {
  const preset = CONFERENCE_PRESETS.find((item) => item.background === id);
  return { width: preset?.width ?? WEB_VIDEO_LONG_EDGE, height: preset?.height ?? WEB_VIDEO_LONG_EDGE };
}

function evenSize(width: number, height: number, longEdge: number): { width: number; height: number } {
  const scale = Math.min(1, longEdge / Math.max(width, height));
  return {
    width: Math.max(2, Math.round((width * scale) / 2) * 2),
    height: Math.max(2, Math.round((height * scale) / 2) * 2),
  };
}

function writeWebVideo(from: string, dest: string, box: { width: number; height: number }): void {
  const size = evenSize(box.width, box.height, WEB_VIDEO_LONG_EDGE);
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      from,
      "-vf",
      `scale=${size.width}:${size.height}:force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2`,
      "-c:v",
      "libx264",
      "-crf",
      "28",
      "-preset",
      "veryfast",
      "-an",
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      dest,
    ],
    { stdio: "pipe" },
  );
  if (result.status !== 0) {
    const detail = result.stderr?.toString().trim().split("\n").at(-1) ?? "ffmpeg failed";
    throw new Error(`${from}: ${detail}`);
  }
}

export type ConferenceReport = {
  backgrounds: number;
  videos: number;
  speakers: number;
  logos: number;
  bytesCopied: number;
  /** Files over the Git 100MB limit. They are not copied; Slide uses its compressed copy instead. */
  skipped: { path: string; bytes: number }[];
  warnings: string[];
};

function filesIn(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => (entry.isDirectory() ? filesIn(join(dir, entry.name)) : [join(dir, entry.name)]))
    .filter((path) => !basename(path).startsWith("."))
    .sort();
}

/** The SVGs only carry a viewBox; an <img> without width/height has no natural size. */
function sizedSvg(text: string): { text: string; width: number; height: number } {
  const viewBox = text.match(/<svg[^>]*\bviewBox="\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/);
  const vw = viewBox ? Number(viewBox[1]) : SVG_EDGE;
  const vh = viewBox ? Number(viewBox[2]) : SVG_EDGE;
  const scale = SVG_EDGE / Math.max(vw, vh);
  const width = Math.round(vw * scale);
  const height = Math.round(vh * scale);
  if (/<svg[^>]*\swidth=/.test(text)) return { text, width, height };
  return { text: text.replace(/<svg\b/, `<svg width="${width}" height="${height}"`), width, height };
}

export async function buildConference(outRoot: string, mode: "original" | "web" = "original"): Promise<ConferenceReport | null> {
  const files = filesIn(CONFERENCE_SOURCE_DIR);
  if (files.length === 0) return null;
  const assetsRel = "assets/conference";
  const assetsDir = join(outRoot, assetsRel);
  for (const sub of ["backgrounds", "speakers", "logos"]) mkdirSync(join(assetsDir, sub), { recursive: true });

  const report: ConferenceReport = { backgrounds: 0, videos: 0, speakers: 0, logos: 0, bytesCopied: 0, skipped: [], warnings: [] };
  const copy = (from: string, sub: string, name: string) => {
    copyFileSync(from, join(assetsDir, sub, name), constants.COPYFILE_FICLONE);
    report.bytesCopied += statSync(from).size;
    return `${assetsRel}/${sub}/${name}`;
  };
  const thumb = async (from: string | Buffer, sub: string, name: string) => {
    const out = join(assetsDir, sub, name);
    const info = await sharp(from, { failOn: "none", limitInputPixels: false })
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(out);
    report.bytesCopied += info.size;
    return `${assetsRel}/${sub}/${name}`;
  };

  const backgrounds = new Map<string, ConferenceBackground>();
  const background = (id: string) => {
    const item = backgrounds.get(id) ?? { id, image: null, video: null, thumbPath: null };
    backgrounds.set(id, item);
    return item;
  };
  const graphic = files.filter((path) => path.includes("[Graphic_Resources]"));
  const videos = graphic.filter((path) => extname(path).toLowerCase() === ".mp4");
  const images = graphic.filter((path) => extname(path).toLowerCase() === ".png");

  for (const path of images) {
    const id = backgroundIdFor(basename(path));
    if (!id) {
      report.warnings.push(`${path}: 프리셋에 맞는 이름이 아닙니다.`);
      continue;
    }
    const bytes = statSync(path).size;
    if (bytes > GIT_MAX_FILE_BYTES) {
      report.skipped.push({ path, bytes });
      continue;
    }
    const meta = await sharp(path, { limitInputPixels: false }).metadata();
    const item = background(id);
    if (mode === "web") {
      const box = editBox(id);
      const name = `${id}.jpg`;
      const info = await sharp(path, { failOn: "none", limitInputPixels: false })
        .resize({ width: box.width, height: box.height, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: WEB_JPEG_QUALITY })
        .toFile(join(assetsDir, "backgrounds", name));
      report.bytesCopied += info.size;
      item.image = { path: `${assetsRel}/backgrounds/${name}`, width: info.width, height: info.height, bytes: info.size, dpi: meta.density ?? null };
    } else {
      const name = `${id}${extname(path).toLowerCase()}`;
      item.image = { path: copy(path, "backgrounds", name), width: meta.width ?? null, height: meta.height ?? null, bytes, dpi: meta.density ?? null };
    }
    item.thumbPath = await thumb(path, "backgrounds", `${id}.thumb.webp`);
    report.backgrounds += 1;
  }

  let ffprobeMissing = false;
  // The smallest file wins, so Slide picks its compressed copy over the 123MB original.
  for (const path of [...videos].sort((a, b) => statSync(a).size - statSync(b).size || a.localeCompare(b))) {
    const id = backgroundIdFor(basename(path));
    if (!id) {
      report.warnings.push(`${path}: 프리셋에 맞는 이름이 아닙니다.`);
      continue;
    }
    const bytes = statSync(path).size;
    if (bytes > GIT_MAX_FILE_BYTES) {
      report.skipped.push({ path, bytes });
      continue;
    }
    const item = background(id);
    if (item.video) continue;
    let probed: { width: number | null; height: number | null; durationSec: number | null } = { width: null, height: null, durationSec: null };
    try {
      probed = probeWithFfprobe(path);
    } catch {
      ffprobeMissing = true;
    }
    const videoName = `${id}.mp4`;
    const videoPath = join(assetsDir, "backgrounds", videoName);
    if (mode === "web") writeWebVideo(path, videoPath, editBox(id));
    else copyFileSync(path, videoPath, constants.COPYFILE_FICLONE);
    const videoBytes = statSync(videoPath).size;
    report.bytesCopied += videoBytes;
    if (mode === "web") {
      try {
        probed = probeWithFfprobe(videoPath);
      } catch {
        ffprobeMissing = true;
      }
    }
    item.video = { path: `${assetsRel}/backgrounds/${videoName}`, width: probed.width, height: probed.height, bytes: videoBytes, durationSec: probed.durationSec };
    report.videos += 1;
  }
  if (ffprobeMissing) report.warnings.push("ffprobe가 없어 동영상 크기·길이를 비워 두었습니다.");

  const speakers: ConferenceSource[] = [];
  for (const path of files.filter((item) => item.includes("[Speecher]") && extname(item).toLowerCase() === ".png")) {
    const id = speakerSlug(basename(path));
    if (!id) {
      report.warnings.push(`${path}: slug를 만들 수 없는 이름입니다.`);
      continue;
    }
    const meta = await sharp(path).metadata();
    speakers.push({
      id,
      label: basename(path, extname(path)),
      path: copy(path, "speakers", `${id}.png`),
      thumbPath: await thumb(path, "speakers", `${id}.thumb.webp`),
      format: "png",
      width: meta.width ?? 1,
      height: meta.height ?? 1,
      bytes: statSync(path).size,
    });
    report.speakers += 1;
  }

  const logos: ConferenceSource[] = [];
  const seen = new Set<string>();
  for (const path of files.filter((item) => item.includes("[SVG]") && extname(item).toLowerCase() === ".svg")) {
    const id = logoSlug(basename(path));
    if (!id || seen.has(id)) {
      report.warnings.push(`${path}: ${id ? "slug가 겹칩니다" : "slug를 만들 수 없는 이름입니다"}.`);
      continue;
    }
    seen.add(id);
    const svg = sizedSvg(readFileSync(path, "utf8"));
    const rel = `${assetsRel}/logos/${id}.svg`;
    writeFileSync(join(outRoot, rel), svg.text);
    const bytes = Buffer.byteLength(svg.text);
    report.bytesCopied += bytes;
    logos.push({
      id,
      label: basename(path, extname(path)).normalize("NFC"),
      path: rel,
      thumbPath: rel,
      format: "svg",
      width: svg.width,
      height: svg.height,
      bytes,
    });
    report.logos += 1;
  }

  const index: ConferenceIndex = {
    version: 1,
    backgrounds: [...backgrounds.values()].sort((a, b) => a.id.localeCompare(b.id)),
    speakers,
    logos: logos.sort((a, b) => a.id.localeCompare(b.id)),
  };
  writeFileSync(join(outRoot, "data", "conference.json"), stableStringify(index));
  return report;
}
