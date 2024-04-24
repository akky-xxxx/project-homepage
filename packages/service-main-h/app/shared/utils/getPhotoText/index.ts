import { format } from "@formkit/tempo"

import { TempoFormats } from "@shared/const/TempoFormats"

import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type GetPhotoText = (props: Omit<ImagesDataBaseRecord, "imageId">) => string

export const getPhotoText: GetPhotoText = (props) => {
  const { area, date, tags } = props

  const hasTags = Boolean(tags.length)

  return [
    format(date, TempoFormats.YYYY年M月D日),
    "に",
    area,
    "で撮った",
    hasTags && "「",
    tags.join("、"),
    hasTags && "」",
    hasTags && "の",
    "写真",
  ]
    .filter(Boolean)
    .join("")
}
