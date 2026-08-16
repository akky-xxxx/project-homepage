import type { Page } from "@playwright/test"

export type LoginWithPasswordAndTotpOptions = {
  page: Page
  email: string
  password: string
  totpCode: string
  serverURL?: string
}
