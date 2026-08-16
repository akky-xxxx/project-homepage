import { APIError, createAuthMiddleware } from "better-auth/api"

import { ENVIRONMENT } from "@/shared/const/ENVIRONMENT"
import { EmailBodySchema } from "@/shared/schemas/EmailBodySchema"
import { hasAnyUser } from "@/shared/utilities/hasAnyUser"

import type { DBAdapter } from "better-auth/types"

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
 * サインアップだけを制限する before hook。
 *
 * - `/sign-up/email`: `SIGN_UP_ALLOWED_EMAIL` と一致し、かつ users が 0 件のときだけ通す。
 *   admin 1 人運用のため、アカウントを作れるのは最初の 1 回だけ(その 1 人は
 *   `betterAuthCollections` が注入する first-user-admin ガードにより `role: "admin"` になる)。
 *   `SIGN_UP_ALLOWED_EMAIL` 未設定なら常に拒否するので、初期登録後は環境変数を削除して
 *   再デプロイすればサインアップ API を恒久的に閉じられる。
 * - `/sign-in/email`(password): 常時許可する。password は第1要素であり、第2要素
 *   (TOTP/backup code または passkey)の要求は `twoFactor` プラグインと
 *   `verifyPasskeySecondFactor` が別途担う。
 */
export const authBeforeHook = createAuthMiddleware(async (authContext) => {
  if (authContext.path !== SIGN_UP_EMAIL_PATH) return

  await assertSignUpAllowed(authContext.context.adapter, authContext.body)
})
