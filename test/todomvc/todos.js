import { compose as c, combineReducers } from 'redux'
import { every, identity, not, prop, propEq, reject } from 'ramda'
import {
  concatReducer,
  fromAction,
  innerReducer,
  mapReducer,
  rejectReducer,
  switchReducers,
  updateReducer
} from '../../src'
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED
} from './actions'

const isActionId = c(propEq('id'), fromAction(['id']))
const getNextId = arr => arr.map(prop('id')).reduce(Math.max) + 1

const completeAllMapper = c(
  innerReducer(['completed']),
  every(prop('completed'))
)
const todo = combineReducers({
  id: identity,
  text: switchReducers('', [EDIT_TODO, fromAction(['text'])]),
  completed: switchReducers(false, [COMPLETE_TODO, not])
})

const initialState = [{ id: 0, text: 'Use Redux', completed: false }]
export default switchReducers(
  initialState,
  [ADD_TODO, concatReducer({ id: getNextId, text: '', completed: false })],
  [DELETE_TODO, rejectReducer(isActionId)],
  [CLEAR_COMPLETED, reject(propEq('completed', false))],
  [COMPLETE_ALL_TODOS, mapReducer(completeAllMapper)],
  [[EDIT_TODO, COMPLETE_TODO], updateReducer(isActionId, todo)]
)
