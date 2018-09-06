import { flagMemoized, registerExternalReducer } from './utils/index'

export default getter_ => {
  const getter = registerExternalReducer(getter_)
  let prevState, prevVal, prevResult
  return flagMemoized(function() {
    const state = arguments[0]
    const val = getter.apply(null, arguments)
    if (state === prevState && val === prevVal) return prevResult
    prevVal = val
    prevState = state
    return (prevResult = state.concat(val))
  })
}
