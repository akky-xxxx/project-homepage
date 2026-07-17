import { Error404 } from "../components/pages/Error404"

import type { ErrorHandler } from "hono"

const errorHandler: ErrorHandler = (_error, c) => c.render(<Error404 />)

// eslint-disable-next-line import/no-default-export
export default errorHandler
