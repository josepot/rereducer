const getMatcher = (pattern) => {
  const patternType = typeof pattern;
  if (patternType === 'string') return ({ type }) => type === pattern;
  if (patternType === 'function') return pattern;
  if (Array.isArray(pattern)) {
    return (action, state) => {
      let val;
      for (let i = 0; !val && i < pattern.length; i += 1) {
        val = getMatcher(pattern[i])(action, state);
      }
      return val;
    };
  }

  throw new Error(
    `Watcher pattern was expected to be a string, a function or an Array of patterns, instead it received ${patternType}`
  );
};

export default (...args) => {
  const watchers = args.map(([ pattern ]) => getMatcher(pattern));

  return initialState => (state = initialState, action = {}) => {
    const winnerIdx = watchers.findIndex(watcher => watcher(action, state));

    return winnerIdx > -1 ?
      args[winnerIdx][1](state, action) :
      state;
  };
};
