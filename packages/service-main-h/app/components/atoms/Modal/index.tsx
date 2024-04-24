import { cx } from "hono/css"

import { ForLabel } from "@atoms/ForLabel"
import { ScrollLockClass } from "@shared/const/ScrollLockClass"

import { closeButtonWrapperStyle } from "./styles/closeButtonWrapperStyle"
import { contentStyle } from "./styles/contentStyle"
import { crossIconStyle } from "./styles/crossIconStyle"
import { inputStyle } from "./styles/inputStyle"
import { rootStyle } from "./styles/rootStyle"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

type Props = {
  modalId: string
}

export const Modal: FcWithChildren<Props> = (props) => {
  const { children, modalId } = props

  return (
    <div class={rootStyle}>
      <div class={closeButtonWrapperStyle}>
        <ForLabel htmlFor={modalId}>
          <div class={crossIconStyle} />
        </ForLabel>
      </div>
      <div class={contentStyle}>{children}</div>
      <input class={cx(ScrollLockClass, inputStyle)} id={modalId} type="checkbox" />
    </div>
  )
}
