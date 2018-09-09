import assocPath from '../../src/utils/assocPath'

describe('assocPath', () => {
  describe('deep change', () => {
    const input = { foo: { bar: [1, 2, 3], baz: {} } }
    const result = assocPath(['foo', 'bar', '0'], 0, input)
    const expectedResult = { foo: { bar: [0, 2, 3], baz: {} } }

    test('it returns the correct result', () => {
      expect(result).toEqual(expectedResult)
    })

    test('it does not mutate the input', () => {
      const input = {}
      expect(result).not.toBe(input)
    })

    test('it does not mutate any of the inner instances that have changed', () => {
      expect(result.foo).not.toBe(input.foo)
      expect(result.foo.bar).not.toBe(input.foo.bar)
    })

    test('it keeps those references that have not had inner changes', () => {
      expect(result.foo.baz).toBe(input.foo.baz)
    })
  })

  test('it returns a new instance even when output is equivalent to input', () => {
    const input = { foo: { bar: [1, 2, 3], baz: {} } }
    const result = assocPath(['foo', 'bar', '2'], 3, input)
    const expectedResult = { foo: { bar: [1, 2, 3], baz: {} } }
    expect(result).toEqual(expectedResult)
    expect(result).toEqual(input)
    expect(result).not.toBe(input)
  })
})
