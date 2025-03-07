# Connector

## Fetch

**Fetch with `json` format.**

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/ce45e3d7-ba78-4a08-b411-28df40ef9b7f.json',
    })
    .encode('x', 'genre')
    .encode('y', 'sold');

  return chart.render().node();
})();
```

**Fetch with `csv` format.**

```js
(() => {
  const chart = new G2.Chart({
    width: 760,
    height: 760,
    paddingLeft: 84,
    paddingRight: 0,
  });

  chart
    .grid()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/87092954-aed4-48b2-93ba-b07b255f04a2.csv',
      format: 'csv',
      callback: (d) => Object.assign(d, { weight: +d.weight }),
    })
    .encode('x', 'to')
    .encode('y', 'from')
    .encode('color', 'weight')
    .scale('x', { guide: { label: { style: { fontSize: 10 } }, grid: {} } })
    .scale('y', { guide: { label: { style: { fontSize: 10 } }, grid: {} } })
    .scale('color', {
      type: 'quantile',
      range: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
      guide: null,
    });

  return chart.render().node();
})();
```

## SortBy

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .transform({ type: 'sortBy', fields: ['sold'] })
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold');

  return chart.render().node();
})();
```

## FilterBy

```js
(() => {
  const chart = new G2.Chart({
    width: 720,
    paddingLeft: 60,
  });

  chart.coordinate({ type: 'parallel' });

  chart
    .line()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
      callback: (d) => Object.assign(d, { year: new Date(d.year) }),
    })
    .transform({
      type: 'filterBy',
      // Filter data with defined Horsepower and Miles_per_Gallon.
      fields: ['Horsepower', 'Miles_per_Gallon'],
    })
    .encode('position', [
      'Cylinders',
      'Displacement',
      'Weight_in_lbs',
      'Horsepower',
      'Acceleration',
      'Miles_per_Gallon',
      'Year',
    ])
    .encode('color', 'Origin')
    .encode('size', 1.01)
    .style('strokeOpacity', 0.3)
    // zIndex of mark is default to 0.
    // zIndex of component is default to -1.
    // Set zIndex to 1 for component to draw above marks.
    .scale('position', { nice: true, guide: { zIndex: 1 } })
    .scale('position1', { nice: true, guide: { zIndex: 1 } })
    .scale('position2', { nice: true, guide: { zIndex: 1 } })
    .scale('position3', { nice: true, guide: { zIndex: 1 } })
    .scale('position4', { nice: true, guide: { zIndex: 1 } })
    .scale('position5', { nice: true, guide: { zIndex: 1 } });

  return chart.render().node();
})();
```
