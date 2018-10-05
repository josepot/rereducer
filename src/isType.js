import composeReducers from './composeReducers'
import fromAction from './fromAction'

export default x => composeReducers(y => y === x, fromAction('type'))
