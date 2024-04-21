import { jsxRenderer } from "hono/jsx-renderer"
import { Script } from "honox/server"

import { Layout } from "../components/Layout"

export default jsxRenderer((props) => {
  const { children, title } = props
  // @ts-expect-error: dot access と bracket access のルールがコンフリしてる
  const cssDirectory = import.meta.env.PROD ? "static" : "app"
  const cssHref = `/${cssDirectory}/index.css`

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>akky-xxxx | {title}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/modern-css-reset/dist/reset.min.css"
          rel="stylesheet"
        />
        <link href={cssHref} rel="stylesheet" />
        <Script async src="/app/client.ts" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
})
