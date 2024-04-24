import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"
import { pick } from "remeda"

import { PhotoGallery } from "../../components/pages/PhotoGallery"
import { getFilteredImages } from "../../shared/utils/getFilteredImages"

import type { PhotoGalleryFilterKey } from "@shared/types/PhotoGalleryFilterKey"

const filterPickKeys = ["date", "location", "tag"] satisfies PhotoGalleryFilterKey[]

export default createRoute((c) => {
  const filterQueries = pick(c.req.query(), filterPickKeys)
  const images = getFilteredImages(filterQueries)(ImagesDataBase)
  return c.render(<PhotoGallery filterQueries={filterQueries} images={images} />, {
    description: "趣味で撮った写真一覧",
    filterQueries,
    title: "Photo Gallery",
  })
})
