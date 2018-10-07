import { composeReducers as c, filter, fromPayload } from '../src'

const equals = x => y => x === y
const reducer = filter(c(equals, fromPayload('id')))

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
})
