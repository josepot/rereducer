import always from './always'
import registerExternalReducer from './registerExternalReducer'

export default x =>
  (typeof x === 'function' ? registerExternalReducer : always)(x)
