export type ReduceCallback<T, U> = (
  previousValue: T,
  currentValue: U,
  currentIndex: number,
  originArray: U[],
) => T
