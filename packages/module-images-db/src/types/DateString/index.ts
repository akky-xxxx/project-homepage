/* eslint-disable @typescript-eslint/no-magic-numbers */
type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type ZeroToNine = OneToNine | 0
type Month = `0${OneToNine}` | 10 | 11 | 12
type Dates = `${0 | 1 | 2 | 3}${ZeroToNine}`

export type DateString = `${19 | 20}${ZeroToNine}${ZeroToNine}-${Month}-${Dates}`
