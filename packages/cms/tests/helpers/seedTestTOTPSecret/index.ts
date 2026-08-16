import { symmetricEncrypt } from "better-auth/crypto"
import { getPayload } from "payload"

import config from "@/payload.config"

import { createTestAuth } from "../createTestAuth"

const NO_FAILED_ATTEMPTS = 0

/**
 * TOTP を有効化済みの状態を DB へ直接作る(実際の `/two-factor/enable` フローは経由しない)。
 * `secret` の暗号化には実際の better-auth コンテキストの `secretConfig` を使うため、
 * verify エンドポイントでの復号と互換性がある。
 * @param userId 対象ユーザーの ID
 * @param secret 平文の TOTP secret(`generateTestTOTPCode` に渡すものと同じ値)
 */
export const seedTestTOTPSecret = async (userId: string, secret: string): Promise<void> => {
  const payload = await getPayload({ config })
  const auth = await createTestAuth()
  const context = await auth.$context

  const encryptedSecret = await symmetricEncrypt({ data: secret, key: context.secretConfig })

  await payload.create({
    collection: "twoFactors",
    data: {
      backupCodes: "unused-in-tests",
      failedVerificationCount: NO_FAILED_ATTEMPTS,
      secret: encryptedSecret,
      user: Number(userId),
      verified: true,
    },
  })

  await payload.update({
    collection: "users",
    data: { twoFactorEnabled: true },
    id: userId,
  })
}
