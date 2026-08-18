import type { authClient } from "@/shared/utilities/authClient"

/**
 * `twoFactor` プラグインの after hook が差し込む `twoFactorRedirect` フラグを読み取る。
 * `authClient.signIn.email` の静的な型はプラグインによるレスポンス差し替えを表現しないため
 * (auth.int.spec.ts の `isTwoFactorRedirect` と同じ理由)、実行時に構造を確認する。
 * @param data `signIn.email` が返す success data
 * @returns 2FA チャレンジへのリダイレクトなら true
 */
const hasTwoFactorRedirect = (data: object): boolean =>
  "twoFactorRedirect" in data && data.twoFactorRedirect === true

/**
 * 実際の `authClient` を `signInWithPassword` が期待する最小構造型に合わせて包む。
 * `authClient.signIn.email` の成功時レスポンス型はプラグイン注入前の形(`token`/`user` 等)しか
 * 静的に表現されず `twoFactorRedirect` を含まないため、直接渡すと構造的に非互換になる。
 * @param client 実際の better-auth クライアント
 * @returns `signInWithPassword` に渡せるクライアント
 */
export const toPasswordSignInClient = (client: typeof authClient) => ({
  signIn: {
    email: async (input: { email: string; password: string }) => {
      const { data, error } = await client.signIn.email(input)

      return {
        data: data == null ? null : { twoFactorRedirect: hasTwoFactorRedirect(data) },
        error,
      }
    },
  },
})
