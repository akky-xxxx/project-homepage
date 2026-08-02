import type { Page } from "@playwright/test"

export type LoginOptions = {
  page: Page
  serverURL?: string
}
