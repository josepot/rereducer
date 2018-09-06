import { flagMemoized } from './utils/index'

export default x => flagMemoized((s, { type }) => type === x)
