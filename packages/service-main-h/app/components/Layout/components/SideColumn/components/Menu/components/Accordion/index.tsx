import { css, cx } from "hono/css"

import { TextWithIcon } from "@atoms/TextWithIcon"
import { ArrowIcon } from "@icons/ArrowIcon"

import { summaryStyle } from "./styles/summaryStyle"
import { itemStyle } from "../styles/itemStyle"

import type { FcWithChildren } from "@shared/types/FcWithChildren"
import type { Child } from "hono/jsx"

type Props = {
  icon: Child
  isOpen?: boolean
  title: Child
}

const arrowIconWrapper = css`
  fill: var(--primary-color);
  width: 1.6rem;
  height: 1.6rem;

  details > summary > & {
    transform: scaleY(1) translateY(-25%);
  }
  details[open] > summary > & {
    transform: scaleY(-1);
  }
`

export const Accordion: FcWithChildren<Props> = (props) => {
  const { icon, isOpen, children, title } = props

  return (
    <details open={isOpen}>
      <summary class={cx(itemStyle, summaryStyle)}>
        <TextWithIcon icon={icon}>{title}</TextWithIcon>
        <div class={arrowIconWrapper}>
          <ArrowIcon />
        </div>
      </summary>
      {children}
    </details>
  )
}
