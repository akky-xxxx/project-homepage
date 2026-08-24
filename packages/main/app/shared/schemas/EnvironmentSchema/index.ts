import { z } from "zod"

/* eslint-disable sonarjs/todo-tag */
// TODO: Upper camel を許容後にコメント消す
export const EnvironmentSchema = z.object({
  CMS_HOST: z.string(),
})
