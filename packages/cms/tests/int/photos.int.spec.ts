import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { beforeAll, describe, expect, it } from 'vitest'

let payload: Payload

describe('photos collection', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('area・tags のリレーションを解決して取得できる', async () => {
    const area = await payload.create({ collection: 'areas', data: { name: '東京都' } })
    const tag = await payload.create({ collection: 'tags', data: { name: '桜' } })
    const photo = await payload.create({
      collection: 'photos',
      data: {
        area: area.id,
        date: '2024-03-30',
        imageId: `test-image-${crypto.randomUUID()}`,
        tags: [tag.id],
      },
    })

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
