import { z } from "zod"

/* eslint-disable sonarjs/todo-tag */
// TODO: Upper camel を許容後にコメント消す
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EnvironmentSchema = z.object({
  BUCKET: z.string(),
})
