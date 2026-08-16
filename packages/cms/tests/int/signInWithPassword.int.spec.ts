import { describe, expect, it } from "vitest"

import { signInWithPassword } from "@/shared/utilities/signInWithPassword"

const CREDENTIALS = { email: "sign-in@example.com", password: "some-password" }

describe("signInWithPassword", () => {
  it("data も error も無ければ signedIn を返す", async () => {
    const client = { signIn: { email: () => Promise.resolve({ data: null, error: null }) } }

    const result = await signInWithPassword(client, CREDENTIALS)

    expect(result).toEqual({ status: "signedIn" })
  })

  it("twoFactorRedirect: true が返れば twoFactorRequired を返す", async () => {
    const client = {
      signIn: {
        email: () => Promise.resolve({ data: { twoFactorRedirect: true }, error: null }),
      },
    }

    const result = await signInWithPassword(client, CREDENTIALS)

    expect(result).toEqual({ status: "twoFactorRequired" })
  })

  it("error があればメッセージ付きで error を返す", async () => {
    const client = {
      signIn: {
        email: () => Promise.resolve({ data: null, error: { message: "Invalid credentials" } }),
      },
    }

    const result = await signInWithPassword(client, CREDENTIALS)

    expect(result).toEqual({ message: "Invalid credentials", status: "error" })
  })

  it("error にメッセージが無ければデフォルトメッセージを返す", async () => {
    const client = { signIn: { email: () => Promise.resolve({ data: null, error: {} }) } }

    const result = await signInWithPassword(client, CREDENTIALS)

    expect(result).toEqual({ message: "Sign in failed. Please try again.", status: "error" })
  })
})
