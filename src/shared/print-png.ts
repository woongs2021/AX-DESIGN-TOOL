/**
 * Print-resolution PNG written strip by strip, so the whole image never has to fit in one canvas.
 * Rows go through the built-in CompressionStream; works in browsers and in Node for tests.
 */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

export function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff]! ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

export function pngChunk(type: string, data: Uint8Array): Uint8Array<ArrayBuffer> {
  const chunk = new Uint8Array(12 + data.length);
  const view = new DataView(chunk.buffer);
  view.setUint32(0, data.length);
  for (let index = 0; index < 4; index += 1) chunk[4 + index] = type.charCodeAt(index);
  chunk.set(data, 8);
  view.setUint32(8 + data.length, crc32(chunk.subarray(4, 8 + data.length)));
  return chunk;
}

export function pixelsPerMeter(dpi: number): number {
  return Math.round(dpi / 0.0254);
}

/** Horizontal strips that cover height rows, each at most maxPixels in area (Safari caps a canvas near 16.7M). */
export function printStrips(width: number, height: number, maxPixels = 8_000_000): { y: number; h: number }[] {
  const rows = Math.max(1, Math.floor(maxPixels / Math.max(1, width)));
  const strips: { y: number; h: number }[] = [];
  for (let y = 0; y < height; y += rows) strips.push({ y, h: Math.min(rows, height - y) });
  return strips;
}

const SIGNATURE = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

export type PngEncoder = {
  /** RGBA rows, top to bottom, `rows` rows of width * 4 bytes. */
  writeRows: (rgba: Uint8Array | Uint8ClampedArray, rows: number) => Promise<void>;
  finish: () => Promise<Uint8Array<ArrayBuffer>[]>;
  abort: () => void;
};

export function createPngEncoder(width: number, height: number, dpi: number): PngEncoder {
  const stream = new CompressionStream("deflate");
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  const compressed: Uint8Array<ArrayBuffer>[] = [];
  const pump = (async () => {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      compressed.push(new Uint8Array(value));
    }
  })();
  const stride = width * 4;
  return {
    async writeRows(rgba, rows) {
      const out = new Uint8Array(rows * (stride + 1));
      for (let row = 0; row < rows; row += 1) {
        out.set(rgba.subarray(row * stride, (row + 1) * stride), row * (stride + 1) + 1);
      }
      await writer.write(out);
    },
    async finish() {
      await writer.close();
      await pump;
      const header = new Uint8Array(13);
      const headerView = new DataView(header.buffer);
      headerView.setUint32(0, width);
      headerView.setUint32(4, height);
      header.set([8, 6, 0, 0, 0], 8);
      const phys = new Uint8Array(9);
      const physView = new DataView(phys.buffer);
      physView.setUint32(0, pixelsPerMeter(dpi));
      physView.setUint32(4, pixelsPerMeter(dpi));
      phys[8] = 1;
      return [
        new Uint8Array(SIGNATURE),
        pngChunk("IHDR", header),
        pngChunk("pHYs", phys),
        ...compressed.map((part) => pngChunk("IDAT", part)),
        pngChunk("IEND", new Uint8Array(0)),
      ];
    },
    abort() {
      void writer.abort().catch(() => {});
      void reader.cancel().catch(() => {});
    },
  };
}
