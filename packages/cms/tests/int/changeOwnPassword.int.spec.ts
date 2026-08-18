import { describe, expect, it } from "vitest"

import { changeOwnPassword } from "@/shared/utilities/changeOwnPassword"

const CREDENTIALS = { currentPassword: "current-password", newPassword: "new-password-1234" }

describe("changeOwnPassword", () => {
  it("error が無ければ ok: true を返す", async () => {
    const client = { changePassword: () => Promise.resolve({ data: {}, error: null }) }

    const result = await changeOwnPassword(client, CREDENTIALS)

    expect(result).toEqual({ ok: true })
  })

  it("error があればメッセージ付きで ok: false を返す", async () => {
    const client = {
      changePassword: () => Promise.resolve({ data: null, error: { message: "Invalid password" } }),
    }

    const result = await changeOwnPassword(client, CREDENTIALS)

    expect(result).toEqual({ message: "Invalid password", ok: false })
  })

  it("error にメッセージが無ければデフォルトメッセージを返す", async () => {
    const client = { changePassword: () => Promise.resolve({ data: null, error: {} }) }

    const result = await changeOwnPassword(client, CREDENTIALS)

    expect(result).toEqual({
      message: "Failed to change password. Please try again.",
      ok: false,
    })
  })

  it("revokeOtherSessions: true を常に指定して呼び出す", async () => {
    const calls: unknown[] = []
    const client = {
      changePassword: (input: unknown) => {
        calls.push(input)
        return Promise.resolve({ data: {}, error: null })
      },
    }

    await changeOwnPassword(client, CREDENTIALS)

    expect(calls).toEqual([{ ...CREDENTIALS, revokeOtherSessions: true }])
  })
})
