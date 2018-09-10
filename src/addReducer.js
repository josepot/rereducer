import {
  always,
  assoc,
  customMemoized,
  map,
  memoizeTemplateReducer,
  registerExternalReducer,
  toReducer
} from './utils/index.js'

export default (keyGetter_, template_) => {
  const keyGetter = registerExternalReducer(keyGetter_)
  const template =
    typeof template_ !== 'object'
      ? always(template_)
      : memoizeTemplateReducer(map(toReducer, template_))

  return customMemoized(
    function() {
      return [
        arguments[0],
        template.apply(null, arguments),
        keyGetter.apply(null, arguments)
      ]
    },
    (state, value, key) =>
      state[key] === value ? state : assoc(key, value, state)
  )
}
