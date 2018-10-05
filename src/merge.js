import getState from './getState'
import converge from './converge'
import { clone, isEmpty } from './utils/index'

export default getter =>
  converge(
    [getState, getter],
    (a, b) => (isEmpty(b) ? a : Object.assign(clone(a), b))
  )
