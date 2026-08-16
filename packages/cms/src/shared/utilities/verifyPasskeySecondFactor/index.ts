import { APIError } from "better-auth/api"

import { consumeTwoFactorPendingChallenge } from "@/shared/utilities/consumeTwoFactorPendingChallenge"
import { getTwoFactorChallengeIdentifier } from "@/shared/utilities/getTwoFactorChallengeIdentifier"

import type { Where } from "better-auth/types"

type PasskeyRecord = {
  userId: string
}

type VerifyPasskeySecondFactorContext = {
  context: {
    adapter: {
      findOne: (data: { model: string; where: Where[] }) => Promise<PasskeyRecord | null>
    }
    createAuthCookie: (name: string) => { name: string }
    internalAdapter: {
      consumeVerificationValue: (identifier: string) => Promise<{ value: string } | null>
    }
    secret: string
  }
  getSignedCookie: (name: string, secret: string) => Promise<string | false | null | undefined>
}

type VerifyPasskeySecondFactorArguments = {
  ctx: VerifyPasskeySecondFactorContext
  clientData: { id: string }
}

/**
 * `passkey()` の `authentication.afterVerification` に渡すコールバック。
 * WebAuthn 検証成功後・セッション作成前に呼ばれるため、ここで例外を投げれば
 * セッションが一度も作られず、HTTP status も endpoint 本体の例外として正しく伝播する。
 *
 * password サインインで `twoFactor` プラグインが発行した2要素待ち challenge を
 * この passkey 認証の完了とみなしてよいかを判定する。判定は `consumeVerificationValue`
 * の戻り値のみで行う(読み取り専用の存在確認だけに頼ると、TOTP/backup code と
 * 同時に challenge を取り合う競合を防げない)。
 *
 * `ctx`/`clientData` の型は better-auth の SDK 型(`PasskeyOptions["authentication"]`)
 * から派生させず、実際に使うプロパティだけの最小構造型として宣言している。SDK が渡す
 * 実際の値はこの構造型を満たすため型上は問題なく、かつ fake ctx/adapter を使った
 * ホワイトボックステストが `any`/型アサーション無しで書けるようになる。
 * @param arguments_ `{ ctx, clientData }` を含む better-auth からのコールバック引数
 */
export const verifyPasskeySecondFactor = async (
  arguments_: VerifyPasskeySecondFactorArguments,
): Promise<void> => {
  const { ctx, clientData } = arguments_

  const identifier = await getTwoFactorChallengeIdentifier(ctx)
  if (identifier === null) throw new APIError("UNAUTHORIZED")

  const consumed = await consumeTwoFactorPendingChallenge(identifier, ctx)
  if (consumed === null) throw new APIError("UNAUTHORIZED")

  const passkey = await ctx.context.adapter.findOne({
    model: "passkey",
    where: [{ field: "credentialID", value: clientData.id }],
  })

  if (passkey === null || passkey.userId !== consumed.userId) {
    throw new APIError("UNAUTHORIZED")
  }
}
