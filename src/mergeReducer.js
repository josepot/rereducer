import { clone, customMemoized, toReducer } from './utils/index'

export default reducer => {
  const getVal = toReducer(reducer)
  return customMemoized(
    function() {
      return [arguments[0], getVal.apply(null, arguments)]
    },
    (a, b) => Object.assign(clone(a), b)
  )
}
