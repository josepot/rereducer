import rereducer, { fromState, innerReducer } from "rereducer";
import { Action, Action1, Action2, ActionType, initialState, State } from 'storeTypes';
import { ValidKeyType, ToStringOrNumberMap, ToNullable, LengthOf } from "./path";

const myGenericReducer = (state: State, action: Action) => state;
const myAction1Reducer = (state: State, action: Action1) => state;
const myAction2Reducer = (state: State, action: Action2) => state;
const myWatcher = (state: State, action: Action) => true;

interface StateTest {
    foo: {
        [bar: string]: [{
            nay: {
                tau: number
            }[]
        }]
    }
};
const myState: StateTest = {
    foo: {
        bar: [{
            nay: [
                {
                    tau: 0
                },
                {
                    tau: 1
                }
            ]
        }]
    }
}

innerReducer(['foo', 'bar'], (state, action) => state, {} as StateTest);
innerReducer(['foo', 'bar'], (state, action: any) => state);
innerReducer('foo', (state, action) => state, {} as StateTest);

// const result = newInnerReducer!(['foo'], (state, action) => state);

/*
 * I think it's quite hard (i.e. imposible) to do what we want to achieve with innerReducer.
 * The main problem is that we need to define what the state will look like _before_ we can get the state itself
 * This was a first iteration:
    type PathReducer<KS, S> = (state: ToNullable<KS, S, LengthOf<KS>>, action: any);
    export interface InnerReducer {
        <
            K1 extends ValidKeyType,
            Path extends [K1],
            KS extends ToStringOrNumberMap<Path>,
            S extends Keyable<KS[0]>
        >
        (path: Path, reducer: PathReducer<KS, S>): (state: S, action: any) => S;
    }
 * We'd need this to work to make it easy - The difference from Path functions and this one, is that the reducer is part of the first
 * function call, so that's why we need to have the KS and S generics in there.... which basically gets always infered to `{}`
 * 
 * So, this isn't going anywhere... let's try implementing our innerReducer by using the path function by using typescript, and see if
 * we can get anything from that:
 */
function manualInnerReducer<
    K1 extends ValidKeyType,
    Path extends [K1]
>(path: Path, inner: any) {
    return <TS extends Keyable<ToStringOrNumberMap<Path>[0]>>(state: TS, action: any) => {
        const value = fromState(path)(state, action);
        inner(value, action);
        return state;
    }
}
/**
 * Mhh, so when we're inside, we can see what parameters will `inner` take:
 * ToNullable<ToStringOrNumberMap<Path>, TS, 1>
 * But again, if we need to use this, as it's using TS, we'll need to bring it out as well. Let's try
 */
function manualInnerReducer2<
    K1 extends ValidKeyType,
    Path extends [K1],
    TS extends Keyable<ToStringOrNumberMap<Path>[0]>
>(path: Path, inner: (state: ToNullable<ToStringOrNumberMap<Path>, TS, LengthOf<ToStringOrNumberMap<Path>>>, action: any) => any) {
    return (state: TS, action: any) => {
        const value = fromState(path)(state, action);
        inner(value, action);
        return state;
    }
}

// Let's try...
const result = manualInnerReducer2(['foo'], (state, action) => state)(myState, {});

// No, state is `never` - TS was infered as `never`. Let's try adding a generic to inner, let's see if that helps
function manualInnerReducer3<
    K1 extends ValidKeyType,
    Path extends [K1],
    TS extends Keyable<ToStringOrNumberMap<Path>[0]>
>(path: Path, inner: <TIS extends ToNullable<ToStringOrNumberMap<Path>, TS, LengthOf<ToStringOrNumberMap<Path>>>>(state: TIS, action: any) => TIS) {
    return (state: TS, action: any) => {
        const value = fromState(path)(state, action);
        inner(value, action);
        return state;
    }
}
const foo = (state: StateTest['foo'], action: any) => state;
const result2 = manualInnerReducer3(['foo'], foo)(myState, {});

// Again, the same problem.

(() => { /// API
  const noWatchers = rereducer<State, Action>(
    initialState
  );

  const simpleWatcher = rereducer<State, Action>(
    initialState,
    [ActionType.Action1, myAction1Reducer]
  );

  const functionWatcher = rereducer<State, Action>(
    initialState,
    [ActionType.Action1, myAction1Reducer],
    [myWatcher, myGenericReducer]
  );

  const combinedWatcher = rereducer<State, Action>(
    initialState,
    [
      [ActionType.Action1, myWatcher],
      myGenericReducer
    ]
  );

  const nestedWatcher = rereducer<State, Action>(
    initialState,
    [
      [
        [ActionType.Action1, ActionType.Action2],
        myWatcher
      ],
      myGenericReducer
    ]
  );
});

(() => { /// Initial value as first parameter
  // $ExpectType ReducerLikeFunction<State | undefined, Action, State>
  const noWatchers = rereducer<State, Action>(
    initialState
  );

  // $ExpectType ReducerLikeFunction<State | undefined, Action, State>
  const singleWatcher = rereducer<State, Action>(
    initialState,
    [ActionType.Action1, myAction1Reducer]
  );

  // $ExpectType ReducerLikeFunction<State | undefined, Action, State>
  const twoWatchers = rereducer<State, Action>(
    initialState,
    [ActionType.Action1, myAction1Reducer],
    [ActionType.Action2, myAction2Reducer]
  );
});

(() => { /// Action filtering
  rereducer<State, Action>(
    initialState,
    [ActionType.Action1, myGenericReducer]
  );

  rereducer<State, Action>(
    initialState,
    [ActionType.Action1, myAction1Reducer]
  );

  rereducer<State, Action>(
    initialState,
    // $ExpectError
    [ActionType.Action1, myAction2Reducer]
  );
});
