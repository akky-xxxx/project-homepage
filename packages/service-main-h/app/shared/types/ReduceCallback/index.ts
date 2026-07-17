// reduce 用の callback のため
// eslint-disable-next-line @typescript-eslint/max-params
export type ReduceCallback<T, U> = (
  previousValue: T,
  currentValue: U,
  currentIndex: number,
  originArray: U[],
) => T
