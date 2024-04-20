import { css } from "@panda/css"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

export const Block: FcWithChildren = (props) => {
  const { children } = props

  return <div className={rootStyle}>{children}</div>
}

const rootStyle = css({
  marginTop: "{spacing.s20}",
})
