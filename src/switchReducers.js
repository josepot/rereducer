import {
  err,
  flagMemoized,
  registerExternalReducer,
  toReducer
} from './utils/index'
import isType from './isType'

const getMatcher = pattern => {
  const patternType = typeof pattern
  if (patternType === 'string') return isType(pattern)
  if (patternType === 'function') return registerExternalReducer(pattern)

  // It has to be an Array
  const matchers = pattern.map(getMatcher)
  return (state, action) => matchers.find(m => m(state, action)) !== undefined
}

const isValidPattern = pattern => {
  if (['string', 'function'].indexOf(typeof pattern) > -1) return true
  if (Array.isArray(pattern)) {
    return pattern.length === pattern.filter(isValidPattern).length
  }
  return false
}

const validatePairs = pairs => {
  err(pairs.length > 0, `No Matchers were passed to switchReducers`)

  pairs.forEach(arg => {
    err(
      Array.isArray(arg),
      `Expected an Array instead it received ${typeof arg}`
    )
    err(arg.length === 2, `The entries of the main Array should be Tuples`)

    const [pattern] = arg
    err(
      isValidPattern(pattern),
      'The first entry of the Tuple is not a valid pattern'
    )
  })
}

export default (initialState, ...pairs) => {
  if (process.env.NODE_ENV !== 'production') {
    err(
      initialState !== undefined,
      `The initial state of a reducer can not be undefined`
    )
    validatePairs(pairs)
  }

  const watchers = pairs.map(([pattern, reducer]) => [
    getMatcher(pattern),
    toReducer(reducer)
  ])

  return flagMemoized((state = initialState, action = {}) => {
    const winner = watchers.find(([watcher]) => watcher(state, action))
    return winner ? winner[1](state, action) : state
  })
}
