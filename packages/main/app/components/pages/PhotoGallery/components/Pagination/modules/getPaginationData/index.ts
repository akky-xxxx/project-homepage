import type { PaginationData } from "@shared/types/PaginationData"
import type { ReduceCallback } from "@shared/types/ReduceCallback"

type Props = Record<"currentPage" | "totalPages", number>
type GetPaginationData = (props: Props) => readonly PaginationData[]

/* eslint-disable @typescript-eslint/no-magic-numbers */
const sortByNumberAsc = (a: number, b: number): number => {
  if (a === b) return 0
  return a > b ? 1 : -1
}

const isWithinZeroToMax = (max: number) => (value: number): boolean => value > 0 && value <= max

const addEllipsis: ReduceCallback<PaginationData[], PaginationData> = (
  previousValue,
  currentValue,
  currentIndex,
  originArray,
  // reduce 用の callback のため
  // eslint-disable-next-line @typescript-eslint/max-params
) => {
  if (typeof currentValue === "string") return [...previousValue, currentValue]

  const nextValue = originArray.at(currentIndex + 1)
  const returnValue = [...previousValue, currentValue]

  return typeof nextValue !== "number" || nextValue - currentValue <= 1
    ? returnValue
    : [...returnValue, "ellipsis"]
}

export const getPaginationData: GetPaginationData = (props) => {
  const { currentPage, totalPages } = props

  const numberArray = [1, currentPage - 1, currentPage, currentPage + 1, totalPages]

  if (currentPage === 1) numberArray.push(currentPage + 2)
  if (currentPage === totalPages) numberArray.push(currentPage - 2)

  const baseArray: PaginationData[] = [...new Set(numberArray)]
    .sort(sortByNumberAsc)
    .filter(isWithinZeroToMax(totalPages))
  if (currentPage > 1) baseArray.unshift("first", "previous")
  if (currentPage < totalPages) baseArray.push("next", "last")

  return baseArray.reduce(addEllipsis, [])
}
