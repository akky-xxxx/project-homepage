import { css } from "hono/css"
import { createRoute } from "honox/factory"

import Counter from "../islands/Counter"

const className = css`
  font-family: sans-serif;
`

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono"
  return c.render(
    <div className={className}>
      <h1>Hello, {name}!</h1>
      <Counter />
    </div>,
    { title: name },
  )
})
