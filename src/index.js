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
import omit from './omit'
import pick from './pick'
import reject from './reject'
import path from './path'
import prop from './prop'
import switchReducers from './switchReducers'
import update from './update'

const [innerReducer, outerReducer] = [true, false].map(path)
const [innerProp, outerProp] = [true, false].map(prop)
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
  innerProp,
  innerReducer,
  isType,
  map,
  merge,
  omit,
  pick,
  outerProp,
  outerReducer,
  reject,
  switchReducers,
  update
}
