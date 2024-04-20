import { isIncludesTag } from "./modules/isIncludesTag"
import { isSameLocation } from "./modules/isSameLocation"
import { isStartsWithDate } from "./modules/isStartsWithDate"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type GetFilteredImages = (
  filterQueries: FilterQueries,
) => (images: ImagesDataBaseRecord[]) => ImagesDataBaseRecord[]

export const getFilteredImages: GetFilteredImages = (filterQueries) => (images) => {
  const { date, location, tag } = filterQueries
  if (!date || !location || !tag) return images

  const isSameLocationMain = isSameLocation(location)
  const isStartsWithDateMain = isStartsWithDate(date)
  const isIncludesTagMain = isIncludesTag(tag)

  return images.filter(isSameLocationMain).filter(isStartsWithDateMain).filter(isIncludesTagMain)
}
