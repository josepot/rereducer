import {
  flagMemoized,
  isMemoized,
  memoizeExternalReducer,
  memoizeTemplateReducer,
  getNRelevantArgs
} from '../../src/utils/memoize'
import { fromPayload } from '../../src'

const inc = x => x + 1

describe('memoize', () => {
  describe('flagmemoized/isMemoized', () => {
    it('keeps track of memoized functions', () => {
      const testFn = () => null
      expect(isMemoized(testFn)).toBe(false)
      flagMemoized(testFn)
      expect(isMemoized(testFn)).toBe(true)
    })
  })

  describe('external reducers', () => {
    let counter
    let result
    let memoized
    beforeEach(() => {
      counter = 0
      memoized = memoizeExternalReducer(x => {
        counter++
        return inc(x)
      })
    })

    it(`only memoizes the latest result`, () => {
      result = memoized(1)
      expect(result).toBe(2)
      expect(counter).toBe(1)

      result = memoized(1)
      expect(result).toBe(2)
      expect(counter).toBe(1)

      result = memoized(2)
      expect(result).toBe(3)
      expect(counter).toBe(2)

      result = memoized(1)
      expect(result).toBe(2)
      expect(counter).toBe(3)
    })

    it(`only uses the first arg to memoize when it's possible to determine that's the only relevant arg`, () => {
      result = memoized(1, 'foo')
      expect(result).toBe(2)
      expect(counter).toBe(1)

      result = memoized(1, 'foo')
      expect(result).toBe(2)
      expect(counter).toBe(1)

      result = memoized(1, 'bar')
      expect(result).toBe(2)
      expect(counter).toBe(1)

      result = memoized(2, 'bar')
      expect(result).toBe(3)
      expect(counter).toBe(2)
    })

    it('does not memoize an external reducer more than once', () => {
      const rememoized = memoizeExternalReducer(memoized)
      expect(rememoized).toBe(memoized)
    })
  })

  describe('template reducers', () => {
    it('memoizes Array template reducers', () => {
      const template = memoizeTemplateReducer([inc, fromPayload('text')])

      const result1 = template(1, { payload: { text: 'hello' } })
      const result2 = template(1, { payload: { text: 'hello' } })
      const expectedResult = [2, 'hello']
      expect(result1).toEqual(expectedResult)
      expect(result2).toBe(result1)
    })

    it('memoizes Object template reducers', () => {
      const template = memoizeTemplateReducer({
        x: inc,
        text: fromPayload('text')
      })

      const result1 = template(1, { payload: { text: 'hello' } })
      const result2 = template(1, { payload: { text: 'hello' } })
      const expectedResult = { x: 2, text: 'hello' }
      expect(result1).toEqual(expectedResult)
      expect(result2).toBe(result1)
    })
  })

  describe('getNRelevantArgs', () => {
    it('returns Infinity for functions that use `arguments`', () => {
      const input = function() {
        return arguments
      }
      expect(getNRelevantArgs(input)).toBe(Infinity)
    })

    it('returns Infinity for functions that use the spread operator', () => {
      const input = {
        toString: () => '(a, b, ...args) => args'
      }
      expect(getNRelevantArgs(input)).toBe(Infinity)
    })

    it('returns the real number of args for the rest of functions', () => {
      expect(getNRelevantArgs((a, b, c) => c)).toBe(3)

      function withAnnoyingComments(
        // this comment is missleadin, you know
        a,
        /* and this other comment is missleading too, because, you know
        commas, and, all
        */
        b
      ) {
        return true
      }
      expect(getNRelevantArgs(withAnnoyingComments)).toBe(2)

      function withDefaults(a, b = 1, c, d = 3) {
        return a + b + c + d
      }
      expect(getNRelevantArgs(withDefaults)).toBe(4)
    })
  })
})
