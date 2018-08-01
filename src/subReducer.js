import fnOrVal from './fnOrVal'
import assocPath from './assocPath'
import path from './path'

export default (...getters) => reducer => (state, ...rest) => {
  const fnOrVal_ = fnOrVal(state, ...rest)
  const pathProps = getters.map(fnOrVal_)
  const oldVal = path(pathProps, state)
  const newVal = reducer(oldVal, ...rest)
  return oldVal === newVal ? state : assocPath(pathProps, newVal, state)
}
