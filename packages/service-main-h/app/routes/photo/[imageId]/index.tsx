import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"
import { pick } from "remeda"

import { PhotoDetail } from "../../../components/pages/PhotoDetail"
import { getFilteredImages } from "../../../shared/utils/getFilteredImages"

import type { PhotoGalleryFilterKey } from "@shared/types/PhotoGalleryFilterKey"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

const filterPickKeys = ["date", "location", "tag"] satisfies PhotoGalleryFilterKey[]
const Sibling = 1

export default createRoute((c) => {
  const imageInfo = ImagesDataBase.find((record) => record.imageId === c.req.param("imageId"))
  if (!imageInfo) return c.notFound()
  const filterQueries = pick(c.req.query(), filterPickKeys)
  const filteredImages = getFilteredImages(filterQueries)(ImagesDataBase)
  const currentIndex = filteredImages.findIndex(({ imageId }) => imageId === imageInfo.imageId)
  const siblingImages = [
    filteredImages[currentIndex - Sibling],
    filteredImages[currentIndex + Sibling],
  ] satisfies [ImagesDataBaseRecord, ImagesDataBaseRecord]
  return c.render(<PhotoDetail {...imageInfo} siblingImages={siblingImages} />, { title: "Photo" })
})
