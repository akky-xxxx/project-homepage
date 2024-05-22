import { css } from "hono/css"

import { Block } from "@atoms/Block"
import { ContentsWidthBlock } from "@atoms/ContentsWidthBlock"
import { Heading3 } from "@atoms/Heading3"
import { Section } from "@atoms/Section"
import { Colors } from "@shared/styles/Colors"
import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"
import { getHref } from "@shared/utils/getHref"

import type { FC } from "hono/jsx"

const { COLOR_FAFAFA } = Colors
const { MEDIA_ONLY_HOVER, MEDIA_PC, MEDIA_SP } = MediaQueries
const { SPACE12 } = Spaces

type FcReturn = ReturnType<FC>

type Props = Record<"locationCondition" | "monthCondition" | "tagCondition", FcReturn>

export const FormBase: FC<Props> = (props) => {
  const { locationCondition, monthCondition, tagCondition } = props

  return (
    <form action={getHref({ id: "PhotoGallery" })}>
      <Section>
        <Heading3>Location</Heading3>
        <Block>{locationCondition}</Block>
      </Section>

      <Section>
        <Heading3>Month</Heading3>
        <Block>{monthCondition}</Block>
      </Section>

      <Section>
        <Heading3>Tag</Heading3>
        <Block>{tagCondition}</Block>
      </Section>

      <Block>
        <ContentsWidthBlock>
          <div class={buttonsWrapperStyle}>
            <button class={searchButtonStyle} type="submit">
              検索
            </button>
            <input class={resetButtonStyle} type="reset" value="リセット" />
          </div>
        </ContentsWidthBlock>
      </Block>
    </form>
  )
}

const buttonsWrapperStyle = css`
  display: grid;
  gap: ${SPACE12}rem;

  ${MEDIA_PC} {
    grid-template-columns: 100px 100px;
  }

  ${MEDIA_SP} {
    grid-template-columns: 60% 1fr;
  }
`

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  color: ${COLOR_FAFAFA};
  cursor: pointer;
  padding: ${SPACE12}rem;
  transition: opacity 0.2s ease;

  ${MEDIA_ONLY_HOVER} {
    &:hover {
      opacity: 0.5;
    }
  }
`

const searchButtonStyle = css`
  ${buttonStyle};
  background-color: var(--active-color);
`

const resetButtonStyle = css`
  ${buttonStyle};
  background-color: var(--negative-color);
  );
`
