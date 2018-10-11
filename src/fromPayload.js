import fromAction from './fromAction'
import { getViewerFor } from './path'

export default getViewerFor(fromAction('payload'))
