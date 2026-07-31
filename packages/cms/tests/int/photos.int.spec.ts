// @vitest-environment node
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import sharp from 'sharp'

import { beforeAll, describe, expect, it } from 'vitest'

let payload: Payload

const createTestPhotoFile = async () => {
  const data = await sharp({
    create: { background: { b: 200, g: 150, r: 100 }, channels: 3, height: 500, width: 500 },
  })
    .png()
    .toBuffer()

  return { data, mimetype: 'image/png', name: 'test-photo.png', size: data.length }
}

describe('photos collection', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('画像をアップロードして AVIF 変換・サムネイル生成・area/tags のリレーション解決までできる', async () => {
    const area = await payload.create({ collection: 'areas', data: { name: '東京都' } })
    const tag = await payload.create({ collection: 'tags', data: { name: '桜' } })
    const photo = await payload.create({
      collection: 'photos',
      data: {
        area: area.id,
        date: '2024-03-30',
        tags: [tag.id],
      },
      file: await createTestPhotoFile(),
    })

    expect(photo.mimeType).toBe('image/avif')
    expect(photo.sizes?.thumbnail?.filename).toBeTruthy()
    expect(photo.sizes?.thumbnail?.mimeType).toBe('image/avif')

    const found = await payload.findByID({ collection: 'photos', depth: 1, id: photo.id })

    expect(found.area).toMatchObject({ id: area.id, name: '東京都' })
    expect(found.tags?.[0]).toMatchObject({ id: tag.id, name: '桜' })

    await payload.delete({ collection: 'photos', id: photo.id })
    await payload.delete({ collection: 'areas', id: area.id })
    await payload.delete({ collection: 'tags', id: tag.id })
  })

  it('未認証でも photos/areas/tags を read できる', async () => {
    const [photos, areas, tags] = await Promise.all([
      payload.find({ collection: 'photos', overrideAccess: false }),
      payload.find({ collection: 'areas', overrideAccess: false }),
      payload.find({ collection: 'tags', overrideAccess: false }),
    ])

    expect(photos).toBeDefined()
    expect(areas).toBeDefined()
    expect(tags).toBeDefined()
  })
})
