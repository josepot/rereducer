export default (...args) => x => (typeof x === 'function' ? x(...args) : x)
