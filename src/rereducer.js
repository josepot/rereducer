import err from './utils/err'

const getMatcher = pattern => {
  const patternType = typeof pattern
  if (patternType === 'string') return (x, { type }) => type === pattern
  if (patternType === 'function') return pattern

  // It has to be an Array
  const matchers = pattern.map(getMatcher)
  return (...args) => matchers.find(m => m(...args)) !== undefined
}

const isValidPattern = pattern => {
  if (['string', 'function'].indexOf(typeof pattern) > -1) return true
  if (Array.isArray(pattern)) {
    return pattern.length === pattern.filter(isValidPattern).length
  }
  return false
}

const validateArguments = args =>
  args.forEach(arg => {
    err(
      Array.isArray(arg),
      `Expected an Array instead it received ${typeof arg}`
    )
    err(arg.length === 2, `The entries of the main Array should be Tuples`)

    const [pattern, transformation] = arg
    err(
      isValidPattern(pattern),
      'The first entry of the Tuple is not a valid pattern'
    )
    err(
      typeof transformation === 'function',
      'The second entry of a Tuple should be a reducer'
    )
  })

const isArgumentInitialValue = argument =>
  !(
    Array.isArray(argument) &&
    argument.length === 2 &&
    typeof argument[1] === 'function' &&
    isValidPattern(argument[0])
  )

export default (...args) => {
  const [firstArgument] = args
  const [initialValue, pairs] = isArgumentInitialValue(firstArgument)
    ? [firstArgument, args.slice(1)]
    : [undefined, args]

  if (process.env.NODE_ENV !== 'production') {
    validateArguments(pairs)
  }
  const watchers = pairs.map(([pattern, reducer]) => [
    getMatcher(pattern),
    reducer
  ])
  const getReducer = initialState => (
    state = initialState,
    action = {},
    ...others
  ) => {
    const winner = watchers.find(([watcher]) =>
      watcher(state, action, ...others)
    )
    return winner ? winner[1](state, action, ...others) : state
  }
  return initialValue === undefined ? getReducer : getReducer(initialValue)
}
