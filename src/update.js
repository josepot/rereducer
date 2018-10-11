import createReducer from './createReducer'
import getAction from './getAction'
import map from './map'

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
