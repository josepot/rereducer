import always from './always'
import map from './map'
import { memoizeTemplateReducer } from './memoize'
import registerExternalReducer from './registerExternalReducer'

const toReducer = x => {
  switch (typeof x) {
    case 'function':
      return registerExternalReducer(x)
    case 'object':
      return memoizeTemplateReducer(map(toReducer, x))
    default:
      return always(x)
  }
}

export default toReducer
