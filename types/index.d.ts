// TypeScript Version: 2.9

type ReducerLikeFunction<TS, TA, TRet> = (state: TS, action: TA, ...others: any[]) => TRet;
export type Reducer<TS, TA> = (state: TS, action: TA, ...others: any[]) => TS;
type TemplateType<TS, TA, TO> = {
  [K in keyof TO]: TO[K] | ReducerLikeFunction<TS, TA, TO[K]>
};
type CastableToReducer<TS, TA, TO = TS> =
  ReducerLikeFunction<TS, TA, TO> |
  TemplateType<TS, TA, TO> |
  TO;

/// rereducer
type MatcherFunction<TS, TA> = ReducerLikeFunction<TS, TA, boolean>;
type AdvancedRuleDef<TS, TA> = [Matcher<TS, TA>, CastableToReducer<TS, TA>];
type Matcher<TS, TA> = string | MatcherFunction<TS, TA> | MatcherArray<TS, TA>;
interface MatcherArray<TS, TA> extends Array<Matcher<TS, TA>> { }

type SelectWithType<TA, TAType> = TA extends { type: TAType } ? TA : never;
interface ActionWithType {
  type: any;
}
interface ActionWithPayload<P> extends ActionWithType {
  payload: P;
}
export type ActionTypeRuleDef<TS, TA extends ActionWithType> = TA extends { type: infer TAType }
  ? [TAType, CastableToReducer<TS, SelectWithType<TA, TAType>>]
  : AdvancedRuleDef<TS, TA>;

export type RuleDef<TS, TA extends ActionWithType> =
  | ActionTypeRuleDef<TS, TA>
  | AdvancedRuleDef<TS, TA>;

export function switchReducers<TS, TA extends ActionWithType>(initialValue: TS, ...ruleDefs: Array<RuleDef<TS, TA>>): Reducer<TS, TA>;
export default switchReducers;

/// assocReducer
type Getter<TS, TA> = string | ReducerLikeFunction<TS, TA, string>;
export function outerReducer<TO, TS extends { [key: string]: TO }, TA>(
  getters: Array<Getter<TS, TA>>,
  reducer: CastableToReducer<TS, TA, TO>
): Reducer<TS, TA>;

/// subReducer
export function innerReducer<TS, TA>(
  getters: Array<Getter<TS, TA>>,
  reducer: CastableToReducer<any, TA>
): Reducer<TS, TA>;

/// concatReducer
export function concat<TS extends any[] | string, TA>(getter: CastableToReducer<TS, TA>): Reducer<TS, TA>;

/// mergeReducer
export function merge<TS, TA>(reducer: CastableToReducer<TS, TA, Partial<TS>>): Reducer<TS, TA>;

/// isType
export function isType<TA extends ActionWithType>(x: TA['type']): MatcherFunction<any, TA>;

/// payload
export function fromPayload(...path: string[]): ReducerLikeFunction<any, ActionWithPayload<any>, any>;
