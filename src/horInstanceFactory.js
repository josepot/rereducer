import getState from './getState'
import createReducer from './createReducer'

export default fn => reducer =>
  createReducer([getState, reducer], fn.call.bind(fn))
