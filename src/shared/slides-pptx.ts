/** A PowerPoint file whose layers stay editable: text boxes, shapes, lines, and pictures. Keynote opens it as is. */

/** hex is RRGGBB. alpha is 0–1. */
export type SceneColor = { hex: string; alpha: number };
/** angle follows the studio: degrees clockwise from the +x axis. */
export type SceneFill =
  | { kind: "solid"; color: SceneColor }
  | { kind: "gradient"; angle: number; from: SceneColor; to: SceneColor };
export type ScenePathCmd =
  | { op: "M" | "L"; x: number; y: number }
  | { op: "Q"; cx: number; cy: number; x: number; y: number }
  | { op: "C"; c1x: number; c1y: number; c2x: number; c2y: number; x: number; y: number }
  | { op: "Z" };
export type SceneGeometry = { type: "rect"; radius: number } | { type: "ellipse" } | { type: "path"; commands: ScenePathCmd[] };
/** Card pixels. Items are bottom to top. */
export type SceneItem =
  | {
      kind: "text";
      name: string;
      x: number;
      y: number;
      w: number;
      h: number;
      lines: string[];
      size: number;
      lineHeight: number;
      /** Distance from a line's top to its alphabetic baseline. */
      baseline: number;
      /** Per line: the x of each code point from item.x, alignment included, then the line's end. */
      xs: number[][];
      font: string;
      weight: number;
      bold: boolean;
      italic: boolean;
      underline: boolean;
      align: "left" | "center" | "right";
      color: SceneColor;
    }
  | {
      kind: "shape";
      name: string;
      x: number;
      y: number;
      w: number;
      h: number;
      geometry: SceneGeometry;
      fill: SceneFill | null;
      stroke: { width: number; color: SceneColor } | null;
    }
  | {
      kind: "line";
      name: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      width: number;
      color: SceneColor;
      round: boolean;
      start: boolean;
      end: boolean;
      /** The stroked part, shortened under the arrowheads, and the arrowhead polygons, as the canvas draws them. */
      segment: { x1: number; y1: number; x2: number; y2: number };
      heads: { x: number; y: number }[][];
    }
  | { kind: "picture"; name: string; x: number; y: number; w: number; h: number; png: Uint8Array };
/** background is the card color and background photo as JPEG. video is the background video's URL; background then holds one of its frames. */
export type SlideScene = { width: number; height: number; background: Uint8Array; video?: string; items: SceneItem[] };

const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const NS_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_REL = "http://schemas.openxmlformats.org/package/2006/relationships";
const REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const CT = "application/vnd.openxmlformats-officedocument.presentationml";
const XML_HEAD = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
const SLIDE_CX = 12192000;
const EMPTY_TREE =
  '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>';

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let at = 0; at < bytes.length; at += 1) crc = (CRC_TABLE[(crc ^ (bytes[at] ?? 0)) & 0xff] ?? 0) ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

/** Stored (uncompressed) ZIP. JPEG slides gain nothing from deflate. */
function zip(files: readonly { name: string; data: Uint8Array }[]): Uint8Array {
  const text = new TextEncoder();
  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;
  for (const file of files) {
    const name = text.encode(file.name);
    const crc = crc32(file.data);
    const size = file.data.length;
    const local = new Uint8Array(30 + name.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true);
    lv.setUint32(22, size, true);
    lv.setUint16(26, name.length, true);
    local.set(name, 30);
    const central = new Uint8Array(46 + name.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true);
    cv.setUint32(24, size, true);
    cv.setUint16(28, name.length, true);
    cv.setUint32(42, offset, true);
    central.set(name, 46);
    locals.push(local, file.data);
    centrals.push(central);
    offset += local.length + size;
  }
  const centralSize = centrals.reduce((sum, part) => sum + part.length, 0);
  const tail = new Uint8Array(22);
  const tv = new DataView(tail.buffer);
  tv.setUint32(0, 0x06054b50, true);
  tv.setUint16(8, files.length, true);
  tv.setUint16(10, files.length, true);
  tv.setUint32(12, centralSize, true);
  tv.setUint32(16, offset, true);
  const parts = [...locals, ...centrals, tail];
  const out = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let at = 0;
  for (const part of parts) {
    out.set(part, at);
    at += part.length;
  }
  return out;
}

function rels(items: readonly { id: string; type: string; target: string }[]): string {
  return `${XML_HEAD}<Relationships xmlns="${NS_REL}">${items
    .map((item) => `<Relationship Id="${item.id}" Type="${item.type}" Target="${item.target}"/>`)
    .join("")}</Relationships>`;
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => (char === "&" ? "&amp;" : char === "<" ? "&lt;" : char === ">" ? "&gt;" : "&quot;"));
}

const THEME = `${XML_HEAD}<a:theme xmlns:a="${NS_A}" name="AX"><a:themeElements>
<a:clrScheme name="AX"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme>
<a:fontScheme name="AX"><a:majorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>
<a:fmtScheme name="AX"><a:fillStyleLst>${'<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'.repeat(3)}</a:fillStyleLst><a:lnStyleLst>${[6350, 12700, 19050]
  .map((w) => `<a:ln w="${w}"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln>`)
  .join("")}</a:lnStyleLst><a:effectStyleLst>${"<a:effectStyle><a:effectLst/></a:effectStyle>".repeat(3)}</a:effectStyleLst><a:bgFillStyleLst>${'<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'.repeat(3)}</a:bgFillStyleLst></a:fmtScheme>
</a:themeElements></a:theme>`;

export function slidesPptx(slides: readonly SlideScene[], title: string): Uint8Array {
  if (slides.length === 0) throw new Error("slides");
  const first = slides[0];
  const cy = first ? Math.round((SLIDE_CX * first.height) / first.width) : 6858000;
  const text = new TextEncoder();
  const files: { name: string; data: Uint8Array }[] = [];
  const add = (name: string, body: string) => files.push({ name, data: text.encode(body) });
  const ns = `xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}"`;

  add(
    "[Content_Types].xml",
    `${XML_HEAD}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="png" ContentType="image/png"/><Override PartName="/ppt/presentation.xml" ContentType="${CT}.presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="${CT}.slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="${CT}.slideLayout+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><Override PartName="/ppt/presProps.xml" ContentType="${CT}.presProps+xml"/><Override PartName="/ppt/viewProps.xml" ContentType="${CT}.viewProps+xml"/><Override PartName="/ppt/tableStyles.xml" ContentType="${CT}.tableStyles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>${slides
      .map((_, at) => `<Override PartName="/ppt/slides/slide${at + 1}.xml" ContentType="${CT}.slide+xml"/>`)
      .join("")}</Types>`,
  );
  add(
    "_rels/.rels",
    rels([
      { id: "rId1", type: `${REL}/officeDocument`, target: "ppt/presentation.xml" },
      { id: "rId2", type: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", target: "docProps/core.xml" },
      { id: "rId3", type: `${REL}/extended-properties`, target: "docProps/app.xml" },
    ]),
  );
  add(
    "docProps/core.xml",
    `${XML_HEAD}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>${escapeXml(title)}</dc:title></cp:coreProperties>`,
  );
  add(
    "docProps/app.xml",
    `${XML_HEAD}<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>AX Design Studio</Application><Slides>${slides.length}</Slides></Properties>`,
  );
  const slideRel = (at: number) => `rId${at + 2}`;
  const tail = slides.length + 2;
  add(
    "ppt/presentation.xml",
    `${XML_HEAD}<p:presentation ${ns}><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>${slides
      .map((_, at) => `<p:sldId id="${256 + at}" r:id="${slideRel(at)}"/>`)
      .join("")}</p:sldIdLst><p:sldSz cx="${SLIDE_CX}" cy="${cy}"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`,
  );
  add(
    "ppt/_rels/presentation.xml.rels",
    rels([
      { id: "rId1", type: `${REL}/slideMaster`, target: "slideMasters/slideMaster1.xml" },
      ...slides.map((_, at) => ({ id: slideRel(at), type: `${REL}/slide`, target: `slides/slide${at + 1}.xml` })),
      { id: `rId${tail}`, type: `${REL}/presProps`, target: "presProps.xml" },
      { id: `rId${tail + 1}`, type: `${REL}/viewProps`, target: "viewProps.xml" },
      { id: `rId${tail + 2}`, type: `${REL}/theme`, target: "theme/theme1.xml" },
      { id: `rId${tail + 3}`, type: `${REL}/tableStyles`, target: "tableStyles.xml" },
    ]),
  );
  add("ppt/presProps.xml", `${XML_HEAD}<p:presentationPr ${ns}/>`);
  add("ppt/viewProps.xml", `${XML_HEAD}<p:viewPr ${ns}/>`);
  add("ppt/tableStyles.xml", `${XML_HEAD}<a:tblStyleLst xmlns:a="${NS_A}" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>`);
  add("ppt/theme/theme1.xml", THEME);
  add(
    "ppt/slideMasters/slideMaster1.xml",
    `${XML_HEAD}<p:sldMaster ${ns}><p:cSld><p:spTree>${EMPTY_TREE}</p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>`,
  );
  add(
    "ppt/slideMasters/_rels/slideMaster1.xml.rels",
    rels([
      { id: "rId1", type: `${REL}/slideLayout`, target: "../slideLayouts/slideLayout1.xml" },
      { id: "rId2", type: `${REL}/theme`, target: "../theme/theme1.xml" },
    ]),
  );
  add(
    "ppt/slideLayouts/slideLayout1.xml",
    `${XML_HEAD}<p:sldLayout ${ns} type="blank" preserve="1"><p:cSld name="Blank"><p:spTree>${EMPTY_TREE}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`,
  );
  add(
    "ppt/slideLayouts/_rels/slideLayout1.xml.rels",
    rels([{ id: "rId1", type: `${REL}/slideMaster`, target: "../slideMasters/slideMaster1.xml" }]),
  );
  slides.forEach((scene, at) => {
    const n = at + 1;
    const media: { id: string; target: string }[] = [{ id: "rId2", target: `../media/slide${n}-bg.jpeg` }];
    files.push({ name: `ppt/media/slide${n}-bg.jpeg`, data: scene.background });
    const picture = (png: Uint8Array): string => {
      const id = `rId${media.length + 2}`;
      const file = `slide${n}-${media.length}.png`;
      media.push({ id, target: `../media/${file}` });
      files.push({ name: `ppt/media/${file}`, data: png });
      return id;
    };
    const shapes = scene.items.map((item, index) => itemXml(item, index + 2, SLIDE_CX / scene.width, picture)).join("");
    const bg = `<p:bg><p:bgPr><a:blipFill dpi="0" rotWithShape="1"><a:blip r:embed="rId2"/><a:srcRect/><a:stretch><a:fillRect/></a:stretch></a:blipFill><a:effectLst/></p:bgPr></p:bg>`;
    add(
      `ppt/slides/slide${n}.xml`,
      `${XML_HEAD}<p:sld ${ns}><p:cSld>${bg}<p:spTree>${EMPTY_TREE}${shapes}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`,
    );
    add(
      `ppt/slides/_rels/slide${n}.xml.rels`,
      rels([
        { id: "rId1", type: `${REL}/slideLayout`, target: "../slideLayouts/slideLayout1.xml" },
        ...media.map((item) => ({ id: item.id, type: `${REL}/image`, target: item.target })),
      ]),
    );
  });
  return zip(files);
}

function colorXml(color: SceneColor): string {
  const alpha = Math.round(Math.min(1, Math.max(0, color.alpha)) * 100000);
  return `<a:srgbClr val="${color.hex}">${alpha < 100000 ? `<a:alpha val="${alpha}"/>` : ""}</a:srgbClr>`;
}

function fillXml(fill: SceneFill | null): string {
  if (!fill) return "<a:noFill/>";
  if (fill.kind === "solid") return `<a:solidFill>${colorXml(fill.color)}</a:solidFill>`;
  const angle = Math.round((((fill.angle % 360) + 360) % 360) * 60000);
  return `<a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0">${colorXml(fill.from)}</a:gs><a:gs pos="100000">${colorXml(fill.to)}</a:gs></a:gsLst><a:lin ang="${angle}" scaled="0"/></a:gradFill>`;
}

/** scale is EMU per card pixel. picture() stores a PNG and returns its relationship id. */
function itemXml(item: SceneItem, id: number, scale: number, picture: (png: Uint8Array) => string): string {
  const e = (value: number) => Math.round(value * scale);
  const pt100 = (px: number) => Math.max(100, Math.round(((px * scale) / 12700) * 100));
  const name = escapeXml(item.name);
  if (item.kind === "picture") {
    const rel = picture(item.png);
    return `<p:pic><p:nvPicPr><p:cNvPr id="${id}" name="${name}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="${rel}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm><a:off x="${e(item.x)}" y="${e(item.y)}"/><a:ext cx="${Math.max(1, e(item.w))}" cy="${Math.max(1, e(item.h))}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>`;
  }
  if (item.kind === "line") {
    const flip = `${item.x2 < item.x1 ? ' flipH="1"' : ""}${item.y2 < item.y1 ? ' flipV="1"' : ""}`;
    const x = Math.min(item.x1, item.x2);
    const y = Math.min(item.y1, item.y2);
    const head = item.start ? '<a:headEnd type="triangle" w="med" len="med"/>' : "";
    const tail = item.end ? '<a:tailEnd type="triangle" w="med" len="med"/>' : "";
    return `<p:cxnSp><p:nvCxnSpPr><p:cNvPr id="${id}" name="${name}"/><p:cNvCxnSpPr/><p:nvPr/></p:nvCxnSpPr><p:spPr><a:xfrm${flip}><a:off x="${e(x)}" y="${e(y)}"/><a:ext cx="${e(Math.abs(item.x2 - item.x1))}" cy="${e(Math.abs(item.y2 - item.y1))}"/></a:xfrm><a:prstGeom prst="line"><a:avLst/></a:prstGeom><a:ln w="${e(item.width)}" cap="${item.round ? "rnd" : "flat"}"><a:solidFill>${colorXml(item.color)}</a:solidFill><a:round/>${head}${tail}</a:ln></p:spPr></p:cxnSp>`;
  }
  if (item.kind === "text") {
    const run = (line: string) =>
      `<a:rPr lang="ko-KR" sz="${pt100(item.size)}"${item.bold ? ' b="1"' : ""}${item.italic ? ' i="1"' : ""}${item.underline ? ' u="sng"' : ""} dirty="0"><a:solidFill>${colorXml(item.color)}</a:solidFill><a:latin typeface="${escapeXml(item.font)}"/><a:ea typeface="${escapeXml(item.font)}"/><a:cs typeface="${escapeXml(item.font)}"/></a:rPr><a:t>${escapeXml(line)}</a:t>`;
    const align = item.align === "center" ? "ctr" : item.align === "right" ? "r" : "l";
    const paragraphs = item.lines
      .map((line) => {
        const head = `<a:pPr algn="${align}"><a:lnSpc><a:spcPts val="${pt100(item.lineHeight)}"/></a:lnSpc></a:pPr>`;
        return line
          ? `<a:p>${head}<a:r>${run(line)}</a:r></a:p>`
          : `<a:p>${head}<a:endParaRPr lang="ko-KR" sz="${pt100(item.size)}" dirty="0"/></a:p>`;
      })
      .join("");
    return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="${name}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${e(item.x)}" y="${e(item.y)}"/><a:ext cx="${Math.max(1, e(item.w))}" cy="${Math.max(1, e(item.h))}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr><p:txBody><a:bodyPr wrap="none" lIns="0" tIns="0" rIns="0" bIns="0" anchor="t"><a:noAutofit/></a:bodyPr><a:lstStyle/>${paragraphs}</p:txBody></p:sp>`;
  }
  const stroke = item.stroke
    ? `<a:ln w="${e(item.stroke.width)}"><a:solidFill>${colorXml(item.stroke.color)}</a:solidFill><a:round/></a:ln>`
    : "<a:ln><a:noFill/></a:ln>";
  let x = item.x;
  let y = item.y;
  let w = item.w;
  let h = item.h;
  let geometry: string;
  if (item.geometry.type === "ellipse") geometry = '<a:prstGeom prst="ellipse"><a:avLst/></a:prstGeom>';
  else if (item.geometry.type === "rect") {
    const radius = Math.min(item.geometry.radius, w / 2, h / 2);
    geometry = radius > 0
      ? `<a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val ${Math.round((radius / Math.max(1, Math.min(w, h))) * 100000)}"/></a:avLst></a:prstGeom>`
      : '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>';
  } else {
    const commands = item.geometry.commands;
    const xs: number[] = [];
    const ys: number[] = [];
    for (const cmd of commands) {
      if (cmd.op === "Z") continue;
      xs.push(cmd.x);
      ys.push(cmd.y);
      if (cmd.op === "Q") {
        xs.push(cmd.cx);
        ys.push(cmd.cy);
      } else if (cmd.op === "C") {
        xs.push(cmd.c1x, cmd.c2x);
        ys.push(cmd.c1y, cmd.c2y);
      }
    }
    x = Math.min(...xs);
    y = Math.min(...ys);
    w = Math.max(1, Math.max(...xs) - x);
    h = Math.max(1, Math.max(...ys) - y);
    const pt = (px: number, py: number) => `<a:pt x="${e(px - x)}" y="${e(py - y)}"/>`;
    const body = commands
      .map((cmd) => {
        if (cmd.op === "M") return `<a:moveTo>${pt(cmd.x, cmd.y)}</a:moveTo>`;
        if (cmd.op === "L") return `<a:lnTo>${pt(cmd.x, cmd.y)}</a:lnTo>`;
        if (cmd.op === "Q") return `<a:quadBezTo>${pt(cmd.cx, cmd.cy)}${pt(cmd.x, cmd.y)}</a:quadBezTo>`;
        if (cmd.op === "C") return `<a:cubicBezTo>${pt(cmd.c1x, cmd.c1y)}${pt(cmd.c2x, cmd.c2y)}${pt(cmd.x, cmd.y)}</a:cubicBezTo>`;
        return "<a:close/>";
      })
      .join("");
    geometry = `<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="0" t="0" r="r" b="b"/><a:pathLst><a:path w="${e(w)}" h="${e(h)}"${item.fill ? "" : ' fill="none"'}>${body}</a:path></a:pathLst></a:custGeom>`;
  }
  return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="${name}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${e(x)}" y="${e(y)}"/><a:ext cx="${Math.max(1, e(w))}" cy="${Math.max(1, e(h))}"/></a:xfrm>${geometry}${fillXml(item.fill)}${stroke}</p:spPr><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="ko-KR" dirty="0"/></a:p></p:txBody></p:sp>`;
}
