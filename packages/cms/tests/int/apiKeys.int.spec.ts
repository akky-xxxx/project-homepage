import { getPayload } from "payload"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import config from "@/payload.config"

import { callGetRoute } from "../helpers/callGetRoute"

import type { Payload } from "payload"

const OK_STATUS = 200

describe("api-keys コレクション", () => {
  let payload: Payload
  let apiKeyId: number

  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  afterAll(async () => {
    await payload.delete({ collection: "api-keys", id: apiKeyId, overrideAccess: true })
  })

  it("API Key を発行し、その API Key で REST 認証できる", async () => {
    const rawApiKey = "api-keys-spec-raw-api-key"
    const apiKeyDocument = await payload.create({
      collection: "api-keys",
      data: { apiKey: rawApiKey, enableAPIKey: true },
      overrideAccess: true,
    })
    apiKeyId = apiKeyDocument.id

    expect(apiKeyDocument.enableAPIKey).toBe(true)

    const response = await callGetRoute(["gallery-areas"], {
      headers: { authorization: `api-keys API-Key ${rawApiKey}` },
    })

    expect(response.status).toBe(OK_STATUS)
  })
})
