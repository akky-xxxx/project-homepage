import type { Page } from "@playwright/test"

export type LoginOptions = {
  page: Page
  email: string
  password: string
  totpSecret: string
  serverURL?: string
}
