import addReducer from './addReducer'
import concatReducer from './concatReducer'
import getPayload from './getPayload'
import isType from './isType'
import payload from './payload'
import rereducer from './rereducer'
import subReducer from './subReducer'

export default rereducer
export {
  addReducer,
  concatReducer,
  getPayload, // keep backwards compatibility
  isType,
  payload,
  subReducer
}
