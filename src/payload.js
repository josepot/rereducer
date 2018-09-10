import { customMemoized, path } from './utils/index'

export default (...args) => {
  const pathFn = path.bind(null, ['payload'].concat(args))
  return customMemoized((state, action) => [action], pathFn)
}
