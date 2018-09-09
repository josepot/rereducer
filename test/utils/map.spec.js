import map from '../../src/utils/map'

describe('map', () => {
  const mapper = (val, key, input) => ({ val, key, input })
  describe('Array', () => {
    it('maps Arrays', () => {
      const input = [1, 2, 3]
      const expectedOutput = input.map(mapper)
      expect(map(mapper, input)).toEqual(expectedOutput)
    })
  })

  describe('Object', () => {
    it('maps Objects', () => {
      const input = {
        a: 1,
        b: 2,
        c: 3
      }
      const expectedOutput = {
        a: { val: 1, key: 'a', input },
        b: { val: 2, key: 'b', input },
        c: { val: 3, key: 'c', input }
      }
      expect(map(mapper, input)).toEqual(expectedOutput)
    })
  })
})
