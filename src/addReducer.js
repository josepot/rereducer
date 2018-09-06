import {
  always,
  assoc,
  map,
  memoizeTemplateReducer,
  registerExternalReducer,
  toReducer,
  flagMemoized
} from './utils/index.js'

export default (keyGetter_, template_) => {
  const keyGetter = registerExternalReducer(keyGetter_)
  const template =
    typeof template_ !== 'object'
      ? always(template_)
      : memoizeTemplateReducer(map(toReducer, template_))

  let prevKey, prevValue, prevState, prevResult
  return flagMemoized(function() {
    const state = arguments[0]
    const value = template.apply(null, arguments)
    const key = keyGetter.apply(null, arguments)
    if (state === prevState && value === prevValue && key === prevKey) {
      return prevResult
    }
    prevKey = key
    prevValue = value
    prevState = state
    prevResult = state[key] === value ? state : assoc(key, value, state)
    return prevResult
  })
}
