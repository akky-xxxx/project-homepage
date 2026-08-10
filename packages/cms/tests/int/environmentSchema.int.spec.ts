import { describe, expect, it } from "vitest"

import { EnvironmentSchema } from "@/shared/schemas/EnvironmentSchema"

const SECRET_LENGTH = 32
const TOO_SHORT_SECRET_LENGTH = 31

const REMOTE_POSTGRES_URL = "postgres://user:pass@db.example.com:5432/cms"

const validEnvironment = {
  BETTER_AUTH_SECRET: "a".repeat(SECRET_LENGTH),
  BETTER_AUTH_URL: "https://cms.example.com",
  PAYLOAD_SECRET: "b".repeat(SECRET_LENGTH),
  POSTGRES_URL: "postgres://postgres:postgres@127.0.0.1:5432/cms",
  SIGN_UP_ALLOWED_EMAIL: "cms-admin@example.com",
}

describe("EnvironmentSchema", () => {
  it("必要な値が揃っていれば通る", () => {
    expect(EnvironmentSchema.safeParse(validEnvironment).success).toBe(true)
  })

  it("SIGN_UP_ALLOWED_EMAIL は未設定でも通る(サインアップを閉じた状態)", () => {
    const { SIGN_UP_ALLOWED_EMAIL, ...environment } = validEnvironment

    expect(EnvironmentSchema.safeParse(environment).success).toBe(true)
  })

  it("BLOB_READ_WRITE_TOKEN はローカル DB なら未設定でも通る", () => {
    expect(EnvironmentSchema.safeParse(validEnvironment).success).toBe(true)
  })

  it("BLOB_READ_WRITE_TOKEN は本番 DB に接続していて未設定なら弾く", () => {
    const environment = { ...validEnvironment, POSTGRES_URL: REMOTE_POSTGRES_URL }

    const result = EnvironmentSchema.safeParse(environment)

    expect(result.success).toBe(false)
    expect(result.error?.issues).toStrictEqual([
      expect.objectContaining({ path: ["BLOB_READ_WRITE_TOKEN"] }),
    ])
  })

  it.each([validEnvironment.POSTGRES_URL, REMOTE_POSTGRES_URL])(
    "BLOB_READ_WRITE_TOKEN が空文字なら弾く(POSTGRES_URL: %s)",
    (postgresUrl) => {
      const environment = {
        ...validEnvironment,
        BLOB_READ_WRITE_TOKEN: "",
        POSTGRES_URL: postgresUrl,
      }

      const result = EnvironmentSchema.safeParse(environment)

      expect(result.success).toBe(false)
      expect(result.error?.issues).toStrictEqual([
        expect.objectContaining({ path: ["BLOB_READ_WRITE_TOKEN"] }),
      ])
    },
  )

  it("BLOB_READ_WRITE_TOKEN は本番 DB に接続していてもトークンがあれば通る", () => {
    const environment = {
      ...validEnvironment,
      BLOB_READ_WRITE_TOKEN: "vercel_blob_rw_example_token",
      POSTGRES_URL: REMOTE_POSTGRES_URL,
    }

    expect(EnvironmentSchema.safeParse(environment).success).toBe(true)
  })

  it.each([
    ["BETTER_AUTH_SECRET", ""],
    ["BETTER_AUTH_SECRET", "a".repeat(TOO_SHORT_SECRET_LENGTH)],
    ["BETTER_AUTH_URL", ""],
    ["BETTER_AUTH_URL", "cms.example.com"],
    ["PAYLOAD_SECRET", ""],
    ["PAYLOAD_SECRET", "b".repeat(TOO_SHORT_SECRET_LENGTH)],
    ["POSTGRES_URL", ""],
    ["SIGN_UP_ALLOWED_EMAIL", "not-an-email"],
  ])("%s が %o の場合は弾く", (key, value) => {
    const environment = { ...validEnvironment, [key]: value }

    expect(EnvironmentSchema.safeParse(environment).success).toBe(false)
  })

  it.each(["BETTER_AUTH_SECRET", "BETTER_AUTH_URL", "PAYLOAD_SECRET", "POSTGRES_URL"])(
    "%s が未設定の場合は弾く",
    (key) => {
      const environment = Object.fromEntries(
        Object.entries(validEnvironment).filter(([environmentKey]) => environmentKey !== key),
      )

      expect(EnvironmentSchema.safeParse(environment).success).toBe(false)
    },
  )
})
