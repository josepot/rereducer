import { merge, fromPayload } from '../src'

describe('mergeReducer', () => {
  test('merges Objects', () => {
    const reducer = merge(fromPayload())
    const output = reducer(
      { foo: 'foo', bar: null },
      { payload: { bar: 'bar', baz: 'baz' } }
    )
    expect(output).toEqual({ foo: 'foo', bar: 'bar', baz: 'baz' })
  })

  test('merges Arrays', () => {
    const reducer = merge(fromPayload())
    const output = reducer([1, 2, 3], { payload: [4, 5] })
    expect(output).toEqual([4, 5, 3])
  })
})
