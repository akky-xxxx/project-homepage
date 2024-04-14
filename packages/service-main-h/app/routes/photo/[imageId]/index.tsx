import { getCookie } from "hono/cookie"
import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"

import { CookieKeys } from "@shared/const/CookieKeys"
import { getExteriorMode } from "@shared/utils/getExteriorMode"

import { Photo } from "../../../components/pages/PhotoDetail"

export default createRoute((c) => {
  const imageInfo = ImagesDataBase.find((record) => record.imageId === c.req.param("imageId"))
  if (!imageInfo) return c.notFound()
  const exteriorMode = getExteriorMode(getCookie(c, CookieKeys.ExteriorMode))
  return c.render(<Photo {...imageInfo} />, { exteriorMode, title: "Photo" })
})
