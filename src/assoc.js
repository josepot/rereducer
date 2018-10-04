import getState from './getState'
import converge from './converge'
import { assoc } from './utils/index.js'

const computeFn = (state, key, value) =>
  state[key] === value ? state : assoc(key, value, state)

export default (keyGetter, template) =>
  converge([getState, keyGetter, template], computeFn)
