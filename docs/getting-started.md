---
id: getting-started
title: Getting Started
---

I think that the best way to explain who to use this library is through concrete examples. So, lets get started. Imagine that you have a reducer like this:

```js
const counter = (state = 0, {type, payload}) {
  switch (type) {
    case 'INCREASE': {
      return state + 1
    }
    case 'DECREASE': {
      return state - 1
    }
    case 'SET': {
      return payload.counter
    }
    case 'RESET': {
      return 0;
    }
    default: {
      return state
    }
  }
};
```

Using rereducer you could do something like this instead:

```js
const inc = x => x + 1
const dec = x => x - 1

const counter = switchReducers(
  0,
  ['INCREASE', inc],
  ['DECREASE', dec],
  ['SET', fromPayload('counter')],
  ['RESET', 0]
);
```

_It's worth noting that if you are already using a library like Ramda, you won't have to define the functions `inc` and `dec`_

First lets explain what `swithcReducers` is about:

- It's a funcition that returns a reducer (a higher order reducer).
- It's first parameter is the default value of the reducer;
- The other parameters are tuples of "cases".

A case has 2 parts:
 - the `Matcher` (or predicate), usually a string with the action type that should be match) and the second part is the transformation. It can also be a function that takes the state and the action and returns `true` if there is a match and `false` is there is no match, or a list of string, or a list of strings and functions...
- the transformation: a function that receives the state and the action and returns the new state.

