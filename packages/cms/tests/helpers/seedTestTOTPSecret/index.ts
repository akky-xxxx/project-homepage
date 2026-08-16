import { symmetricEncrypt } from "better-auth/crypto"
import { getPayload } from "payload"

import config from "@/payload.config"

import { createTestAuth } from "../createTestAuth"

// twoFactors.backupCodes は必須フィールドだが、TOTP フォールバックの検証では
// バックアップコードそのものを使わないためプレースホルダで埋める
const UNUSED_BACKUP_CODES = "unused-in-tests"

/**
 * TOTP 有効化済みの状態を DB 上に直接作る。secret は better-auth の暗号化仕様
 * (symmetricEncrypt + secretConfig)に合わせて暗号化して twoFactors コレクションへ
 * 書き込み、users.twoFactorEnabled も true にする。実際の enable フローを経由しないため、
 * TOTP 有効化状態だけを見る検証(password + TOTP フォールバックなど)に使う。
 * @param userId 対象ユーザーの ID
 * @param secret 暗号化前の TOTP secret(平文)
 */
export const seedTestTOTPSecret = async (userId: string, secret: string): Promise<void> => {
  const auth = await createTestAuth()
  const context = await auth.$context

  const encryptedSecret = await symmetricEncrypt({ data: secret, key: context.secretConfig })

  const payload = await getPayload({ config })

  await payload.create({
    collection: "twoFactors",

    data: {
      backupCodes: UNUSED_BACKUP_CODES,
      secret: encryptedSecret,
      user: Number(userId),
    },
  })

  await context.internalAdapter.updateUser(userId, { twoFactorEnabled: true })
}
