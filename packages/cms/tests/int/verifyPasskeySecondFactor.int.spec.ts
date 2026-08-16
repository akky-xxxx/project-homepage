import { describe, expect, it } from "vitest"

import { verifyPasskeySecondFactor } from "@/shared/utilities/verifyPasskeySecondFactor"

const UNAUTHORIZED = "UNAUTHORIZED"
const CHALLENGE_USER_ID = "user-1"
const OTHER_USER_ID = "user-2"
const CREDENTIAL_ID = "test-credential-id"
const SINGLE_USE_REMAINING = 1
const NO_USES_REMAINING = 0

type FakeState = {
  cookieValue?: string | null
  consumedValue?: { value: string } | null
  passkeyUserId?: string | null
}

const createArguments = (state: FakeState) => {
  const {
    consumedValue = { value: CHALLENGE_USER_ID },
    cookieValue = "identifier",
    passkeyUserId = CHALLENGE_USER_ID,
  } = state

  return {
    clientData: { id: CREDENTIAL_ID },
    ctx: {
      context: {
        adapter: {
          findOne: () => Promise.resolve(passkeyUserId === null ? null : { userId: passkeyUserId }),
        },
        createAuthCookie: (name: string) => ({ name }),
        internalAdapter: {
          consumeVerificationValue: () => Promise.resolve(consumedValue),
        },
        secret: "test-secret",
      },
      getSignedCookie: () => Promise.resolve(cookieValue),
    },
  }
}

describe("verifyPasskeySecondFactor", () => {
  it("challenge・passkey ともに存在し userId が一致すれば例外を投げない", async () => {
    await expect(verifyPasskeySecondFactor(createArguments({}))).resolves.toBeUndefined()
  })

  it("2要素待ち challenge の cookie が無ければ UNAUTHORIZED(password を経ていない状態を模す)", async () => {
    const call = verifyPasskeySecondFactor(createArguments({ cookieValue: null }))

    await expect(call).rejects.toMatchObject({ status: UNAUTHORIZED })
  })

  it("challenge が既に消費済みなら UNAUTHORIZED(TOTP/backup code に先取りされた状態を模す)", async () => {
    const call = verifyPasskeySecondFactor(createArguments({ consumedValue: null }))

    await expect(call).rejects.toMatchObject({ status: UNAUTHORIZED })
  })

  it("同一 challenge を2回消費しようとすると2回目は必ず UNAUTHORIZED になる(TOTP と passkey の競合を模す)", async () => {
    let remainingUses = SINGLE_USE_REMAINING
    const args = createArguments({})
    args.ctx.context.internalAdapter.consumeVerificationValue = () => {
      if (remainingUses <= NO_USES_REMAINING) return Promise.resolve(null)
      remainingUses--
      return Promise.resolve({ value: CHALLENGE_USER_ID })
    }

    await expect(verifyPasskeySecondFactor(args)).resolves.toBeUndefined()
    await expect(verifyPasskeySecondFactor(args)).rejects.toMatchObject({ status: UNAUTHORIZED })
  })

  it("challenge の userId と passkey 所有者の userId が異なれば UNAUTHORIZED(別ユーザーの password と passkey の組み合わせを防ぐ)", async () => {
    const call = verifyPasskeySecondFactor(createArguments({ passkeyUserId: OTHER_USER_ID }))

    await expect(call).rejects.toMatchObject({ status: UNAUTHORIZED })
  })

  it("credentialID に対応する passkey レコードが見つからなければ UNAUTHORIZED", async () => {
    const call = verifyPasskeySecondFactor(createArguments({ passkeyUserId: null }))

    await expect(call).rejects.toMatchObject({ status: UNAUTHORIZED })
  })
})
