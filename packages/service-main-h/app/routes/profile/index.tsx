import { getCookie } from "hono/cookie"
import { createRoute } from "honox/factory"

import { CookieKeys } from "@shared/const/CookieKeys"
import { getExteriorMode } from "@shared/utils/getExteriorMode"

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono"
  const exteriorMode = getExteriorMode(getCookie(c, CookieKeys.ExteriorMode))
  return c.render(
    <div>
      <h1>Hello, {name}!</h1>
    </div>,
    { exteriorMode, title: name },
  )
})
