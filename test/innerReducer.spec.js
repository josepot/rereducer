import { innerReducer } from '../src'

describe('innerReucer', () => {
  const inc = x => x + 1
  const input = { a: 1, b: 2, c: 3 }
  const id = 'b'

  const testSubreducer = (msg, keyGetter, expectedOutput) => {
    test(msg, () => {
      const reducer = innerReducer(keyGetter, inc)
      expect(reducer(input, { id })).toEqual(expectedOutput)
    })
  }

  testSubreducer(
    'keyGetter is a fn',
    (state, { id: id1 }) => id1,
    Object.assign({}, input, { [id]: input[id] + 1 })
  )

  testSubreducer(
    'keyGetter is a value',
    id,
    Object.assign({}, input, { [id]: input[id] + 1 })
  )

  testSubreducer('noMatch', 'z', Object.assign({}, input, { z: NaN }))
})
