---
id: switchReducers
title: switchReducers
sidebar_label: switchReducers
---

An enhancer that helps you separate the logic of your reducer between
predicates and transformations, enabling reducers to be broken down into
smaller functions.

```ts
switchReducers<S, A>(
  initialState: S,
  ...cases: Array<[
    matcher: Matcher<S, A>,
    transformation: Reducer<S, A>
  ]>
): Reducer<S, A>
```

A `Matcher` can be:
 - A string which will be matched against the the type of the Action. E.g `'INCREMENT'`
 - A pseudo-reducer that returns a boolean. E.g. `(x, {type}) => x > 1000 && type === 'FOO'`
 - An Array of the above E.g. `['LOGOUT', 'RESET', x => x === 1000]`
 - An Array of Matchers E.g. `[['LOGOUT', ['RESET']], x => x === 1000]`

## Examples

```js
const counter = switchReducers(
  0,
  ['INCREASE', x => x + 1],
  ['DECREASE', x => x - 1]
)

counter(); // => 0
counter(5, { type: 'INCREASE' }); // => 6
counter(5, { type: 'DECREASE' }); // => 4
```

```js
const counter = switchReducers(
  0,
  ['INCREASE', x => x + 1],
  ['DECREASE', x => x - 1],
  [['RESET', 'LOGOUT'], () => 0]
);

counter(100, { type: 'RESET' }); // => 0
counter(100, { type: 'LOGOUT' }); // => 0
```

```js
const whenSomethingSpeciallHappens = (state, action) => (
  action.type === 'SOMETHING_SPECIAL' &&
  action.payload === 'SPECIAL_INDEED' &&
  state > 10
);

const counter = rereducer(
  0,
  ['INCREASE', x => x + 1],
  ['DECREASE', x => x - 1],
  [whenSomethingSpeciallHappens, x => x + 1000]
);

counter(10, { type: 'SOMETHING_SPECIAL' }); // => 10
counter(10, { type: 'SOMETHING_SPECIAL', payload: 'SPECIAL_INDEED' }); // => 10
counter(11, { type: 'SOMETHING_SPECIAL', payload: 'SPECIAL_INDEED' }); // => 1011
```
