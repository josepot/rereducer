import expect from 'expect'
import { switcher, fromPayload } from '../src/'

describe('switcher', () => {
  describe('patterns', () => {
    it('should accept string patterns', () => {
      const reducer = switcher(
        0,
        ['INCREASE', x => x + 1],
        ['DECREASE', x => x - 1]
      )
      expect(reducer()).toEqual(0)
      expect(reducer(0, { type: 'INCREASE' })).toEqual(1)
      expect(reducer(0, { type: 'DECREASE' })).toEqual(-1)
    })

    it('should accept function patterns', () => {
      const whenIncreaseByFactor = (state, { type, factor }) =>
        type === 'INCREASE' && typeof factor === 'number'
      const reducer = switcher(0, [
        whenIncreaseByFactor,
        (x, { factor }) => x + factor
      ])
      expect(reducer()).toEqual(0)
      expect(reducer(0, { type: 'INCREASE' })).toEqual(0)
      expect(reducer(0, { type: 'DECREASE' })).toEqual(0)
      expect(reducer(0, { type: 'INCREASE', factor: 10 })).toEqual(10)
    })

    it('should accept array patterns', () => {
      const whenItsTimeToReset = [
        'LOGOUT',
        'RESET',
        (state, { type, error }) =>
          type === 'REQUEST_COMPLETED' && error !== undefined
      ]

      const initialstate = { test: 'test' }
      const reducer = switcher(initialstate, [whenItsTimeToReset, () => null])

      expect(reducer()).toEqual(initialstate)
      expect(reducer(initialstate, { type: 'INCREASE' })).toEqual(initialstate)

      expect(reducer(initialstate, { type: 'LOGOUT' })).toEqual(null)
      expect(reducer(initialstate, { type: 'RESET' })).toEqual(null)
      expect(reducer(initialstate, { type: 'REQUEST_COMPLETED' })).toEqual(
        initialstate
      )
      expect(
        reducer(initialstate, { type: 'REQUEST_COMPLETED', error: {} })
      ).toEqual(null)
    })
  })

  describe('initial value', () => {
    it('should return a function that takes the initial value when not provided', () => {
      const initialValue = 5
      const sillyReducer = switcher(['INCREASE', x => x + 1])

      expect(typeof sillyReducer(initialValue)).toBe('function')
      expect(sillyReducer(initialValue)()).toEqual(initialValue)
      expect(
        sillyReducer(initialValue)(initialValue, { type: 'INCREASE' })
      ).toEqual(6)
    })
  })

  describe('other args propagation', () => {
    it('if other arguments are passed to the reducer, they should be used', () => {
      const subReducer = (state, action, otherState = 0) => state + otherState
      const reducer = switcher(0, ['TEST', subReducer])

      expect(reducer(10, { type: 'TEST' }, 100)).toEqual(110)
    })
  })

  describe('arguments assertion', () => {
    it('should throw for bad arguments', () => {
      const initialState = 0
      expect(() => switcher(initialState, 23)).toThrow()
      expect(() => switcher(initialState, [undefined, 1])).toThrow()
      // expect(() => switcher(initialState, [[], 1])).toThrow()
      // expect(() => switcher(initialState, ['asd', 1])).toThrow()
      // expect(() => switcher(initialState, ['asd', null])).toThrow()
    })
  })

  describe('getPayload', () => {
    it("should return the action's payload", () => {
      const initialstate = 0
      const payload = 10
      const reducer = switcher(initialstate, ['TEST', fromPayload()])

      expect(reducer(initialstate, { type: 'TEST', payload })).toEqual(payload)
    })
  })
})
