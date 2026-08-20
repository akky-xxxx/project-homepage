import type { GalleryPhoto } from "@/payload-types"
import type { PayloadHandler } from "payload"

const MONTH_INDEX_OFFSET = 1
const TWO_DIGIT = 2

const convertToDateString = (value: Pick<GalleryPhoto, "date">) => {
  const dateObject = new Date(value.date)
  return [
    dateObject.getUTCFullYear(),
    (dateObject.getUTCMonth() + MONTH_INDEX_OFFSET).toString().padStart(TWO_DIGIT, "0"),
    "01",
  ].join("-")
}

export const getDatesHandler: PayloadHandler = async (request) => {
  const { values: dates } = await request.payload.findDistinct({
    collection: "gallery-photos",
    field: "date",
    overrideAccess: false,
  })
  const months: string[] = [...new Set(dates.map(convertToDateString))]
    .sort((a, b) => {
      const numberA = Number(a.replaceAll("-", ""))
      const numberB = Number(b.replaceAll("-", ""))
      return numberA - numberB
    })
    .reverse()
  return Response.json({ months })
}
