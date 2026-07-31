import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"

const FirstIndex = 0
const Previous = -1
const Next = 1
const Same = 0

type GetQueries = (queries?: PhotoGallerySearchQueries) => string

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
