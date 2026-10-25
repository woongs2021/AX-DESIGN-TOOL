/** One loop of a card video, written as a GIF that repeats forever. */
import { GifWriter } from "omggif";

/** Longest side of a GIF. Full card frames of a photo loop are too large to encode in the browser. */
export const GIF_LONG_EDGE = 1080;
export const GIF_FPS = 10;

const PALETTE_SIZE = 256;

function even(value: number): number {
  return Math.max(2, Math.round(value / 2) * 2);
}

/** Fit a card into the GIF long edge, keeping the ratio and even pixel sizes. */
export function gifSize(width: number, height: number): { width: number; height: number } {
  const long = Math.max(width, height);
  const scale = long > GIF_LONG_EDGE ? GIF_LONG_EDGE / long : 1;
  return { width: even(width * scale), height: even(height * scale) };
}

/**
 * Per-frame delays in centiseconds. Their sum is the loop length, so the GIF
 * takes the same time as one play of the video.
 */
export function gifFrameDelays(durationSeconds: number, fps = GIF_FPS): number[] {
  const duration = Number.isFinite(durationSeconds) && durationSeconds > 0.05 ? durationSeconds : 5;
  const count = Math.max(1, Math.round(duration * fps));
  const total = Math.max(count, Math.round(duration * 100));
  const base = Math.floor(total / count);
  let extra = total - base * count;
  return Array.from({ length: count }, () => {
    const delay = base + (extra > 0 ? 1 : 0);
    if (extra > 0) extra -= 1;
    return delay;
  });
}

function cellColor(cell: number): number {
  const red = ((cell >> 10) << 3) + 4;
  const green = (((cell >> 5) & 31) << 3) + 4;
  const blue = ((cell & 31) << 3) + 4;
  return ((red & 255) << 16) | ((green & 255) << 8) | (blue & 255);
}

function colorDistance(cell: number, other: number): number {
  const left = cellColor(cell);
  const right = cellColor(other);
  let sum = 0;
  for (let shift = 16; shift >= 0; shift -= 8) {
    const delta = ((left >> shift) & 255) - ((right >> shift) & 255);
    sum += delta * delta;
  }
  return sum;
}

/** 256-color index. Index 0 is transparent when the frame has a clear pixel. */
function indexFrame(pixels: Uint8ClampedArray, width: number, height: number): { indexed: Uint8Array; palette: number[]; transparent: number | null } {
  const count = width * height;
  if (pixels.length < count * 4) throw new Error("pixels");
  const grid = 32;
  const histogram = new Uint32Array(grid * grid * grid);
  let transparent = false;
  for (let index = 0; index < count; index += 1) {
    const offset = index * 4;
    if ((pixels[offset + 3] ?? 0) < 128) {
      transparent = true;
      continue;
    }
    const red = (pixels[offset] ?? 0) >> 3;
    const green = (pixels[offset + 1] ?? 0) >> 3;
    const blue = (pixels[offset + 2] ?? 0) >> 3;
    const cell = (red * grid + green) * grid + blue;
    histogram[cell] = (histogram[cell] ?? 0) + 1;
  }
  const used: number[] = [];
  for (let cell = 0; cell < histogram.length; cell += 1) if ((histogram[cell] ?? 0) > 0) used.push(cell);
  used.sort((a, b) => (histogram[b] ?? 0) - (histogram[a] ?? 0));
  const slots = transparent ? PALETTE_SIZE - 1 : PALETTE_SIZE;
  const chosen = used.slice(0, slots);
  if (chosen.length === 0) chosen.push(0);
  const first = transparent ? 1 : 0;
  const lookup = new Int16Array(histogram.length).fill(-1);
  chosen.forEach((cell, index) => {
    lookup[cell] = first + index;
  });
  for (const cell of used.slice(slots)) {
    let best = chosen[0] ?? 0;
    let score = Number.POSITIVE_INFINITY;
    for (const candidate of chosen) {
      const distance = colorDistance(cell, candidate);
      if (distance < score) {
        score = distance;
        best = candidate;
      }
    }
    lookup[cell] = lookup[best] ?? first;
  }
  const palette = new Array<number>(PALETTE_SIZE).fill(cellColor(chosen[chosen.length - 1] ?? 0));
  if (transparent) palette[0] = 0;
  chosen.forEach((cell, index) => {
    palette[first + index] = cellColor(cell);
  });
  const indexed = new Uint8Array(count);
  for (let index = 0; index < count; index += 1) {
    const offset = index * 4;
    if ((pixels[offset + 3] ?? 0) < 128) continue;
    const red = (pixels[offset] ?? 0) >> 3;
    const green = (pixels[offset + 1] ?? 0) >> 3;
    const blue = (pixels[offset + 2] ?? 0) >> 3;
    indexed[index] = lookup[(red * grid + green) * grid + blue] ?? first;
  }
  return { indexed, palette, transparent: transparent ? 0 : null };
}

/** Encodes frames one at a time. `loop: 0` is the Netscape repeat-forever extension. */
export function createGifEncoder(width: number, height: number, frameCount: number): {
  add(pixels: Uint8ClampedArray, delay: number): void;
  finish(): Uint8Array;
} {
  const buffer = new Uint8Array(width * height * Math.max(1, frameCount) * 2 + frameCount * 1024 + 4096);
  const writer = new GifWriter(buffer, width, height, { loop: 0 });
  return {
    add(pixels, delay) {
      const frame = indexFrame(pixels, width, height);
      const position = writer.addFrame(0, 0, width, height, frame.indexed, {
        palette: frame.palette,
        delay,
        disposal: 1,
        ...(frame.transparent === null ? {} : { transparent: frame.transparent }),
      });
      if (position > buffer.length) throw new Error("gif");
    },
    finish() {
      const end = writer.end();
      if (end > buffer.length) throw new Error("gif");
      return buffer.slice(0, end);
    },
  };
}
