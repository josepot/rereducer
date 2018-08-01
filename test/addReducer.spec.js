import addReducer from '../src/addReducer'

describe('addReducer', () => {
  const state = {
    foo: { bar: 'baz' }
  }
  const action = {
    type: 'ADD',
    payload: { foo: 'test' }
  }

  const testAddReducer = (msg, getter, template, expectedOutput) => {
    test(msg, () => {
      expect(addReducer(getter, template)(state, action)).toEqual(
        expectedOutput
      )
    })
  }

  testAddReducer('getter value, template value', 'newId', 1, {
    ...state,
    newId: 1
  })

  testAddReducer(
    'getter fn, template value',
    (x, { payload: { foo } }) => foo,
    1,
    {
      ...state,
      test: 1
    }
  )

  testAddReducer(
    'getter value, template fn',
    1,
    (x, { payload: { foo } }) => foo,
    {
      ...state,
      '1': 'test'
    }
  )

  testAddReducer(
    'getter value, template obj',
    1,
    { test: (x, { payload: { foo } }) => foo },
    {
      ...state,
      '1': { test: 'test' }
    }
  )
})
