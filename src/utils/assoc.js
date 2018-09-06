import clone from './clone'

export default (prop, val, target) => {
  const res = clone(target)
  res[prop] = val
  return res
}
