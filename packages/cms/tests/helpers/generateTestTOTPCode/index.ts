import { createHmac } from "node:crypto"

const PERIOD_SECONDS = 30
const MILLISECONDS_PER_SECOND = 1000
const DIGITS = 6
const DECIMAL_BASE = 10
const MODULUS = DECIMAL_BASE ** DIGITS
const COUNTER_BYTE_LENGTH = 8
const TRUNCATED_BYTE_COUNT = 4
const LAST_BYTE_INDEX = -1
const FALLBACK_BYTE = 0
const OFFSET_MASK = 0x0f
const FIRST_TRUNCATED_BYTE_MASK = 0x7f
const BYTE_MASK = 0xff
const BITS_PER_BYTE = 8

/**
 * RFC 6238(TOTP, HMAC-SHA1・6桁・30秒周期)に従い、指定 secret の現在時刻のコードを計算する。
 * better-auth の `two-factor` プラグイン(`@better-auth/utils` の `createOTP`)と同じアルゴリズム。
 * @param secret `seedTestTOTPSecret` で登録した平文の secret
 * @returns 現在時刻に対応する6桁の TOTP コード
 */
export const generateTestTOTPCode = (secret: string): string => {
  const counter = Math.floor(Date.now() / (PERIOD_SECONDS * MILLISECONDS_PER_SECOND))

  const counterBuffer = Buffer.alloc(COUNTER_BYTE_LENGTH)
  counterBuffer.writeBigUInt64BE(BigInt(counter))

  const hmac = createHmac("sha1", secret).update(counterBuffer).digest()
  const offset = (hmac.at(LAST_BYTE_INDEX) ?? FALLBACK_BYTE) & OFFSET_MASK

  let truncated = (hmac[offset] ?? FALLBACK_BYTE) & FIRST_TRUNCATED_BYTE_MASK
  for (let index = 1; index < TRUNCATED_BYTE_COUNT; index++) {
    truncated = (truncated << BITS_PER_BYTE) | ((hmac[offset + index] ?? FALLBACK_BYTE) & BYTE_MASK)
  }

  return (truncated % MODULUS).toString().padStart(DIGITS, "0")
}
