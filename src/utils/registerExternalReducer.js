import { isMemoized, memoizeExternalReducer } from './memoize'

const dict = new WeakMap()

export default input => {
  if (isMemoized(input)) return input

  let result = dict.get(input)
  if (result) return result

  result = memoizeExternalReducer(input)
  dict.set(input, result)
  return result
}
