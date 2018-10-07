import createReducer from './createReducer'
import getState from './getState'

export default updater => fn => createReducer([fn, getState], updater)
