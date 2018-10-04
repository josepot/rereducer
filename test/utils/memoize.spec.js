import {
  flagMemoized,
  isMemoized,
  memoizeExternalReducer,
  memoizeTemplateReducer
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
})
