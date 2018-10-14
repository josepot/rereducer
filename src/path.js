import { always, assocPath, flagMemoized, path, toReducer } from './utils/index'
import composeReducers from './composeReducers'
import createReducer from './createReducer'
import getState from './getState'

const toArray = x => (Array.isArray(x) ? x : [x])

const pathReducer = isInner => {
  const enhancer = isInner
    ? (x, y) => flagMemoized(composeReducers(toReducer(x), y))
    : toReducer

  return function _path() {
    let getters = arguments[0]
    if (getters == null) return _path
    getters = toArray(getters)
    const getCurrentValue = createReducer([getters, getState], path)
    const fn = reducer =>
      createReducer(
        [getters, enhancer(reducer, getCurrentValue), getState],
        assocPath
      )
    return arguments.length === 1 ? fn : fn(arguments[1])
  }
}

export const [innerReducer, outerReducer] = [true, false].map(pathReducer)
export const getViewerFor = from => route =>
  createReducer([always(toArray(route)), from], path)
