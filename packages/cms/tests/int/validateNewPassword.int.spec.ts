import { describe, expect, it } from "vitest"

import { MINIMUM_PASSWORD_LENGTH } from "@/shared/const/MINIMUM_PASSWORD_LENGTH"
import { validateNewPassword } from "@/shared/utilities/validateNewPassword"

const BELOW_MINIMUM_LENGTH = 1

describe("validateNewPassword", () => {
  it("最小長未満なら不合格になる", () => {
    const tooShort = "a".repeat(MINIMUM_PASSWORD_LENGTH - BELOW_MINIMUM_LENGTH)

    const result = validateNewPassword({ confirmNewPassword: tooShort, newPassword: tooShort })

    expect(result).toEqual({
      message: `Password must be at least ${String(MINIMUM_PASSWORD_LENGTH)} characters long.`,
      ok: false,
    })
  })

  it("最小長ちょうどでも一致しなければ不合格になる", () => {
    const newPassword = "a".repeat(MINIMUM_PASSWORD_LENGTH)
    const confirmNewPassword = "b".repeat(MINIMUM_PASSWORD_LENGTH)

    const result = validateNewPassword({ confirmNewPassword, newPassword })

    expect(result).toEqual({ message: "Passwords do not match.", ok: false })
  })

  it("最小長ちょうどかつ一致すれば合格になる", () => {
    const password = "a".repeat(MINIMUM_PASSWORD_LENGTH)

    const result = validateNewPassword({ confirmNewPassword: password, newPassword: password })

    expect(result).toEqual({ ok: true })
  })
})
