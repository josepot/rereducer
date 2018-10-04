import { assoc, fromPayload } from '../src'

describe('assoc', () => {
  test('it works', () => {
    let idCalls = 0
    const id = state => {
      idCalls++
      return Object.keys(state)
        .map(x => parseInt(x, 10))
        .reduce((acc, key) => (key >= acc ? key + 1 : acc), 1)
    }
    const text = jest.fn(fromPayload('text'))

    const addItem = assoc(id, {
      id,
      text,
      completed: false
    })

    const state = {
      1: { id: 1, text: 'test test', completed: true }
    }
    const action = { type: 'ADD_ITEM', payload: { text: 'hello world' } }
    const result1 = addItem(state, action)
    const result2 = addItem(state, action)
    const result3 = addItem(state, {
      type: 'ADD_ITEM',
      payload: { text: 'hello world' }
    })
    const expectedResult = {
      1: { id: 1, text: 'test test', completed: true },
      2: { id: 2, text: 'hello world', completed: false }
    }

    expect(result1).toEqual(expectedResult)
    expect(result2).toBe(result1)
    expect(result3).toBe(result1)
    expect(idCalls).toEqual(1)

    const result4 = addItem(
      { ...state },
      { type: 'ADD_ITEM', payload: { text: 'hello world' } }
    )
    expect(result4).toEqual(expectedResult)
    expect(result4).not.toBe(result1)
    expect(idCalls).toEqual(2)
  })
})
