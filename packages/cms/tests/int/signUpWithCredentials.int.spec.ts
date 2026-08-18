import { describe, expect, it } from "vitest"

import { signUpWithCredentials } from "@/shared/utilities/signUpWithCredentials"

const CREDENTIALS = {
  email: "sign-up@example.com",
  name: "Sign Up User",
  password: "some-password",
}

describe("signUpWithCredentials", () => {
  it("error が無ければ ok: true を返す", async () => {
    const client = { signUp: { email: () => Promise.resolve({ error: null }) } }

    const result = await signUpWithCredentials(client, CREDENTIALS)

    expect(result).toEqual({ ok: true })
  })

  it("error があればメッセージ付きで ok: false を返す", async () => {
    const client = {
      signUp: { email: () => Promise.resolve({ error: { message: "Sign up is closed." } }) },
    }

    const result = await signUpWithCredentials(client, CREDENTIALS)

    expect(result).toEqual({ message: "Sign up is closed.", ok: false })
  })

  it("error にメッセージが無ければデフォルトメッセージを返す", async () => {
    const client = { signUp: { email: () => Promise.resolve({ error: {} }) } }

    const result = await signUpWithCredentials(client, CREDENTIALS)

    expect(result).toEqual({ message: "Sign up failed. Please try again.", ok: false })
  })
})
