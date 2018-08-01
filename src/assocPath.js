import clone from './clone'

export default (path, val, target) => {
  const res = clone(target)
  const lastProp = path[path.length - 1]

  let targetRef = res
  for (let i = 0; i < path.length - 1; i++) {
    const prop = path[i]
    targetRef[prop] = clone(targetRef[prop])
    targetRef = targetRef[prop]
  }

  targetRef[lastProp] = val
  return res
}
