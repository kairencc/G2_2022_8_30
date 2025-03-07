import { CompositionComponent as CC } from '../runtime';
import { FlexComposition } from '../spec';

export type FlexOptions = Omit<FlexComposition, 'type'>;

/**
 * @todo Propagate more options to children.
 */
export const Flex: CC<FlexOptions> = () => {
  return (options) => {
    const { children } = options;
    if (!Array.isArray(children)) return [];

    const {
      direction = 'row',
      ratio = children.map(() => 1),
      padding = 0,
      data: flexData,
    } = options;
    const [mainStart, mainSize, crossSize, crossStart] =
      direction === 'col'
        ? ['y', 'height', 'width', 'x']
        : ['x', 'width', 'height', 'y'];

    const sum = ratio.reduce((total, value) => total + value);
    const totalSize = options[mainSize] - padding * (children.length - 1);
    const sizes = ratio.map((value) => totalSize * (value / sum));

    const newChildren = [];
    let next = options[mainStart] || 0;
    for (let i = 0; i < sizes.length; i += 1) {
      const { data = flexData, ...rest } = children[i];
      newChildren.push({
        [mainStart]: next,
        [mainSize]: sizes[i],
        [crossStart]: options[crossStart] || 0,
        [crossSize]: options[crossSize],
        data,
        ...rest,
      });
      next += sizes[i] + padding;
    }
    return newChildren;
  };
};

Flex.props = {};
