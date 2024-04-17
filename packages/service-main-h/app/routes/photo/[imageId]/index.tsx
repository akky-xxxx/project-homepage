import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"

import { Photo } from "../../../components/pages/PhotoDetail"

export default createRoute((c) => {
  const imageInfo = ImagesDataBase.find((record) => record.imageId === c.req.param("imageId"))
  if (!imageInfo) return c.notFound()
  return c.render(<Photo {...imageInfo} />, { title: "Photo" })
})
