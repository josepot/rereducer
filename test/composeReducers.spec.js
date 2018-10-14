import { composeReducers, concat, fromPayload, getState } from '../src'

describe('composeReducers', () => {
  test('it composes reducers from right to left and it alwasy passes the action as the second parameter', () => {
    const getText = fromPayload(['text'])
    const reducer = composeReducers(concat(getText), concat('bar'))

    const result = reducer('foo', { payload: { text: 'baz' } })
    const expectedResult = 'foobarbaz'
    expect(result).toEqual(expectedResult)
  })

  test('when invoked with 0 arguments it returns the identity function', () => {
    const reducer = composeReducers()
    expect(reducer).toBe(getState)
  })

  test('when invoked with 1 function as a parameter it returns that function', () => {
    const testFn = () => null;
    const reducer = composeReducers(testFn)
    expect(reducer).toBe(testFn)
  })
})
