import getState from './getState'
import createReducer from './createReducer'
import { path } from './utils/index'

export default (...getRoute) => createReducer([getRoute, getState], path)
