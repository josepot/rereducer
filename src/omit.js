import withState from './withState'
import { clone } from './utils/index'

export default withState((keys, state) => {
  let i = 0
  for (; i < keys.length; i++) {
    if (state.hasOwnProperty(keys[i])) break
  }
  if (i === keys.length) return state

  const result = clone(state)
  for (let i = 0; i < keys.length; i++) {
    delete result[keys[i]]
  }
  return Array.isArray(result) ? result.filter(Boolean) : result
})
