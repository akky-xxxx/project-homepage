import { getPayload } from "payload"

import config from "@/payload.config"

import { getTestUserCookies } from "../getTestUserCookies"

import type { RegisterTestPasskeyOptions } from "./types/RegisterTestPasskeyOptions"

const DEFAULT_TIMEOUT_MS = 10_000
const POLLING_INTERVAL_MS = 300
const NO_DOCS = 0

const waitForPasskeyRegistered = async (
  userId: string,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<void> => {
  const payload = await getPayload({ config })
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    const { totalDocs } = await payload.find({
      collection: "passkeys",
      limit: 1,
      where: { user: { equals: userId } },
    })
    if (totalDocs > NO_DOCS) return
    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL_MS))
  }

  throw new Error("Timed out waiting for test passkey to be registered")
}

/**
 * testUtils のクッキーで一時的にログイン状態を作り、ユーザー編集画面から
 * 実際の "Add Passkey" フローで virtual authenticator に passkey を登録する。
 * 登録後はクッキーをクリアし、以降のログインテストが実際の passkey サインインを
 * 経由するようにする。
 * @param options ブラウザコンテキスト・ページ・対象ユーザー ID・管理画面の URL
 */
export const registerTestPasskey = async (options: RegisterTestPasskeyOptions): Promise<void> => {
  const { context, page, userId, serverURL = "http://localhost:3000" } = options
  const cookies = await getTestUserCookies(userId)
  await context.addCookies(cookies)

  await page.goto(`${serverURL}/collections/users/${userId}`)
  await page.waitForLoadState("networkidle")
  await page.getByRole("button", { name: "Add Passkey" }).click()
  await page.getByRole("button", { name: "Register Passkey" }).click()

  await waitForPasskeyRegistered(userId)

  await context.clearCookies()
}
