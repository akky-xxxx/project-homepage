// prettier-ignore
/* eslint-disable import/no-empty-named-blocks, sc-js/file-path-patterns, unicorn/require-module-specifiers, @typescript-eslint/consistent-type-definitions, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type, @typescript-eslint/sort-type-constituents */
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
