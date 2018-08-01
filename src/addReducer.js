import map from './map'
import assoc from './assoc'
import fnOrVal from './fnOrVal'

export default (keyGetter, template) => (state, ...rest) => {
  const key = fnOrVal(state, ...rest)(keyGetter)
  const getter = fnOrVal(state, ...rest)
  const newEntry =
    typeof template === 'object' ? map(getter, template) : getter(template)
  return assoc(key, newEntry, state)
}
