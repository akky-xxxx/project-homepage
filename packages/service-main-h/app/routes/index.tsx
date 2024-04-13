import { getCookie } from "hono/cookie"
import { css } from "hono/css"
import { createRoute } from "honox/factory"

import { CookieKeys } from "@shared/const/CookieKeys"
import { getExteriorMode } from "@shared/utils/getExteriorMode"

import Counter from "../islands/Counter"

const className = css`
  font-family: sans-serif;
`

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono"
  const exteriorMode = getExteriorMode(getCookie(c, CookieKeys.ExteriorMode))
  return c.render(
    <div className={className}>
      <h1>Hello, {name}!</h1>
      <Counter />
    </div>,
    { exteriorMode, title: name },
  )
})
