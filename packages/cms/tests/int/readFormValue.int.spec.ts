import { describe, expect, it } from "vitest"

import { readFormValue } from "@/shared/utilities/readFormValue"

describe("readFormValue", () => {
  it("文字列はそのまま返す", () => {
    expect(readFormValue("admin@example.com")).toBe("admin@example.com")
  })

  it("空文字はそのまま返す", () => {
    expect(readFormValue("")).toBe("")
  })

  it("未入力のフィールド(undefined)は空文字になる", () => {
    expect(readFormValue(undefined)).toBe("")
  })

  it("null は空文字になる", () => {
    expect(readFormValue(null)).toBe("")
  })

  it("文字列以外の値は空文字になる", () => {
    expect(readFormValue(123)).toBe("")
    expect(readFormValue({ value: "admin@example.com" })).toBe("")
  })
})
