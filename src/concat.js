import getState from './getState'
import converge from './converge'

const concat = (state, val) => state.concat(val)
export default getter => converge([getState, getter], concat)
