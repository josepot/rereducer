export default x =>
  Array.isArray(x) ? x.length === 0 : Object.keys(x).length === 0
