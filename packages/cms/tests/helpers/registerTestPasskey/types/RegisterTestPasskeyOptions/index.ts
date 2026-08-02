import type { BrowserContext, Page } from "@playwright/test"

export type RegisterTestPasskeyOptions = {
  context: BrowserContext
  page: Page
  userId: string
  serverURL?: string
}
