// FIXME: 正しく作動しない
import type { NotFoundHandler } from "hono"

const notFoundHandler: NotFoundHandler = (c) => {
  // eslint-disable-next-line no-console
  console.log({ c })
  return c.render(<h1>404エラーページ</h1>)
}

// eslint-disable-next-line import/no-default-export
export default notFoundHandler
