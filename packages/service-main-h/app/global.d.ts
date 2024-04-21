// prettier-ignore
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import {} from 'hono'

type Head = {
  description: string
  title?: string
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
