import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"
import { pick } from "remeda"

import { getPhotoText } from "@shared/utils/getPhotoText"

import { PhotoDetail } from "../../../components/pages/PhotoDetail"
import { getSiblingImages } from "../../../modules/photoDetail/modules/getSiblingImages"

export default createRoute((c) => {
  const imageInfo = ImagesDataBase.find((record) => record.imageId === c.req.param("imageId"))
  if (!imageInfo) return c.notFound()

  const query = c.req.query()
  const queries = c.req.queries()
  const searchQueries = {
    ...pick(query, ["data", "location"]),
    ...pick(queries, ["tag"]),
  }
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
