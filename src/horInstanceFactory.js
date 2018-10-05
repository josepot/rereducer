import getState from './getState'
import converge from './converge'

export default fn => reducer => converge([getState, reducer], fn.call.bind(fn))
