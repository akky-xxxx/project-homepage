import { getPayload } from "payload"

import config from "@/payload.config"
import { PREFECTURES } from "@/shared/const/PREFECTURES"

const NO_LIMIT = 0

// `payload run` は import() が解決した時点で process.exit するため、
// トップレベル await で解決を待たせる必要がある(async 関数に包んで呼び出すと
// 完了を待たずにプロセスごと終了してしまう)。
const payload = await getPayload({ config })

const { docs: existingAreas } = await payload.find({
  collection: "gallery-areas",
  limit: NO_LIMIT,
  where: { name: { in: [...PREFECTURES] } },
})
const existingNames = new Set(existingAreas.map((area) => area.name))

for (const name of PREFECTURES) {
  if (existingNames.has(name)) continue

  await payload.create({ collection: "gallery-areas", data: { name } })
  /* eslint-disable-next-line no-console */
  console.log(`created: ${name}`)
}

await payload.destroy()
