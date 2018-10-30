type StringOrNumber = string | number;
type Fn = (...args: any[]) => StringOrNumber;
type ValidKeyType = StringOrNumber | Fn;

type ToStringOrNumber<P extends ValidKeyType> =
    P extends Fn ? ReturnType<P> : P;

type LengthOf<T> = T extends { length: infer R } ? R : never
type NotNull = object | number | string | boolean
type Nullable<K> = {0?: K}[0]
type IsMapOr<S, T, F> = StringOrNumber extends keyof S ? T : F;

type SPath<K extends StringOrNumber[], S extends any, N extends number> =
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

type ToNullableN0<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 0 ? S : IsMapOr<S,
        Nullable<SPath<K, S, L>>,
        ToNullableN1<K, S, L>
    >
type ToNullableN1<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 1 ? SPath<K, S, 1> : IsMapOr<SPath<K, S, 1>,
        Nullable<SPath<K, S, L>>,
        ToNullableN2<K, S, L>
    >
type ToNullableN2<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 2 ? SPath<K, S, 2> : IsMapOr<SPath<K, S, 2>,
        Nullable<SPath<K, S, L>>,
        ToNullableN3<K, S, L>
    >
type ToNullableN3<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 3 ? SPath<K, S, 3> : IsMapOr<SPath<K, S, 3>,
        Nullable<SPath<K, S, L>>,
        ToNullableN4<K, S, L>
    >
type ToNullableN4<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 4 ? SPath<K, S, 4> : IsMapOr<SPath<K, S, 4>,
        Nullable<SPath<K, S, L>>,
        ToNullableN5<K, S, L>
    >
type ToNullableN5<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 5 ? SPath<K, S, 5> : IsMapOr<SPath<K, S, 5>,
        Nullable<SPath<K, S, L>>,
        ToNullableN6<K, S, L>
    >
type ToNullableN6<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 6 ? SPath<K, S, 6> : IsMapOr<SPath<K, S, 6>,
        Nullable<SPath<K, S, L>>,
        ToNullableN7<K, S, L>
    >
type ToNullableN7<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 7 ? SPath<K, S, 7> : IsMapOr<SPath<K, S, 7>,
        Nullable<SPath<K, S, L>>,
        ToNullableN8<K, S, L>
    >
type ToNullableN8<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 8 ? SPath<K, S, 8> : IsMapOr<SPath<K, S, 8>,
        Nullable<SPath<K, S, L>>,
        ToNullableN9<K, S, L>
    >
type ToNullableN9<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    L extends 9 ? SPath<K, S, 9> : IsMapOr<SPath<K, S, 9>,
        Nullable<SPath<K, S, L>>,
        never
    >

type ToNullable<K extends StringOrNumber[], S, L extends LengthOf<K>> =
    SPath<K, S, L> extends NotNull ? ToNullableN0<K, S, L> : never

type PathArgs = [ValidKeyType, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?, ValidKeyType?]
type ToStringOrNumberMap<A extends PathArgs> = {
    [P in keyof A]: A[P] extends ValidKeyType ? ToStringOrNumber<A[P]> : never;
}

interface FromState<K extends PathArgs> {
    <KS extends ToStringOrNumberMap<K>, S>(x: S, a?: object): ToNullable<KS, S, LengthOf<KS>>
}
interface FromAction<K extends PathArgs> {
    <KS extends ToStringOrNumberMap<K>, S>(x: any, a: S): ToNullable<KS, S, LengthOf<KS>>
}
interface FromPayload<K extends PathArgs> {
    <KS extends ToStringOrNumberMap<K>, S>(x: any, a: {payload: S}): ToNullable<KS, S, LengthOf<KS>>
}
interface FromMeta<K extends PathArgs> {
    <KS extends ToStringOrNumberMap<K>, S>(x: any, a: {meta: S}): ToNullable<KS, S, LengthOf<KS>>
}

export interface FromStateNoArgs { <S>(x: S, a?: object): S }
export interface FromActionNoArgs { <S>(x: any, a: S): S }
interface FromPayloadNoArgs { <S>(x: any, a: {payload: S}): S }
interface FromMetaNoArgs { <S>(x: any, a: {meta: S}): S }

export type FROM_ACTION = 'FROM_ACTION'
export type FROM_META = 'FROM_META'
export type FROM_PAYLOAD = 'FROM_PAYLOAD'
export type FROM_STATE = 'FROM_STATE'
type FROMS = FROM_ACTION | FROM_META | FROM_PAYLOAD | FROM_STATE

export interface Path<Type extends FROMS> {
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

type PathReducer<KS extends StringOrNumber[], S> = <TIS extends ToNullable<KS, S, LengthOf<KS>>>(state: TIS, action: any) => TIS;

export interface InnerReducer {
    (
        path: ValidKeyType | Array<ValidKeyType>,
        reducer: (state: any, action: any) => any
    ): (state: any, action: any) => any;

    <
        K1 extends ValidKeyType,
        KS extends ToStringOrNumberMap<[K1]>,
        S
    >
    (
        path: K1,
        reducer: PathReducer<KS, S>,
        stateType: S
    ): (state: S, action: any) => S;

    <
        K1 extends ValidKeyType,
        Path extends [K1],
        KS extends ToStringOrNumberMap<Path>,
        S
    >
    (
        path: Path,
        reducer: PathReducer<KS, S>,
        stateType: S
    ): (state: S, action: any) => S;

    <
        K1 extends ValidKeyType,
        K2 extends ValidKeyType,
        Path extends [K1, K2],
        KS extends ToStringOrNumberMap<Path>,
        S = any
    >
    (
        path: Path,
        reducer: PathReducer<KS, S>,
        stateType: S
    ): (state: S, action: any) => S;
}

type PathPseudoreducer<KS extends StringOrNumber[], S> = <TIS extends ToNullable<KS, S, LengthOf<KS>>>(state: S, action: any) => TIS;

export interface OuterReducer {
    (
        path: ValidKeyType | Array<ValidKeyType>,
        reducer: (state: any, action: any) => any
    ): (state: any, action: any) => any;

    <
        K1 extends ValidKeyType,
        KS extends ToStringOrNumberMap<[K1]>,
        S
    >
    (
        path: K1,
        reducer: PathPseudoreducer<KS, S>,
        stateType: S
    ): (state: S, action: any) => S;

    <
        K1 extends ValidKeyType,
        Path extends [K1],
        KS extends ToStringOrNumberMap<Path>,
        S
    >
    (
        path: Path,
        reducer: PathPseudoreducer<KS, S>,
        stateType: S
    ): (state: S, action: any) => S;

    <
        K1 extends ValidKeyType,
        K2 extends ValidKeyType,
        Path extends [K1,K2],
        KS extends ToStringOrNumberMap<Path>,
        S
    >
    (
        path: Path,
        reducer: PathPseudoreducer<KS, S>,
        stateType: S
    ): (state: S, action: any) => S;
}