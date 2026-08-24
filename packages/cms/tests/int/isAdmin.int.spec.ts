import { describe, expect, it } from "vitest"

import { isAdmin } from "@/shared/utilities/isAdmin"

import type { User, ApiKey } from "cms-types/src"
import type { PayloadRequest } from "payload"

const TIMESTAMP = "2026-01-01T00:00:00.000Z"

const buildUser = (role: User["role"]): User => ({
  collection: "users",
  createdAt: TIMESTAMP,
  email: "user@example.com",
  id: 1,
  role,
  updatedAt: TIMESTAMP,
})

const buildApiKey = (): ApiKey => ({
  collection: "api-keys",
  createdAt: TIMESTAMP,
  id: 1,
  updatedAt: TIMESTAMP,
})

describe("isAdmin", () => {
  it("req.user が無ければ false を返す", () => {
    const req: Pick<PayloadRequest, "user"> = { user: null }

    expect(isAdmin({ req })).toBe(false)
  })

  it("users コレクションの非 admin なら false を返す", () => {
    const req: Pick<PayloadRequest, "user"> = { user: buildUser("user") }

    expect(isAdmin({ req })).toBe(false)
  })

  it("users コレクションの admin なら true を返す", () => {
    const req: Pick<PayloadRequest, "user"> = { user: buildUser("admin") }

    expect(isAdmin({ req })).toBe(true)
  })

  it("api-keys コレクションなら false を返す", () => {
    const req: Pick<PayloadRequest, "user"> = { user: buildApiKey() }

    expect(isAdmin({ req })).toBe(false)
  })
})
