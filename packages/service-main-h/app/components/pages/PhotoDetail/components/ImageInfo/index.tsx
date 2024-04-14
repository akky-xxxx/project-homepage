import { css } from "hono/css"

import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { TagIcon } from "@icons/TagIcon"

import type { FC } from "hono/jsx"
import type { ImagesDataBase } from "module-images-db/src"

type Props = Omit<(typeof ImagesDataBase)[number], "imageId">

export const ImageInfo: FC<Props> = (props) => {
  const { area, date, tags } = props

  return (
    <table>
      <tbody>
        <tr>
          <th className={thStyle}>
            <LocationIcon />
            Location
          </th>
          <td>{area}</td>
        </tr>
        <tr>
          <th className={thStyle}>
            <DateIcon />
            Date
          </th>
          <td>{date}</td>
        </tr>
        <tr>
          <th className={thStyle}>
            <TagIcon />
            Tags
          </th>
          <td className={tagsStyle}>{tags.join(", ")}</td>
        </tr>
      </tbody>
    </table>
  )
}

const thStyle = css`
  align-items: center;
  border-bottom-width: 0.4rem;
  border-color: transparent;
  border-right-width: 0.8rem;
  border-style: solid;
  display: flex;
  fill: var(--primary-color);
  font-weight: normal;
  gap: 0.4rem;
`

const tagsStyle = css`
  line-height: 2;
`
