---
id: pickFrom
title: pickFrom
sidebar_label: pickFrom
---

```
pickFrom<S extends Object, A>(
    getKeysToKeep: (state: S, action: A) => Array<KeyOf<S>>
): Reducer<S, A>

pickFrom<S extends Array, A>(
    getKeysToKeep: (state: S, action: A) => Array<KeyOf<S>>
): Reducer<S, A>
```

## Examples

```js
const getActionIds = fromAction('ids')
const keepIdsFromAction = pickFrom(getActionIds)

const state = {foo: 'foo', bar: 'bar', baz: 'baz', bay: 'bay'}
const action = {ids: ['bar', 'bay']};

keepIdsFromAction(state, action)
//=> {bar: 'bar', bay: 'bay'}
```

```js
const getActionIdxs = fromAction('idxs')
const keepIdxsFromAction = pickFrom(getActionIds)

const state = [1, 2, 3, 4, 5]
const action = {idxs: [0, 2, 4]}

keepIdxsFromAction(state, action)
//=> [1, 3, 5]
```
