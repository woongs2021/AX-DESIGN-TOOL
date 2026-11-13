/**
 * A PDF whose text, shapes, and lines stay vector. Text uses embedded subsets of the studio fonts, so it can be selected and searched.
 * Pictures (images and effect layers) keep their transparency.
 */

import { concat, faceCovers, loadFace, subsetTrueType, type TrueType } from "./font-files.ts";
import type { SceneColor, SceneFill, SceneItem, SlideScene } from "./slides-pptx.ts";

const PAGE_WIDTH = 960;
/** Chrome's synthetic oblique, used when a font has no italic face. */
const FAKE_ITALIC = 0.25;
const KAPPA = 0.5522847498;

async function deflate(bytes: Uint8Array): Promise<Uint8Array> {
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  const stream = new Blob([copy]).stream().pipeThrough(new CompressionStream("deflate"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** The picture's color as JPEG and its alpha as raw gray bytes. */
async function splitPng(png: Uint8Array): Promise<{ width: number; height: number; jpeg: Uint8Array; alpha: Uint8Array }> {
  const copy = new ArrayBuffer(png.byteLength);
  new Uint8Array(copy).set(png);
  const bitmap = await createImageBitmap(new Blob([copy], { type: "image/png" }));
  const { width, height } = bitmap;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const pixels = ctx.getImageData(0, 0, width, height);
  const alpha = new Uint8Array(width * height);
  for (let at = 0; at < alpha.length; at += 1) {
    alpha[at] = pixels.data[at * 4 + 3] ?? 0;
    pixels.data[at * 4 + 3] = 255;
  }
  ctx.putImageData(pixels, 0, 0);
  const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.92 });
  return { width, height, jpeg: new Uint8Array(await blob.arrayBuffer()), alpha };
}

const num = (value: number) => String(Math.round(value * 1000) / 1000);
const rgb = (color: SceneColor) => {
  const value = Number.parseInt(color.hex, 16);
  return `${num(((value >> 16) & 255) / 255)} ${num(((value >> 8) & 255) / 255)} ${num((value & 255) / 255)}`;
};
const hex4 = (value: number) => value.toString(16).padStart(4, "0").toUpperCase();
const utf16 = (text: string) => Array.from({ length: text.length }, (_, at) => hex4(text.charCodeAt(at))).join("");

type Face = { name: string; label: string; italic: boolean; font: TrueType; used: Set<number>; unicode: Map<number, string> };

function shapePath(item: Extract<SceneItem, { kind: "shape" }>): string {
  const { x, y, w, h, geometry } = item;
  const p = (px: number, py: number) => `${num(px)} ${num(py)}`;
  if (geometry.type === "ellipse") {
    const rx = w / 2;
    const ry = h / 2;
    const cx = x + rx;
    const cy = y + ry;
    const ox = rx * KAPPA;
    const oy = ry * KAPPA;
    return [
      `${p(cx + rx, cy)} m`,
      `${p(cx + rx, cy + oy)} ${p(cx + ox, cy + ry)} ${p(cx, cy + ry)} c`,
      `${p(cx - ox, cy + ry)} ${p(cx - rx, cy + oy)} ${p(cx - rx, cy)} c`,
      `${p(cx - rx, cy - oy)} ${p(cx - ox, cy - ry)} ${p(cx, cy - ry)} c`,
      `${p(cx + ox, cy - ry)} ${p(cx + rx, cy - oy)} ${p(cx + rx, cy)} c h`,
    ].join(" ");
  }
  if (geometry.type === "rect") {
    const r = Math.max(0, Math.min(geometry.radius, w / 2, h / 2));
    if (r === 0) return `${p(x, y)} ${num(w)} ${num(h)} re`;
    const k = r * (1 - KAPPA);
    return [
      `${p(x + r, y)} m ${p(x + w - r, y)} l`,
      `${p(x + w - k, y)} ${p(x + w, y + k)} ${p(x + w, y + r)} c ${p(x + w, y + h - r)} l`,
      `${p(x + w, y + h - k)} ${p(x + w - k, y + h)} ${p(x + w - r, y + h)} c ${p(x + r, y + h)} l`,
      `${p(x + k, y + h)} ${p(x, y + h - k)} ${p(x, y + h - r)} c ${p(x, y + r)} l`,
      `${p(x, y + k)} ${p(x + k, y)} ${p(x + r, y)} c h`,
    ].join(" ");
  }
  const out: string[] = [];
  let cx = 0;
  let cy = 0;
  for (const cmd of geometry.commands) {
    if (cmd.op === "Z") {
      out.push("h");
      continue;
    }
    if (cmd.op === "M") out.push(`${p(cmd.x, cmd.y)} m`);
    else if (cmd.op === "L") out.push(`${p(cmd.x, cmd.y)} l`);
    else if (cmd.op === "C") out.push(`${p(cmd.c1x, cmd.c1y)} ${p(cmd.c2x, cmd.c2y)} ${p(cmd.x, cmd.y)} c`);
    else if (cmd.op === "Q") {
      const c1 = `${p(cx + ((cmd.cx - cx) * 2) / 3, cy + ((cmd.cy - cy) * 2) / 3)}`;
      const c2 = `${p(cmd.x + ((cmd.cx - cmd.x) * 2) / 3, cmd.y + ((cmd.cy - cmd.y) * 2) / 3)}`;
      out.push(`${c1} ${c2} ${p(cmd.x, cmd.y)} c`);
    }
    cx = cmd.x;
    cy = cmd.y;
  }
  return out.join(" ");
}

/** One page per scene, 960pt wide. Fonts are fetched once per weight and kept for later exports. */
export async function scenesPdf(scenes: readonly SlideScene[]): Promise<Uint8Array> {
  if (scenes.length === 0) throw new Error("slides");
  const encoder = new TextEncoder();
  const objects: Uint8Array[][] = [];
  const reserve = () => objects.push([]);
  const put = (id: number, ...parts: (string | Uint8Array)[]) => {
    objects[id - 1] = parts.map((part) => (typeof part === "string" ? encoder.encode(part) : part));
  };
  const object = (body: string) => {
    const id = reserve();
    put(id, body);
    return id;
  };
  const stream = (dict: string, data: Uint8Array) => {
    const id = reserve();
    put(id, `<< ${dict} /Length ${data.length} >>\nstream\n`, data, "\nendstream");
    return id;
  };
  const catalog = reserve();
  const pagesId = reserve();
  const resourcesId = reserve();
  put(catalog, `<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  const fonts: string[] = [];
  const states: string[] = [];
  const xobjects: string[] = [];
  const shadings: string[] = [];
  const faces = new Map<string, Face>();
  const face = async (family: string, weight: number, italic: boolean): Promise<Face> => {
    const loaded = await loadFace(family, weight, italic);
    let found = faces.get(loaded.label);
    if (!found) {
      found = { name: `F${faces.size + 1}`, label: loaded.label, italic: loaded.italic, font: loaded.font, used: new Set(), unicode: new Map() };
      faces.set(loaded.label, found);
    }
    return found;
  };
  const alphas = new Map<string, string>();
  const alpha = (fill: number, stroke: number): string => {
    const key = `${num(fill)} ${num(stroke)}`;
    let name = alphas.get(key);
    if (!name) {
      name = `A${alphas.size + 1}`;
      alphas.set(key, name);
      states.push(`/${name} << /Type /ExtGState /ca ${num(fill)} /CA ${num(stroke)} >>`);
    }
    return `/${name} gs`;
  };
  const xobject = (id: number) => {
    const name = `Im${xobjects.length + 1}`;
    xobjects.push(`/${name} ${id} 0 R`);
    return name;
  };
  const picture = async (png: Uint8Array): Promise<number> => {
    const { width, height, jpeg, alpha } = await splitPng(png);
    const base = `/Type /XObject /Subtype /Image /Width ${width} /Height ${height} /BitsPerComponent 8`;
    const soft = stream(`${base} /ColorSpace /DeviceGray /Filter /FlateDecode`, await deflate(alpha));
    return stream(`${base} /ColorSpace /DeviceRGB /Filter /DCTDecode /SMask ${soft} 0 R`, jpeg);
  };

  const pageIds: number[] = [];
  for (const scene of scenes) {
    const pageHeight = Math.round(PAGE_WIDTH * (scene.height / scene.width) * 100) / 100;
    const scale = PAGE_WIDTH / scene.width;
    const ops: string[] = [`${num(scale)} 0 0 ${num(-scale)} 0 ${num(pageHeight)} cm`];
    const place = (name: string, x: number, y: number, w: number, h: number) =>
      ops.push(`q ${num(w)} 0 0 ${num(-h)} ${num(x)} ${num(y + h)} cm /${name} Do Q`);
    const background = stream(
      `/Type /XObject /Subtype /Image /Width ${scene.width} /Height ${scene.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode`,
      scene.background,
    );
    place(xobject(background), 0, 0, scene.width, scene.height);

    const fill = (path: string, paint: SceneFill, box: { x: number; y: number; w: number; h: number }) => {
      if (paint.kind === "solid") {
        ops.push(`q ${alpha(paint.color.alpha, 1)} ${rgb(paint.color)} rg ${path} f Q`);
        return;
      }
      const rad = (paint.angle * Math.PI) / 180;
      const dx = Math.cos(rad);
      const dy = Math.sin(rad);
      const half = (Math.abs(dx) * box.w + Math.abs(dy) * box.h) / 2;
      const cx = box.x + box.w / 2;
      const cy = box.y + box.h / 2;
      const coords = `[${num(cx - dx * half)} ${num(cy - dy * half)} ${num(cx + dx * half)} ${num(cy + dy * half)}]`;
      const axial = (space: string, from: string, to: string) =>
        object(
          `<< /ShadingType 2 /ColorSpace /${space} /Coords ${coords} /Extend [true true] /Function << /FunctionType 2 /Domain [0 1] /C0 [${from}] /C1 [${to}] /N 1 >> >>`,
        );
      const name = `Sh${shadings.length + 1}`;
      shadings.push(`/${name} ${axial("DeviceRGB", rgb(paint.from), rgb(paint.to))} 0 R`);
      let state = "";
      if (paint.from.alpha < 1 || paint.to.alpha < 1) {
        const ramp = axial("DeviceGray", num(paint.from.alpha), num(paint.to.alpha));
        const group = stream(
          `/Type /XObject /Subtype /Form /BBox [0 0 ${scene.width} ${scene.height}] /Group << /S /Transparency /CS /DeviceGray >> /Resources << /Shading << /S ${ramp} 0 R >> >>`,
          encoder.encode("/S sh"),
        );
        const mask = `M${states.length + 1}`;
        states.push(`/${mask} << /Type /ExtGState /SMask << /Type /Mask /S /Luminosity /G ${group} 0 R >> >>`);
        state = `/${mask} gs `;
      }
      ops.push(`q ${state}${path} W n /${name} sh Q`);
    };

    for (const item of scene.items) {
      if (item.kind === "picture") {
        place(xobject(await picture(item.png)), item.x, item.y, item.w, item.h);
      } else if (item.kind === "line") {
        const { segment, color } = item;
        ops.push(
          `q ${alpha(color.alpha, color.alpha)} ${rgb(color)} RG ${rgb(color)} rg ${num(item.width)} w ${item.round ? 1 : 0} J`,
          `${num(segment.x1)} ${num(segment.y1)} m ${num(segment.x2)} ${num(segment.y2)} l S`,
          ...item.heads.map((head) => `${head.map((point, at) => `${num(point.x)} ${num(point.y)} ${at === 0 ? "m" : "l"}`).join(" ")} h f`),
          "Q",
        );
      } else if (item.kind === "shape") {
        const path = shapePath(item);
        if (item.fill) fill(path, item.fill, item);
        if (item.stroke) {
          const { color, width } = item.stroke;
          ops.push(`q ${alpha(1, color.alpha)} ${rgb(color)} RG ${num(width)} w 1 j 1 J ${path} S Q`);
        }
      } else {
        const primary = await face(item.font, item.weight, item.italic);
        const fallback = await face("Pretendard", item.weight, item.italic);
        const covers = (codePoint: number) => faceCovers(primary.font, codePoint);
        ops.push(`q ${alpha(item.color.alpha, item.color.alpha)} ${rgb(item.color)} rg BT`);
        item.lines.forEach((line, row) => {
          const xs = item.xs[row] ?? [];
          const baseline = item.y + row * item.lineHeight + item.baseline;
          const points = Array.from(line);
          let at = 0;
          while (at < points.length) {
            const runPrimary = covers(points[at]?.codePointAt(0) ?? 32);
            const run = runPrimary ? primary : fallback;
            const start = at;
            const parts: string[] = [];
            while (at < points.length) {
              const point = points[at] ?? " ";
              const codePoint = point.codePointAt(0) ?? 32;
              if (covers(codePoint) !== runPrimary) break;
              const gid = run.font.glyph(codePoint);
              run.used.add(gid);
              if (gid > 0 && !run.unicode.has(gid)) run.unicode.set(gid, point);
              const advance = (run.font.advance(gid) / run.font.unitsPerEm) * item.size;
              const wanted = (xs[at + 1] ?? 0) - (xs[at] ?? 0);
              parts.push(`<${hex4(gid)}>`, num(((advance - wanted) * 1000) / item.size));
              at += 1;
            }
            const skew = item.italic && !run.italic ? FAKE_ITALIC : 0;
            ops.push(`/${run.name} ${num(item.size)} Tf 1 0 ${num(skew)} -1 ${num(item.x + (xs[start] ?? 0))} ${num(baseline)} Tm [${parts.join(" ")}] TJ`);
          }
        });
        ops.push("ET");
        if (item.underline) {
          const thickness = Math.max(1, Math.round(item.size / 16));
          item.xs.forEach((xs, row) => {
            const left = xs[0] ?? 0;
            const right = xs[xs.length - 1] ?? left;
            ops.push(`${num(item.x + left)} ${num(item.y + row * item.lineHeight + item.size * 0.98)} ${num(right - left)} ${num(thickness)} re f`);
          });
        }
        ops.push("Q");
      }
    }
    const contents = stream("/Filter /FlateDecode", await deflate(encoder.encode(ops.join("\n"))));
    pageIds.push(
      object(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${num(pageHeight)}] /Contents ${contents} 0 R /Resources ${resourcesId} 0 R >>`),
    );
  }

  let tag = 0;
  for (const { name, label, font, used, unicode } of faces.values()) {
    const em = (value: number) => Math.round((value * 1000) / font.unitsPerEm);
    const { view } = font;
    const head = font.tables.get("head")?.offset ?? 0;
    const hhea = font.tables.get("hhea")?.offset ?? 0;
    const os2 = font.tables.get("OS/2");
    const ascent = view.getInt16(hhea + 4);
    const descent = view.getInt16(hhea + 6);
    const capHeight = os2 && os2.length >= 90 && view.getUint16(os2.offset) >= 2 ? view.getInt16(os2.offset + 88) : ascent;
    const bbox = [36, 38, 40, 42].map((at) => em(view.getInt16(head + at))).join(" ");
    const postName = `${String.fromCharCode(65 + Math.floor(tag / 26) % 26, 65 + (tag % 26))}AAAA+${label.replace(/[^A-Za-z0-9-]/g, "")}`;
    tag += 1;
    const subset = subsetTrueType(font, used);
    const fileId = stream(`/Filter /FlateDecode /Length1 ${subset.length}`, await deflate(subset));
    const descriptor = object(
      `<< /Type /FontDescriptor /FontName /${postName} /Flags 32 /FontBBox [${bbox}] /ItalicAngle 0 /Ascent ${em(ascent)} /Descent ${em(descent)} /CapHeight ${em(capHeight)} /StemV 80 /FontFile2 ${fileId} 0 R >>`,
    );
    const gids = [...used].sort((a, b) => a - b);
    const widths = gids.map((gid) => `${gid} [${em(font.advance(gid))}]`).join(" ");
    const cid = object(
      `<< /Type /Font /Subtype /CIDFontType2 /BaseFont /${postName} /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor ${descriptor} 0 R /DW 0 /W [${widths}] /CIDToGIDMap /Identity >>`,
    );
    const mapped = [...unicode.entries()].sort((a, b) => a[0] - b[0]);
    const blocks: string[] = [];
    for (let at = 0; at < mapped.length; at += 100) {
      const block = mapped.slice(at, at + 100);
      blocks.push(`${block.length} beginbfchar\n${block.map(([gid, text]) => `<${hex4(gid)}> <${utf16(text)}>`).join("\n")}\nendbfchar`);
    }
    const cmap = stream(
      "/Filter /FlateDecode",
      await deflate(
        encoder.encode(
          `/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n${blocks.join("\n")}\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend`,
        ),
      ),
    );
    fonts.push(
      `/${name} ${object(`<< /Type /Font /Subtype /Type0 /BaseFont /${postName} /Encoding /Identity-H /DescendantFonts [${cid} 0 R] /ToUnicode ${cmap} 0 R >>`)} 0 R`,
    );
  }
  const group = (key: string, entries: string[]) => (entries.length > 0 ? ` /${key} << ${entries.join(" ")} >>` : "");
  put(resourcesId, `<<${group("Font", fonts)}${group("ExtGState", states)}${group("XObject", xobjects)}${group("Shading", shadings)} >>`);
  put(pagesId, `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`);

  const parts: Uint8Array[] = [encoder.encode("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n")];
  let length = parts[0]?.length ?? 0;
  const offsets: number[] = [];
  objects.forEach((body, at) => {
    offsets.push(length);
    for (const part of [encoder.encode(`${at + 1} 0 obj\n`), ...body, encoder.encode("\nendobj\n")]) {
      parts.push(part);
      length += part.length;
    }
  });
  let table = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) table += `${String(offset).padStart(10, "0")} 00000 n \n`;
  table += `trailer\n<< /Size ${objects.length + 1} /Root ${catalog} 0 R >>\nstartxref\n${length}\n%%EOF\n`;
  parts.push(encoder.encode(table));
  return concat(parts);
}
