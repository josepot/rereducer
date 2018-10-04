import getState from './getState'
import converge from './converge'
import { path } from './utils/index'

export default (...getRoute) => converge([getRoute, getState], path)
