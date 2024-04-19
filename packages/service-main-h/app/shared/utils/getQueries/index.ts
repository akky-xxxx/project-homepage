import type { FilterQueries } from "@shared/types/FilterQueries"

const FirstIndex = 0
const Previous = -1
const Next = 1
const Same = 0

type GetQueries = (queries?: FilterQueries) => string

export const getQueries: GetQueries = (queries) => {
  if (!queries) return ""

  return Object.entries(queries)
    .sort((a, b) => {
      if (a[FirstIndex] > b[FirstIndex]) return Next
      if (a[FirstIndex] < b[FirstIndex]) return Previous
      return Same
    })
    .map((keyValue) => keyValue.join("="))
    .join("&")
}
