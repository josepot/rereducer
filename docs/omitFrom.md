---
id: omitFrom
title: omitFrom
sidebar_label: omitFrom
---

```
omitFrom<S extends Object, A>(
    getKeysToKeep: (state: S, action: A) => Array<KeyOf<S>>
): Reducer<S, A>

omitFrom<S extends Array, A>(
    getKeysToKeep: (state: S, action: A) => Array<KeyOf<S>>
): Reducer<S, A>
```

## Examples

```js
const getActionIds = fromAction('ids')
const removeIdsFromAction = omitFrom(getActionIds)

const state = {foo: 'foo', bar: 'bar', baz: 'baz', bay: 'bay'}
const action = {ids: ['bar', 'bay']};

removeIdsFromAction(state, action)
//=> {foo: 'foo', baz: 'baz'}
```

```js
const getActionIdxs = fromAction('idxs')
const removeIdxsFromAction = omit(getActionIds)

const state = [1, 2, 3, 4, 5]
const action = {idxs: [0, 2, 4]}

removeIdxsFromAction(state, action)
//=> [2, 4]
```
