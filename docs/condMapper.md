---
id: condMapper
title: condMapper
sidebar_label: condMapper
---

```
condMapper<S, A>(
  getCondition: (state: Array<S>, action: A) =>
    (item: S, key: number) => boolean,
  mapFn: Reducer<S, A>
): Reducer<Array<S>, A>

condMapper<S, A>(
  getCondition: (state: ObjectOf<S>, action: A) =>
    (item: S, key: string) => boolean,
  mapFn: (item: S, key: string, state: ObjectOf<S>) => S
): Reducer<ObjectOf<S>, A>
```

## Examples

```js
const inc = x => x + 1
const dec = x => x - 1

const isLarge = (items, action) => item => item >= action.threshold
const updateLargeItems = condMapper(isLarge)

const reducer = switchReducers(
  [],
  ['INC_LARGE_ITEMS', updateLargeItems(inc)],
  ['DEC_LARGE_ITEMS', updateLargeItems(dec)],
);

const state = [1, 10, 4, 6]
reducer(state, {type: 'INC_LARGE_ITEMS', threshold: 5}) //=> [1, 11, 4, 7]
reducer(state, {type: 'DEC_LARGE_ITEMS', threshold: 5}) //=> [1, 9, 4, 5]
```

```js
const inc = x => x + 1
const dec = x => x - 1

const isLarge = (items, action) => ({count}) => count >= action.threshold
const updateLargeItems = condMapper(isLarge)
const updateLargeItemsCount = compose(updateLargeItems, innerReducer('count'))

const reducer = switchReducers(
  [],
  ['INC_LARGE_ITEMS', updateLargeItemsCount(inc)],
  ['DEC_LARGE_ITEMS', updateLargeItemsCount(dec)],
);

const state = {
  foo: {id: 'foo', count: 1},
  bar: {id: 'bar', count: 10},
  baz: {id: 'baz', count: 4},
  bay: {id: 'bay', count: 6},
}
reducer(state, {type: 'INC_LARGE_ITEMS', min: 5})
// =>
// {
//   foo: {id: 'foo', count: 1},
//   bar: {id: 'bar', count: 11},
//   baz: {id: 'baz', count: 4},
//   bay: {id: 'bay', count: 7},
// }
reducer(state, {type: 'DEC_LARGE_ITEMS', min: 5})
// =>
// {
//   foo: {id: 'foo', count: 1},
//   bar: {id: 'bar', count: 9},
//   baz: {id: 'baz', count: 4},
//   bay: {id: 'bay', count: 5},
// }
```

```js
const inc = x => x + 1
const dec = x => x - 1

const isBigAndEvenIdx = (s, a) => (i, idx) => i > a.threshold && idx % 2 === 0
const updateBigAndEvenIdx = condMapper(isBigAndEvenIdx)

const reducer = switchReducers(
  [],
    ['INC_BIG_AND_EVEN', updateBigAndEvenIdx(inc)],
      ['DEC_BIG_AND_EVEN', updateBigAndEvenIdx(dec)],
      );

      const state = [4, 6, 8, 10, 7, 3, 7];
      reducer(state, {type: 'INC_BIG_AND_EVEN', threshold: 5}) //=> [4, 6, 9, 10, 7, 3, 8]
      reducer(state, {type: 'DEC_BIG_AND_EVEN', threshold: 5}) //=> [4, 6, 7, 10, 7, 3, 6]
```
