import { assocPath, path, toReducer } from './utils/index'
import composeReducers from './composeReducers'
import createReducer from './createReducer'
import getState from './getState'

export default isInner => (getters, reducer_) => {
  const reducer = toReducer(reducer_)
  const getCurrentValue = createReducer([getters, getState], path)
  const getNewValue = isInner
    ? composeReducers(reducer, getCurrentValue)
    : reducer

  return createReducer(
    [getCurrentValue, getNewValue, getState, getters],
    (oldVal, newVal, state, route) =>
      oldVal === newVal ? state : assocPath(route, newVal, state)
  )
}
