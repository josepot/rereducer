import { compose as c } from 'redux'
import { every, findIndex, not, prop, propEq, reject } from 'ramda'
import {
  concatReducer,
  fromAction,
  mapReducer,
  propReducer,
  rejectReducer,
  switchReducers
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
const getIdxByActionId = c(findIndex, isActionId)

const setTodo = propReducer(getIdxByActionId)
const setText = c(setTodo, propReducer('text'))
const setComplete = c(setTodo, propReducer('completed'))

const getNextId = arr => arr.map(prop('id')).reduce(Math.max) + 1
const isCompleted = propEq('completed', true)
const areAllCompleted = every(isCompleted)

const initialState = [{ id: 0, text: 'Use Redux', completed: false }]
export default switchReducers(
  initialState,
  [ADD_TODO, concatReducer({ id: getNextId, text: '', completed: false })],
  [DELETE_TODO, rejectReducer(isActionId)],
  [CLEAR_COMPLETED, reject(isCompleted)],
  [COMPLETE_ALL_TODOS, mapReducer(c(setComplete, not, areAllCompleted))],
  [EDIT_TODO, setText(fromAction(['text']))],
  [COMPLETE_TODO, setComplete(not)]
)
