import { merge, fromAction } from '../src'

describe('mergeReducer', () => {
  const inputArray = [1, 2, 3]
  const inputObject = { foo: 'foo', bar: null }
  test('merges Objects', () => {
    const reducer = merge(fromAction(['payload']))
    const output = reducer(inputObject, { payload: { bar: 'bar', baz: 'baz' } })
    expect(output).toEqual({ foo: 'foo', bar: 'bar', baz: 'baz' })
  })

  test('merges Arrays', () => {
    const reducer = merge(fromAction(['payload']))
    const output = reducer(inputArray, { payload: [4, 5] })
    expect(output).toEqual([4, 5, 3])
  })

  test('it does not return a new instance an empty object/array', () => {
    const reducer = merge(fromAction(['payload']))
    const outputArray = reducer(inputArray, { payload: [] })
    expect(outputArray).toBe(inputArray)

    const outputObject = reducer(inputObject, { payload: {} })
    expect(outputObject).toBe(inputObject)
  })
})
