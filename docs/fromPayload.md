---
id: fromPayload
title: fromPayload
sidebar_label: fromPayload
---

```
fromPayload<S, A extends {payload: P}>(
    path: [a: KeyOf<P>, b: KeyOf<P[KeyOf<P>]>, ...]
): PReducer<S, A, P[KeyOf<P>][KeyOf<P[KeyOf<P>]>][...]>

fromPayload<S, A extends {payload: P}>(
    prop: KeyOf<P>
): PReducer<S, A, P[KeyOf<P>]>
```

## Examples

```js
const getUser = fromPayload('user')
getUser(null, {payload: {user: {id: 'foo', name: 'foo'}}})
//=> {id: 'foo', name: 'foo'}

const getUserId = fromPayload(['user', 'id'])
getUser(null, {payload: {user: {id: 'foo', name: 'foo'}}})
getUserId(null, {}) // => undefined
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
