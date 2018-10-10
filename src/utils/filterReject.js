const filterArray = (fn, target) => {
  const result = target.filter(fn)
  return result.length === target.length ? target : result
}

const filterObject = (fn, target) => {
  const result = {}
  let changed = false
  for (let key in target) {
    const val = target[key]
    if (fn(val, key, target)) result[key] = val
    else changed = true
  }
  return changed ? result : target
}

export const filter = (fn, target) =>
  (Array.isArray(target) ? filterArray : filterObject)(fn, target)

export const reject = (fn, target) =>
  filter(function() {
    return !fn.apply(null, arguments)
  }, target)
