// prettier-ignore
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import {} from 'hono'

import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"

type Head = {
  description: string
  title?: string
  photoGallerySearchQueries?: PhotoGallerySearchQueries
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
