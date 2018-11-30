---
id: outerReducer
title: outerReducer
sidebar_label: outerReducer
---

## Examples

```js
const getNextId = state => Object
    .keys(state)
    .map(x => parseInt(x, 10))
    .reduce(Math.max, 0) + 1

const newItemReducer = outerReducer([getNextId], {id: getNextId, text: ''})

newItemReducer({
  1: {id: 1, text: 'foo'},
  3: {id: 3, text: 'bar'},
  5: {id: 5, text: 'baz'}
})
// =>
//{
//  1: {id: 1, text: 'foo'},
//  3: {id: 3, text: 'bar'},
//  5: {id: 5, text: 'baz'},
//  6: {id: 6, text: ''},
// }
```
