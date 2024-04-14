import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { TagIcon } from "@icons/TagIcon"
import { getHref } from "@shared/utils/getHref"

import { tagsStyle } from "./styles/tagsStyle"
import { thStyle } from "./styles/thStyle"

import type { FC } from "hono/jsx"
import type { ImagesDataBase } from "module-images-db/src"

type Props = Omit<(typeof ImagesDataBase)[number], "imageId">

export const ImageInfo: FC<Props> = (props) => {
  const { area, date, tags } = props
  const locationHref = getHref({ id: "PhotoLocationDetail", location: area })
  const dateHref = getHref({ date, id: "PhotoDateDetail" })

  return (
    <table>
      <tbody>
        <tr>
          <th className={thStyle}>
            <LocationIcon />
            Location
          </th>
          <td>
            <a href={locationHref}>{area}</a>
          </td>
        </tr>
        <tr>
          <th className={thStyle}>
            <DateIcon />
            Date
          </th>
          <td>
            <a href={dateHref}>{date}</a>
          </td>
        </tr>
        <tr>
          <th className={thStyle}>
            <TagIcon />
            Tags
          </th>
          <td>
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
          </td>
        </tr>
      </tbody>
    </table>
  )
}
