import {
  assocPath,
  customMemoized,
  memoizeTemplateReducer,
  path,
  toReducer
} from './utils/index'

export default (getters, reducer) => {
  const getRoute = memoizeTemplateReducer(
    Array.isArray(getters) ? getters.map(toReducer) : [toReducer(getters)]
  )
  const getVal = toReducer(reducer)

  return customMemoized(
    function() {
      return [getRoute.apply(null, arguments), arguments[0]]
    },
    function() {
      return [arguments]
    },
    (route, state, args) => {
      const oldVal = path(route, state)
      args[0] = oldVal
      const newVal = getVal.apply(null, args)
      return oldVal === newVal ? state : assocPath(route, newVal, state)
    }
  )
}
