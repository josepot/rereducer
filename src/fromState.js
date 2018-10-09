import getState from './getState'
import createReducer from './createReducer'
import { path } from './utils/index'

export default route => createReducer([route, getState], path)
