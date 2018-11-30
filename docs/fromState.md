---
id: fromState
title: fromState
sidebar_label: fromState
---

```
fromState<S, A>(
    path: [a: KeyOf<S>, b: KeyOf<S[KeyOf<S>]>, ...]
): PReducer<S, A, S[KeyOf<S>][KeyOf<S[KeyOf<S>]>][...]>
​
fromAction<S, A>(prop: KeyOf<S>): PReducer<S, A, S[KeyOf<S>]>
```

## Examples

```js
const getHead = fromState(0)
getHead([3, 4, 5, 6]) // => 3
```

```js
const getHeadText = fromState([0, 'text'])
getHeadText([{text: 'foo'}, {text: 'bar'}]) // => foo
```

```js
const getItemText = fromState(['item', 'text'])
getItemText({item: {count: 2, text: 'foo'}}); // => 'foo'
```

```js
const getActionId = fromAction('id')
const getRelevantItem = fromState([getItemId])
const getRelevantItemText = fromState([getItemId, 'text'])

const state = {
  foo: {id: 'foo', text: 'FOO'},
  bar: {id: 'bar', text: 'BAR'},
  baz: {id: 'baz', text: 'BAZ'},
}
const action = {type: 'TEST', id: 'bar'}

getRelevantItem(state, action) // => {id: 'bar', text: 'BAR'}
getRelevantItemText(state, action) // => 'BAR'
```
