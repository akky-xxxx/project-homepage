import type { PayloadRequest } from "payload"

export const isAdmin = (arguments_: { req: PayloadRequest }): boolean =>
  arguments_.req.user?.role === "admin"
