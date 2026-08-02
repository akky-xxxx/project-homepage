import { test, expect } from "@playwright/test"

import { addVirtualAuthenticator } from "../helpers/addVirtualAuthenticator"
import { cleanupTestUser } from "../helpers/cleanupTestUser"
import { login } from "../helpers/login"
import { registerTestPasskey } from "../helpers/registerTestPasskey"
import { removeVirtualAuthenticator } from "../helpers/removeVirtualAuthenticator"
import { seedTestUser } from "../helpers/seedTestUser"

import type { Page } from "@playwright/test"

test.describe("Admin Panel", () => {
  let page: Page
  let authenticator: Awaited<ReturnType<typeof addVirtualAuthenticator>>

  test.beforeAll(async (fixtures) => {
    const { browser } = fixtures
    const { id: userId } = await seedTestUser()

    const context = await browser.newContext()
    page = await context.newPage()
    authenticator = await addVirtualAuthenticator(page)

    await registerTestPasskey({ context, page, userId })
    await login({ page })
  })

  test.afterAll(async () => {
    await removeVirtualAuthenticator(authenticator)
    await cleanupTestUser()
  })

  test("can navigate to dashboard", async () => {
    await page.goto("http://localhost:3000/")
    await expect(page).toHaveURL("http://localhost:3000/")
    const dashboardArtifact = page.locator('span[title="Dashboard"]').first()
    await expect(dashboardArtifact).toBeVisible()
  })

  test("can navigate to list view", async () => {
    await page.goto("http://localhost:3000/collections/users")
    await expect(page).toHaveURL("http://localhost:3000/collections/users")
    const listViewArtifact = page.locator("h1", { hasText: "Users" }).first()
    await expect(listViewArtifact).toBeVisible()
  })

  test("can navigate to edit view", async () => {
    await page.goto("http://localhost:3000/collections/users/create")
    await expect(page).toHaveURL(/\/collections\/users\/[a-zA-Z0-9-_]+/)
    const editViewArtifact = page.locator('input[name="email"]')
    await expect(editViewArtifact).toBeVisible()
  })
})
