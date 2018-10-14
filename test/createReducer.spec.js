import { createReducer, fromAction, getState } from '../src'

describe('createReducer', () => {
  const dependencies = ['foo', 'bar', 'baz'].map(fromAction).concat(getState)
  const state = 'test'
  const [foo, bar, baz] = ['fooVal', 'barVal', 'bazVal']

  it(`receives 2 parameters: an Array of dependency functions and a compute function. It returns a function that invokes the compute function using the results of the dependencies as the arguments`, () => {
    const computeFn = (...args) => args
    const reducer = createReducer(dependencies, computeFn)
    const result = reducer(state, { foo, bar, baz })
    const expectedResult = [foo, bar, baz, state]
    expect(result).toEqual(expectedResult)
  })

  it('should not recompute if the result of the dependencies has not changed', () => {
    let countExecutions = 0
    const computeFn = (...args) => {
      countExecutions += 1
      return args
    }

    const reducer = createReducer(dependencies, computeFn)
    expect(countExecutions).toBe(0)
    const expectedResult = [foo, bar, baz, state]
    const result = reducer(state, { foo, bar, baz })
    expect(result).toEqual(expectedResult)
    expect(countExecutions).toBe(1)
    const result2 = reducer(state, { foo, bar, baz })
    expect(result2).toBe(result)
    expect(countExecutions).toEqual(1)
  })
})
