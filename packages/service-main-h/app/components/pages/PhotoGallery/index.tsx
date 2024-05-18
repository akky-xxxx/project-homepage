import { css } from "hono/css"

import { Block } from "@atoms/Block"
import { ContentsWidthBlock } from "@atoms/ContentsWidthBlock"
import { Heading2 } from "@atoms/Heading2"
import { Images } from "@atoms/Images"

import { Conditions } from "./components/Conditions"
import { Pagination } from "./components/Pagination"

import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type Props = {
  currentPage: number
  images: ImagesDataBaseRecord[]
  searchQueries: PhotoGallerySearchQueries
  totalPages: number
}

const ONE_PAGE = 1

export const PhotoGallery: FC<Props> = (props) => {
  const { currentPage, images, searchQueries, totalPages } = props
  const hasPages = totalPages > ONE_PAGE

  return (
    <div>
      <Heading2>Photo Gallery</Heading2>

      <Conditions searchQueries={searchQueries} />

      {Boolean(hasPages) && (
        <Block>
          <ContentsWidthBlock>
            {currentPage} of {totalPages} pages
          </ContentsWidthBlock>
        </Block>
      )}

      <Block>
        <Images images={images} searchQueries={searchQueries} />
      </Block>

      {Boolean(hasPages) && (
        <Block>
          <div class={paginationWrapperStyle}>
            <Pagination
              currentPage={currentPage}
              searchQueries={searchQueries}
              totalPages={totalPages}
            />
          </div>
        </Block>
      )}
    </div>
  )
}

const paginationWrapperStyle = css`
  display: flex;
  place-content: center;
`
