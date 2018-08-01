export default (path, target) => {
  let result = target
  for (let i = 0; i < path.length; i++) {
    try {
      result = result[path[i]]
    } catch (e) {
      return undefined
    }
  }
  return result
}
