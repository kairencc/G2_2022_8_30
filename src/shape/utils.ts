import { Path as D3Path } from 'd3-path';
import { Linear } from '@antv/scale';
import { Primitive, Vector2 } from '../runtime';
import { angle, dist, sub } from '../utils/vector';
import { Selection } from '../utils/selection';

type A = ['a' | 'A', number, number, number, number, number, number, number];
type C = ['c' | 'C', number, number, number, number, number, number];
type O = ['o' | 'O', number, number];
type H = ['h' | 'H', number];
type L = ['l' | 'L', number, number];
type M = ['m' | 'M', number, number];
type R = ['r' | 'R', number, number, number, number];
type Q = ['q' | 'Q', number, number, number, number];
type S = ['s' | 'S', number, number, number, number, number, number, number];
type T = ['t' | 'T', number, number];
type V = ['v' | 'V', number];
type U = ['u' | 'U', number, number, number];
type Z = ['z' | 'Z'];
export type PathCommand = A | C | O | H | L | M | R | Q | S | T | V | U | Z;

export function applyStyle(
  selection: Selection,
  style: Record<string, Primitive>,
) {
  for (const [key, value] of Object.entries(style)) {
    selection.style(key, value);
  }
}

/**
 * Draw polygon path with points.
 * @param path
 * @param points
 */
export function appendPolygon(path: D3Path, points: Vector2[]) {
  points.forEach((p, idx) =>
    idx === 0 ? path.moveTo(p[0], p[1]) : path.lineTo(p[0], p[1]),
  );
  path.closePath();
  return path;
}

export type ArrowOptions = {
  /**
   * Arrow size, can be a px number, or a percentage string. Default: '40%'
   */
  size?: number | string;
  /**
   * todo
   */
  symbol?: string;
};

/**
 * Draw arrow between `from` and `to`.
 * @param from
 * @param to
 * @returns
 */
export function arrowPoints(
  from: Vector2,
  to: Vector2,
  options: ArrowOptions,
): [Vector2, Vector2] {
  const { size } = { size: 8, ...options };
  const arrowSize =
    typeof size === 'string'
      ? (+parseFloat(size) / 100) * dist(from, to)
      : size;
  // TODO Use config from style.
  // Default arrow rotate is 30°.
  const arrowAngle = Math.PI / 6;

  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);

  const arrowAngle1 = Math.PI / 2 - angle - arrowAngle;
  const arrow1: Vector2 = [
    to[0] - arrowSize * Math.sin(arrowAngle1),
    to[1] - arrowSize * Math.cos(arrowAngle1),
  ];

  const arrowAngle2 = angle - arrowAngle;
  const arrow2: Vector2 = [
    to[0] - arrowSize * Math.cos(arrowAngle2),
    to[1] - arrowSize * Math.sin(arrowAngle2),
  ];

  return [arrow1, arrow2];
}

/**
 * Draw arc by from -> to, with center and radius.
 * @param path
 * @param from
 * @param to
 * @param center
 * @param radius
 */
export function appendArc(
  path: D3Path,
  from: Vector2,
  to: Vector2,
  center: Vector2,
  radius: number,
) {
  const startAngle = angle(sub(center, from)) + Math.PI / 2;
  const endAngle = angle(sub(center, to)) + Math.PI / 2;

  path.arc(
    center[0],
    center[1],
    radius,
    startAngle,
    endAngle,
    endAngle - startAngle < 0,
  );

  return path;
}

export function computeGradient(C: string[], X: number[]): string {
  const color = new Linear({
    domain: [X[0], X[X.length - 1]],
    range: [0, 100],
  });
  const gradient = C.map((c, i) => `${c} ${color.map(X[i])}%`).join(',');
  return `linear-gradient(${gradient})`;
}
