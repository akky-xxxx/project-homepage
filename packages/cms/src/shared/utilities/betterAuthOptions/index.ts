import { passkey } from "@better-auth/passkey"

import { ENVIRONMENT } from "@/shared/const/ENVIRONMENT"
import { authBeforeHook } from "@/shared/utilities/authBeforeHook"

import type { BetterAuthOptions } from "better-auth"

const rpID = new URL(ENVIRONMENT.BETTER_AUTH_URL).hostname

const MINIMUM_PASSWORD_LENGTH = 12

export const betterAuthOptions: Partial<BetterAuthOptions> = {
  user: {
    additionalFields: {
      // input: false により role はサーバー側専用となり、サインアップ時にクライアントから
      // 指定できなくなる(権限昇格対策)。値は betterAuthCollections が users コレクションへ
      // 注入する first-user-admin ガードが付与する(最初の 1 人が admin、以降は user)。
      role: { defaultValue: "user", input: false, type: "string" },
    },
  },

  // password はアカウント作成のブートストラップ専用。作成後のログインを passkey に
  // 限定する制御は authBeforeHook が担う。
  emailAndPassword: { enabled: true, minPasswordLength: MINIMUM_PASSWORD_LENGTH },

  hooks: { before: authBeforeHook },

  plugins: [
    passkey({
      rpID,
      rpName: "project-homepage CMS",
    }),
  ],
}
