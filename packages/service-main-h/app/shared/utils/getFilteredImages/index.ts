import { isIncludesTag } from "./modules/isIncludesTag"
import { isSameLocation } from "./modules/isSameLocation"
import { isStartsWithDate } from "./modules/isStartsWithDate"

import type { PhotoGalleryFilterKey } from "@shared/types/PhotoGalleryFilterKey"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type GetFilteredImages = (
  filterQueries: Record<PhotoGalleryFilterKey, string>,
) => (images: ImagesDataBaseRecord[]) => ImagesDataBaseRecord[]

export const getFilteredImages: GetFilteredImages = (filterQueries) => (images) => {
  const { date, location, tag } = filterQueries
  const isSameLocationMain = isSameLocation(location)
  const isStartsWithDateMain = isStartsWithDate(date)
  const isIncludesTagMain = isIncludesTag(tag)

  return images.filter(isSameLocationMain).filter(isStartsWithDateMain).filter(isIncludesTagMain)
}
