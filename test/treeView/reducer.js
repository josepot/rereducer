// Using rereducer and ramda to rewrite the following redux example:
// https://github.com/reduxjs/redux/blob/master/examples/tree-view/src/reducers/index.js
import {
  INCREMENT,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE
} from './actions'
import { compose as c, equals, inc, isNil } from 'ramda'
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

const setNode = innerReducer([getNodeId])
const setCounter = c(setNode, innerReducer(['counter']))
const setChildIds = c(setNode, innerReducer(['childIds']))
const isActionMissingNodeId = c(isNil, getNodeId)

const getSubtreeIds = createReducer([getState, getNodeId], (tree, rootId) => {
  const innerFn = id => [id, ...tree[id].childIds.map(innerFn)]
  return innerFn(rootId)
})

export default switchReducers(
  {},
  [isActionMissingNodeId, getState],
  [DELETE_NODE, omit(getSubtreeIds)],
  [CREATE_NODE, setNode({ id: getNodeId, counter: 0, childIds: [] })],
  [INCREMENT, setCounter(inc)],
  [ADD_CHILD, setChildIds(concat(getChildId))],
  [REMOVE_CHILD, setChildIds(reject(c(equals, getChildId)))]
)
