import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { TagIcon } from "@icons/TagIcon"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { Child } from "hono/jsx"

export const getConditionData = (filterQueries: FilterQueries) => {
  const { date, location, tag } = filterQueries
  const baseArray: Child | string = []

  if (location) {
    baseArray.push([<LocationIcon />, location])
  }

  if (date) {
    baseArray.push([<DateIcon />, date])
  }

  if (tag) {
    baseArray.push([<TagIcon />, tag])
  }

  return baseArray.flat()
}
