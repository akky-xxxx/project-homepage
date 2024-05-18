import { isIncludesTag } from "./modules/isIncludesTag"
import { isSameLocation } from "./modules/isSameLocation"
import { isStartsWithDate } from "./modules/isStartsWithDate"

import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type GetSearchedImages = (
  photoGallerySearchQueries: PhotoGallerySearchQueries,
) => (images: ImagesDataBaseRecord[]) => ImagesDataBaseRecord[]

export const getSearchedImages: GetSearchedImages = (photoGallerySearchQueries) => (images) => {
  const { date, location, tag } = photoGallerySearchQueries

  const isSameLocationMain = isSameLocation(location || "")
  const isStartsWithDateMain = isStartsWithDate(date || "")
  const isIncludesTagMain = isIncludesTag(tag || [])

  return images.filter(isSameLocationMain).filter(isStartsWithDateMain).filter(isIncludesTagMain)
}
