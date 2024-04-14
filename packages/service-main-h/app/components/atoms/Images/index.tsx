import { getHref } from "@shared/utils/getHref"

import { Thumbnail } from "./components/Thumbnail"
import { ulStyle } from "./styles/ulStyle"

import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type Props = {
  images: ImagesDataBaseRecord[]
}

export const Images: FC<Props> = (props) => {
  const { images } = props

  return (
    <ul className={ulStyle}>
      {images.map((imageInfo) => {
        const { imageId } = imageInfo

        return (
          <li key={imageId}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <a href={getHref({ id: "PhotoDetail", imageId })}>
              <Thumbnail imageId={imageId} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
