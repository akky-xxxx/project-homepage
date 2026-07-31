import type { Page } from '@playwright/test'

/**
 * CDP の WebAuthn ドメインで virtual authenticator を追加する。
 * automaticPresenceSimulation により、実機の生体認証なしで
 * passkey の登録/認証セレモニーが自動完了する。
 */
export const addVirtualAuthenticator = async (page: Page) => {
  const client = await page.context().newCDPSession(page)
  await client.send('WebAuthn.enable', { enableUI: false })

  const { authenticatorId } = await client.send('WebAuthn.addVirtualAuthenticator', {
    options: {
      protocol: 'ctap2',
      transport: 'internal',
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      automaticPresenceSimulation: true,
    },
  })

  return { client, authenticatorId }
}

export const removeVirtualAuthenticator = async ({
  client,
  authenticatorId,
}: Awaited<ReturnType<typeof addVirtualAuthenticator>>): Promise<void> => {
  await client.send('WebAuthn.removeVirtualAuthenticator', { authenticatorId })
}
