import { css } from "hono/css"

import { ForLabel } from "@atoms/ForLabel"
import { Heading2 } from "@atoms/Heading2"
import { Image } from "@atoms/Image"
import { Modal } from "@atoms/Modal"
import { Block } from "app/components/atoms/Block"

import { ImageInfo } from "./components/ImageInfo"
import { SiblingImages } from "./components/SiblingImages"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type OptionalImageInfo = ImagesDataBaseRecord | undefined

type Props = ImagesDataBaseRecord & {
  filterQueries?: FilterQueries
  siblingImages: [OptionalImageInfo, OptionalImageInfo]
}

const ModalId = "modal-switch"

export const PhotoDetail: FC<Props> = (props) => {
  const { area, date, filterQueries, imageId, siblingImages, tags } = props
  return (
    <div>
      <Heading2>Photo</Heading2>

      <Block>
        <ForLabel htmlFor={ModalId}>
          <Image className={imageStyle} imageId={imageId} />
        </ForLabel>
      </Block>

      <Block>
        <ImageInfo area={area} date={date} tags={tags} />
      </Block>

      <SiblingImages filterQueries={filterQueries} siblingImages={siblingImages} />

      <Modal modalId={ModalId}>
        <Image className={modalImageStyle} imageId={imageId} />
      </Modal>
    </div>
  )
}

const imageStyle = css`
  max-height: calc(100dvh - 130px);
  margin-inline: auto;
`

const modalImageStyle = css`
  width: 100dvw;
  height: 100dvh;
  object-fit: contain;
`
