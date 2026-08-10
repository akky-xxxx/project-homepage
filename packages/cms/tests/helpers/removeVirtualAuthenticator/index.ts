import type { addVirtualAuthenticator } from "../addVirtualAuthenticator"

export const removeVirtualAuthenticator = async (
  authenticator: Awaited<ReturnType<typeof addVirtualAuthenticator>>,
): Promise<void> => {
  const { client, authenticatorId } = authenticator
  await client.send("WebAuthn.removeVirtualAuthenticator", { authenticatorId })
}
