import { test, expect } from "@playwright/test"
import { getPayload } from "payload"
import sharp from "sharp"
import { z } from "zod"

import config from "@/payload.config"

import type { GalleryArea, GalleryPhoto } from "@/payload-types"
import type { Payload } from "payload"

const OK_STATUS = 200
const DUPLICATED_MONTH_COUNT = 1

const GalleryPhotoMonthsResponseSchema = z.object({ months: z.array(z.string()) })

const createTestPhotoFile = async (name: string) => {
  const data = await sharp({
    create: { background: { b: 200, g: 150, r: 100 }, channels: 3, height: 500, width: 500 },
  })
    .png()
    .toBuffer()

  return { data, mimetype: "image/png", name, size: data.length }
}

test.describe("GET /api/gallery-photos/months", () => {
  let payload: Payload
  let area: GalleryArea
  let photos: GalleryPhoto[]

  test.beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    area = await payload.create({ collection: "gallery-areas", data: { name: "撮影月テスト用" } })
    photos = []
    for (const date of ["2024-03-30", "2024-03-15", "2026-01-05"]) {
      const photo = await payload.create({
        collection: "gallery-photos",
        data: { area: area.id, date },
        file: await createTestPhotoFile(`gallery-photo-months-${date}.png`),
      })
      photos.push(photo)
    }
  })

  test.afterAll(async () => {
    for (const photo of photos) {
      await payload.delete({ collection: "gallery-photos", id: photo.id })
    }
    await payload.delete({ collection: "gallery-areas", id: area.id })
  })

  test("撮影月を重複排除し新しい順に返す", async ({ request }) => {
    const response = await request.get("http://localhost:3000/api/gallery-photos/months")
    expect(response.status()).toBe(OK_STATUS)

    const { months } = GalleryPhotoMonthsResponseSchema.parse(await response.json())

    expect(months).toContain("2026-01-01")
    expect(months).toContain("2024-03-01")
    expect(months.indexOf("2026-01-01")).toBeLessThan(months.indexOf("2024-03-01"))
    expect(months.filter((month) => month === "2024-03-01")).toHaveLength(DUPLICATED_MONTH_COUNT)
  })
})
