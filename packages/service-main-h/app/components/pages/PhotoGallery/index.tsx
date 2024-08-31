import { Block } from "@atoms/Block"
import { ContentsWidthBlock } from "@atoms/ContentsWidthBlock"
import { Heading2 } from "@atoms/Heading2"
import { Images } from "@atoms/Images"
import { SearchIcon } from "@icons/SearchIcon"

import { Conditions } from "./components/Conditions"
import { Heading2Inner } from "./components/Heading2Inner"
import { Pagination } from "./components/Pagination"
import { PaginationWrapper } from "./components/PaginationWrapper"
import { SearchModal } from "./components/SearchModal"
import { SearchModalId } from "./const/SearchModalId"
import { labelStyle } from "./styles/labelStyle"

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
      <Heading2>
        <Heading2Inner>
          <span>Photo Gallery</span>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label class={labelStyle} for={SearchModalId}>
            <SearchIcon height={30} width={30} />
          </label>
        </Heading2Inner>
      </Heading2>

      <Conditions searchQueries={searchQueries} />

      {Boolean(hasPages) && (
        <Block>
          <ContentsWidthBlock>
            {currentPage}
            {" "}
            of
            {totalPages}
            {" "}
            pages
          </ContentsWidthBlock>
        </Block>
      )}

      <Block>
        <Images images={images} searchQueries={searchQueries} />
      </Block>

      {Boolean(hasPages) && (
        <Block>
          <PaginationWrapper>
            <Pagination
              currentPage={currentPage}
              searchQueries={searchQueries}
              totalPages={totalPages}
            />
          </PaginationWrapper>
        </Block>
      )}

      <SearchModal searchQueries={searchQueries} />
    </div>
  )
}
