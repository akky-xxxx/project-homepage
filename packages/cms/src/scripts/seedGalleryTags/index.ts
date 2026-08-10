import { getPayload } from "payload"

import config from "@/payload.config"
import { TAGS } from "@/shared/const/TAGS"

const NO_LIMIT = 0

// `payload run` は import() が解決した時点で process.exit するため、
// トップレベル await で解決を待たせる必要がある(async 関数に包んで呼び出すと
// 完了を待たずにプロセスごと終了してしまう)。
const payload = await getPayload({ config })

const { docs: existingTags } = await payload.find({
  collection: "gallery-tags",
  limit: NO_LIMIT,
  where: { name: { in: [...TAGS] } },
})
const existingNames = new Set(existingTags.map((tag) => tag.name))

for (const name of TAGS) {
  if (existingNames.has(name)) continue

  await payload.create({ collection: "gallery-tags", data: { name } })
  /* eslint-disable-next-line no-console */
  console.log(`created: ${name}`)
}

await payload.destroy()
