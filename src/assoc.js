import getState from './getState'
import createReducer from './createReducer'
import { assoc } from './utils/index.js'

export default (keyGetter, template) =>
  createReducer(
    [getState, keyGetter, template],
    (state, key, value) =>
      state[key] === value ? state : assoc(key, value, state)
  )
