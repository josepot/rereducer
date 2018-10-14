import { add, compose as c } from 'ramda'
import { innerReducer, outerReducer, fromAction, fromState } from '../src'

describe('path', () => {
  describe('common', () => {
    const hors = [innerReducer, outerReducer]
    const horIds = ['innerReducer', 'outerReducer']
    const commonTester = (message, cb) =>
      hors.forEach((hor, idx) =>
        it(`${horIds[idx]}: ${message}`, () => cb(hor))
      )

    describe('prop overload', () => {
      commonTester('updates the targeted prop: string', hor => {
        const state = { foo: 'foo', bar: 'bar' }
        const reducer = hor('foo', 'test')
        const result = reducer(state, {})
        const expectedResult = { foo: 'test', bar: 'bar' }
        expect(result).toEqual(expectedResult)
      })

      commonTester('updates the targeted prop: number', hor => {
        const state = ['foo', 'bar']
        const reducer = hor(1, 'test')
        const result = reducer(state, {})
        const expectedResult = ['foo', 'test']
        expect(result).toEqual(expectedResult)
      })

      commonTester('updates the targeted prop: function', hor => {
        const state = ['foo', 'bar']
        const getIdx = fromAction('idx')
        const reducer = hor(getIdx, 'test')
        const result = reducer(state, { idx: 0 })
        const expectedResult = ['test', 'bar']
        expect(result).toEqual(expectedResult)
      })

      commonTester(
        'creates the corresponding entry if it does not exist: Object',
        hor => {
          const state = { foo: 'foo', bar: 'bar' }
          const reducer = hor('baz', 'test')
          const result = reducer(state, {})
          const expectedResult = { foo: 'foo', bar: 'bar', baz: 'test' }
          expect(result).toEqual(expectedResult)
        }
      )

      commonTester(
        'creates the corresponding entry if it does not exist: Array',
        hor => {
          const state = []
          const reducer = hor(1, 'test')
          const result = reducer(state, {})
          const expectedResult2 = [undefined, 'test']
          expect(result).toEqual(expectedResult2)
        }
      )
    })

    describe('path overload', () => {
      const getIdx = fromAction('idx')
      const getSubId = fromState('b')
      const route = ['a', getIdx, getSubId]
      const action = { idx: 1 }

      commonTester('updates the targeted path', hor => {
        const state = {
          a: [
            { foo: 'foo0', bar: 'bar0' },
            { foo: 'foo1', bar: 'bar1' },
            { foo: 'foo2', bar: 'bar2' }
          ],
          b: 'foo'
        }

        const reducer = hor(route, 'test')
        const result = reducer(state, action)
        const expectedResult = {
          a: [
            { foo: 'foo0', bar: 'bar0' },
            { foo: 'test', bar: 'bar1' },
            { foo: 'foo2', bar: 'bar2' }
          ],
          b: 'foo'
        }

        expect(result).toEqual(expectedResult)
      })

      commonTester(
        'creates the corresponding entry if it does not exist',
        hor => {
          const state = {
            a: [],
            b: 'foo'
          }

          const reducer = hor(route, 'test')
          const result = reducer(state, action)
          const expectedResult = {
            a: [undefined, { foo: 'test' }],
            b: 'foo'
          }

          expect(result).toEqual(expectedResult)
        }
      )
    })

    describe('memoization', () => {
      commonTester(
        'does not invoke the updaters unless it is necessary',
        hor => {
          const state = {}

          hors.forEach(hor => {
            let idCalls = 0
            const test = state => {
              idCalls += 1
              return 'test'
            }
            const updater = { foo: 'foo', test }
            const reducer = hor('bar', updater)
            reducer(state, { type: 'TEST1' })
            expect(idCalls).toEqual(1)
            reducer(state, { type: 'TEST2' })
            expect(idCalls).toEqual(1)
            reducer(state, { type: 'TEST3' })
            expect(idCalls).toEqual(1)
            reducer({ bar: 1 }, { type: 'TEST3' })
            expect(idCalls).toEqual(2)
          })
        }
      )

      commonTester(
        'does not return a new state if the updaters have not been invoked',
        hor => {
          const state = { bar: { foo: 'foo', test: 0 } }
          // we should never perform a side-effect in a reducer
          // this is just for testing purposes
          let id = 0
          const test = state => (id += 1)

          const updater = { foo: 'foo', test }
          const reducer = hor('bar', updater)

          const result1 = reducer(state, { type: 'TEST1' })
          expect(result1).toEqual({ bar: { foo: 'foo', test: 1 } })
          const result2 = reducer(state, { type: 'TEST2' })
          expect(result2).toBe(result1)
          const result3 = reducer(state, { type: 'TEST3' })
          expect(result3).toBe(result1)

          const result4 = reducer(result1, { type: 'TEST3' })
          expect(result4).not.toBe(result1)
          expect(result4).toEqual({ bar: { foo: 'foo', test: 2 } })
        }
      )

      commonTester(
        'does not return a new state if the updaters return the same value',
        hor => {
          const state = { bar: 0 }
          const updater = (state, { value1, value2 }) => value1 + value2

          const reducer = hor('bar', updater)

          const result1 = reducer(state, { value1: 1, value2: 2 })
          expect(result1).toEqual({ bar: 3 })
          const result2 = reducer(state, { value1: 2, value2: 1 })
          expect(result2).toBe(result1)
          const result3 = reducer(state, { value1: 1, value2: 2 })
          expect(result3).toBe(result1)
          const result4 = reducer(state, { value1: 3, value2: 0 })
          expect(result4).toBe(result1)
          const result5 = reducer(state, { value1: 0, value2: 3 })
          expect(result5).toBe(result1)

          const result6 = reducer(state, { value1: 1, value2: 3 })
          expect(result6).not.toBe(result1)
          expect(result6).toEqual({ bar: 4 })
        }
      )
    })

    describe('currying', () => {
      commonTester(
        'invoking it with 0 args returns the original function',
        hor => expect(hor()).toBe(hor)
      )

      commonTester('invoking it with 1 arg returns a partial function', hor => {
        const setFoo = hor('foo')
        const setFooBar = c(setFoo, hor('bar'))
        const setFooBarTo1 = setFooBar(1)
        const setFooBarTo2 = setFooBar(2)
        expect(setFooBarTo1({}, {})).toEqual({ foo: { bar: 1 } })
        expect(setFooBarTo2({}, {})).toEqual({ foo: { bar: 2 } })
      })
    })
  })

  describe('specific', () => {
    const state = { foo: 10, bar: 20, baz: 30 }
    const path = fromAction('id')

    describe('innerReducer', () => {
      test('its update function receives the inner state as the first parameter and the action as the second one', () => {
        const addFromAction = (state, action) => state + action.value
        const reducer = innerReducer(path, addFromAction)
        const result = reducer(state, { id: 'bar', value: 5 })
        const expectedOutput = { foo: 10, bar: 25, baz: 30 }
        expect(result).toEqual(expectedOutput)
      })
    })

    describe('outerReducer', () => {
      test('its update function receives the outer state as the first parameter and the action as the second one', () => {
        const sumAllValuesAndAddValueFromAction = (state, action) =>
          Object.values(state).reduce(add) + action.value
        const reducer = outerReducer(path, sumAllValuesAndAddValueFromAction)
        const result = reducer(state, { id: 'test', value: 5 })
        const expectedOutput = { foo: 10, bar: 20, baz: 30, test: 65 }
        expect(result).toEqual(expectedOutput)
      })
    })
  })
})
