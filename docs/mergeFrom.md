---
id: mergeFrom
title: mergeFrom
sidebar_label: mergeFrom
---

```
mergeFrom<S, A>(
    getObjectToMerge: (state: Object<S>, action: A) => Object<S>
): Reducer<Object<S>, A>
```

## Examples

```js
const getPayload = fromAction('payload')
const mergePayload = mergeFrom(getPayload)

const state = {foo: 'foo', bar: null}
const action = {payload: {bar: 'bar', baz: 'baz'}}

mergePayload(state, action)
//=> { foo: 'foo', bar: 'bar', baz: 'baz' }
```
