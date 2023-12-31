export type Constructor<T> = {new(): T};

export type OnlyIf<T, TCondition, TResult, TElse = never> = T extends TCondition ? TResult : TElse;

export type CollectionLike<T> = Map<unknown, T> | Set<T> | (T extends object ? WeakSet<T> : never) | Array<T>;

export type KeyedObject = Map<unknown, unknown> | object | Set<unknown>;

export type LengthLike = Map<unknown, unknown> | Set<unknown> | {length: number};
