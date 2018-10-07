import composeReducers from './composeReducers'
import concat from './concat'
import createReducer from './createReducer'
import filter from './filter'
import fromAction from './fromAction'
import fromMeta from './fromMeta'
import fromPayload from './fromPayload'
import fromState from './fromState'
import getAction from './getAction'
import getState from './getState'
import isType from './fromMeta'
import map from './map'
import merge from './merge'
import reject from './reject'
import path from './path'
import switcher from './switcher'

const [innerReducer, outerReducer] = [true, false].map(path)
export {
  composeReducers,
  concat,
  createReducer,
  filter,
  fromAction,
  fromMeta,
  fromPayload,
  fromState,
  getAction,
  getState,
  innerReducer,
  isType,
  map,
  merge,
  outerReducer,
  reject,
  switcher
}
