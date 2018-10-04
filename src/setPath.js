import { assocPath, path } from './utils/index'
import converge from './converge'
import getState from './getState'
import getAction from './getAction'

export default (getters, innerReducer) => {
  const getCurrentValue = converge([getters, getState], path)
  const getNewValue = converge([getCurrentValue, getAction], innerReducer)

  return converge(
    [getCurrentValue, getNewValue, getState, getters],
    (oldVal, newVal, state, route) =>
      oldVal === newVal ? state : assocPath(route, newVal, state)
  )
}
