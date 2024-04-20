import { getFilteredImages } from "@shared/utils/getFilteredImages"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

const Sibling = 1

type OptionalImageInfo = ImagesDataBaseRecord | undefined

type GetSiblingImages = (
  imageId: string,
  images: ImagesDataBaseRecord[],
  filterQueries: FilterQueries,
) => [OptionalImageInfo, OptionalImageInfo]

export const getSiblingImages: GetSiblingImages = (imageId, images, filterQueries) => {
  const filteredImages = getFilteredImages(filterQueries)(images)
  const currentIndex = filteredImages.findIndex((imageInfo) => imageInfo.imageId === imageId)
  return [
    filteredImages[currentIndex - Sibling],
    filteredImages[currentIndex + Sibling],
  ] satisfies [ImagesDataBaseRecord, ImagesDataBaseRecord]
}
