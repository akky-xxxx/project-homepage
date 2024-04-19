import { Image } from "@atoms/Image"
import { getHref } from "@shared/utils/getHref"

import { getQueries } from "./modules/getQueries"
import { ulStyle } from "./styles/ulStyle"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type Props = {
  filterQueries?: FilterQueries
  images: ImagesDataBaseRecord[]
}

export const Images: FC<Props> = (props) => {
  const { filterQueries, images } = props

  return (
    <ul className={ulStyle}>
      {images.map((imageInfo) => {
        const { imageId } = imageInfo
        const href = [getHref({ id: "PhotoDetail", imageId }), getQueries(filterQueries)].join("?")

        return (
          <li key={imageId}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <a href={href}>
              <Image isThumbnail imageId={imageId} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
