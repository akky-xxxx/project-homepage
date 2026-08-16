import { describe, expect, it } from "vitest"

import { validateSignUpPassword } from "@/shared/utilities/validateSignUpPassword"

const VALID_PASSWORD = "valid-password-1234"

describe("validateSignUpPassword", () => {
  it("password と confirmPassword が一致し、十分な長さなら null を返す", () => {
    expect(validateSignUpPassword(VALID_PASSWORD, VALID_PASSWORD)).toBeNull()
  })

  it("password と confirmPassword が一致しなければエラーメッセージを返す", () => {
    expect(validateSignUpPassword(VALID_PASSWORD, "different-password")).toBe(
      "Passwords do not match",
    )
  })

  it("password が短すぎればエラーメッセージを返す", () => {
    expect(validateSignUpPassword("short", "short")).toBe("Password must be at least 12 characters")
  })
})
