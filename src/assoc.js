import getState from './getState'
import converge from './converge'
import { assoc } from './utils/index.js'

export default (keyGetter, template) =>
  converge(
    [getState, keyGetter, template],
    (state, key, value) =>
      state[key] === value ? state : assoc(key, value, state)
  )
