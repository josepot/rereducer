import always from './always'
import map from './map'

const memoizedSet = new WeakSet()

export const flagMemoized = fn => {
  memoizedSet.add(fn)
  return fn
}
export const isMemoized = memoizedSet.has.bind(memoizedSet)

function cleanArgsStr(str) {
  return str.replace(
    /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g,
    ''
  )
}

function getNRelevantArgs(fn) {
  const str = fn.toString()
  if (str.startsWith('function') && str.match(/\W(arguments)\W/))
    return Infinity

  const argsStr = cleanArgsStr(
    str.substring(str.indexOf('(') + 1, str.indexOf(')'))
  )

  if (argsStr.length === 0) return 0

  return argsStr.indexOf('...') > -1 ? Infinity : argsStr.split(',').length
}

export function areArgsEqual(prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false
  }
  const len = prev.length
  for (let i = 0; i < len; i++) {
    if (prev[i] !== next[i]) return false
  }
  return true
}

export const memoizeExternalReducer = reducer => {
  if (isMemoized(reducer)) return reducer

  const nRelevantArgs = getNRelevantArgs(reducer)

  if (nRelevantArgs === 0) return flagMemoized(reducer)

  let lastArgs = null
  let lastResult = null
  const result = function() {
    if (arguments.length > nRelevantArgs) {
      arguments.length = nRelevantArgs
    }
    if (areArgsEqual(lastArgs, arguments)) return lastResult
    lastResult = reducer.apply(null, arguments)
    lastArgs = arguments
    return lastResult
  }
  return flagMemoized(result)
}

export const memoizeTemplateReducer = template => {
  let prevResult = map(always(undefined), template)
  const keys = Object.keys(template)
  const keysLen = keys.length
  return flagMemoized(function() {
    const res = map(fn => fn.apply(null, arguments), template)
    for (let i = 0; i < keysLen; i++) {
      const key = keys[i]
      if (prevResult[key] !== res[key]) return (prevResult = res)
    }
    return prevResult
  })
}
