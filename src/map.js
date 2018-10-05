import getState from './getState'
import converge from './converge'
import { map } from './utils/index'

export default mapFnReducer => converge([mapFnReducer, getState], map)
