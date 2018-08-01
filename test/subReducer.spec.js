import subReducer from '../src/subReducer'

describe('subReducer', () => {
  const innerReducer = x => x + 1
  const input = { a: 1, b: 2, c: 3 }
  const id = 'b'

  const testSubreducer = (msg, keyGetter, expectedOutput) => {
    test(msg, () => {
      const reducer = subReducer(keyGetter)(innerReducer)
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
