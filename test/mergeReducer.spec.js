import { mergeReducer, payload } from '../src'

describe('mergeReducer', () => {
  test('merges Objects', () => {
    const reducer = mergeReducer(payload())
    const output = reducer(
      { foo: 'foo', bar: null },
      { payload: { bar: 'bar', baz: 'baz' } }
    )
    expect(output).toEqual({ foo: 'foo', bar: 'bar', baz: 'baz' })
  })

  test('merges Arrays', () => {
    const reducer = mergeReducer(payload())
    const output = reducer([1, 2, 3], { payload: [4, 5] })
    expect(output).toEqual([4, 5, 3])
  })
})
