import fromPayload from '../src/fromPayload'

describe('payload', () => {
  const action = {
    type: 'test',
    payload: {
      foo: 'foo',
      bar: {
        baz: 1
      }
    }
  }

  const testPayload = (msg, args, expectedOutput) => {
    test(msg, () => {
      expect(fromPayload(...args)(undefined, action)).toBe(expectedOutput)
    })
  }

  testPayload('no args', [], action.payload)
  testPayload('1 arg gets the prop of the payload', ['foo'], action.payload.foo)
  testPayload(
    'n args gets the path of the payload',
    ['bar', 'baz'],
    action.payload.bar.baz
  )

  testPayload(
    'no match does not crash, it returns undefined',
    ['bar', 'baz', 'asdf', 'asdfa'],
    undefined
  )
})
