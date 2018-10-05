import { assocPath, path, toReducer } from './utils/index'
import composeReducers from './composeReducers'
import createReducer from './createReducer'
import getState from './getState'

export default (getters, innerReducer_) => {
  const innerReducer = toReducer(innerReducer_)
  const getCurrentValue = createReducer([getters, getState], path)
  const getNewValue = composeReducers(innerReducer, getCurrentValue)

  return createReducer(
    [getCurrentValue, getNewValue, getState, getters],
    (oldVal, newVal, state, route) =>
      oldVal === newVal ? state : assocPath(route, newVal, state)
  )
}
