import type { PayloadRequest } from "payload"

export const isAdmin = (arguments_: { req: Pick<PayloadRequest, "user"> }): boolean =>
  arguments_.req.user?.collection === "users" && arguments_.req.user.role === "admin"
