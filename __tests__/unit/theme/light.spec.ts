import { Light } from '../../../src/theme';

describe('light', () => {
  it('Light() returns expected defaults', () => {
    expect(Light()).toEqual({
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
      subtitle: {
        fill: 'rgba(0,0,0,0.65)',
        fontSize: 10,
      },
      title: {
        fill: 'rgba(0,0,0,0.85)',
        fontSize: 14,
        fontWeight: 'bold',
      },
    });
  });

  it('Light({...}) overrides expected defaults', () => {
    expect(Light({ defaultColor: 'red' }).defaultColor).toBe('red');
  });
});
