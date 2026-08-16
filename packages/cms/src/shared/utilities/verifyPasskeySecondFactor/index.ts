import { APIError } from "better-auth/api"

import { consumeTwoFactorPendingChallenge } from "@/shared/utilities/consumeTwoFactorPendingChallenge"
import { getTwoFactorChallengeIdentifier } from "@/shared/utilities/getTwoFactorChallengeIdentifier"

import type { PasskeyOptions } from "@better-auth/passkey"

type AfterVerification = NonNullable<
  NonNullable<PasskeyOptions["authentication"]>["afterVerification"]
>
// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- 型レベルの tuple index であり数値定数化できない
type AfterVerificationArguments = Parameters<AfterVerification>[0]

type PasskeyRecord = {
  userId: string
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
 * @param arguments_ `{ ctx, clientData }` を含む better-auth からのコールバック引数
 */
export const verifyPasskeySecondFactor = async (
  arguments_: AfterVerificationArguments,
): Promise<void> => {
  const { ctx, clientData } = arguments_

  const identifier = await getTwoFactorChallengeIdentifier(ctx)
  if (identifier === null) throw new APIError("UNAUTHORIZED")

  const consumed = await consumeTwoFactorPendingChallenge(identifier, ctx)
  if (consumed === null) throw new APIError("UNAUTHORIZED")

  const passkey = await ctx.context.adapter.findOne<PasskeyRecord>({
    model: "passkey",
    where: [{ field: "credentialID", value: clientData.id }],
  })

  if (passkey === null || passkey.userId !== consumed.userId) {
    throw new APIError("UNAUTHORIZED")
  }
}
