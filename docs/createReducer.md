---
id: createReducer
title: createReducer
sidebar_label: createReducer
---

```
createReducer<S, A>(
  dependencies: [PReducer<S, A, DA>, PReducer<S, A, DB>, ..., PReducer<S, A, DZ>],
  computeFn: (a: DA, b: DB, ..., z: DZ) => T
) : PReducer<S, A, T>
```

Accepts a list of branching pseudo-reducers and a converging function and returns a new pseudo-reducer. It's like Ramda's `converge`, but with the arguments flipped.

## Examples

```js
const getNodeId = fromAction('nodeId')
const getSubtreeIds = createReducer([getState, getNodeId], (tree, rootId) => {
  const innerFn = id => [id, ...tree[id].childIds.map(innerFn)]
  return innerFn(rootId)
})

const state = {
  root: {id: 'root', childIds: ['foo', 'bar']},
  foo: {id: 'foo', childIds: ['baz', 'bax']},
  bar: {id: 'bar', childIds: []},
  baz: {id: 'baz', childIds: []},
  bax: {id: 'bax', childIds: ['bay']},
  bay: {id: 'bay', childIds: []},
}

getSubtreeIds(state, {nodeId: 'foo'}) //=> ['foo', 'baz', 'bax', 'bay']
getSubtreeIds(state, {nodeId: 'bax'}) //=> ['bax', 'bay']
```
