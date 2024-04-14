import { css } from "hono/css"
import { ImagesDataBase } from "module-images-db/src"

import { Heading2 } from "@atoms/Heading2"
import { Images } from "@atoms/Images"
import { Spaces } from "@shared/styles/Spaces"

import type { FC } from "hono/jsx"

const { SPACE20 } = Spaces

export const PhotoGallery: FC = () => (
  <div>
    <Heading2>Photo Gallery</Heading2>

    <div className={blockStyle}>
      <Images images={ImagesDataBase} />
    </div>
  </div>
)

const blockStyle = css`
  margin-top: ${SPACE20}rem;
`
