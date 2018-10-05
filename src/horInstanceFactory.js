import getState from './getState'
import converge from './converge'

export default fn => {
  const call = fn.call.bind(fn)
  return reducer => converge([getState, reducer], call)
}
