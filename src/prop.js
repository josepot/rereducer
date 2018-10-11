import _path from './path'

export default isInner => {
  const path = _path(isInner)
  return function _prop() {
    const prop = arguments[0]
    if (!prop) return _prop
    const fn = path([prop])
    return arguments < 2 ? fn : fn(arguments[1])
  }
}
