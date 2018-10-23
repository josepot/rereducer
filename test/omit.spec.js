import { omit, fromPayload } from '../src'

const reducer = omit(fromPayload(['ids']))

describe('omit', () => {
  describe('arrays', () => {
    const state = [10, 11, 12, 13, 14]
    test('it omits elements based on their index', () => {
      const output = reducer(state, {
        payload: { ids: [0, 2, 4] }
      })
      expect(output).toEqual([11, 13])
    })

    test('it returns the original array if nothing changes', () => {
      let output = reducer(state, {
        payload: { ids: [] }
      })
      expect(output).toBe(state)

      output = reducer(state, {
        payload: { ids: [10, 11, 12] }
      })
      expect(output).toBe(state)
    })
  })

  describe('objects', () => {
    const state = {
      foo: 1,
      bar: 2,
      baz: 3
    }

    test('it omits elements based on their key', () => {
      const output = reducer(state, {
        payload: { ids: ['foo', 'baz'] }
      })
      expect(output).toEqual({ bar: 2 })
    })

    test('it returns the original object if nothing changes', () => {
      let output = reducer(state, {
        payload: { ids: [] }
      })
      expect(output).toBe(state)

      output = reducer(state, {
        payload: { ids: ['fooo', 'bazz'] }
      })
      expect(output).toBe(state)
    })
  })
})
