import { getPayload } from "payload"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import config from "@/payload.config"

import { deleteUserByEmail } from "../helpers/deleteUserByEmail"

import type { User } from "cms-types/src"
import type { Payload } from "payload"

const ADMIN_EMAIL = "access-admin@example.com"
const MEMBER_EMAIL = "access-member@example.com"
const NEW_USER_EMAIL = "access-new@example.com"

const FORBIDDEN_STATUS = 403

let payload: Payload
let adminUser: User
let memberUser: User

describe("users コレクションのアクセス制御", () => {
  beforeAll(async () => {
    payload = await getPayload({ config })

    await deleteUserByEmail(ADMIN_EMAIL)
    await deleteUserByEmail(MEMBER_EMAIL)
    await deleteUserByEmail(NEW_USER_EMAIL)

    // role の付与には req.user が admin である必要がある(betterAuthCollections の
    // first-user-admin ガードが、admin による作成でない限りクライアント指定の role を無視するため)
    const admin = await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, name: "Access Admin", role: "admin" },
      user: { role: "admin" },
    })
    const member = await payload.create({
      collection: "users",
      data: { email: MEMBER_EMAIL, name: "Access Member", role: "user" },
      user: { role: "admin" },
    })

    adminUser = { ...admin, collection: "users" }
    memberUser = { ...member, collection: "users" }
  })

  afterAll(async () => {
    await deleteUserByEmail(ADMIN_EMAIL)
    await deleteUserByEmail(MEMBER_EMAIL)
    await deleteUserByEmail(NEW_USER_EMAIL)
  })

  it("前提として admin と非 admin のユーザーが用意される", () => {
    expect(adminUser.role).toBe("admin")
    expect(memberUser.role).toBe("user")
  })

  it("admin でないユーザーは users を作成できない", async () => {
    const create = payload.create({
      collection: "users",
      data: { email: NEW_USER_EMAIL, name: "Access New" },
      overrideAccess: false,
      user: memberUser,
    })

    await expect(create).rejects.toMatchObject({ status: FORBIDDEN_STATUS })
  })

  it("admin でないユーザーは自分の role を admin に変更できない", async () => {
    const update = payload.update({
      collection: "users",
      data: { role: "admin" },
      id: memberUser.id,
      overrideAccess: false,
      user: memberUser,
    })

    await expect(update).rejects.toMatchObject({ status: FORBIDDEN_STATUS })
  })

  it("admin でないユーザーは他のユーザーを削除できない", async () => {
    const deleted = payload.delete({
      collection: "users",
      id: adminUser.id,
      overrideAccess: false,
      user: memberUser,
    })

    await expect(deleted).rejects.toMatchObject({ status: FORBIDDEN_STATUS })
  })

  it("admin は role を更新できる", async () => {
    const updated = await payload.update({
      collection: "users",
      data: { role: "admin" },
      id: memberUser.id,
      overrideAccess: false,
      user: adminUser,
    })

    expect(updated.role).toBe("admin")
  })
})
