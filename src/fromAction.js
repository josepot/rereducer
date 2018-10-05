import getAction from './getAction'
import createReducer from './createReducer'
import { path } from './utils/index'

export default (...getRoute) => createReducer([getRoute, getAction], path)
