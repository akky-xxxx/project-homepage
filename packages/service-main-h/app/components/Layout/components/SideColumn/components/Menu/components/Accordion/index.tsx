import { TextWithIcon } from "@atoms/TextWithIcon"
import { ArrowIcon } from "@icons/ArrowIcon"
import { cx } from "@panda/css"

import { arrowIconWrapperStyle } from "./styles/arrowIconWrapperStyle"
import { summaryStyle } from "./styles/summaryStyle"
import { itemStyle } from "../styles/itemStyle"

import type { FcWithChildren } from "@shared/types/FcWithChildren"
import type { Child } from "hono/jsx"

type Props = {
  icon: Child
  isOpen?: boolean
  title: Child
}

export const Accordion: FcWithChildren<Props> = (props) => {
  const { icon, isOpen, children, title } = props

  return (
    <details open={isOpen}>
      <summary className={cx(itemStyle, summaryStyle)}>
        <TextWithIcon icon={icon}>{title}</TextWithIcon>
        <div className={arrowIconWrapperStyle}>
          <ArrowIcon />
        </div>
      </summary>
      {children}
    </details>
  )
}
