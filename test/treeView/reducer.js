// Using rereducer and ramda to rewrite the following redux example:
// https://github.com/reduxjs/redux/blob/master/examples/tree-view/src/reducers/index.js
import {
  INCREMENT,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE
} from './actions'
import { combineReducers } from 'redux'
import { compose as c, equals, inc, isNil, T } from 'ramda'
import {
  concat,
  createReducer,
  fromAction,
  getState,
  innerReducer,
  omit,
  reject,
  switchReducers
} from '../../src'

const getChildId = fromAction('childId')
const getNodeId = fromAction('nodeId')
const isActionMissingNodeId = c(isNil, getNodeId)

const node = combineReducers({
  id: switchReducers(0, [CREATE_NODE, getNodeId]),
  counter: switchReducers(0, [INCREMENT, inc]),
  childIds: switchReducers(
    [],
    [ADD_CHILD, concat(getChildId)],
    [REMOVE_CHILD, reject(c(equals, getChildId))]
  )
})

const getSubtreeIds = createReducer([getState, getNodeId], (tree, rootId) => {
  const innerFn = id => [id, ...tree[id].childIds.map(innerFn)]
  return innerFn(rootId)
})

export default switchReducers(
  {},
  [isActionMissingNodeId, getState],
  [DELETE_NODE, omit(getSubtreeIds)],
  [T, innerReducer([getNodeId], node)]
)
