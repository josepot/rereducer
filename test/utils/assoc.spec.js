import assoc from '../../src/utils/assoc'

describe('assoc', () => {
  test('it does not mutate the input', () => {
    const input = {}
    expect(assoc('foo', 'foo', input)).not.toBe(input)
  })

  test('it adds/updates the given key', () => {
    const input = { foo: 'foo' }
    const result = assoc('bar', 'bar', input)
    expect(result).toEqual({ foo: 'foo', bar: 'bar' })
  })

  test('it also works with Arrays', () => {
    const input = [1, 2, 3]
    const result = assoc(1, 0, input)
    expect(result).toEqual([1, 0, 3])
  })

  test('always returns a new instance', () => {
    const input = { foo: 'foo' }
    const result = assoc('foo', 'foo', input)
    expect(result).toEqual(input)
    expect(result).not.toBe(input)
  })
})
