---
id: innerReducer
title: innerReducer
sidebar_label: innerReducer
---

## Examples

```js
const getId = fromPayload('id')
const incNodeCounter = innerReducer([getId, 'count'], x => x + 1)
const decNodeCounter = innerReducer([getId, 'count'], x => x - 1)
const editText = innerReducer([getId, 'text'], fromPayload('text'))

const nodeReducer = switchReducers(
  {},
  ['INC', incNodeCounter],
  ['DEC', decNodeCounter],
  ['EDIT_TEXT', editText]
);

const state = {
  foo: {id: 'foo', count: 0, text: 'hello'},
  bar: {id: 'bar', count: 0, text: 'world'}
}

nodeReducer(state, {type: 'INC', payload: {id: 'foo'}})
// =>
// {
//   foo: {id: 'foo', count: 1, text: 'hello'},
//   bar: {id: 'bar', count: 0, text: 'world'}
// }

nodeReducer(state, {type: 'DEC', payload: {id: 'foo'}})
// =>
// {
//   foo: {id: 'foo', count: -1, text: 'hello'},
//   bar: {id: 'bar', count: 0, text: 'world'}
// }

nodeReducer(state, {type: 'EDIT_TEXT', payload: {id: 'foo', text: 'TEST'}})
// =>
// {
//   foo: {id: 'foo', count: 0, text: 'TEST'},
//   bar: {id: 'bar', count: 0, text: 'world'}
// }
```

Given the fact that `innerReducer` is a curried function, we could achieve the same like this:

```js
const getId = fromPayload('id')
const setNode = innerReducer([getId]);
const setCounter = compose(setNode, innerReducer(['count']));
const setText = compose(setNode, innerReducer(['text']));
​
const nodeReducer = switchReducers(
  {},
  ['INC', setCounter(x => x + 1)],
  ['DEC', setCounter(x => x - 1)],
  ['EDIT_TEXT', setText(fromPayload('text'))]
);
```

Also the second argument of `innerReducer` accepts template-reducers. E.g.:

```js
const getId = fromPayload('id')
const setNode = innerReducer([getId]);
​
const nodeReducer = switchReducers(
  {},
  ['ADD', setNode({id: getId, count: 0, text: ''})]
  // ...
);

nodeReducer({}, {type: 'ADD', payload: {id: 'baz'}})
// =>
// {
//   baz: {id: 'baz', count: 0, text: ''},
// }
```
