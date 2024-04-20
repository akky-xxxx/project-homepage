import { css } from "@panda/css"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

export const Heading2: FcWithChildren = (props) => {
  const { children } = props

  return <h2 className={rootStyle}>{children}</h2>
}

const rootStyle = css({
  borderBottom: "2px solid var(--primary-red)",

  _pc: {
    paddingBottom: "{spacing.s12}",
  },

  _sp: {
    paddingBottom: "{spacing.s04}",
    paddingInline: "{spacing.s08}",
  },
})
