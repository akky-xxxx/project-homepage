import { css } from "hono/css"

import { Heading2 } from "@atoms/Heading2"
import { Images } from "@atoms/Images"
import { Spaces } from "@shared/styles/Spaces"

import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

const { SPACE20 } = Spaces

type Props = {
  images: ImagesDataBaseRecord[]
}

export const PhotoGallery: FC<Props> = (props) => {
  const { images } = props

  return (
    <div>
      <Heading2>Photo Gallery</Heading2>

      <div className={blockStyle}>
        <Images images={images} />
      </div>
    </div>
  )
}

const blockStyle = css`
  margin-top: ${SPACE20}rem;
`
