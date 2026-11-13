/** The studio fonts as TrueType files from Fontsource: lookup, and subsets that keep glyph ids. */

const FONT_SLUGS: Record<string, string> = { Pretendard: "pretendard", Roboto: "roboto", Montserrat: "montserrat" };
const ITALIC_FACES = new Set(["roboto", "montserrat"]);

function fontFile(slug: string, weight: number, italic: boolean): Promise<Uint8Array | null> {
  const url = `https://cdn.jsdelivr.net/fontsource/fonts/${slug}@latest/latin-${weight}-${italic ? "italic" : "normal"}.ttf`;
  return fetch(url)
    .then(async (response) => (response.ok ? new Uint8Array(await response.arrayBuffer()) : null))
    .catch(() => null);
}

export type TrueType = {
  bytes: Uint8Array;
  view: DataView;
  tables: Map<string, { offset: number; length: number }>;
  unitsPerEm: number;
  numGlyphs: number;
  glyph: (codePoint: number) => number;
  advance: (gid: number) => number;
  glyphRange: (gid: number) => [number, number];
};

/** label names the file, e.g. "montserrat-700-italic". italic is false when the family has no italic face, so the caller slants it. */
export type LoadedFace = { label: string; italic: boolean; font: TrueType };

const parsed = new Map<string, Promise<LoadedFace>>();

/** The nearest weight step of a studio font family. Unknown families use Pretendard. Rejects when the file cannot be fetched. */
export function loadFace(family: string, weight: number, italic: boolean): Promise<LoadedFace> {
  const slug = FONT_SLUGS[family] ?? "pretendard";
  const step = Math.min(900, Math.max(100, Math.round(weight / 100) * 100));
  const real = italic && ITALIC_FACES.has(slug);
  const label = `${slug}-${step}${real ? "-italic" : ""}`;
  let pending = parsed.get(label);
  if (!pending) {
    pending = fontFile(slug, step, real).then((bytes) => {
      if (!bytes) throw new Error(`font ${label}`);
      return { label, italic: real, font: parseTrueType(bytes) };
    });
    parsed.set(label, pending);
    pending.catch(() => parsed.delete(label));
  }
  return pending;
}

/** Whether the face draws this code point. Whitespace stays with the face so runs do not split on spaces. */
export function faceCovers(font: TrueType, codePoint: number): boolean {
  return font.glyph(codePoint) > 0 || /\s/u.test(String.fromCodePoint(codePoint));
}

function parseTrueType(bytes: Uint8Array): TrueType {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tables = new Map<string, { offset: number; length: number }>();
  for (let at = 0; at < view.getUint16(4); at += 1) {
    const record = 12 + at * 16;
    const tag = String.fromCharCode(...bytes.subarray(record, record + 4));
    tables.set(tag, { offset: view.getUint32(record + 8), length: view.getUint32(record + 12) });
  }
  const table = (tag: string) => {
    const found = tables.get(tag);
    if (!found) throw new Error(`font ${tag}`);
    return found.offset;
  };
  const head = table("head");
  const longLoca = view.getInt16(head + 50) === 1;
  const metrics = view.getUint16(table("hhea") + 34);
  const hmtx = table("hmtx");
  const loca = table("loca");
  const glyf = table("glyf");
  const locaAt = (gid: number) => (longLoca ? view.getUint32(loca + gid * 4) : view.getUint16(loca + gid * 2) * 2);

  const cmap = table("cmap");
  let format4 = -1;
  let format12 = -1;
  for (let at = 0; at < view.getUint16(cmap + 2); at += 1) {
    const record = cmap + 4 + at * 8;
    const platform = view.getUint16(record);
    const encoding = view.getUint16(record + 2);
    const sub = cmap + view.getUint32(record + 4);
    const format = view.getUint16(sub);
    if (format === 12 && (platform === 0 || (platform === 3 && encoding === 10))) format12 = sub;
    if (format === 4 && (platform === 0 || (platform === 3 && encoding === 1))) format4 = sub;
  }
  const glyph = (codePoint: number): number => {
    if (format12 >= 0) {
      let low = 0;
      let high = view.getUint32(format12 + 12) - 1;
      while (low <= high) {
        const mid = (low + high) >> 1;
        const group = format12 + 16 + mid * 12;
        const start = view.getUint32(group);
        if (codePoint < start) high = mid - 1;
        else if (codePoint > view.getUint32(group + 4)) low = mid + 1;
        else return view.getUint32(group + 8) + codePoint - start;
      }
      return 0;
    }
    if (format4 < 0 || codePoint > 0xffff) return 0;
    const segments = view.getUint16(format4 + 6) / 2;
    const ends = format4 + 14;
    const starts = ends + segments * 2 + 2;
    const deltas = starts + segments * 2;
    const ranges = deltas + segments * 2;
    for (let at = 0; at < segments; at += 1) {
      if (codePoint > view.getUint16(ends + at * 2)) continue;
      const start = view.getUint16(starts + at * 2);
      if (codePoint < start) return 0;
      const delta = view.getInt16(deltas + at * 2);
      const range = view.getUint16(ranges + at * 2);
      if (range === 0) return (codePoint + delta) & 0xffff;
      const gid = view.getUint16(ranges + at * 2 + range + (codePoint - start) * 2);
      return gid === 0 ? 0 : (gid + delta) & 0xffff;
    }
    return 0;
  };
  return {
    bytes,
    view,
    tables,
    unitsPerEm: view.getUint16(head + 18),
    numGlyphs: view.getUint16(table("maxp") + 4),
    glyph,
    advance: (gid) => view.getUint16(hmtx + Math.min(gid, metrics - 1) * 4),
    glyphRange: (gid) => [glyf + locaAt(gid), glyf + locaAt(gid + 1)],
  };
}

/** The font with only the used glyphs left in glyf. Glyph ids do not change, so the PDF can address them directly. */
export function subsetTrueType(font: TrueType, used: ReadonlySet<number>): Uint8Array {
  const { bytes, view } = font;
  const keep = new Set([0, ...used]);
  const queue = [...keep];
  while (queue.length > 0) {
    const [start, end] = font.glyphRange(queue.pop() ?? 0);
    if (end - start < 10 || view.getInt16(start) >= 0) continue;
    let at = start + 10;
    for (;;) {
      const flags = view.getUint16(at);
      const component = view.getUint16(at + 2);
      if (!keep.has(component)) {
        keep.add(component);
        queue.push(component);
      }
      at += 4 + (flags & 0x1 ? 4 : 2) + (flags & 0x8 ? 2 : flags & 0x40 ? 4 : flags & 0x80 ? 8 : 0);
      if (!(flags & 0x20)) break;
    }
  }
  const pieces: Uint8Array[] = [];
  const loca = new Uint8Array((font.numGlyphs + 1) * 4);
  const locaView = new DataView(loca.buffer);
  let size = 0;
  for (let gid = 0; gid < font.numGlyphs; gid += 1) {
    locaView.setUint32(gid * 4, size);
    if (!keep.has(gid)) continue;
    const [start, end] = font.glyphRange(gid);
    const piece = new Uint8Array((end - start + 3) & ~3);
    piece.set(bytes.subarray(start, end));
    pieces.push(piece);
    size += piece.length;
  }
  locaView.setUint32(font.numGlyphs * 4, size);
  const original = (tag: string) => {
    const found = font.tables.get(tag);
    return found ? bytes.slice(found.offset, found.offset + found.length) : null;
  };
  const head = original("head");
  if (!head) throw new Error("font head");
  const headView = new DataView(head.buffer);
  headView.setUint32(8, 0);
  headView.setInt16(50, 1);
  const tables = new Map<string, Uint8Array>([
    ["head", head],
    ["loca", loca],
    ["glyf", concat(pieces)],
  ]);
  for (const tag of ["cmap", "cvt ", "fpgm", "hhea", "hmtx", "maxp", "name", "OS/2", "prep"]) {
    const data = original(tag);
    if (data) tables.set(tag, data);
  }
  // Browsers reject a web font without post. Version 3 keeps the metrics and drops the glyph names.
  const post = original("post");
  if (post && post.length >= 32) {
    const short = post.slice(0, 32);
    new DataView(short.buffer).setUint32(0, 0x00030000);
    tables.set("post", short);
  }
  const tags = [...tables.keys()].sort();
  let power = 1;
  while (power * 2 <= tags.length) power *= 2;
  const header = new Uint8Array(12 + tags.length * 16);
  const headerView = new DataView(header.buffer);
  headerView.setUint32(0, 0x00010000);
  headerView.setUint16(4, tags.length);
  headerView.setUint16(6, power * 16);
  headerView.setUint16(8, Math.log2(power));
  headerView.setUint16(10, tags.length * 16 - power * 16);
  const body: Uint8Array[] = [];
  let offset = header.length;
  tags.forEach((tag, at) => {
    const data = tables.get(tag) ?? new Uint8Array();
    const padded = new Uint8Array((data.length + 3) & ~3);
    padded.set(data);
    const padView = new DataView(padded.buffer);
    let sum = 0;
    for (let index = 0; index < padded.length; index += 4) sum = (sum + padView.getUint32(index)) >>> 0;
    const record = 12 + at * 16;
    for (let index = 0; index < 4; index += 1) header[record + index] = tag.charCodeAt(index);
    headerView.setUint32(record + 4, sum);
    headerView.setUint32(record + 8, offset);
    headerView.setUint32(record + 12, data.length);
    body.push(padded);
    offset += padded.length;
  });
  return concat([header, ...body]);
}

export function concat(parts: readonly Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}
