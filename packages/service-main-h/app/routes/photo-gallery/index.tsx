import { getCookie } from "hono/cookie"
import { createRoute } from "honox/factory"

import { CookieKeys } from "@shared/const/CookieKeys"
import { getExteriorMode } from "@shared/utils/getExteriorMode"

import { PhotoGallery } from "../../components/pages/PhotoGallery"

export default createRoute((c) => {
  const exteriorMode = getExteriorMode(getCookie(c, CookieKeys.ExteriorMode))
  return c.render(<PhotoGallery />, { exteriorMode, title: "Photo Gallery" })
})
