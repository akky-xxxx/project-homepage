import { Style } from "hono/css"
import { jsxRenderer } from "hono/jsx-renderer"
import { Script } from "honox/server"

export default jsxRenderer(({ children, title }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>{title}</title>
      <Script async src="/app/client.ts" />
      <Style />
    </head>
    <body>{children}</body>
  </html>
))
