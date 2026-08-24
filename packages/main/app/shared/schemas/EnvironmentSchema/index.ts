import { z } from "zod"

const NON_EMPTY = 1

/* eslint-disable sonarjs/todo-tag */
// TODO: Upper camel を許容後にコメント消す
export const EnvironmentSchema = z.object({
  CMS_API_KEY: z.string().min(NON_EMPTY),
  CMS_HOST: z.string(),
})
