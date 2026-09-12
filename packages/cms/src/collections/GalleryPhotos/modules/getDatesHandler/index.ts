import { APIError } from "payload"

import { isAdmin } from "@/shared/utilities/isAdmin"
import { isApiClient } from "@/shared/utilities/isApiClient"

import type { GalleryPhoto } from "cms-types/src"
import type { PayloadHandler } from "payload"

const MONTH_INDEX_OFFSET = 1
const TWO_DIGIT = 2
const UNAUTHORIZED = 401

const convertToDateString = (value: Pick<GalleryPhoto, "date">) => {
  const dateObject = new Date(value.date)
  return [
    dateObject.getUTCFullYear(),
    (dateObject.getUTCMonth() + MONTH_INDEX_OFFSET).toString().padStart(TWO_DIGIT, "0"),
    "01",
  ].join("-")
}

export const getDatesHandler: PayloadHandler = async (request) => {
  if (!isAdmin({ req: request }) && !isApiClient({ req: request })) {
    throw new APIError("Unauthorized", UNAUTHORIZED)
  }

  const { values: dates } = await request.payload.findDistinct({
    collection: "gallery-photos",
    field: "date",
    overrideAccess: false,
    req: request,
  })
  const months: string[] = [...new Set(dates.map(convertToDateString))]
    .toSorted((a, b) => {
      const numberA = Number(a.replaceAll("-", ""))
      const numberB = Number(b.replaceAll("-", ""))
      return numberA - numberB
    })
    .toReversed()
  return Response.json({ months })
}
