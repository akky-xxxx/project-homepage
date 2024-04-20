import { css } from "@panda/css"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

export const Heading3: FcWithChildren = (props) => {
  const { children } = props

  return <h3 className={rootStyle}>{children}</h3>
}

const rootStyle = css({
  borderLeft: "10px solid var(--primary-red)",
  paddingLeft: "{spacing.s08}",
})
