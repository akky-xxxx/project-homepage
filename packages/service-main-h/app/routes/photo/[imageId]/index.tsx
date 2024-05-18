import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"
import { pick } from "remeda"

import { getPhotoText } from "@shared/utils/getPhotoText"

import { PhotoDetail } from "../../../components/pages/PhotoDetail"
import { getSiblingImages } from "../../../modules/photoDetail/getSiblingImages"

import type { PhotoGallerySearchKey } from "app/shared/types/PhotoGallerySearchKey"

const filterPickKeys = ["date", "location", "tag"] satisfies PhotoGallerySearchKey[]

export default createRoute((c) => {
  const imageInfo = ImagesDataBase.find((record) => record.imageId === c.req.param("imageId"))
  if (!imageInfo) return c.notFound()
  const searchQueries = pick(c.req.query(), filterPickKeys)
  const { imageId } = imageInfo
  const siblingImages = getSiblingImages(imageId, ImagesDataBase, searchQueries)

  return c.render(
    <PhotoDetail {...imageInfo} searchQueries={searchQueries} siblingImages={siblingImages} />,
    {
      description: getPhotoText(imageInfo),
      title: "Photo",
    },
  )
})
