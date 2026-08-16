import { passkey } from "@better-auth/passkey"
import { twoFactor } from "better-auth/plugins"

import { ENVIRONMENT } from "@/shared/const/ENVIRONMENT"
import { authBeforeHook } from "@/shared/utilities/authBeforeHook"
import { verifyPasskeySecondFactor } from "@/shared/utilities/verifyPasskeySecondFactor"

import type { BetterAuthOptions } from "better-auth"

const rpID = new URL(ENVIRONMENT.BETTER_AUTH_URL).hostname

const MINIMUM_PASSWORD_LENGTH = 12

// `: Partial<BetterAuthOptions>` にすると plugins 配列の型が `BetterAuthPlugin[]` に
// 広がり、テストコードから `auth.api.verifyTOTP` 等プラグイン固有のメソッドを型上
// 参照できなくなる。`satisfies` は型適合を検査しつつ推論結果(タプル型)を保つ。
export const betterAuthOptions = {
  user: {
    additionalFields: {
      // input: false により role はサーバー側専用となり、サインアップ時にクライアントから
      // 指定できなくなる(権限昇格対策)。値は betterAuthCollections が users コレクションへ
      // 注入する first-user-admin ガードが付与する(最初の 1 人が admin、以降は user)。
      role: { defaultValue: "user", input: false, type: "string" },
    },
  },

  // password は常時必須の第1要素。第2要素(TOTP/backup code または passkey)は
  // twoFactor プラグインと passkey の authentication.afterVerification が担う。
  emailAndPassword: { enabled: true, minPasswordLength: MINIMUM_PASSWORD_LENGTH },

  hooks: { before: authBeforeHook },

  plugins: [
    // passkey を第2要素として使う判定(twoFactor が発行した pending challenge の
    // 消費・userId 照合)は afterVerification で行う。WebAuthn 検証成功後・
    // セッション作成前に呼ばれるため、判定に失敗すればセッションは一度も作られない。
    passkey({
      authentication: { afterVerification: verifyPasskeySecondFactor },
      rpID,
      rpName: "project-homepage CMS",
    }),
    twoFactor(),
  ],
} satisfies Partial<BetterAuthOptions>
