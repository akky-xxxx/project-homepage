import { describe, expect, it } from "vitest"

import { consumeTwoFactorPendingChallenge } from "@/shared/utilities/consumeTwoFactorPendingChallenge"

const createContext = (consumed: { value: string } | null) => ({
  context: {
    internalAdapter: {
      consumeVerificationValue: () => Promise.resolve(consumed),
    },
  },
})

describe("consumeTwoFactorPendingChallenge", () => {
  it("consume に成功すれば userId を返す", async () => {
    const result = await consumeTwoFactorPendingChallenge(
      "identifier",
      createContext({ value: "user-1" }),
    )

    expect(result).toStrictEqual({ userId: "user-1" })
  })

  it("既に消費済み/存在しない場合は null を返す", async () => {
    const result = await consumeTwoFactorPendingChallenge("identifier", createContext(null))

    expect(result).toBeNull()
  })
})
