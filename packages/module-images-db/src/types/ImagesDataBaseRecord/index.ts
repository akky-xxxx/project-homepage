import type { Images } from "../../const/Images"
import type { Area } from "../Area"
import type { DateString } from "../DateString"
import type { Tag } from "../Tag"

type ImagesTypes = typeof Images

export type ImagesDataBaseRecord = {
  area: Area
  date: DateString
  imageId: ImagesTypes[number]
  readonly tags: readonly Tag[]
}
