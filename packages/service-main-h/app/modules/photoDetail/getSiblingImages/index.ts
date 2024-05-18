import { getSearchedImages } from "app/shared/utils/getSearchedImages"

import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

const Sibling = 1

type OptionalImageInfo = ImagesDataBaseRecord | undefined

type GetSiblingImages = (
  imageId: string,
  images: ImagesDataBaseRecord[],
  searchQueries: PhotoGallerySearchQueries,
) => [OptionalImageInfo, OptionalImageInfo]

export const getSiblingImages: GetSiblingImages = (imageId, images, searchQueries) => {
  const filteredImages = getSearchedImages(searchQueries)(images)
  const currentIndex = filteredImages.findIndex((imageInfo) => imageInfo.imageId === imageId)
  return [
    filteredImages[currentIndex - Sibling],
    filteredImages[currentIndex + Sibling],
  ] satisfies [ImagesDataBaseRecord, ImagesDataBaseRecord]
}
