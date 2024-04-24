// prettier-ignore
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import {} from 'hono'

import type { FilterQueries } from "@shared/types/FilterQueries"

type Head = {
  description: string
  title?: string
  filterQueries?: FilterQueries
}

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {}
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
