import getAction from './getAction'
import createReducer from './createReducer'
import { path } from './utils/index'

export default route => createReducer([route, getAction], path)
