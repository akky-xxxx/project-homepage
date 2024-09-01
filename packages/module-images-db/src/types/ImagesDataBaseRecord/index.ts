import type { IMAGES } from "../../const/IMAGES"
import type { Area } from "../Area"
import type { DateString } from "../DateString"
import type { Tag } from "../Tag"

type ImagesTypes = typeof IMAGES

export type ImagesDataBaseRecord = {
  area: Area
  date: DateString
  imageId: ImagesTypes[number]
  readonly tags: readonly Tag[]
}
