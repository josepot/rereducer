import getState from './getState'
import createReducer from './createReducer'
import { map } from './utils/index'

export default mapFnReducer => createReducer([mapFnReducer, getState], map)
