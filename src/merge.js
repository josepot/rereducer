import getState from './getState'
import converge from './converge'
import { clone, isEmpty } from './utils/index'

const merge = (a, b) => (isEmpty(b) ? a : Object.assign(clone(a), b))

export default getter => converge([getState, getter], merge)
