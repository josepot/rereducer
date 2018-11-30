---
id: fromAction
title: fromAction
sidebar_label: fromAction
---

```
fromAction<S, A>(
  path: [a: KeyOf<A>, b: KeyOf<A[KeyOf<A>]>, ...]
): PReducer<S, A, A[KeyOf<A>][KeyOf<A[KeyOf<A>]>][...]>

fromAction<S, A>(prop: KeyOf<A>): PReducer<S, A, A[KeyOf<A>]>
```

## Examples

```js
const getData = fromAction('data')
getData(null, {type: 'TEST', data: {foo: 'foo'}}) // => {foo: 'foo'}

const getDataFoo = fromAction(['data', 'foo'])
getDataFoo(null, {type: 'TEST', data: {foo: 'foo'}}) // => 'foo'
getDataFoo(null, {}) // => undefined
```

```js
const getItemId = ({id}) => id
const getRelevantItem = fromAction(['items', getItemId])
const getRelevantItemText = fromAction(['items', getItemId, 'text'])

const state = {id: 'foo', text: ''}
const action = {
  type: 'TEST',
  items: {
    foo: {id: 'foo', text: 'FOO'},
    bar: {id: 'bar', text: 'BAR'},
    baz: {id: 'baz', text: 'BAZ'},
  },
}

getRelevantItem(state, action) // => {id: 'foo', text: 'FOO'}
getRelevantItemText(state, action) // => 'FOO'
```
