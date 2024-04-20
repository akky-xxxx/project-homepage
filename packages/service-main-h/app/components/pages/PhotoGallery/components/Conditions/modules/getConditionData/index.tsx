import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { TagIcon } from "@icons/TagIcon"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { Child } from "hono/jsx"

export const getConditionData = (filterQueries: FilterQueries) => {
  const { date, location, tag } = filterQueries
  return (
    [
      location && [<LocationIcon />, location],
      date && [<DateIcon />, date],
      tag && [<TagIcon />, tag],
    ] satisfies Child | string
  )
    .filter(Boolean)
    .flat()
}
