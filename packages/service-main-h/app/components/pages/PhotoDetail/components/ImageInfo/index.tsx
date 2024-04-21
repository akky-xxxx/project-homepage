import { format } from "@formkit/tempo"

import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { TagIcon } from "@icons/TagIcon"
import { TempoFormats } from "@shared/const/TempoFormats"
import { getHref } from "@shared/utils/getHref"

import { dlStyle } from "./styles/dlStyle"
import { dtStyle } from "./styles/dtStyle"
import { tagsStyle } from "./styles/tagsStyle"
import { tagsWrapperStyle } from "./styles/tagsWrapperStyle"

import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type Props = Omit<ImagesDataBaseRecord, "imageId">

export const ImageInfo: FC<Props> = (props) => {
  const { area, date, tags } = props
  const locationHref = getHref({ id: "PhotoLocationDetail", location: area })
  const dateHref = getHref({ date, id: "PhotoDateDetail" })

  return (
    <dl className={dlStyle}>
      <dt className={dtStyle}>
        <LocationIcon />
      </dt>
      <dd>
        <a href={locationHref}>{area}</a>
      </dd>

      <dt className={dtStyle}>
        <DateIcon />
      </dt>
      <dd>
        <a href={dateHref}>{format(date, TempoFormats.YYYY年M月D日)}</a>
      </dd>

      <dt className={dtStyle}>
        <TagIcon />
      </dt>
      <dd className={tagsWrapperStyle}>
        <ul className={tagsStyle}>
          {tags.map((tag) => {
            const tagHref = getHref({ id: "PhotoTagDetail", tag })
            return (
              <li>
                <a href={tagHref}>{tag}</a>
              </li>
            )
          })}
        </ul>
      </dd>
    </dl>
  )
}
