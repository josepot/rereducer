import { composeReducers, concat, fromPayload } from '../src'

describe('composeReducers', () => {
  test('it works', () => {
    const getText = fromPayload('text')
    const reducer = composeReducers(concat(getText), concat('bar'))

    const result = reducer('foo', { payload: { text: 'baz' } })
    const expectedResult = 'foobarbaz'
    expect(result).toEqual(expectedResult)
  })
})
