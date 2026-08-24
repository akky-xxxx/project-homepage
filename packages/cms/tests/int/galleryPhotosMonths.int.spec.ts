import { getPayload } from "payload"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { z } from "zod"

import config from "@/payload.config"

import { callGetRoute } from "../helpers/callGetRoute"
import { createTestApiKey } from "../helpers/createTestApiKey"

import type { Payload } from "payload"

const OK_STATUS = 200
const UNAUTHORIZED_STATUS = 401

const MonthsResponseSchema = z.object({ months: z.array(z.string()) })

describe("gallery-photos/months エンドポイントの REST アクセス制御", () => {
  const RAW_API_KEY = "gallery-photos-months-spec-raw-api-key"

  let payload: Payload
  let apiKeyId: number

  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    apiKeyId = await createTestApiKey(RAW_API_KEY)
  })

  afterAll(async () => {
    await payload.delete({ collection: "api-keys", id: apiKeyId, overrideAccess: true })
  })

  it("未認証は 401 を返す", async () => {
    const response = await callGetRoute(["gallery-photos", "months"])

    expect(response.status).toBe(UNAUTHORIZED_STATUS)
  })

  it("正しい API Key なら months の配列を返す", async () => {
    const response = await callGetRoute(["gallery-photos", "months"], {
      headers: { authorization: `api-keys API-Key ${RAW_API_KEY}` },
    })

    expect(response.status).toBe(OK_STATUS)
    const body = MonthsResponseSchema.parse(await response.json())
    expect(Array.isArray(body.months)).toBe(true)
  })
})
