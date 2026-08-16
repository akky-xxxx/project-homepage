import { createHmac } from "node:crypto"

const TOTP_DIGITS = 6
const TOTP_PERIOD_SECONDS = 30
const MILLISECONDS_PER_SECOND = 1000
const DECIMAL_BASE = 10
const OTP_MODULUS = DECIMAL_BASE ** TOTP_DIGITS
const HMAC_COUNTER_BUFFER_LENGTH = 8
const LOW_NIBBLE_MASK = 0xf
const SIGN_BIT_MASK = 0x7f
const BYTE_MASK = 0xff
const BYTE_OFFSET_1 = 1
const BYTE_OFFSET_2 = 2
const BYTE_OFFSET_3 = 3
const SHIFT_24 = 24
const SHIFT_16 = 16
const SHIFT_8 = 8
const LAST_BYTE_INDEX = -1
const FALLBACK_BYTE = 0

/**
 * RFC 4226 (HOTP) / RFC 6238 (TOTP) 準拠の 6 桁コードを生成する。
 * HMAC-SHA1 の鍵には better-auth の TOTP secret(`generateRandomString` 由来の平文文字列)を
 * そのまま UTF-8 バイト列として使う。better-auth は secret を base32 デコードせず、
 * base32 エンコードは QR コード表示用の otpauth:// URI 生成にしか使わないため。
 * @param secret better-auth が保持する平文の TOTP secret
 * @param date コード生成の基準時刻(既定は現在時刻)
 * @returns 6 桁の TOTP コード
 */
export const generateTestTOTPCode = (secret: string, date: Date = new Date()): string => {
  const counter = Math.floor(date.getTime() / MILLISECONDS_PER_SECOND / TOTP_PERIOD_SECONDS)

  const counterBuffer = Buffer.alloc(HMAC_COUNTER_BUFFER_LENGTH)
  counterBuffer.writeBigUInt64BE(BigInt(counter))

  const digest = createHmac("sha1", Buffer.from(secret, "utf8")).update(counterBuffer).digest()

  const offset = (digest.at(LAST_BYTE_INDEX) ?? FALLBACK_BYTE) & LOW_NIBBLE_MASK
  const binaryCode =
    ((digest[offset] & SIGN_BIT_MASK) << SHIFT_24) |
    ((digest[offset + BYTE_OFFSET_1] & BYTE_MASK) << SHIFT_16) |
    ((digest[offset + BYTE_OFFSET_2] & BYTE_MASK) << SHIFT_8) |
    (digest[offset + BYTE_OFFSET_3] & BYTE_MASK)

  return String(binaryCode % OTP_MODULUS).padStart(TOTP_DIGITS, "0")
}
