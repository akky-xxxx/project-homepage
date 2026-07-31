import type { BrowserContext, Page } from '@playwright/test'
import { getPayload } from 'payload'

import config from '../../src/payload.config.js'
import { getTestUserCookies } from './seedUser'

export interface RegisterTestPasskeyOptions {
  context: BrowserContext
  page: Page
  userId: string
  serverURL?: string
}

/**
 * testUtils のクッキーで一時的にログイン状態を作り、ユーザー編集画面から
 * 実際の "Add Passkey" フローで virtual authenticator に passkey を登録する。
 * 登録後はクッキーをクリアし、以降のログインテストが実際の passkey サインインを
 * 経由するようにする。
 */
export const registerTestPasskey = async ({
  context,
  page,
  userId,
  serverURL = 'http://localhost:3000',
}: RegisterTestPasskeyOptions): Promise<void> => {
  const cookies = await getTestUserCookies(userId)
  await context.addCookies(cookies)

  await page.goto(`${serverURL}/collections/users/${userId}`)
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: 'Add Passkey' }).click()
  await page.getByRole('button', { name: 'Register Passkey' }).click()

  await waitForPasskeyRegistered(userId)

  await context.clearCookies()
}

const waitForPasskeyRegistered = async (userId: string, timeoutMs = 10_000): Promise<void> => {
  const payload = await getPayload({ config })
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    const { totalDocs } = await payload.find({
      collection: 'passkeys',
      where: { user: { equals: userId } },
      limit: 1,
    })
    if (totalDocs > 0) return
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  throw new Error('Timed out waiting for test passkey to be registered')
}
