import type { Page } from "@playwright/test"

/**
 * CDP の WebAuthn ドメインで virtual authenticator を追加する。
 * automaticPresenceSimulation により、実機の生体認証なしで
 * passkey の登録/認証セレモニーが自動完了する。
 * @param page virtual authenticator を紐付ける対象のページ
 * @returns CDP セッションと、追加した authenticator の ID
 */
export const addVirtualAuthenticator = async (page: Page) => {
  const client = await page.context().newCDPSession(page)
  await client.send("WebAuthn.enable", { enableUI: false })

  const { authenticatorId } = await client.send("WebAuthn.addVirtualAuthenticator", {
    options: {
      protocol: "ctap2",
      transport: "internal",

      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,

      automaticPresenceSimulation: true,
    },
  })

  return { authenticatorId, client }
}
