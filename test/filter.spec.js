import { composeReducers as c, filter, fromPayload } from '../src'

const equals = x => y => x === y
const reducer = filter(c(equals, fromPayload(['id'])))

describe('filter', () => {
  test('filters arrays', () => {
    const output = reducer([1, 2, 3, 4], { payload: { id: 3 } })
    expect(output).toEqual([3])
  })

  test('filters objects', () => {
    const output = reducer(
      {
        foo: 1,
        bar: 2,
        baz: 3
      },
      { payload: { id: 3 } }
    )
    expect(output).toEqual({
      baz: 3
    })
  })

  test('it does not return a new object/array when there are no changes', () => {
    const lowerThanPayloadId = filter(c(x => y => y < x, fromPayload(['id'])))
    const arrayInput = [1, 2, 3, 4]
    const arrayOutput = lowerThanPayloadId(arrayInput, { payload: { id: 5 } })
    expect(arrayOutput).toBe(arrayInput)

    const objectInput = {
      foo: 1,
      bar: 2,
      baz: 3
    }
    const objectOutput = lowerThanPayloadId(objectInput, { payload: { id: 5 } })
    expect(objectOutput).toBe(objectInput)
  })
})
