import { ContentsWidthBlock } from "@atoms/ContentsWidthBlock"
import { Heading2 } from "@atoms/Heading2"
import { PhotoGallerySearchForm } from "@atoms/PhotoGallerySearchForm"
import { invisibleInputStyle } from "@shared/styles/invisibleInputStyle"

import { backdropStyle } from "./styles/backdropStyle"
import { contentsStyle } from "./styles/contentsStyle"
import { crossIconStyle } from "./styles/crossIconStyle"
import { heading2WrapperStyle } from "./styles/heading2WrapperStyle"
import { rootStyle } from "./styles/rootStyle"
import { SearchModalId } from "../../const/SearchModalId"
import { labelStyle } from "../../styles/labelStyle"
import { Heading2Inner } from "../Heading2Inner"

import type { FC } from "hono/jsx"

export const SearchModal: FC = () => (
  <div class={rootStyle}>
    <div class={contentsStyle}>
      <div class={heading2WrapperStyle}>
        <Heading2>
          <Heading2Inner>
            <span>Search</span>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label class={labelStyle}>
              <input class={invisibleInputStyle} id={SearchModalId} type="checkbox" />
              <div class={crossIconStyle} />
            </label>
          </Heading2Inner>
        </Heading2>
      </div>
      <ContentsWidthBlock>
        <PhotoGallerySearchForm />
      </ContentsWidthBlock>
    </div>
    <div class={backdropStyle} />
  </div>
)
