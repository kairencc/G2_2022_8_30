# Animation

## TimeEffect

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .animate('enter', {
      duration: 1000, //  Specify effect time by animate options.
      delay: 300,
    });

  return chart.render().node();
})();
```

## Animation Type

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .animate('enter', {
      type: 'fadeIn', //  Specify animation type.
      duration: 2000,
    });

  return chart.render().node();
})();
```

## Encode EnterType

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('enterType', (d) => (d.sold > 200 ? 'high' : 'low'))
    .scale('enterType', { range: ['scaleInY', 'fadeIn'] })
    .animate('enter', { duration: 3000 });

  return chart.render().node();
})();
```

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('enterType', (d) => (d.sold > 200 ? 'scaleInY' : 'fadeIn'))
    .scale('enterType', { type: 'identity' })
    .animate('enter', { duration: 3000 });

  return chart.render().node();
})();
```

## Encode EnterDelay and EnterDuration

```js
(() => {
  const chart = new G2.Chart({
    width: 720,
    paddingTop: 60,
    paddingLeft: 100,
  });

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data([
      { name: 'event planning', startTime: 1, endTime: 4 },
      { name: 'layout logistics', startTime: 3, endTime: 13 },
      { name: 'select vendors', startTime: 5, endTime: 8 },
      { name: 'hire venue', startTime: 9, endTime: 13 },
      { name: 'hire caterer', startTime: 10, endTime: 14 },
      { name: 'hire event decorators', startTime: 12, endTime: 17 },
      { name: 'rehearsal', startTime: 14, endTime: 16 },
      { name: 'event celebration', startTime: 17, endTime: 18 },
    ])
    .encode('x', 'name')
    .encode('y', ['endTime', 'startTime'])
    .encode('color', 'name')
    // The appear time of interval is linearly related to startTime.
    .encode('enterDelay', 'startTime')
    // The duration of interval animation is linearly related to duration time.
    .encode('enterDuration', (d) => d.endTime - d.startTime)
    // All the intervals will show up in 10s.
    // But the animation will take more than 10s to finish.
    .scale('enter', { range: [0, 10000], zero: true })
    .scale('color', {
      guide: { size: 60, autoWrap: true, maxRows: 2, cols: 5 },
    });

  return chart.render().node();
})();
```
