import { ThemeComponent as TC, Theme } from '../runtime';

export type LightOptions = Theme;

/**
 * Default theme.
 * @todo deep mix
 */
export const Light: TC<LightOptions> = (options) => {
  const defaultOptions: Theme = {
    defaultColor: '#5B8FF9',
    defaultCategory10: 'category10',
    defaultCategory20: 'category20',
    defaultSize: 1,
    elementActiveStroke: 'black',
    enter: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },
    title: {
      fill: 'rgba(0,0,0,0.85)',
      fontSize: 14,
      fontWeight: 'bold',
    },
    subtitle: {
      fill: 'rgba(0,0,0,0.65)',
      fontSize: 10,
    },
  };
  return Object.assign({}, defaultOptions, options);
};

Light.props = {};
