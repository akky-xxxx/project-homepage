import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"

import { PhotoDetail } from "../../../components/pages/PhotoDetail"

export default createRoute((c) => {
  const imageInfo = ImagesDataBase.find((record) => record.imageId === c.req.param("imageId"))
  if (!imageInfo) return c.notFound()
  return c.render(<PhotoDetail {...imageInfo} />, { title: "Photo" })
})
