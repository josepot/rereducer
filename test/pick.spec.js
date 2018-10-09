import { pick, fromPayload } from '../src'

const reducer = pick(fromPayload('ids'))

describe('pick', () => {
  describe('arrays', () => {
    const state = [10, 11, 12, 13, 14]

    test('it picks elements based on their index', () => {
      const output = reducer(state, {
        payload: { ids: [0, 2, 4] }
      })
      expect(output).toEqual([10, 12, 14])
    })

    test('it returns an empty array if there are no matches', () => {
      let output = reducer(state, {
        payload: { ids: [] }
      })
      expect(output).toEqual([])

      output = reducer(state, {
        payload: { ids: [10, 11, 12] }
      })
      expect(output).toEqual([])
    })

    test('it returns the original array if nothing changes', () => {
      let output = reducer(state, {
        payload: { ids: [0, 1, 2, 3, 4] }
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

    test('it picks elements based on their key', () => {
      const output = reducer(state, {
        payload: { ids: ['foo', 'baz'] }
      })
      expect(output).toEqual({ foo: 1, baz: 3 })
    })

    test('it returns an empty object if there are no matches', () => {
      let output = reducer(state, {
        payload: { ids: [] }
      })
      expect(output).toEqual({})

      output = reducer(state, {
        payload: { ids: ['fooo', 'bazz'] }
      })
      expect(output).toEqual({})
    })

    test('it returns the original object if nothing changes', () => {
      let output = reducer(state, {
        payload: { ids: ['foo', 'baz', 'bar'] }
      })
      expect(output).toBe(state)
    })
  })
})
