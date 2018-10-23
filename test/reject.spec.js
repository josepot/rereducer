import { composeReducers as c, reject, fromPayload } from '../src'

const equals = x => y => x === y
const reducer = reject(c(equals, fromPayload(['id'])))

describe('reject', () => {
  test('rejects arrays', () => {
    const output = reducer([1, 2, 3, 4], { payload: { id: 3 } })
    expect(output).toEqual([1, 2, 4])
  })

  test('rejects objects', () => {
    const output = reducer(
      {
        foo: 1,
        bar: 2,
        baz: 3
      },
      { payload: { id: 3 } }
    )
    expect(output).toEqual({
      foo: 1,
      bar: 2
    })
  })

  test('it does not return a new object/array when there are no rejections', () => {
    const arrayInput = [1, 2, 3, 4]
    const arrayOutput = reducer(arrayInput, { payload: { id: 5 } })
    expect(arrayOutput).toBe(arrayInput)

    const objectInput = {
      foo: 1,
      bar: 2,
      baz: 3
    }
    const objectOutput = reducer(objectInput, { payload: { id: 5 } })
    expect(objectOutput).toBe(objectInput)
  })
})
