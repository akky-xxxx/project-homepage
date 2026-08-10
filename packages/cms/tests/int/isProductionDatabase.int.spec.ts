import { describe, expect, it } from "vitest"

import { isProductionDatabase } from "@/shared/utilities/isProductionDatabase"

describe("isProductionDatabase", () => {
  it.each([
    "postgres://postgres:postgres@127.0.0.1:5432/cms",
    "postgres://postgres:postgres@localhost:5432/cms",
    "postgres://postgres:postgres@[::1]:5432/cms",
  ])("ローカルの接続先 %s は false を返す", (postgresUrl) => {
    expect(isProductionDatabase(postgresUrl)).toBe(false)
  })

  it.each([
    "postgres://user:pass@ep-example-123.us-east-1.aws.neon.tech/cms",
    "postgres://user:pass@db.example.com:5432/cms",
  ])("ローカル以外の接続先 %s は true を返す", (postgresUrl) => {
    expect(isProductionDatabase(postgresUrl)).toBe(true)
  })

  it("解析できない接続文字列は安全側に倒して true を返す", () => {
    expect(isProductionDatabase("not a connection string")).toBe(true)
  })
})
