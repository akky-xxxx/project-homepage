import { css } from "hono/css"

import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { TagIcon } from "@icons/TagIcon"
import { Spaces } from "@shared/styles/Spaces"

import type { FC } from "hono/jsx"
import type { ImagesDataBase } from "module-images-db/src"

const { SPACE08 } = Spaces

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
          <td>
            <ul className={tagsStyle}>
              {tags.map((tag) => (
                <li>{tag}</li>
              ))}
            </ul>
          </td>
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
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACE08}rem;
  line-height: 2;
`
