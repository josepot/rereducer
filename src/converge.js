import { areArgsEqual, flagMemoized, toReducer } from './utils/index.js'

export default (dependencies, computeFn) => {
  const getDependencies = toReducer(dependencies)
  let prevDependencies = null
  let prevResult

  return flagMemoized(function() {
    const newDependencies = getDependencies.apply(null, arguments)
    if (areArgsEqual(prevDependencies, newDependencies)) return prevResult
    prevDependencies = newDependencies
    return (prevResult = computeFn.apply(null, newDependencies))
  })
}
