---
id: getAction
title: getAction
sidebar_label: getAction
---

```
getAction(state: S, action: A): A
```

A function that returns the second parameter supplied to it.


## Examples

```js
getAction('test', {type: 'TEST'}) //=> {type: 'TEST'}
```
