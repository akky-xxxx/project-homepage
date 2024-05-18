import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"
import { pick } from "remeda"

import { ImagesPerPage } from "@shared/const/ImagesPerPage"
import { getFilteredImages } from "@shared/utils/getFilteredImages"

import { PhotoGallery } from "../../components/pages/PhotoGallery"
import { getPageData } from "../../modules/photoGallery/getPageData"

import type { PhotoGalleryFilterKey } from "@shared/types/PhotoGalleryFilterKey"

const filterPickKeys = ["date", "location", "tag"] satisfies PhotoGalleryFilterKey[]

export default createRoute((c) => {
  const filterQueries = pick(c.req.query(), filterPickKeys)
  const filteredImages = getFilteredImages(filterQueries)(ImagesDataBase)

  const { page } = c.req.query()
  const { currentPage, totalPages } = getPageData(page || "", filteredImages.length)

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const sliceStart = (currentPage - 1) * ImagesPerPage
  const images = filteredImages.slice(sliceStart, sliceStart + ImagesPerPage)

  return c.render(
    <PhotoGallery
      currentPage={currentPage}
      filterQueries={filterQueries}
      images={images}
      totalPages={totalPages}
    />,
    {
      description: "趣味で撮った写真一覧",
      filterQueries,
      title: "Photo Gallery",
    },
  )
})
