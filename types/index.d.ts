// TypeScript Version: 3.5

interface Dictionary<T> {
  [key: string]: T;
}

type ReducerLikeFunction<TS, TA, TRet> = (
  state: TS,
  action: TA,
  ...others: any[]
) => TRet;
export type Reducer<TS, TA> = (state: TS, action: TA, ...others: any[]) => TS;
type TemplateType<TS, TA, TO> = {
  [K in keyof TO]: TO[K] | ReducerLikeFunction<TS, TA, TO[K]>
};
type CastableToReducer<TS, TA, TO = TS> =
  | ReducerLikeFunction<TS, TA, TO>
  | TemplateType<TS, TA, TO>
  | TO;

/// switchReducers
type MatcherFunction<TS, TA> = ReducerLikeFunction<TS, TA, boolean>;
type AdvancedRuleDef<TS, TA> = [Matcher<TS, TA>, CastableToReducer<TS, TA>];
type Matcher<TS, TA> = string | MatcherFunction<TS, TA> | MatcherArray<TS, TA>;
interface MatcherArray<TS, TA> extends Array<Matcher<TS, TA>> {}

type SelectWithType<TA, TAType> = TA extends { type: TAType } ? TA : never;
interface ActionWithType {
  type: any;
}
interface ActionWithPayload<P> extends ActionWithType {
  payload: P;
}
export type ActionTypeRuleDef<TS, TA extends ActionWithType> = TA extends {
  type: infer TAType;
}
  ? [TAType, CastableToReducer<TS, SelectWithType<TA, TAType>>]
  : AdvancedRuleDef<TS, TA>;

export type RuleDef<TS, TA extends ActionWithType> =
  | ActionTypeRuleDef<TS, TA>
  | AdvancedRuleDef<TS, TA>;

export function switchReducers<TS, TA extends ActionWithType>(
  initialValue: TS,
  ...ruleDefs: Array<RuleDef<TS, TA>>
): ReducerLikeFunction<TS | undefined, TA, TS>;
export default switchReducers;

/// assocReducer
type Getter<TS, TA> = string | ReducerLikeFunction<TS, TA, string>;
export function outerReducer<TO, TS extends Dictionary<TO>, TA>(
  getters: Array<Getter<TS, TA>>,
  reducer: CastableToReducer<TS, TA, TO>
): Reducer<TS, TA>;

/// subReducer
export function innerReducer<TS, TA>(
  getters: Array<Getter<TS, TA>>,
  reducer: CastableToReducer<any, TA>
): Reducer<TS, TA>;

export function concat<TS extends any[] | string, TA>(
  getter: CastableToReducer<TS, TA>
): Reducer<TS, TA>;

export function merge<TS, TA>(
  reducer: CastableToReducer<TS, TA, Partial<TS>>
): Reducer<TS, TA>;

export function isType<TA extends ActionWithType>(
  x: TA['type']
): MatcherFunction<any, TA>;

export function fromAction(
  ...path: string[]
): ReducerLikeFunction<any, ActionWithPayload<any>, any>;

export function fromPayload(
  ...path: string[]
): ReducerLikeFunction<any, ActionWithPayload<any>, any>;

export function fromState(
  ...path: string[]
): ReducerLikeFunction<any, ActionWithPayload<any>, any>;

export function getAction<T>(): ReducerLikeFunction<any, T, T>;

export function getState(): Reducer<any, any>;

/// composeReducers
export function composeReducers<TA, TS, TRet>(
  reducer1: ReducerLikeFunction<TS, TA, TRet>
): ReducerLikeFunction<TS, TA, TRet>;
export function composeReducers<TA, TS, TS1, TRet>(
  reducer1: ReducerLikeFunction<TS1, TA, TRet>,
  reducer2: ReducerLikeFunction<TS, TA, TS1>
): ReducerLikeFunction<TS, TA, TRet>;
export function composeReducers<TA, TS, TS1, TS2, TRet>(
  reducer1: ReducerLikeFunction<TS1, TA, TRet>,
  reducer2: ReducerLikeFunction<TS2, TA, TS1>,
  reducer3: ReducerLikeFunction<TS, TA, TS2>
): ReducerLikeFunction<TS, TA, TRet>;
export function composeReducers<TA, TS, TS1, TS2, TRet>(
  reducer1: ReducerLikeFunction<TS1, TA, TRet>,
  reducer2: ReducerLikeFunction<TS2, TA, TS1>,
  reducer3: ReducerLikeFunction<TS, TA, TS2>
): ReducerLikeFunction<TS, TA, TRet>;
export function composeReducers<TA>(
  ...reducers: Array<ReducerLikeFunction<any, TA, any>>
): Reducer<any, TA>;

export function filter<T = any>(
  fn: ReducerLikeFunction<
    T,
    any,
    T extends Array<infer R>
      ? (value: R, index: number, array: T) => boolean
      : T extends Dictionary<infer R>
        ? (value: R, key: string, target: T) => boolean
        : never
  >
): Reducer<T, any>;

export const reject: typeof filter;

export function map<T = any, TRet = any>(
  fn: ReducerLikeFunction<
    T[],
    any,
    (value: T, index: number, array: T[]) => TRet
  >
): ReducerLikeFunction<T[], any, TRet[]>;
export function map<T extends Dictionary<any>>(
  fn: T extends any[]
    ? never
    : ReducerLikeFunction<T, any, (value: any, key: string, object: T) => any>
): ReducerLikeFunction<T, any, { [P in keyof T]: any }>;

// These two have the problem of partial inference - This would only work if
// the consumer specifies T, but then we must provide a default for K.... which
// if we set any/never as default, tsc gets lazy and accepts these for any value of keys.
// As a workaround, we add an additinal optional parameter which is ignored on runtime.
export function omit<K extends keyof T, T = any>(
  keys: K[],
  stateType?: T
): ReducerLikeFunction<T, any, Omit<T, K>>;

export function pick<K extends keyof T, T = any>(
  keys: K[],
  stateType?: T
): ReducerLikeFunction<T, any, Pick<T, K>>;

export function createReducer<TS, TA, TP1, TR>(
  dependencies: [CastableToReducer<TS, TA, TP1>],
  computeFn: (p1: TP1) => TR
): ReducerLikeFunction<TS, TA, TR>;
export function createReducer<TS, TA, TP1, TP2, TR>(
  dependencies: [
    CastableToReducer<TS, TA, TP1>,
    CastableToReducer<TS, TA, TP2>
  ],
  computeFn: (p1: TP1, p2: TP2) => TR
): ReducerLikeFunction<TS, TA, TR>;
export function createReducer<TS, TA, TP1, TP2, TP3, TR>(
  dependencies: [
    CastableToReducer<TS, TA, TP1>,
    CastableToReducer<TS, TA, TP2>,
    CastableToReducer<TS, TA, TP3>
  ],
  computeFn: (p1: TP1, p2: TP2, p3: TP3) => TR
): ReducerLikeFunction<TS, TA, TR>;
export function createReducer<TS, TA, TR>(
  dependencies: Array<CastableToReducer<TS, TA, any>>,
  computeFn: (...args: any[]) => TR
): ReducerLikeFunction<TS, TA, TR>;

/// update = condMapper
export function update<TS, TA>(
  getCondition: (state: TS[], action: TA) =>
    (item: TS, key: number) => boolean,
  mapFn: (item: TS, key: number, array: TS[]) => TS
): Reducer<TS[], TA>;
export function update<TS, TA>(
  getCondition: (state: Dictionary<TS>, action: TA) =>
    (item: TS, key: string) => boolean,
  mapFn: (item: TS, key: string, object: Dictionary<TS>) => TS
): Reducer<Dictionary<TS>, TA>;
