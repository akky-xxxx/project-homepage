import { describe, expect, it } from "bun:test"

import { EnvironmentSchema } from "."

describe("shared/schemas/EnvironmentSchema", () => {
  it("CMS_HOST が文字列であれば parse できる", () => {
    const validEnvironment = { CMS_HOST: "http://localhost:3000" }

    expect(EnvironmentSchema.parse(validEnvironment)).toEqual(validEnvironment)
  })

  it("CMS_HOST が欠落している場合 parse に失敗する", () => {
    expect(EnvironmentSchema.safeParse({}).success).toBe(false)
  })
})
