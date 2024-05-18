import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"
import { pick } from "remeda"

import { ImagesPerPage } from "@shared/const/ImagesPerPage"
import { getSearchedImages } from "app/shared/utils/getSearchedImages"

import { PhotoGallery } from "../../components/pages/PhotoGallery"
import { getPageData } from "../../modules/photoGallery/getPageData"

import type { PhotoGallerySearchKey } from "app/shared/types/PhotoGallerySearchKey"

const filterPickKeys = ["date", "location", "tag"] satisfies PhotoGallerySearchKey[]

export default createRoute((c) => {
  const searchQueries = pick(c.req.query(), filterPickKeys)
  const searchedImages = getSearchedImages(searchQueries)(ImagesDataBase)

  const { page } = c.req.query()
  const { currentPage, totalPages } = getPageData(page || "", searchedImages.length)

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const sliceStart = (currentPage - 1) * ImagesPerPage
  const images = searchedImages.slice(sliceStart, sliceStart + ImagesPerPage)

  return c.render(
    <PhotoGallery
      currentPage={currentPage}
      searchQueries={searchQueries}
      images={images}
      totalPages={totalPages}
    />,
    {
      description: "趣味で撮った写真一覧",
      photoGallerySearchQueries: searchQueries,
      title: "Photo Gallery",
    },
  )
})
