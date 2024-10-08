import { cx, Style } from "hono/css"
import { jsxRenderer } from "hono/jsx-renderer"
import { Script } from "honox/server"

import { Layout } from "../components/Layout"
import { exteriorStyle } from "../styles/exteriorStyle"
import { globalStyle } from "../styles/globalStyle"

export default jsxRenderer((props) => {
  const { children, description, photoGallerySearchQueries, title } = props
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content={description} name="description" />
        <title>
          akky-xxxx |
          {title}
        </title>
        <link
          href="https://cdn.jsdelivr.net/npm/modern-css-reset/dist/reset.min.css"
          rel="stylesheet"
        />
        <Script async src="/app/client.ts" />
        <Style>{cx(exteriorStyle, globalStyle)}</Style>
      </head>
      <body>
        <Layout {...photoGallerySearchQueries}>{children}</Layout>
      </body>
    </html>
  )
})
