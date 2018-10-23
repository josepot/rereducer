import withState from './withState'

export default withState((keys, state) => {
  const result = {}
  let count = 0
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (state.hasOwnProperty(key)) {
      result[key] = state[key]
      count += 1
    }
  }

  if (Array.isArray(state)) {
    return count === state.length
      ? state
      : Object.assign([], result).filter(Boolean)
  }

  return count === Object.keys(state).length ? state : result
})
