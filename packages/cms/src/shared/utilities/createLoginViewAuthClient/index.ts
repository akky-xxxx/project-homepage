import { passkeyClient } from "@better-auth/passkey/client"
import { twoFactorClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

/**
 * LoginView 用の better-auth クライアントを生成する。
 * `twoFactorClient`/`passkeyClient` を積んでいるため、`signIn.email` の応答から
 * 2要素認証の要求を読み取れ、`signIn.passkey` で passkey 認証を行える。
 * @returns better-auth クライアント
 */
export const createLoginViewAuthClient = () =>
  createAuthClient({ plugins: [twoFactorClient(), passkeyClient()] })
