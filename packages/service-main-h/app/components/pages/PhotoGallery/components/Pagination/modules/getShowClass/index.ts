import { ShowClasses } from "@shared/const/ShowClasses"

import type { PaginationData } from "@shared/types/PaginationData"

const spValue: string[] = ["first", "previous", "next", "last"] satisfies PaginationData[]

export const getShowClass = (value: PaginationData) => {
  if (typeof value === "number") return ShowClasses.PC
  return ShowClasses[spValue.includes(value) ? "SP" : "PC"]
}
