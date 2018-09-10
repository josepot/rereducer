import path from '../../src/utils/path'

describe('path', () => {
  test('it never throws and returns undefined if there is no match', () => {
    expect(path(['foo', 'bar', 'baz'], undefined)).toBe(undefined)
    expect(path(['foo', 'bar', 'baz'], null)).toBe(undefined)
    expect(path(['foo', 'bar', 'baz'], {})).toBe(undefined)
    expect(path(['foo', 'bar', 'baz'], [])).toBe(undefined)
  })

  test('it returns the value of the given path', () => {
    const input = { foo: [{}, { bar: 'bar' }] }
    expect(path(['foo', 1, 'bar'], input)).toBe('bar')
    expect(path(['foo', 1], input)).toBe(input.foo[1])
    expect(path(['foo'], input)).toBe(input.foo)
  })
})
