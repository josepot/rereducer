import getState from './getState'

export default function composeReducers(...funcs) {
  if (funcs.length === 0) return getState
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a, b) => (state, action) => a(b(state, action), action))
}
