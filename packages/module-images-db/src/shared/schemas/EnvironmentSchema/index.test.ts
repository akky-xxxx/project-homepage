import { describe, expect, it } from "bun:test"

import { EnvironmentSchema } from "."

describe("EnvironmentSchema", () => {
  describe("success", () => {
    it("BUCKET が string の場合、パースに成功する", () => {
      const input = { BUCKET: "my-bucket" }
      expect(EnvironmentSchema.parse(input)).toStrictEqual(input)
    })
  })

  describe("failure", () => {
    it("BUCKET が存在しない場合、エラーを投げる", () => {
      expect(() => EnvironmentSchema.parse({})).toThrow()
    })

    it("BUCKET が string でない場合、エラーを投げる", () => {
      expect(() => EnvironmentSchema.parse({ BUCKET: 1 })).toThrow()
    })
  })
})
