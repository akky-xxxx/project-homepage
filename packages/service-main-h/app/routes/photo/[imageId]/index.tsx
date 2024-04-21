import { format } from "@formkit/tempo"
import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"
import { pick } from "remeda"

import { TempoFormats } from "@shared/const/TempoFormats"

import { PhotoDetail } from "../../../components/pages/PhotoDetail"
import { getSiblingImages } from "../../../modules/photoDetail/getSiblingImages"

import type { PhotoGalleryFilterKey } from "@shared/types/PhotoGalleryFilterKey"

const filterPickKeys = ["date", "location", "tag"] satisfies PhotoGalleryFilterKey[]

export default createRoute((c) => {
  const imageInfo = ImagesDataBase.find((record) => record.imageId === c.req.param("imageId"))
  if (!imageInfo) return c.notFound()
  const filterQueries = pick(c.req.query(), filterPickKeys)
  const { date, imageId, area } = imageInfo
  const siblingImages = getSiblingImages(imageId, ImagesDataBase, filterQueries)

  return c.render(
    <PhotoDetail {...imageInfo} filterQueries={filterQueries} siblingImages={siblingImages} />,
    {
      description: `${area}で${format(date, TempoFormats.YYYY年M月D日)}に撮った写真`,
      title: "Photo",
    },
  )
})
