import { path, flagMemoized } from './utils/index'

export default (...args) => {
  const pathFn = path.bind(path, args)
  let prevPayload, prevResult
  return flagMemoized((s, { payload } = {}) => {
    if (prevPayload === payload) return prevResult
    prevPayload = payload
    return (prevResult = pathFn(payload))
  })
}
