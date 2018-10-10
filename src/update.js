import { createReducer, getAction, map } from './index'

export default function update() {
  const whenHOF = arguments[0]
  if (!whenHOF) return update
  const fn = updater =>
    map(
      createReducer([getAction, whenHOF], (action, whenFn) => innerState =>
        whenFn(innerState) ? updater(innerState, action) : innerState
      )
    )
  return arguments.length < 2 ? fn : fn(arguments[1])
}
