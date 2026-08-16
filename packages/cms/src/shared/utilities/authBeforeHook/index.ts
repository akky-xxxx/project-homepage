import { APIError, createAuthMiddleware } from "better-auth/api"

import { ENVIRONMENT } from "@/shared/const/ENVIRONMENT"
import { EmailBodySchema } from "@/shared/schemas/EmailBodySchema"
import { hasAnyUser } from "@/shared/utilities/hasAnyUser"
import { hasEnabledTotp } from "@/shared/utilities/hasEnabledTotp"
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
 * password サインインを通してよいリクエストかを検証し、拒否すべきときだけ throw する。
 * @param adapter Better Auth の DB adapter (`ctx.context.adapter`)
 * @param body リクエストボディ
 */
const assertSignInAllowed = async (adapter: DBAdapter, body: unknown): Promise<void> => {
  const parsedBody = EmailBodySchema.safeParse(body)
  if (!parsedBody.success) return

  const { email } = parsedBody.data

  if (await hasEnabledTotp(adapter, email)) return

  if (await hasRegisteredPasskey(adapter, email)) {
    throw new APIError("FORBIDDEN", {
      message:
        "Password sign-in is disabled for this account. Sign in with your passkey, or enable TOTP to use password sign-in as a fallback.",
    })
  }
}

/**
 * password をブートストラップ専用に留め、通常のログインを passkey (+ フォールバックとしての
 * password + TOTP) に限定する before hook。
 *
 * - `/sign-up/email`: `SIGN_UP_ALLOWED_EMAIL` と一致し、かつ users が 0 件のときだけ通す。
 *   admin 1 人運用のため、アカウントを作れるのは最初の 1 回だけ(その 1 人は
 *   `betterAuthCollections` が注入する first-user-admin ガードにより `role: "admin"` になる)。
 *   `SIGN_UP_ALLOWED_EMAIL` 未設定なら常に拒否するので、初期登録後は環境変数を削除して
 *   再デプロイすればサインアップ API を恒久的に閉じられる。
 * - `/sign-in/email`: 次の優先順位で判定する。
 *   1. TOTP を有効化済みなら許可する。password 自体の正しさは Better Auth 本体の
 *      credential 検証に委ね、成功後は `twoFactor` プラグインの after hook が
 *      自動的にフルセッションを 2FA チャレンジへ差し替える(このミドルウェアでは何もしない)。
 *   2. passkey を登録済みなら拒否する。passkey はあるが TOTP を有効化していない
 *      アカウントは password + TOTP のフォールバックを使えないため。
 *   3. どちらも未設定なら許可する(ブートストラップ窓)。passkey・TOTP を登録する前の
 *      初期セットアップの間だけ password 単独でのログインを許す。
 *
 * passkey・TOTP を両方失った場合の復旧手順:
 * Postgres の `passkeys`/`twoFactors` から当該ユーザーの行を削除し、`users.twoFactorEnabled`
 * を false に戻すと password ログインが再び通るため、ログイン後に登録し直す。
 */
export const authBeforeHook = createAuthMiddleware(async (authContext) => {
  const { adapter } = authContext.context

  if (authContext.path === SIGN_UP_EMAIL_PATH) {
    await assertSignUpAllowed(adapter, authContext.body)

    return
  }

  if (authContext.path === SIGN_IN_EMAIL_PATH) {
    await assertSignInAllowed(adapter, authContext.body)
  }
})
