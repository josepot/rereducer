import { concatReducer, payload } from '../src'

describe('concatReducer', () => {
  test('concats text', () => {
    const reducer = concatReducer(payload('text'))
    const output = reducer('foo', { payload: { text: 'bar' } })
    expect(output).toBe('foobar')
  })

  test('concats arrays', () => {
    const reducer = concatReducer(payload('list'))
    const output = reducer([0, 1], { payload: { list: [2, 3] } })
    expect(output).toEqual([0, 1, 2, 3])
  })
})
