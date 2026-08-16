type VerificationAdapterContext = {
  context: {
    internalAdapter: {
      consumeVerificationValue: (identifier: string) => Promise<{ value: string } | null>
    }
  }
}

/**
 * 2要素待ち challenge の verification record を原子的に消費する。
 * 同一 identifier に対して2回目以降の呼び出しは null を返す(better-auth の
 * `consumeVerificationValue` がレコードを削除する原子的操作のため)ので、
 * TOTP/backup code と passkey のどちらが先に消費しても、もう一方は必ず null になる。
 * @param identifier `getTwoFactorChallengeIdentifier` で得た challenge の識別子
 * @param context Better Auth のエンドポイントコンテキスト
 * @returns 消費に成功すれば challenge に紐づく userId、既に消費済み/存在しない/期限切れなら null
 */
export const consumeTwoFactorPendingChallenge = async (
  identifier: string,
  context: VerificationAdapterContext,
): Promise<{ userId: string } | null> => {
  const consumed = await context.context.internalAdapter.consumeVerificationValue(identifier)
  if (consumed === null) return null

  return { userId: consumed.value }
}
