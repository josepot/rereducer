import getState from './getState'
import createReducer from './createReducer'
import { clone, isEmpty } from './utils/index'

export default getter =>
  createReducer(
    [getState, getter],
    (a, b) => (isEmpty(b) ? a : Object.assign(clone(a), b))
  )
