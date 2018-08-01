import path from './path'

export default (...args) => (s, { payload }) => path(args, payload)
