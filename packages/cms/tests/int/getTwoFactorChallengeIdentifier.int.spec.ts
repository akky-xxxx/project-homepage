import { describe, expect, it } from "vitest"

import { getTwoFactorChallengeIdentifier } from "@/shared/utilities/getTwoFactorChallengeIdentifier"

const createContext = (cookieValue: string | false | null | undefined) => ({
  context: {
    createAuthCookie: (name: string) => ({ name }),
    secret: "test-secret",
  },
  getSignedCookie: () => Promise.resolve(cookieValue),
})

describe("getTwoFactorChallengeIdentifier", () => {
  it("signed cookie に識別子が入っていればそれを返す", async () => {
    const identifier = await getTwoFactorChallengeIdentifier(createContext("2fa-test-identifier"))

    expect(identifier).toBe("2fa-test-identifier")
  })

  it.each([undefined, null, false] as const)(
    "cookie が %s なら null を返す",
    async (cookieValue) => {
      const identifier = await getTwoFactorChallengeIdentifier(createContext(cookieValue))

      expect(identifier).toBeNull()
    },
  )
})
