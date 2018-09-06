import {
  assocPath,
  flagMemoized,
  memoizeTemplateReducer,
  path,
  registerExternalReducer,
  toReducer
} from './utils/index'

export default (getters, reducer) => {
  const getRoute = memoizeTemplateReducer(
    Array.isArray(getters) ? getters.map(toReducer) : [toReducer(getters)]
  )
  const getVal = registerExternalReducer(reducer)

  return flagMemoized(function() {
    const route = getRoute.apply(null, arguments)
    const state = arguments[0]
    const oldVal = path(route, state)

    arguments[0] = oldVal
    const newVal = getVal.apply(null, arguments)
    return oldVal === newVal ? state : assocPath(route, newVal, state)
  })
}
