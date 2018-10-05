import { assocPath, path, toReducer } from './utils/index'
import composeReducers from './composeReducers'
import converge from './converge'
import getState from './getState'

export default (getters, innerReducer_) => {
  const innerReducer = toReducer(innerReducer_)
  const getCurrentValue = converge([getters, getState], path)
  const getNewValue = composeReducers(innerReducer, getCurrentValue)

  return converge(
    [getCurrentValue, getNewValue, getState, getters],
    (oldVal, newVal, state, route) =>
      oldVal === newVal ? state : assocPath(route, newVal, state)
  )
}
