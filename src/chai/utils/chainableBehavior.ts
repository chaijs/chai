export interface ChainableBehavior {
  chainingBehavior: () => void;
  method: (...args: unknown[]) => unknown;
}
