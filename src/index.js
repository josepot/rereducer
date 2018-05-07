import invariant from 'invariant';

const findIndex = (array, fn) => {
  for (let i = 0; i < array.length; i++) if (fn(array[i], i, array)) return i;
  return -1;
}

const getMatcher = (pattern) => {
  const patternType = typeof pattern;
  if (patternType === 'string') return ({ type }) => type === pattern;
  if (patternType === 'function') return pattern;

  // It has to be an Array
  const matchers = pattern.map(getMatcher);
  return (action, state) => (findIndex(matchers, m => m(action, state)) > -1);
};

const isValidPattern = pattern => {
  if (['string', 'function'].indexOf(typeof pattern) > -1) return true;
  if (Array.isArray(pattern)) {
    return pattern.length === pattern.filter(isValidPattern).length;
  }
  return false;
};

const validateArguments = args => args.forEach(arg => {
  invariant(Array.isArray(arg), `Expected an Array instead it received ${typeof arg}`);
  invariant(arg.length === 2, `The array should have a length of 2, instead it had a length of ${arg.length}`);

  const [pattern, transformation] = arg;
  invariant(isValidPattern(pattern), 'The first entry of the Array is supposed to be a valid pattern: a string, a function or an Array of valid patterns.');
  invariant(typeof transformation === 'function', 'The second entry of the Array is supposed to be a function');
});

const isArgumentInitialValue = argument => !(
  Array.isArray(argument) && argument.length === 2 &&
  typeof argument[1] === 'function' && isValidPattern(argument[0])
);

export default (...args) => {
  const [firstArgument] = args;
  const [initialValue, pairs] = isArgumentInitialValue(firstArgument) ?
    [firstArgument, args.slice(1)] :
    [undefined, args];

  validateArguments(pairs);
  const watchers = pairs.map(([ pattern ]) => getMatcher(pattern));
  const getReducer = initialState => (state = initialState, action = {}, ...others) => {
    const winnerIdx = findIndex(watchers, watcher => watcher(action, state));
    return winnerIdx > -1 ?
      pairs[winnerIdx][1](state, action, ...others) :
      state;
  };
  return initialValue === undefined ? getReducer : getReducer(initialValue);
};

export const getPayload = (state, {payload}) => payload;
