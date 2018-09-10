import {
  flagMemoized,
  isMemoized,
  memoizeExternalReducer,
  memoizeTemplateReducer,
  customMemoized
} from '../../src/utils/memoize'
import { payload } from '../../src'

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
      const template = memoizeTemplateReducer([inc, payload('text')])

      const result1 = template(1, { payload: { text: 'hello' } })
      const result2 = template(1, { payload: { text: 'hello' } })
      const expectedResult = [2, 'hello']
      expect(result1).toEqual(expectedResult)
      expect(result2).toBe(result1)
    })

    it('memoizes Object template reducers', () => {
      const template = memoizeTemplateReducer({ x: inc, text: payload('text') })

      const result1 = template(1, { payload: { text: 'hello' } })
      const result2 = template(1, { payload: { text: 'hello' } })
      const expectedResult = { x: 2, text: 'hello' }
      expect(result1).toEqual(expectedResult)
      expect(result2).toBe(result1)
    })
  })

  describe('customMemoized', () => {
    let counter
    let memoized
    beforeEach(() => {
      counter = 0
    })

    it('memoizes the latests results of the given args', () => {
      memoized = customMemoized(
        (s, action) => [s, action.payload],
        (...args) => {
          counter++
          return args
        }
      )
      expect(counter).toBe(0)
      const output1 = memoized('foo', { payload: 'bar' })
      expect(output1).toEqual(['foo', 'bar'])
      expect(counter).toBe(1)
      const output2 = memoized('foo', { payload: 'bar' })
      expect(counter).toBe(1)
      expect(output2).toBe(output1)
    })

    it('does not memoize the extra args', () => {
      memoized = customMemoized(
        (s, action) => [s, action.payload],
        (...args) => [args],
        (...args) => {
          counter++
          return args
        }
      )

      expect(counter).toBe(0)
      const params = ['foo', { payload: 'bar' }]
      const output1 = memoized(...params)
      expect(output1).toEqual(['foo', 'bar', params])
      const output2 = memoized('foo', { payload: 'bar' }, 'whatever')
      expect(counter).toBe(1)
      expect(output2).toBe(output1)
    })
  })
})
