import { afterEach, describe, expect, it, mock } from "bun:test"

describe("shared/utils/apiClient/modules/fetch", () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it("CMS_HOST を baseURL、CMS_API_KEY を Authorization ヘッダーに使ってリクエストする", async () => {
    await mock.module("@shared/const/ENVIRONMENT", () => ({
      ENVIRONMENT: { CMS_API_KEY: "test-api-key", CMS_HOST: "https://cms.example.com" },
    }))

    let capturedRequest: Request | undefined
    const mockFetch: typeof globalThis.fetch = Object.assign(
      (input: RequestInfo | URL, init?: RequestInit) => {
        capturedRequest = new Request(input, init)
        return Promise.resolve(new Response("{}"))
      },
      { preconnect: originalFetch.preconnect },
    )
    globalThis.fetch = mockFetch

    const { fetch: cmsFetch } = await import(".")
    await cmsFetch("/api/gallery-areas")

    expect(capturedRequest?.url).toBe("https://cms.example.com/api/gallery-areas")
    expect(capturedRequest?.headers.get("Authorization")).toBe("api-keys API-Key test-api-key")
  })
})
