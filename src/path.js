import { assocPath, flagMemoized, path, toReducer } from './utils/index'
import composeReducers from './composeReducers'
import createReducer from './createReducer'
import getState from './getState'

export default isInner => {
  const enhancer = isInner
    ? (x, y) => flagMemoized(composeReducers(toReducer(x), y))
    : toReducer

  return function _path() {
    const getters = arguments[0]
    if (!getters) return _path
    const getCurrentValue = createReducer([getters, getState], path)
    const fn = reducer =>
      createReducer(
        [
          getCurrentValue,
          enhancer(reducer, getCurrentValue),
          getState,
          getters
        ],
        (oldVal, newVal, state, route) =>
          oldVal === newVal ? state : assocPath(route, newVal, state)
      )
    return arguments.length === 1 ? fn : fn(arguments[1])
  }
}
