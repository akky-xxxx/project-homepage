import { getPayload } from "payload"

import config from "@/payload.config"

const INITIAL_COUNTER = 0

/**
 * passkey 登録済みの状態を DB 上に直接作る。
 * ブラウザの WebAuthn セレモニーを経由しないため、passkey の有無だけを見る検証
 * (password サインインの拒否など)に使う。実際の登録フローは registerTestPasskey を使う。
 * @param userId 対象ユーザーの ID
 */
export const seedTestPasskey = async (userId: string): Promise<void> => {
  const payload = await getPayload({ config })

  await payload.create({
    collection: "passkeys",

    data: {
      backedUp: false,
      counter: INITIAL_COUNTER,
      credentialID: `test-credential-${userId}`,
      deviceType: "singleDevice",
      publicKey: "test-public-key",
      user: Number(userId),
    },
  })
}
