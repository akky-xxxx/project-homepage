import { getCookie } from "hono/cookie"
import { createRoute } from "honox/factory"

import { CookieKeys } from "@shared/const/CookieKeys"
import { getExteriorMode } from "@shared/utils/getExteriorMode"

export default createRoute((c) => {
  const exteriorMode = getExteriorMode(getCookie(c, CookieKeys.ExteriorMode))
  return c.render(<h1>Hello!</h1>, { exteriorMode, title: "Profile" })
})
