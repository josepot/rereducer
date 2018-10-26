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

// "path" helpers
type StringOrNumber = string | number;
type Fn = (...args: any[]) => StringOrNumber;
type ValidKeyType = StringOrNumber | Fn;

type ObjectWithKey<K extends StringOrNumber> = {
    [TK in K]: unknown
}
type ObjectMap<T> = {
    [key: string]: T
}
type ArrayMap<T> = {
    [key: number]: T
}
type Keyable<P extends StringOrNumber> =
    ObjectWithKey<P> | P extends string ? ObjectMap<any> : P extends number ? ArrayMap<any> : any;

type ToStringOrNumber<P extends ValidKeyType> =
    P extends Fn ? ReturnType<P> : P;

type LengthOf<T> = T extends { length: infer R } ? R : never
type NotNull = object | number | string | boolean
type Nullable<K> = {0?: K}[0]
type IsMapOr<S, T, F> = StringOrNumber extends keyof S ? T : F;

type SPath<K extends StringOrNumber[], S extends Keyable<K[0]>, N extends number> =
    N extends 0 ? S :
    N extends 1 ? S[K[0]] :
    N extends 2 ? S[K[0]][K[1]] :
    N extends 3 ? S[K[0]][K[1]][K[2]] :
    N extends 4 ? S[K[0]][K[1]][K[2]][K[3]] :
    N extends 5 ? S[K[0]][K[1]][K[2]][K[3]][K[4]] :
    N extends 6 ? S[K[0]][K[1]][K[2]][K[3]][K[4]][K[5]] :
    N extends 7 ? S[K[0]][K[1]][K[2]][K[3]][K[4]][K[5]][K[6]] :
    N extends 8 ? S[K[0]][K[1]][K[2]][K[3]][K[4]][K[5]][K[6]][K[7]] :
    N extends 9 ? S[K[0]][K[1]][K[2]][K[3]][K[4]][K[5]][K[6]][K[7]][K[8]] : any

type ToNullableN0<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 0 ? S : IsMapOr<S,
        Nullable<SPath<K, S, L>>,
        ToNullableN1<K, S, L>
    >
type ToNullableN1<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 1 ? SPath<K, S, 1> : IsMapOr<SPath<K, S, 1>,
        Nullable<SPath<K, S, L>>,
        ToNullableN2<K, S, L>
    >
type ToNullableN2<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 2 ? SPath<K, S, 2> : IsMapOr<SPath<K, S, 2>,
        Nullable<SPath<K, S, L>>,
        ToNullableN3<K, S, L>
    >
type ToNullableN3<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 3 ? SPath<K, S, 3> : IsMapOr<SPath<K, S, 3>,
        Nullable<SPath<K, S, L>>,
        ToNullableN4<K, S, L>
    >
type ToNullableN4<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 4 ? SPath<K, S, 4> : IsMapOr<SPath<K, S, 4>,
        Nullable<SPath<K, S, L>>,
        ToNullableN5<K, S, L>
    >
type ToNullableN5<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 5 ? SPath<K, S, 5> : IsMapOr<SPath<K, S, 5>,
        Nullable<SPath<K, S, L>>,
        ToNullableN6<K, S, L>
    >
type ToNullableN6<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 6 ? SPath<K, S, 6> : IsMapOr<SPath<K, S, 6>,
        Nullable<SPath<K, S, L>>,
        ToNullableN7<K, S, L>
    >
type ToNullableN7<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 7 ? SPath<K, S, 7> : IsMapOr<SPath<K, S, 7>,
        Nullable<SPath<K, S, L>>,
        ToNullableN8<K, S, L>
    >
type ToNullableN8<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 8 ? SPath<K, S, 8> : IsMapOr<SPath<K, S, 8>,
        Nullable<SPath<K, S, L>>,
        ToNullableN9<K, S, L>
    >
type ToNullableN9<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    L extends 9 ? SPath<K, S, 9> : IsMapOr<SPath<K, S, 9>,
        Nullable<SPath<K, S, L>>,
        never
    >

type ToNullable<K extends StringOrNumber[], S extends Keyable<K[0]>, L extends LengthOf<K>> =
    SPath<K, S, L> extends NotNull ? ToNullableN0<K, S, L> : never

type PathArgs = [ValidKeyType, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?]
type ToStringOrNumberMap<A extends PathArgs> = {
    [P in keyof A]: A[P] extends ValidKeyType ? ToStringOrNumber<A[P]> : never;
}

interface FromState<K extends PathArgs> {
    <KS extends ToStringOrNumberMap<K>, S extends Keyable<KS[0]>>(x: S, a?: object): ToNullable<KS, S, LengthOf<KS>>
}
interface FromAction<K extends PathArgs> {
    <KS extends ToStringOrNumberMap<K>, S extends Keyable<KS[0]>>(x: any, a: S): ToNullable<KS, S, LengthOf<KS>>
}
interface FromPayload<K extends PathArgs> {
    <KS extends ToStringOrNumberMap<K>, S extends Keyable<KS[0]>>(x: any, a: {payload: S}): ToNullable<KS, S, LengthOf<KS>>
}
interface FromMeta<K extends PathArgs> {
    <KS extends ToStringOrNumberMap<K>, S extends Keyable<KS[0]>>(x: any, a: {meta: S}): ToNullable<KS, S, LengthOf<KS>>
}

interface FromStateNoArgs { <S>(x: S, a?: object): S }
interface FromActionNoArgs { <S>(x: any, a: S): S }
interface FromPayloadNoArgs { <S>(x: any, a: {payload: S}): S }
interface FromMetaNoArgs { <S>(x: any, a: {meta: S}): S }

type FROM_ACTION = 'FROM_ACTION'
type FROM_META = 'FROM_META'
type FROM_PAYLOAD = 'FROM_PAYLOAD'
type FROM_STATE = 'FROM_STATE'
type FROMS = FROM_ACTION | FROM_META | FROM_PAYLOAD | FROM_STATE

interface Path<Type extends FROMS> {
    <
        K1 extends ValidKeyType,
        K2 extends ValidKeyType,
        K3 extends ValidKeyType,
        K4 extends ValidKeyType,
        K5 extends ValidKeyType,
        K6 extends ValidKeyType,
        K7 extends ValidKeyType,
        K8 extends ValidKeyType,
        K9 extends ValidKeyType,
        A extends [K1, K2?, K3?, K4?, K5?, K6?, K7?, K8?, K9?]
    >
    (k: A)
        : Type extends FROM_STATE ? FromState<A>
        : Type extends FROM_ACTION ? FromAction<A>
        : Type extends FROM_PAYLOAD ? FromPayload<A>
        : Type extends FROM_META ? FromMeta<A> : never

    <K1 extends ValidKeyType>
    (k: K1)
        : Type extends FROM_STATE ? FromState<[K1]>
        : Type extends FROM_ACTION ? FromAction<[K1]>
        : Type extends FROM_PAYLOAD ? FromPayload<[K1]>
        : Type extends FROM_META ? FromMeta<[K1]> : never

    <K1 extends []>
    (k?: K1)
        : Type extends FROM_STATE ? FromStateNoArgs
        : Type extends FROM_ACTION ? FromActionNoArgs
        : Type extends FROM_PAYLOAD ? FromPayloadNoArgs
        : Type extends FROM_META ? FromMetaNoArgs : never
}

export declare const fromState: Path<FROM_STATE>;
export declare const fromAction: Path<FROM_ACTION>;
export declare const fromPayload: Path<FROM_PAYLOAD>;
export declare const fromMeta: Path<FROM_META>;
export declare const getAction: FromActionNoArgs
export declare const getState: FromStateNoArgs
