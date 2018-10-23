export default (fn, target) => {
  let didItChange = false
  const isArray = Array.isArray(target)
  const res = isArray ? new Array(target.length) : {}

  for (let key in target) {
    res[key] = fn(target[key], isArray ? parseInt(key, 10) : key, target)
    didItChange = didItChange || res[key] !== target[key]
  }

  return didItChange ? res : target
}
