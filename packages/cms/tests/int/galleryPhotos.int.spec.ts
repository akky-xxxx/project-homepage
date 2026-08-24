// @vitest-environment node
import { getPayload } from "payload"
import sharp from "sharp"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import config from "@/payload.config"

import { callGetRoute } from "../helpers/callGetRoute"
import { createTestApiKey } from "../helpers/createTestApiKey"
import { deleteUserByEmail } from "../helpers/deleteUserByEmail"
import { getTestUserAuthHeaders } from "../helpers/getTestUserAuthHeaders"

import type { Payload } from "payload"

const FORBIDDEN_STATUS = 403
const OK_STATUS = 200

let payload: Payload

const createTestPhotoFile = async () => {
  const data = await sharp({
    create: { background: { b: 200, g: 150, r: 100 }, channels: 3, height: 500, width: 500 },
  })
    .png()
    .toBuffer()

  return { data, mimetype: "image/png", name: "test-photo.png", size: data.length }
}

describe("gallery-photos collection", () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it("画像をアップロードして AVIF 変換・サムネイル生成・area/tags のリレーション解決までできる", async () => {
    const area = await payload.create({ collection: "gallery-areas", data: { name: "東京都" } })
    const tag = await payload.create({ collection: "gallery-tags", data: { name: "桜" } })
    const photo = await payload.create({
      collection: "gallery-photos",
      data: {
        area: area.id,
        date: "2024-03-30",
        tags: [tag.id],
      },
      file: await createTestPhotoFile(),
    })

    expect(photo.mimeType).toBe("image/avif")
    expect(photo.sizes?.thumbnail?.filename).toBeTruthy()
    expect(photo.sizes?.thumbnail?.mimeType).toBe("image/avif")

    const found = await payload.findByID({ collection: "gallery-photos", depth: 1, id: photo.id })

    expect(found.area).toMatchObject({ id: area.id, name: "東京都" })
    const [firstTag] = found.tags ?? []
    expect(firstTag).toMatchObject({ id: tag.id, name: "桜" })

    await payload.delete({ collection: "gallery-photos", id: photo.id })
    await payload.delete({ collection: "gallery-areas", id: area.id })
    await payload.delete({ collection: "gallery-tags", id: tag.id })
  })
})

describe("gallery-photos/gallery-areas/gallery-tags の REST read アクセス制御", () => {
  const ADMIN_EMAIL = "gallery-read-admin@example.com"
  const MEMBER_EMAIL = "gallery-read-member@example.com"
  const RAW_API_KEY = "gallery-photos-spec-raw-api-key"

  let apiKeyId: number
  let adminId: number
  let memberId: number

  beforeAll(async () => {
    payload = await getPayload({ config: await config })

    await deleteUserByEmail(ADMIN_EMAIL)
    await deleteUserByEmail(MEMBER_EMAIL)

    // 先に admin を作ることで、続く member 作成が first-user-admin ガードの対象にならないようにする
    const admin = await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, name: "Gallery Read Admin", role: "admin" },
      user: { role: "admin" },
    })
    const member = await payload.create({
      collection: "users",
      data: { email: MEMBER_EMAIL, name: "Gallery Read Member", role: "user" },
      user: { role: "admin" },
    })
    adminId = admin.id
    memberId = member.id

    apiKeyId = await createTestApiKey(RAW_API_KEY)
  })

  afterAll(async () => {
    await payload.delete({ collection: "api-keys", id: apiKeyId, overrideAccess: true })
    await deleteUserByEmail(ADMIN_EMAIL)
    await deleteUserByEmail(MEMBER_EMAIL)
  })

  it.each([
    { expectedStatus: FORBIDDEN_STATUS, getHeaders: () => undefined, name: "未認証" },
    {
      expectedStatus: FORBIDDEN_STATUS,
      getHeaders: () => ({ authorization: "api-keys API-Key wrong-key-value" }),
      name: "不正な API Key",
    },
    {
      expectedStatus: OK_STATUS,
      getHeaders: () => ({ authorization: `api-keys API-Key ${RAW_API_KEY}` }),
      name: "正しい API Key",
    },
    {
      expectedStatus: OK_STATUS,
      getHeaders: () => getTestUserAuthHeaders(String(adminId)),
      name: "admin セッション",
    },
    {
      expectedStatus: FORBIDDEN_STATUS,
      getHeaders: () => getTestUserAuthHeaders(String(memberId)),
      name: "非 admin セッション",
    },
  ])(
    "$name のとき gallery-areas への read は $expectedStatus を返す",
    async ({ getHeaders, expectedStatus }) => {
      const headers = await getHeaders()
      const response = await callGetRoute(["gallery-areas"], { headers })

      expect(response.status).toBe(expectedStatus)
    },
  )

  it("gallery-photos も同じ access 制御を適用する(未認証は拒否、正しい API Key は許可)", async () => {
    const unauthorized = await callGetRoute(["gallery-photos"])
    expect(unauthorized.status).toBe(FORBIDDEN_STATUS)

    const authorized = await callGetRoute(["gallery-photos"], {
      headers: { authorization: `api-keys API-Key ${RAW_API_KEY}` },
    })
    expect(authorized.status).toBe(OK_STATUS)
  })

  it("gallery-tags も同じ access 制御を適用する(未認証は拒否、正しい API Key は許可)", async () => {
    const unauthorized = await callGetRoute(["gallery-tags"])
    expect(unauthorized.status).toBe(FORBIDDEN_STATUS)

    const authorized = await callGetRoute(["gallery-tags"], {
      headers: { authorization: `api-keys API-Key ${RAW_API_KEY}` },
    })
    expect(authorized.status).toBe(OK_STATUS)
  })
})
