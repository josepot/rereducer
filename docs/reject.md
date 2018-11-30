---
id: reject
title: reject
sidebar_label: reject
---

```
reject<S, A>(
  getCondition: (state: Array<S>, action: A) =>
    (item: S, key: number) => boolean
): Reducer<Array<S>, A>

reject<S, A>(
  getCondition: (state: ObjectOf<S>, action: A) =>
    (item: S, key: string) => boolean
): Reducer<ObjectOf<S>, A>
```

## Examples
