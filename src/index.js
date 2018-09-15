import assocReducer from './assocReducer'
import concatReducer from './concatReducer'
import getPayload from './getPayload'
import isType from './isType'
import payload from './payload'
import rereducer from './rereducer'
import subReducer from './subReducer'

export default rereducer
export {
  assocReducer,
  concatReducer,
  getPayload, // keep backwards compatibility
  isType,
  payload,
  subReducer
}
