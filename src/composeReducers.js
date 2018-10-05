import { always } from './utils/index'

export default function composeReducers(...funcs) {
  if (funcs.length === 0) return always
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a, b) => (s, ...args) => a(b(s, ...args), ...args))
}