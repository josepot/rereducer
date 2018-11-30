---
id: filter
title: filter
sidebar_label: filter
---

```
filter<S, A>(
  getCondition: (state: Array<S>, action: A) =>
    (item: S, key: number) => boolean
): Reducer<Array<S>, A>

filter<S, A>(
  getCondition: (state: ObjectOf<S>, action: A) =>
    (item: S, key: string) => boolean
): Reducer<ObjectOf<S>, A>
```

## Examples
