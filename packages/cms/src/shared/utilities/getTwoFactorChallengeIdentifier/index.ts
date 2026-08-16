// better-auth の `two-factor` プラグインが `/sign-in/email` で発行する signed cookie の名前。
// プラグイン自身は `TWO_FACTOR_COOKIE_NAME` としてこの値を保持しているが、`better-auth` の
// package exports からは到達できない非公開モジュール(`plugins/two-factor/constant`)にしか
// 定義が無いため、値をここに複製している。将来のバージョンアップでこの内部名が変わると
// 本ユーティリティは常に null を返すようになる(fail-closed、認証バイパスにはならない想定)。
const TWO_FACTOR_COOKIE_NAME = "two_factor"

type TwoFactorChallengeCookieContext = {
  context: {
    createAuthCookie: (name: string) => { name: string }
    secret: string
  }
  getSignedCookie: (name: string, secret: string) => Promise<string | false | null | undefined>
}

/**
 * `twoFactor` プラグインが password サインイン成功時に発行する
 * signed cookie を読み取り、2要素待ち challenge の識別子を返す。
 * 読み取り専用で、challenge の消費(consume)は行わない。
 * @param context Better Auth のエンドポイントコンテキスト
 * @returns challenge の識別子。cookie が無い/署名が不正なら null
 */
export const getTwoFactorChallengeIdentifier = async (
  context: TwoFactorChallengeCookieContext,
): Promise<string | null> => {
  const cookie = context.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME)
  const identifier = await context.getSignedCookie(cookie.name, context.context.secret)

  return typeof identifier === "string" ? identifier : null
}
