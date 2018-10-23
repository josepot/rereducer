import { concat, fromPayload } from '../src'

describe('concat', () => {
  test('concats text', () => {
    const reducer = concat(fromPayload('text'))
    const output = reducer('foo', { payload: { text: 'bar' } })
    expect(output).toBe('foobar')
  })

  test('concats arrays', () => {
    const reducer = concat(fromPayload('list'))
    const output1 = reducer([0, 1], { payload: { list: [2, 3] } })
    expect(output1).toEqual([0, 1, 2, 3])

    const output2 = reducer([0, 1], { payload: { list: 3 } })
    expect(output2).toEqual([0, 1, 3])
  })
})
