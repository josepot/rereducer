export const filter = (fn, target) =>
  Array.isArray(target)
    ? target.filter(fn)
    : Object.keys(target).reduce((acc, key) => {
        if (fn(target[key], key, target)) acc[key] = target[key]
        return acc
      }, {})

export const reject = (fn, target) =>
  filter(function() {
    return !fn.apply(null, arguments)
  }, target)
