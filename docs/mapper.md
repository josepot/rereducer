---
id: mapper
title: mapper
sidebar_label: mapper
---

```
mapper<S, A>(
  getMapFn: (state: Array<S>, action: A) =>
    (item: S, key: number, state: Array<S>) => S
): Reducer<Array<S>, A>

mapper<S, A>(
  getMapFn: (state: ObjectOf<S>, action: A) =>
    (item: S, key: string, state: ObjectOf<S>) => S
): Reducer<ObjectOf<S>, A>
```

## Examples

```js
const add = x => y => x + y
const addDelta = compose(add, fromAction('delta'))
const deltaMapper = mapper(addDelta)

const state = [1, 2, 3, 4, 5]
const action = {delta: 10}
deltaMapper(state, action)
//=> [11, 12, 13, 14, 15]
```

```js
const add = x => y => x + y
const addDelta = compose(add, fromAction('delta'))
const deltaMapper = mapper(innerReducer('count', addDelta))

const state = {
  foo: {id: 'foo', count: 1},
  bar: {id: 'bar', count: 2},
  baz: {id: 'baz', count: 3},
}
const action = {delta: 10}
deltaMapper(state, action)
//=>
// {
//   foo: {id: 'foo', count: 11},
//   bar: {id: 'bar', count: 12},
//   baz: {id: 'baz', count: 13},
// }
```
