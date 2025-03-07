import { Path } from '@antv/g';
import { path as d3path } from 'd3-path';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type SmoothEdgeOptions = Record<string, any>;

/**
 * Connect 2 points with a smooth line, used in tree.
 */
export const SmoothEdge: SC<SmoothEdgeOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;
    const [from, to] = points;

    const path = d3path();
    path.moveTo(from[0], from[1]);
    path.bezierCurveTo(
      from[0] / 2 + to[0] / 2,
      from[1],
      from[0] / 2 + to[0] / 2,
      to[1],
      to[0],
      to[1],
    );

    return select(new Path())
      .style('d', path.toString())
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

SmoothEdge.props = {
  defaultEnterAnimation: 'fadeIn',
};
