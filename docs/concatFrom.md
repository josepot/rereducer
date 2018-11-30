---
id: concatFrom
title: concatFrom
sidebar_label: concatFrom
---

```
concatFrom<S, A>(
    getValueToConcat: (state: Array<S>, action: A) => (S | Array<S>)
): Reducer<Array<S>, A>

concatFrom<A>(
    getValueToConcat: (state: string, action: A) => string
): Reducer<string, A>
```

## Examples

```js
const getActionIds = fromAction('ids')
const appendIdsFromAction = concatFrom(getActionIds)

const state = ['foo', 'baz']
const action = {ids: ['bar', 'bay']};

appendIdsFromAction(state, action)
//=> ['foo', 'baz', 'bar', 'bay']
```

```js
const getActionText = fromAction('text')
const appendActionText = concatFrom(getActionText)

const state = 'foo'
const action = {text: 'bar'}

appendActionText(state, action)
//=> 'foobar'
```
