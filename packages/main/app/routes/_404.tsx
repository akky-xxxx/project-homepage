import { Error404 } from "../components/pages/Error404"

import type { NotFoundHandler } from "hono"

const notFoundHandler: NotFoundHandler = (c) => c.render(<Error404 />)

// eslint-disable-next-line import/no-default-export
export default notFoundHandler
