export interface ChainableBehavior {
  chainingBehavior: () => void;
  method: (...args: never) => unknown;
}
