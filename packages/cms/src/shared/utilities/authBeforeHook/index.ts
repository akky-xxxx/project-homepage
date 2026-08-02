import { APIError, createAuthMiddleware } from "better-auth/api"

import { ENVIRONMENT } from "@/shared/const/ENVIRONMENT"
import { EmailBodySchema } from "@/shared/schemas/EmailBodySchema"
import { hasAnyUser } from "@/shared/utilities/hasAnyUser"
import { hasRegisteredPasskey } from "@/shared/utilities/hasRegisteredPasskey"

import type { DBAdapter } from "better-auth/types"

const SIGN_IN_EMAIL_PATH = "/sign-in/email"
const SIGN_UP_EMAIL_PATH = "/sign-up/email"

// どの条件で落ちたか(許可アドレスと一致したか等)を外部に見せないため、
// サインアップの拒否は全分岐でこの 1 つのエラーに揃える
const signUpClosedError = (): APIError =>
  new APIError("FORBIDDEN", {
    message: "Sign up is closed. This CMS accepts only the first account.",
  })

/**
 * サインアップを通してよいリクエストかを検証し、そうでなければ throw する。
 * @param adapter Better Auth の DB adapter (`ctx.context.adapter`)
 * @param body リクエストボディ
 */
const assertSignUpAllowed = async (adapter: DBAdapter, body: unknown): Promise<void> => {
  const { SIGN_UP_ALLOWED_EMAIL } = ENVIRONMENT
  if (SIGN_UP_ALLOWED_EMAIL == null) throw signUpClosedError()

  // sign-in と違い、ボディを読めない場合は Better Auth に委ねず拒否側へ倒す
  const parsedBody = EmailBodySchema.safeParse(body)
  if (!parsedBody.success) throw signUpClosedError()

  if (parsedBody.data.email.toLowerCase() !== SIGN_UP_ALLOWED_EMAIL.toLowerCase()) {
    throw signUpClosedError()
  }

  if (await hasAnyUser(adapter)) throw signUpClosedError()
}

/**
 * passkey 登録済みでも password サインインを許可する作業モードかを判定する。
 * ローカルから本番 DB へ繋いで写真を投入する作業のためのもので、passkey は rpID
 * (= BETTER_AUTH_URL のホスト)に紐づくため localhost では本番の passkey を使えないことによる。
 *
 * 判定はサーバー自身の設定値だけを見る。env フラグが誤って Vercel 側に設定されても、
 * 本番はカスタムドメインで動くためホスト条件で弾かれる。
 * @returns 作業モードなら true
 */
const isPasswordSignInEnabled = (): boolean => {
  const { BETTER_AUTH_URL, PASSWORD_SIGN_IN_ENABLED } = ENVIRONMENT
  if (PASSWORD_SIGN_IN_ENABLED !== "true") return false

  return new URL(BETTER_AUTH_URL).hostname === "localhost"
}

/**
 * password をブートストラップ専用に留め、通常のログインを passkey に限定する before hook。
 *
 * - `/sign-up/email`: `SIGN_UP_ALLOWED_EMAIL` と一致し、かつ users が 0 件のときだけ通す。
 *   admin 1 人運用のため、アカウントを作れるのは最初の 1 回だけ(その 1 人は
 *   `betterAuthCollections` が注入する first-user-admin ガードにより `role: "admin"` になる)。
 *   `SIGN_UP_ALLOWED_EMAIL` 未設定なら常に拒否するので、初期登録後は環境変数を削除して
 *   再デプロイすればサインアップ API を恒久的に閉じられる。
 * - `/sign-in/email`: passkey を登録済みのユーザーは拒否する。passkey 未登録の間だけ
 *   password でログインでき、そこから passkey を登録する導線に乗る。
 *   例外として、localhost かつ `PASSWORD_SIGN_IN_ENABLED=true` のときは拒否しない
 *   (本番 DB へローカルから繋いで作業するため。isPasswordSignInEnabled 参照)。
 *
 * passkey を全て失った場合の復旧手順:
 * Postgres の `passkeys` から当該ユーザーの行を削除すると password ログインが再び通るため、
 * ログイン後に passkey を登録し直す。
 */
export const authBeforeHook = createAuthMiddleware(async (authContext) => {
  const { adapter } = authContext.context

  if (authContext.path === SIGN_UP_EMAIL_PATH) {
    await assertSignUpAllowed(adapter, authContext.body)

    return
  }

  if (authContext.path !== SIGN_IN_EMAIL_PATH) return
  if (isPasswordSignInEnabled()) return

  const parsedBody = EmailBodySchema.safeParse(authContext.body)
  if (!parsedBody.success) return

  if (await hasRegisteredPasskey(adapter, parsedBody.data.email)) {
    throw new APIError("FORBIDDEN", {
      message: "Password sign-in is disabled for this account. Sign in with your passkey.",
    })
  }
})
