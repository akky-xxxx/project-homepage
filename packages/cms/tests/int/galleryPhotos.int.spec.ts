// @vitest-environment node
import { getPayload } from "payload"
import sharp from "sharp"
import { beforeAll, describe, expect, it } from "vitest"

import config from "@/payload.config"

import type { Payload } from "payload"

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

  it("未認証でも gallery-photos/gallery-areas/gallery-tags を read できる", async () => {
    const [photos, areas, tags] = await Promise.all([
      payload.find({ collection: "gallery-photos", overrideAccess: false }),
      payload.find({ collection: "gallery-areas", overrideAccess: false }),
      payload.find({ collection: "gallery-tags", overrideAccess: false }),
    ])

    expect(photos).toBeDefined()
    expect(areas).toBeDefined()
    expect(tags).toBeDefined()
  })
})
