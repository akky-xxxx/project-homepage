// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest"

// 実値ではなく、トークンの形式だけを満たす捨て値。storeId 部分(example)が Blob の配信ドメインになる
const DUMMY_BLOB_TOKEN = "vercel_blob_rw_example_token"
const BLOB_ORIGIN = "https://example.public.blob.vercel-storage.com"

const FILENAME = "photo-1.avif"
const THUMBNAIL_FILENAME = "photo-1-400x400.avif"

type AfterReadHook = (args: {
  data: unknown
  originalDoc: unknown
  req: unknown
  value: unknown
}) => unknown

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const findFieldByName = (fields: unknown, name: string) => {
  if (!Array.isArray(fields)) return undefined

  return fields.filter(isRecord).find((field) => field.name === name)
}

const getAfterReadHooks = (field: unknown): AfterReadHook[] => {
  if (!isRecord(field) || !isRecord(field.hooks)) return []

  const { afterRead } = field.hooks
  if (!Array.isArray(afterRead)) return []

  return afterRead.filter((hook): hook is AfterReadHook => typeof hook === "function")
}

// Payload は afterRead を順に実行し、前の hook の戻り値を次の value に渡す。
// sanitize 後の設定では Payload 本体の hook とプラグインの hook が並ぶため、
// index を決め打ちせず実際と同じ逐次適用で最終値を得る
const resolveUrl = async (hooks: AfterReadHook[]) => {
  const data = { filename: FILENAME, sizes: { thumbnail: { filename: THUMBNAIL_FILENAME } } }
  // Payload 本体の hook が req.payload.config.serverURL を読むためのスタブ
  const req = { payload: { config: { serverURL: "" } } }

  let value: unknown = undefined
  for (const hook of hooks) {
    value = await hook({ data, originalDoc: data, req, value })
  }

  return value
}

// ENVIRONMENT はモジュール読み込み時に process.env を1度だけ読むため、
// 環境変数を差し替えるには resetModules + 動的 import が必要になる
const loadGalleryPhotosCollection = async (token: string | undefined) => {
  vi.resetModules()
  vi.stubEnv("BLOB_READ_WRITE_TOKEN", token)

  const { default: configPromise } = await import("@/payload.config")
  const config = await configPromise
  const collection = config.collections.find(({ slug }) => slug === "gallery-photos")

  if (collection === undefined) throw new Error("gallery-photos collection not found")

  return collection
}

describe("gallery-photos が返す画像 URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it("BLOB_READ_WRITE_TOKEN があるとき、url は Blob の public ドメインを直接指す", async () => {
    const { fields } = await loadGalleryPhotosCollection(DUMMY_BLOB_TOKEN)

    const url = await resolveUrl(getAfterReadHooks(findFieldByName(fields, "url")))

    expect(url).toBe(`${BLOB_ORIGIN}/${FILENAME}`)
  })

  it("BLOB_READ_WRITE_TOKEN があるとき、sizes.thumbnail.url も Blob の public ドメインを直接指す", async () => {
    const { fields } = await loadGalleryPhotosCollection(DUMMY_BLOB_TOKEN)

    const sizes = findFieldByName(fields, "sizes")
    const thumbnail = findFieldByName(sizes?.fields, "thumbnail")
    const url = await resolveUrl(getAfterReadHooks(findFieldByName(thumbnail?.fields, "url")))

    expect(url).toBe(`${BLOB_ORIGIN}/${THUMBNAIL_FILENAME}`)
  })

  it("BLOB_READ_WRITE_TOKEN があるとき、Payload の staticHandler は登録されない", async () => {
    const { upload } = await loadGalleryPhotosCollection(DUMMY_BLOB_TOKEN)

    expect(upload.handlers).toStrictEqual([])
  })

  it("BLOB_READ_WRITE_TOKEN が無いローカル / CI では、url は Payload 経由のパスのままになる", async () => {
    const { fields } = await loadGalleryPhotosCollection(undefined)

    const url = await resolveUrl(getAfterReadHooks(findFieldByName(fields, "url")))

    expect(url).toBe(`/api/gallery-photos/file/${FILENAME}`)
  })
})
