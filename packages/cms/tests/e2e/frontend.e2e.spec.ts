import { test, expect } from "@playwright/test"

import type { Page } from "@playwright/test"

test.describe("Frontend", () => {
  let page: Page

  test.beforeAll(async (fixtures) => {
    const { browser } = fixtures
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test("can go on homepage", async () => {
    await page.goto("http://localhost:3000")

    await expect(page).toHaveTitle(/Payload Blank Template/)

    const heading = page.locator("h1").first()

    await expect(heading).toHaveText("Welcome to your new project.")
  })
})
