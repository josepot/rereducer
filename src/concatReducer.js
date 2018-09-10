import { customMemoized, registerExternalReducer } from './utils/index'

export default getter_ => {
  const getter = registerExternalReducer(getter_)
  return customMemoized(
    function() {
      return [arguments[0], getter.apply(null, arguments)]
    },
    (state, val) => state.concat(val)
  )
}
