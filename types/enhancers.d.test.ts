import { outerReducer, merge, concat, innerReducer } from "rereducer";
import { State, Entity, Action } from "storeTypes";

(() => { /// assocReducer
  type MapState = State['xar'];
  const keyGetter = (state: MapState, action: Action) => 'foo';
  const templateGetter: (state: MapState, action: Action) => Entity = (state: MapState, action: Action) => ({
    id: 'newId',
    text: 'foo'
  });

  // $ExpectType Reducer<{ [key: string]: Entity; }, Action>
  const withTemplate = outerReducer<Entity, MapState, Action>(
    [keyGetter],
    {
      id: keyGetter,
      text: 'foo'
    }
  );

  // $ExpectType Reducer<{ [key: string]: Entity; }, Action>
  const withGetter = outerReducer<Entity, MapState, Action>(
    [keyGetter],
    templateGetter
  );

  const withIncompleteTemplate = outerReducer<Entity, MapState, Action>(
    [keyGetter],
    // $ExpectError
    {
      id: keyGetter
    }
  );
});

(() => { // innerReducer
  const getPath = (state: State, action: Action) => 'foo';
  const reducer = (state: State, action: Action) => 'bar';

  // $ExpectType Reducer<State, Action>
  const withStaticPath = innerReducer<State, Action>(['foo'], reducer);

  // $ExpectType Reducer<State, Action>
  const withGetter = innerReducer<State, Action>([getPath], reducer);

  // $ExpectType Reducer<State, Action>
  const withBoth = innerReducer<State, Action>([getPath, 'bar'], reducer);
});

(() => { /// mergeReducer
  interface MergeState {
    foo: number;
    bar: string;
  }

  // $ExpectType Reducer<MergeState, Action>
  const identity = merge<MergeState, Action>({});

  // $ExpectType Reducer<MergeState, Action>
  const partial = merge<MergeState, Action>({
    bar: 'baz'
  });

  const partialFail = merge<MergeState, Action>({
    // $ExpectError
    fail: true
  });

  // $ExpectType Reducer<MergeState, Action>
  const getter = merge((state: MergeState, action: Action) => ({
    foo: 3
  }));
});

(() => { /// concatReducer
  type ConcatState = string[];

  // $ExpectType Reducer<string[], Action>
  const identityArray = concat<ConcatState, Action>(() => []);

  // $ExpectType Reducer<string[], Action>
  const arrayConcat = concat<ConcatState, Action>(() => ['foo']);

  // $ExpectError
  const arrayConcatFail = concat<ConcatState, Action>(() => [3]);

  // $ExpectType Reducer<string, Action>
  const stringConcat = concat<string, Action>(() => 'foo');
});
