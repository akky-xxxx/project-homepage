import type { PayloadRequest } from "payload"

export const isApiClient = (arguments_: { req: Pick<PayloadRequest, "user"> }): boolean =>
  arguments_.req.user?.collection === "api-keys"
