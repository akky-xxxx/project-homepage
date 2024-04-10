// prettier-ignore
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import {} from 'hono'

import type { ExteriorMode } from "./shared/types/ExteriorMode"

type Head = {
  title?: string
  exteriorMode: ExteriorMode
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
