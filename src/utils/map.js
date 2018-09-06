export default (fn, target) =>
  Array.isArray(target)
    ? target.map(fn)
    : Object.keys(target).reduce((acc, key) => {
        acc[key] = fn(target[key], key)
        return acc
      }, {})
