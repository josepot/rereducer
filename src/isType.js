import converge from './converge'
import fromAction from './fromAction'

export default x => converge([fromAction('type')], y => y === x)
