import { describe, expect, it } from "bun:test"

import { EnvironmentSchema } from "."

describe("shared/schemas/EnvironmentSchema", () => {
  it("CMS_HOST・CMS_API_KEY が文字列であれば parse できる", () => {
    const validEnvironment = {
      CMS_API_KEY: "test-api-key",
      CMS_HOST: "http://localhost:3000",
    }

    expect(EnvironmentSchema.parse(validEnvironment)).toEqual(validEnvironment)
  })

  it("CMS_HOST が欠落している場合 parse に失敗する", () => {
    expect(EnvironmentSchema.safeParse({ CMS_API_KEY: "test-api-key" }).success).toBe(false)
  })

  it("CMS_API_KEY が欠落している場合 parse に失敗する", () => {
    expect(EnvironmentSchema.safeParse({ CMS_HOST: "http://localhost:3000" }).success).toBe(false)
  })

  it("CMS_API_KEY が空文字の場合 parse に失敗する", () => {
    expect(
      EnvironmentSchema.safeParse({ CMS_API_KEY: "", CMS_HOST: "http://localhost:3000" }).success,
    ).toBe(false)
  })
})
