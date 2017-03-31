import expect from 'expect';
import rereducer from '../src/';

describe('Rereducer', () => {
  describe('patterns', () => {
    it('should accept string patterns', () => {
      const reducer = rereducer(
        ['INCREASE', x => x + 1],
        ['DECREASE', x => x - 1],
        0
      );
      expect(reducer()).toEqual(0);
      expect(reducer(0, { type: 'INCREASE' })).toEqual(1);
      expect(reducer(0, { type: 'DECREASE' })).toEqual(-1);
    });

    it('should accept function patterns', () => {
      const whenIncreaseByFactor = ({ type, factor }) => (
        type === 'INCREASE' && typeof factor === 'number'
      );
      const reducer = rereducer(
        [whenIncreaseByFactor, (x, { factor }) => x + factor],
        0
      );
      expect(reducer()).toEqual(0);
      expect(reducer(0, { type: 'INCREASE' })).toEqual(0);
      expect(reducer(0, { type: 'DECREASE' })).toEqual(0);
      expect(reducer(0, { type: 'INCREASE', factor: 10 })).toEqual(10);
    });

    it('should accept array patterns', () => {
      const whenItsTimeToReset = [
        'LOGOUT',
        'RESET',
        ({ type, error }) => (type === 'REQUEST_COMPLETED' && error !== undefined)
      ];

      const initialstate = { test: 'test' };
      const reducer = rereducer(
        [whenItsTimeToReset, () => null],
        initialstate
      );

      expect(reducer()).toEqual(initialstate);
      expect(reducer(initialstate, { type: 'INCREASE' })).toEqual(initialstate);

      expect(reducer(initialstate, { type: 'LOGOUT' })).toEqual(null);
      expect(reducer(initialstate, { type: 'RESET' })).toEqual(null);
      expect(reducer(initialstate, { type: 'REQUEST_COMPLETED' })).toEqual(initialstate);
      expect(reducer(initialstate, { type: 'REQUEST_COMPLETED', error: {} })).toEqual(null);
    });
  });

  describe('initial value', () => {
    it('should return a function that takes the initial value when not provided', () => {
      const initialValue = 5;
      const sillyReducer = rereducer(['INCREASE', x => x + 1]);

      expect(sillyReducer(initialValue)).toBeA('function');
      expect(sillyReducer(initialValue)()).toEqual(initialValue);
      expect(sillyReducer(initialValue)(initialValue, { type: 'INCREASE' })).toEqual(6);
    });
  });

  describe('arguments assertion', () => {
    it('should trhow for bad arguments', () => {
      const initialState = 0;
      expect(() => rereducer(23, initialstate)).toThrow();
      expect(() => rereducer([, 1], initialstate)).toThrow();
      expect(() => rereducer([[], 1], initialstate)).toThrow();
      expect(() => rereducer(['asd', 1], initialstate)).toThrow();
      expect(() => rereducer(['asd', null], initialstate)).toThrow();
    });
  });
});
