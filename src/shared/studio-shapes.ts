/** Vector layers for the studio card: shapes, straight lines, and pen paths. */

export const SHAPE_MIN = 8;
export const SHAPE_MAX = 4000;
export const LINE_WIDTH_MIN = 1;
export const LINE_WIDTH_MAX = 80;
export const LINE_WIDTH_DEFAULT = 8;
export const SHAPE_HANDLES = ["n", "ne", "e", "se", "s", "sw", "w", "nw"] as const;
export type ShapeHandle = (typeof SHAPE_HANDLES)[number];
export const SHAPE_NAMES = ["ellipse", "rect", "triangle", "star"] as const;
export type ShapeName = (typeof SHAPE_NAMES)[number];
export const LINE_CAPS = ["butt", "round"] as const;
export type LineCapStyle = (typeof LINE_CAPS)[number];
export const SHADOW_SIZE_MAX = 80;
export const SHADOW_BLUR_MAX = 80;
export const SHADOW_DISTANCE_MAX = 160;
export const LAYER_BLUR_MAX = 80;
/** Card pixels. The pen closes, and shows the close affordance, inside this distance. */
export const PEN_CLOSE = 16;
export const SHAPE_BLENDS = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "soft-light", "difference"] as const;
export type ShapeBlend = (typeof SHAPE_BLENDS)[number];
export const BLEND_LABELS: Record<ShapeBlend, string> = {
  normal: "보통",
  multiply: "곱하기",
  screen: "스크린",
  overlay: "오버레이",
  darken: "어둡게",
  lighten: "밝게",
  "soft-light": "소프트 라이트",
  difference: "차이",
};

/** size is the spread, blur is the softness, distance is the offset down and to the right. opacity is 0–100. */
export type ShapeShadow = { size: number; blur: number; distance: number; opacity: number };
/** angle 0 runs left to right. 90 runs top to bottom. */
export type LinearGradient = { angle: number; from: string; to: string };
/** width 0 draws no stroke. opacity is 0–100. */
export type ShapeStroke = { width: number; opacity: number; color: string; gradient?: LinearGradient | null };

export type ShapeLayer = {
  id: string;
  kind: "shape";
  shape: ShapeName;
  x: number;
  y: number;
  width: number;
  height: number;
  /** Corner radius. An ellipse ignores it. */
  radius: number;
  color: string;
  shadow?: ShapeShadow;
  stroke?: ShapeStroke;
  blend?: ShapeBlend;
  /** Blur at the left edge and the right edge. The blur fades across the shape. */
  blurFrom?: number;
  blurTo?: number;
  gradient?: LinearGradient | null;
  /** Inner radius of a star, as a fraction of the outer radius. */
  inner?: number;
  /** Editable anchors. When set, the shape is drawn from these instead of its primitive. */
  nodes?: PenAnchor[] | null;
};

export type LineLayer = {
  id: string;
  kind: "line";
  x: number;
  y: number;
  x2: number;
  y2: number;
  stroke: number;
  cap: LineCapStyle;
  /** Arrow on the first endpoint (x, y). */
  start: boolean;
  /** Arrow on the second endpoint (x2, y2). */
  end: boolean;
  color: string;
};

/** A cubic handle in card pixels. Absent on a corner. */
export type PenHandle = { x: number; y: number };

export type PenAnchor = {
  x: number;
  y: number;
  in: PenHandle | null;
  out: PenHandle | null;
};

export type PenLayer = {
  id: string;
  kind: "pen";
  points: PenAnchor[];
  closed: boolean;
  /** Empty when the path is not filled. */
  fill: string;
  /** Empty when the path has no stroke. */
  stroke: string;
  strokeWidth: number;
};

export type VectorLayer = ShapeLayer | LineLayer | PenLayer;
export type ShapeBox = { x: number; y: number; width: number; height: number };
type Point = { x: number; y: number };

function roundHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

export function clampShapeSize(value: number): number {
  if (!Number.isFinite(value)) return SHAPE_MIN;
  return Math.min(SHAPE_MAX, Math.max(SHAPE_MIN, value));
}

export function clampLineWidth(value: number): number {
  if (!Number.isFinite(value)) return LINE_WIDTH_DEFAULT;
  return Math.min(LINE_WIDTH_MAX, Math.max(LINE_WIDTH_MIN, Math.round(value)));
}

export function clampUnit(value: number, max: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(max, Math.max(0, Math.round(value)));
}

const SHADOW_OPACITY = 55;

export function emptyShadow(): ShapeShadow {
  return { size: 0, blur: 0, distance: 0, opacity: SHADOW_OPACITY };
}

export function shapeShadow(layer: ShapeLayer): ShapeShadow {
  return {
    size: clampUnit(layer.shadow?.size ?? 0, SHADOW_SIZE_MAX),
    blur: clampUnit(layer.shadow?.blur ?? 0, SHADOW_BLUR_MAX),
    distance: clampUnit(layer.shadow?.distance ?? 0, SHADOW_DISTANCE_MAX),
    opacity: clampUnit(layer.shadow?.opacity ?? SHADOW_OPACITY, 100),
  };
}

export function emptyStroke(color: string): ShapeStroke {
  return { width: 0, opacity: 100, color, gradient: null };
}

export function shapeStroke(layer: ShapeLayer): ShapeStroke {
  return {
    width: clampUnit(layer.stroke?.width ?? 0, LINE_WIDTH_MAX),
    opacity: clampUnit(layer.stroke?.opacity ?? 100, 100),
    color: layer.stroke?.color || layer.color,
    gradient: layer.stroke?.gradient ?? null,
  };
}

export function shapeBlend(layer: ShapeLayer): ShapeBlend {
  return SHAPE_BLENDS.includes(layer.blend as ShapeBlend) ? (layer.blend as ShapeBlend) : "normal";
}

/** Drop the shadow down and to the right. */
export function shadowOffset(distance: number): { x: number; y: number } {
  const length = clampUnit(distance, SHADOW_DISTANCE_MAX);
  const step = Math.cos(Math.PI / 4);
  return { x: Math.round(step * length), y: Math.round(step * length) };
}

/** Drop every point after index and clear the outgoing handle, so the path leaves that point as a corner. */
export function restartPenAt(points: PenAnchor[], index: number): PenAnchor[] {
  const next = points.slice(0, index + 1).map((point) => ({
    x: point.x,
    y: point.y,
    in: point.in ? { ...point.in } : null,
    out: point.out ? { ...point.out } : null,
  }));
  const last = next[index];
  if (last) last.out = null;
  return next;
}

export function penPointIndex(points: PenAnchor[], x: number, y: number, pad = 12): number {
  for (let index = points.length - 1; index >= 0; index -= 1) {
    const point = points[index];
    if (point && Math.hypot(point.x - x, point.y - y) <= pad) return index;
  }
  return -1;
}

/** Grow or shrink both sides together. next is the new longer side. The center stays put. */
export function scaleShapeBox(box: ShapeBox, next: number): ShapeBox {
  const current = Math.max(box.width, box.height, 1);
  const target = clampShapeSize(Math.round(next));
  const factor = target / current;
  let width = clampShapeSize(box.width * factor);
  let height = clampShapeSize(box.height * factor);
  if (Math.max(width, height) !== target) {
    if (width >= height) width = target;
    else height = target;
  }
  width = roundHalf(width);
  height = roundHalf(height);
  return {
    x: roundHalf(box.x + box.width / 2 - width / 2),
    y: roundHalf(box.y + box.height / 2 - height / 2),
    width,
    height,
  };
}

/**
 * Drag one edge or corner.
 * Without shift, only the dragged edges move.
 * With shift, width and height become the same and the opposite edge stays fixed.
 */
export function resizeShape(start: ShapeBox, handle: ShapeHandle, dx: number, dy: number, shift: boolean): ShapeBox {
  let left = start.x;
  let top = start.y;
  let right = start.x + start.width;
  let bottom = start.y + start.height;
  const west = handle.includes("w");
  const east = handle.includes("e");
  const north = handle.includes("n");
  const south = handle.includes("s");
  if (west) left = Math.min(right - SHAPE_MIN, left + dx);
  if (east) right = Math.max(left + SHAPE_MIN, right + dx);
  if (north) top = Math.min(bottom - SHAPE_MIN, top + dy);
  if (south) bottom = Math.max(top + SHAPE_MIN, bottom + dy);
  if (right - left > SHAPE_MAX) {
    if (west && !east) left = right - SHAPE_MAX;
    else right = left + SHAPE_MAX;
  }
  if (bottom - top > SHAPE_MAX) {
    if (north && !south) top = bottom - SHAPE_MAX;
    else bottom = top + SHAPE_MAX;
  }
  if (shift) {
    const width = right - left;
    const height = bottom - top;
    if ((east || west) && !(north || south)) {
      const mid = start.y + start.height / 2;
      top = mid - width / 2;
      bottom = mid + width / 2;
    } else if ((north || south) && !(east || west)) {
      const mid = start.x + start.width / 2;
      left = mid - height / 2;
      right = mid + height / 2;
    } else {
      const dw = Math.abs(width - start.width);
      const dh = Math.abs(height - start.height);
      const size = Math.min(SHAPE_MAX, Math.max(SHAPE_MIN, dw >= dh ? width : height));
      if (east) right = left + size;
      else left = right - size;
      if (south) bottom = top + size;
      else top = bottom - size;
    }
  }
  const width = roundHalf(right - left);
  const height = roundHalf(bottom - top);
  return { x: roundHalf(left), y: roundHalf(top), width, height };
}

export function trianglePoints(box: ShapeBox): Point[] {
  return [
    { x: box.x + box.width / 2, y: box.y },
    { x: box.x + box.width, y: box.y + box.height },
    { x: box.x, y: box.y + box.height },
  ];
}

export const STAR_INNER = 0.38;

export function starInner(layer: ShapeLayer): number {
  const value = layer.inner ?? STAR_INNER;
  if (!Number.isFinite(value)) return STAR_INNER;
  return Math.min(0.92, Math.max(0.08, value));
}

/** Five-point star fitted to the box. Even indexes are the outer points. */
export function starPoints(box: ShapeBox, inner = STAR_INNER): Point[] {
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const rx = box.width / 2;
  const ry = box.height / 2;
  const ratio = Math.min(0.92, Math.max(0.08, inner));
  const points: Point[] = [];
  for (let index = 0; index < 10; index += 1) {
    const angle = -Math.PI / 2 + (index * Math.PI) / 5;
    const scale = index % 2 === 0 ? 1 : ratio;
    points.push({ x: cx + Math.cos(angle) * rx * scale, y: cy + Math.sin(angle) * ry * scale });
  }
  return points;
}

function rectPoints(box: ShapeBox): Point[] {
  return [
    { x: box.x, y: box.y },
    { x: box.x + box.width, y: box.y },
    { x: box.x + box.width, y: box.y + box.height },
    { x: box.x, y: box.y + box.height },
  ];
}

function ellipseNodes(box: ShapeBox): PenAnchor[] {
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const rx = box.width / 2;
  const ry = box.height / 2;
  const k = 0.5522847498;
  return [
    { x: cx + rx, y: cy, in: { x: cx + rx, y: cy - ry * k }, out: { x: cx + rx, y: cy + ry * k } },
    { x: cx, y: cy + ry, in: { x: cx + rx * k, y: cy + ry }, out: { x: cx - rx * k, y: cy + ry } },
    { x: cx - rx, y: cy, in: { x: cx - rx, y: cy + ry * k }, out: { x: cx - rx, y: cy - ry * k } },
    { x: cx, y: cy - ry, in: { x: cx - rx * k, y: cy - ry }, out: { x: cx + rx * k, y: cy - ry } },
  ];
}

/** Anchors that reconstruct a primitive shape. A star keeps its own radius points. */
export function shapeNodes(layer: ShapeLayer): PenAnchor[] {
  if (layer.shape === "star") return [];
  if (layer.shape === "ellipse") return ellipseNodes(layer);
  const poly = layer.shape === "rect" ? rectPoints(layer) : trianglePoints(layer);
  const radius = Math.max(0, Math.min(layer.radius, layer.width / 2, layer.height / 2));
  if (radius <= 0) return poly.map((point) => ({ x: point.x, y: point.y, in: null, out: null }));
  const anchors: PenAnchor[] = [];
  poly.forEach((point, index) => {
    const prev = poly[(index - 1 + poly.length) % poly.length];
    const next = poly[(index + 1) % poly.length];
    if (!prev || !next) return;
    const cut = cornerCut(prev, point, next, radius);
    anchors.push({
      x: cut.a.x,
      y: cut.a.y,
      in: null,
      out: { x: cut.a.x + (2 / 3) * (point.x - cut.a.x), y: cut.a.y + (2 / 3) * (point.y - cut.a.y) },
    });
    anchors.push({
      x: cut.b.x,
      y: cut.b.y,
      in: { x: cut.b.x + (2 / 3) * (point.x - cut.b.x), y: cut.b.y + (2 / 3) * (point.y - cut.b.y) },
      out: null,
    });
  });
  return anchors;
}

/** Move anchors from one box into another. Handles stay attached to their anchors. */
export function transformNodes(nodes: PenAnchor[], from: ShapeBox, to: ShapeBox): PenAnchor[] {
  const sx = from.width === 0 ? 1 : to.width / from.width;
  const sy = from.height === 0 ? 1 : to.height / from.height;
  const map = (point: Point): Point => ({
    x: to.x + (point.x - from.x) * sx,
    y: to.y + (point.y - from.y) * sy,
  });
  return nodes.map((point) => ({
    ...map(point),
    in: point.in ? map(point.in) : null,
    out: point.out ? map(point.out) : null,
  }));
}

function inwardBisector(prev: Point, current: Point, next: Point): Point {
  const left = Math.hypot(prev.x - current.x, prev.y - current.y) || 1;
  const right = Math.hypot(next.x - current.x, next.y - current.y) || 1;
  const x = (prev.x - current.x) / left + (next.x - current.x) / right;
  const y = (prev.y - current.y) / left + (next.y - current.y) / right;
  const len = Math.hypot(x, y) || 1;
  return { x: x / len, y: y / len };
}

/** Corner-radius handles for a selected rectangle or triangle. A star uses its own points. */
export function radiusHandlePoints(layer: ShapeLayer): Point[] {
  if (layer.shape !== "rect" && layer.shape !== "triangle") return [];
  if (layer.nodes && layer.nodes.length >= 2) return [];
  const poly = layer.shape === "rect" ? rectPoints(layer) : trianglePoints(layer);
  const shown = Math.max(0, Math.min(layer.radius, layer.width / 2, layer.height / 2));
  const gap = 28;
  return poly.map((point, index) => {
    const prev = poly[(index - 1 + poly.length) % poly.length]!;
    const next = poly[(index + 1) % poly.length]!;
    const cut = cornerCut(prev, point, next, shown);
    const inward = inwardBisector(prev, point, next);
    const mid = { x: (cut.a.x + cut.b.x) / 2, y: (cut.a.y + cut.b.y) / 2 };
    const room = Math.hypot(layer.x + layer.width / 2 - mid.x, layer.y + layer.height / 2 - mid.y);
    const along = Math.min(gap, Math.max(12, room * 0.45));
    return { x: mid.x + inward.x * along, y: mid.y + inward.y * along };
  });
}

function cornerCut(prev: Point, current: Point, next: Point, radius: number): { a: Point; b: Point } {
  const left = Math.hypot(current.x - prev.x, current.y - prev.y);
  const right = Math.hypot(next.x - current.x, next.y - current.y);
  const cut = Math.min(Math.max(0, radius), left / 2, right / 2);
  const toward = (from: Point, to: Point, distance: number, span: number): Point => {
    if (span <= 0) return { ...from };
    const t = distance / span;
    return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
  };
  return {
    a: toward(current, prev, cut, left),
    b: toward(current, next, cut, right),
  };
}

/** SVG path for a polygon whose corners are rounded by radius. */
export function roundedPolyPath(points: Point[], radius: number): string {
  if (points.length === 0) return "";
  const cuts = points.map((point, index) =>
    cornerCut(points[(index - 1 + points.length) % points.length]!, point, points[(index + 1) % points.length]!, radius),
  );
  const first = cuts[0];
  if (!first) return "";
  const fmt = (value: number) => String(Math.round(value * 100) / 100);
  let path = `M ${fmt(first.a.x)} ${fmt(first.a.y)}`;
  points.forEach((point, index) => {
    const cut = cuts[index];
    const next = cuts[(index + 1) % cuts.length];
    if (!cut || !next) return;
    if (radius > 0) path += ` Q ${fmt(point.x)} ${fmt(point.y)} ${fmt(cut.b.x)} ${fmt(cut.b.y)}`;
    path += ` L ${fmt(next.a.x)} ${fmt(next.a.y)}`;
  });
  return `${path} Z`;
}

export type DrawPath = {
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  quadraticCurveTo: (cx: number, cy: number, x: number, y: number) => void;
  bezierCurveTo: (c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number) => void;
  closePath: () => void;
  ellipse?: (x: number, y: number, rx: number, ry: number) => void;
  rect?: (x: number, y: number, w: number, h: number, radius: number) => void;
};

export function tracePoly(ctx: DrawPath, points: Point[], radius: number): void {
  if (points.length === 0) return;
  const cuts = points.map((point, index) =>
    cornerCut(points[(index - 1 + points.length) % points.length]!, point, points[(index + 1) % points.length]!, radius),
  );
  const first = cuts[0];
  if (!first) return;
  ctx.moveTo(first.a.x, first.a.y);
  points.forEach((point, index) => {
    const cut = cuts[index];
    const next = cuts[(index + 1) % cuts.length];
    if (!cut || !next) return;
    if (radius > 0) ctx.quadraticCurveTo(point.x, point.y, cut.b.x, cut.b.y);
    ctx.lineTo(next.a.x, next.a.y);
  });
  ctx.closePath();
}

export function traceShape(ctx: DrawPath, layer: ShapeLayer): void {
  if (layer.nodes && layer.nodes.length >= 2) {
    tracePen(ctx, layer.nodes, true);
    return;
  }
  const radius = Math.max(0, Math.min(layer.radius, layer.width / 2, layer.height / 2));
  if (layer.shape === "ellipse") {
    ctx.ellipse?.(layer.x + layer.width / 2, layer.y + layer.height / 2, layer.width / 2, layer.height / 2);
    return;
  }
  if (layer.shape === "rect") {
    ctx.rect?.(layer.x, layer.y, layer.width, layer.height, radius);
    return;
  }
  tracePoly(ctx, layer.shape === "triangle" ? trianglePoints(layer) : starPoints(layer, starInner(layer)), radius);
}

function pointInPoly(x: number, y: number, points: Point[]): boolean {
  let inside = false;
  for (let index = 0, prev = points.length - 1; index < points.length; prev = index, index += 1) {
    const a = points[index];
    const b = points[prev];
    if (!a || !b) continue;
    const crosses = a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y || 1e-9) + a.x;
    if (crosses) inside = !inside;
  }
  return inside;
}

function distToSegment(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const len = dx * dx + dy * dy;
  const t = len === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len));
  return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
}

export function shapeContains(layer: ShapeLayer, x: number, y: number, pad = 0): boolean {
  if (layer.nodes && layer.nodes.length >= 2) {
    return penContains(
      { id: layer.id, kind: "pen", points: layer.nodes, closed: true, fill: layer.color, stroke: "", strokeWidth: shapeStroke(layer).width },
      x,
      y,
      pad,
    );
  }
  if (layer.shape === "ellipse") {
    const rx = layer.width / 2 + pad;
    const ry = layer.height / 2 + pad;
    if (rx <= 0 || ry <= 0) return false;
    const dx = (x - (layer.x + layer.width / 2)) / rx;
    const dy = (y - (layer.y + layer.height / 2)) / ry;
    return dx * dx + dy * dy <= 1;
  }
  if (layer.shape === "rect") {
    return x >= layer.x - pad && y >= layer.y - pad && x <= layer.x + layer.width + pad && y <= layer.y + layer.height + pad;
  }
  const points = layer.shape === "triangle" ? trianglePoints(layer) : starPoints(layer, starInner(layer));
  if (pointInPoly(x, y, points)) return true;
  if (pad <= 0) return false;
  for (let index = 0; index < points.length; index += 1) {
    const a = points[index];
    const b = points[(index + 1) % points.length];
    if (a && b && distToSegment(x, y, a.x, a.y, b.x, b.y) <= pad) return true;
  }
  return false;
}

export function arrowLength(layer: LineLayer): number {
  const span = Math.hypot(layer.x2 - layer.x, layer.y2 - layer.y);
  return Math.min(layer.stroke * 3.4 + 4, Math.max(0, span / 2.2));
}

export function arrowPolygon(tip: Point, from: Point, length: number): Point[] {
  const angle = Math.atan2(tip.y - from.y, tip.x - from.x);
  const wing = 0.42;
  return [
    tip,
    {
      x: tip.x - length * Math.cos(angle - wing),
      y: tip.y - length * Math.sin(angle - wing),
    },
    {
      x: tip.x - length * Math.cos(angle + wing),
      y: tip.y - length * Math.sin(angle + wing),
    },
  ];
}

/** The stroked segment, shortened so it stops at the base of each arrow. */
export function lineSegment(layer: LineLayer): { x1: number; y1: number; x2: number; y2: number } {
  const dx = layer.x2 - layer.x;
  const dy = layer.y2 - layer.y;
  const span = Math.hypot(dx, dy) || 1;
  const pull = arrowLength(layer) * 0.72;
  const ux = dx / span;
  const uy = dy / span;
  return {
    x1: layer.x + (layer.start ? ux * pull : 0),
    y1: layer.y + (layer.start ? uy * pull : 0),
    x2: layer.x2 - (layer.end ? ux * pull : 0),
    y2: layer.y2 - (layer.end ? uy * pull : 0),
  };
}

export function lineBounds(layer: LineLayer): { x: number; y: number; w: number; h: number } {
  const pad = layer.stroke / 2 + (layer.start || layer.end ? arrowLength(layer) : 0);
  const left = Math.min(layer.x, layer.x2) - pad;
  const top = Math.min(layer.y, layer.y2) - pad;
  const right = Math.max(layer.x, layer.x2) + pad;
  const bottom = Math.max(layer.y, layer.y2) + pad;
  return { x: left, y: top, w: Math.max(1, right - left), h: Math.max(1, bottom - top) };
}

export function lineContains(layer: LineLayer, x: number, y: number, pad = 0): boolean {
  const reach = layer.stroke / 2 + pad;
  if (distToSegment(x, y, layer.x, layer.y, layer.x2, layer.y2) <= reach) return true;
  const length = arrowLength(layer);
  const tips = [
    layer.start ? arrowPolygon({ x: layer.x, y: layer.y }, { x: layer.x2, y: layer.y2 }, length) : null,
    layer.end ? arrowPolygon({ x: layer.x2, y: layer.y2 }, { x: layer.x, y: layer.y }, length) : null,
  ];
  return tips.some((points) => points !== null && pointInPoly(x, y, points));
}

function cubicPoint(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

function penSamples(layer: PenLayer, steps = 12): Point[] {
  const points = layer.points;
  if (points.length === 0) return [];
  const samples: Point[] = [];
  const last = layer.closed ? points.length : points.length - 1;
  for (let index = 0; index < last; index += 1) {
    const from = points[index];
    const to = points[(index + 1) % points.length];
    if (!from || !to) continue;
    const c1 = from.out ?? from;
    const c2 = to.in ?? to;
    if (samples.length === 0) samples.push(from);
    for (let step = 1; step <= steps; step += 1) samples.push(cubicPoint(from, c1, c2, to, step / steps));
  }
  if (!layer.closed && points.length === 1 && points[0]) samples.push(points[0]);
  return samples;
}

export function penBounds(layer: PenLayer): { x: number; y: number; w: number; h: number } {
  const samples = penSamples(layer);
  const pad = Math.max(layer.strokeWidth, 1) / 2;
  if (samples.length === 0) return { x: 0, y: 0, w: 1, h: 1 };
  const xs = samples.map((point) => point.x);
  const ys = samples.map((point) => point.y);
  const left = Math.min(...xs) - pad;
  const top = Math.min(...ys) - pad;
  const right = Math.max(...xs) + pad;
  const bottom = Math.max(...ys) + pad;
  return { x: left, y: top, w: Math.max(1, right - left), h: Math.max(1, bottom - top) };
}

export function nodeBounds(points: PenAnchor[]): ShapeBox {
  const box = penBounds({ id: "nodes", kind: "pen", points, closed: true, fill: "", stroke: "", strokeWidth: 0 });
  return { x: box.x, y: box.y, width: box.w, height: box.h };
}

export function penContains(layer: PenLayer, x: number, y: number, pad = 0): boolean {
  const samples = penSamples(layer);
  if (samples.length === 0) return false;
  const reach = Math.max(pad, layer.strokeWidth / 2 + pad);
  if (layer.closed && layer.fill && pointInPoly(x, y, samples)) return true;
  for (let index = 1; index < samples.length; index += 1) {
    const a = samples[index - 1];
    const b = samples[index];
    if (a && b && distToSegment(x, y, a.x, a.y, b.x, b.y) <= reach) return true;
  }
  return false;
}

export function tracePen(ctx: DrawPath, points: PenAnchor[], closed: boolean): void {
  const first = points[0];
  if (!first) return;
  ctx.moveTo(first.x, first.y);
  const last = closed ? points.length : points.length - 1;
  for (let index = 0; index < last; index += 1) {
    const from = points[index];
    const to = points[(index + 1) % points.length];
    if (!from || !to) continue;
    const c1 = from.out ?? from;
    const c2 = to.in ?? to;
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, to.x, to.y);
  }
  if (closed) ctx.closePath();
}

export function penPathData(points: PenAnchor[], closed: boolean): string {
  const first = points[0];
  if (!first) return "";
  const fmt = (value: number) => String(Math.round(value * 100) / 100);
  let data = `M ${fmt(first.x)} ${fmt(first.y)}`;
  const last = closed ? points.length : points.length - 1;
  for (let index = 0; index < last; index += 1) {
    const from = points[index];
    const to = points[(index + 1) % points.length];
    if (!from || !to) continue;
    const c1 = from.out ?? from;
    const c2 = to.in ?? to;
    data += ` C ${fmt(c1.x)} ${fmt(c1.y)} ${fmt(c2.x)} ${fmt(c2.y)} ${fmt(to.x)} ${fmt(to.y)}`;
  }
  return closed ? `${data} Z` : data;
}

function escapeAttr(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function svgId(prefix: string, id: string): string {
  return `${prefix}-${id.replace(/[^a-zA-Z0-9_-]/g, "") || "layer"}`;
}

function gradientDef(id: string, gradient: LinearGradient): string {
  const rad = (gradient.angle * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  return `<linearGradient id="${id}" x1="${0.5 - dx * 0.5}" y1="${0.5 - dy * 0.5}" x2="${0.5 + dx * 0.5}" y2="${0.5 + dy * 0.5}"><stop offset="0" stop-color="${escapeAttr(gradient.from)}" /><stop offset="1" stop-color="${escapeAttr(gradient.to)}" /></linearGradient>`;
}

function shapeEffectDef(layer: ShapeLayer): { id: string; markup: string } | null {
  const shadow = shapeShadow(layer);
  const blur = (clampUnit(layer.blurFrom ?? 0, LAYER_BLUR_MAX) + clampUnit(layer.blurTo ?? 0, LAYER_BLUR_MAX)) / 2;
  const hasShadow = shadow.opacity > 0 && (shadow.size > 0 || shadow.blur > 0 || shadow.distance > 0);
  if (!hasShadow && blur <= 0) return null;
  const id = svgId("fx", layer.id);
  const offset = shadowOffset(shadow.distance);
  const spread = shadow.size > 0
    ? `<feMorphology in="SourceAlpha" operator="dilate" radius="${shadow.size}" result="spread" />`
    : `<feOffset in="SourceAlpha" dx="0" dy="0" result="spread" />`;
  const graphic = blur > 0
    ? `<feGaussianBlur in="SourceGraphic" stdDeviation="${blur / 2}" result="soft" />`
    : `<feOffset in="SourceGraphic" dx="0" dy="0" result="soft" />`;
  const markup = `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%">${spread}<feGaussianBlur in="spread" stdDeviation="${shadow.blur / 2}" result="blurred" /><feOffset in="blurred" dx="${offset.x}" dy="${offset.y}" result="moved" /><feFlood flood-color="rgb(0, 0, 0)" flood-opacity="${shadow.opacity / 100}" result="ink" /><feComposite in="ink" in2="moved" operator="in" result="shadow" />${graphic}<feMerge><feMergeNode in="shadow" /><feMergeNode in="soft" /></feMerge></filter>`;
  return { id, markup };
}

function shapeSvg(layer: ShapeLayer): string {
  const gradient = layer.gradient ?? null;
  const gradId = gradient ? svgId("grad", layer.id) : "";
  const fill = gradient ? `url(#${gradId})` : escapeAttr(layer.color);
  const stroke = shapeStroke(layer);
  const strokeGradId = stroke.width > 0 && stroke.gradient ? svgId("sgrad", layer.id) : "";
  const strokePaint = strokeGradId ? `url(#${strokeGradId})` : escapeAttr(stroke.color);
  const strokeAttr = stroke.width > 0
    ? ` stroke="${strokePaint}" stroke-width="${stroke.width}" stroke-opacity="${stroke.opacity / 100}" stroke-linejoin="round"`
    : "";
  const effect = shapeEffectDef(layer);
  const defs = [
    gradient ? gradientDef(gradId, gradient) : "",
    strokeGradId && stroke.gradient ? gradientDef(strokeGradId, stroke.gradient) : "",
    effect?.markup ?? "",
  ].filter(Boolean).join("");
  const filter = effect ? ` filter="url(#${effect.id})"` : "";
  let body: string;
  if (layer.nodes && layer.nodes.length >= 2) {
    body = `<path d="${penPathData(layer.nodes, true)}" fill="${fill}"${strokeAttr}${filter} />`;
  } else if (layer.shape === "ellipse") {
    body = `<ellipse cx="${layer.x + layer.width / 2}" cy="${layer.y + layer.height / 2}" rx="${layer.width / 2}" ry="${layer.height / 2}" fill="${fill}"${strokeAttr}${filter} />`;
  } else if (layer.shape === "rect") {
    const radius = Math.max(0, Math.min(layer.radius, layer.width / 2, layer.height / 2));
    body = `<rect x="${layer.x}" y="${layer.y}" width="${layer.width}" height="${layer.height}" rx="${radius}" fill="${fill}"${strokeAttr}${filter} />`;
  } else {
    const points = layer.shape === "triangle" ? trianglePoints(layer) : starPoints(layer, starInner(layer));
    const radius = Math.max(0, Math.min(layer.radius, layer.width / 2, layer.height / 2));
    body = `<path d="${roundedPolyPath(points, radius)}" fill="${fill}"${strokeAttr}${filter} />`;
  }
  return `${defs ? `<defs>${defs}</defs>` : ""}${body}`;
}

/** Inner SVG for one vector layer, in card pixels. */
export function vectorSvg(layer: VectorLayer): string {
  if (layer.kind === "shape") return shapeSvg(layer);
  if (layer.kind === "line") {
    const segment = lineSegment(layer);
    const color = escapeAttr(layer.color);
    const arrows = [
      layer.start ? arrowPolygon({ x: layer.x, y: layer.y }, { x: layer.x2, y: layer.y2 }, arrowLength(layer)) : null,
      layer.end ? arrowPolygon({ x: layer.x2, y: layer.y2 }, { x: layer.x, y: layer.y }, arrowLength(layer)) : null,
    ];
    const heads = arrows
      .filter((points): points is Point[] => points !== null)
      .map((points) => `<polygon points="${points.map((point) => `${point.x},${point.y}`).join(" ")}" fill="${color}" />`)
      .join("");
    return `<line x1="${segment.x1}" y1="${segment.y1}" x2="${segment.x2}" y2="${segment.y2}" stroke="${color}" stroke-width="${layer.stroke}" stroke-linecap="${layer.cap}" />${heads}`;
  }
  const fill = layer.fill ? escapeAttr(layer.fill) : "none";
  const stroke = layer.stroke ? escapeAttr(layer.stroke) : "none";
  return `<path d="${penPathData(layer.points, layer.closed)}" fill="${fill}" stroke="${stroke}" stroke-width="${layer.strokeWidth}" stroke-linejoin="round" stroke-linecap="round" />`;
}

function num(field: unknown): number | null {
  return typeof field === "number" && Number.isFinite(field) ? field : null;
}

function parseAnchors(raw: unknown): PenAnchor[] | null {
  if (!Array.isArray(raw)) return null;
  const points = raw.flatMap((item) => {
    const point = pointOf(item);
    if (!point || !item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const anchor: PenAnchor = { ...point, in: pointOf(record.in), out: pointOf(record.out) };
    return [anchor];
  });
  return points.length >= 2 ? points : null;
}

function pointOf(raw: unknown): Point | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const x = num(value.x);
  const y = num(value.y);
  if (x === null || y === null) return null;
  return { x, y };
}

function hexOrEmpty(field: unknown, fallback: string): string {
  if (field === "") return "";
  const text = typeof field === "string" ? field.trim() : "";
  return /^#[0-9a-fA-F]{6}$/.test(text) ? `#${text.slice(1).toLowerCase()}` : fallback;
}

function parseShadow(raw: unknown): ShapeShadow {
  const value = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    size: clampUnit(num(value.size) ?? 0, SHADOW_SIZE_MAX),
    blur: clampUnit(num(value.blur) ?? 0, SHADOW_BLUR_MAX),
    distance: clampUnit(num(value.distance) ?? 0, SHADOW_DISTANCE_MAX),
    opacity: clampUnit(num(value.opacity) ?? SHADOW_OPACITY, 100),
  };
}

function parseStroke(raw: unknown, fallback: string): ShapeStroke {
  const value = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    width: clampUnit(num(value.width) ?? 0, LINE_WIDTH_MAX),
    opacity: clampUnit(num(value.opacity) ?? 100, 100),
    color: hexOrEmpty(value.color, fallback),
    gradient: parseGradient(value.gradient),
  };
}

function parseBlend(raw: unknown): ShapeBlend {
  return SHAPE_BLENDS.includes(raw as ShapeBlend) ? (raw as ShapeBlend) : "normal";
}

export function parseGradient(raw: unknown): LinearGradient | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const from = hexOrEmpty(value.from, "");
  const to = hexOrEmpty(value.to, "");
  if (!from || !to) return null;
  const angle = num(value.angle) ?? 0;
  return { angle: ((Math.round(angle) % 360) + 360) % 360, from, to };
}

/** A stored shape, line, or pen. Null when the record is not one of those. */
export function parseVectorLayer(raw: unknown, ink: string): VectorLayer | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const id = typeof value.id === "string" && value.id ? value.id : "";
  if (!id) return null;
  if (value.kind === "shape" && SHAPE_NAMES.includes(value.shape as ShapeName)) {
    const width = clampShapeSize(num(value.width) ?? SHAPE_MIN);
    const height = clampShapeSize(num(value.height) ?? SHAPE_MIN);
    return {
      id,
      kind: "shape",
      shape: value.shape as ShapeName,
      x: num(value.x) ?? 0,
      y: num(value.y) ?? 0,
      width,
      height,
      radius: Math.max(0, Math.min(120, Math.round(num(value.radius) ?? 0))),
      color: hexOrEmpty(value.color, ink),
      shadow: parseShadow(value.shadow),
      stroke: parseStroke(value.stroke, hexOrEmpty(value.color, ink)),
      blend: parseBlend(value.blend),
      blurFrom: clampUnit(num(value.blurFrom) ?? 0, LAYER_BLUR_MAX),
      blurTo: clampUnit(num(value.blurTo) ?? 0, LAYER_BLUR_MAX),
      gradient: parseGradient(value.gradient),
      inner: starInner({ inner: num(value.inner) ?? undefined } as ShapeLayer),
      nodes: parseAnchors(value.nodes),
    };
  }
  if (value.kind === "line") {
    return {
      id,
      kind: "line",
      x: num(value.x) ?? 0,
      y: num(value.y) ?? 0,
      x2: num(value.x2) ?? 0,
      y2: num(value.y2) ?? 0,
      stroke: clampLineWidth(num(value.stroke) ?? LINE_WIDTH_DEFAULT),
      cap: value.cap === "round" ? "round" : "butt",
      start: value.start === true,
      end: value.end === true,
      color: hexOrEmpty(value.color, ink),
    };
  }
  if (value.kind === "pen" && Array.isArray(value.points)) {
    const points = parseAnchors(value.points);
    if (!points) return null;
    return {
      id,
      kind: "pen",
      points,
      closed: value.closed === true,
      fill: hexOrEmpty(value.fill, ""),
      stroke: hexOrEmpty(value.stroke, ink),
      strokeWidth: Math.max(0, Math.min(LINE_WIDTH_MAX, Math.round(num(value.strokeWidth) ?? LINE_WIDTH_DEFAULT))),
    };
  }
  return null;
}
