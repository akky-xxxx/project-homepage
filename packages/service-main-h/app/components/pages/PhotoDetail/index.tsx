import { css } from "hono/css"

import { Block } from "@atoms/Block"
import { ForLabel } from "@atoms/ForLabel"
import { Heading2 } from "@atoms/Heading2"
import { Image } from "@atoms/Image"
import { Modal } from "@atoms/Modal"
import { getPhotoText } from "@shared/utils/getPhotoText"

import { ImageInfo } from "./components/ImageInfo"
import { SiblingImages } from "./components/SiblingImages"

import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type OptionalImageInfo = ImagesDataBaseRecord | undefined

type Props = ImagesDataBaseRecord & {
  searchQueries?: PhotoGallerySearchQueries
  siblingImages: [OptionalImageInfo, OptionalImageInfo]
}

const ModalId = "modal-switch"

export const PhotoDetail: FC<Props> = (props) => {
  const { area, date, searchQueries, imageId, siblingImages, tags } = props
  const alt = getPhotoText({ area, date, tags })
  return (
    <div>
      <Heading2>Photo</Heading2>

      <Block>
        <ForLabel htmlFor={ModalId}>
          <Image alt={alt} className={imageStyle} imageId={imageId} />
        </ForLabel>
      </Block>

      <Block>
        <ImageInfo area={area} date={date} tags={tags} />
      </Block>

      <SiblingImages searchQueries={searchQueries} siblingImages={siblingImages} />

      <Modal modalId={ModalId}>
        <Image alt={alt} className={modalImageStyle} imageId={imageId} />
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
