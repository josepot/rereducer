import getAction from './getAction'
import converge from './converge'
import { path } from './utils/index'

export default (...getRoute) => converge([getRoute, getAction], path)
