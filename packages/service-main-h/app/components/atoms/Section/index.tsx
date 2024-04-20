import { css } from "@panda/css"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

export const Section: FcWithChildren = (props) => {
  const { children } = props

  return <section className={blockStyle}>{children}</section>
}

const blockStyle = css({
  marginTop: "{spacing.s32}",

  _sp: {
    paddingLeft: "{spacing.s12}",
    paddingRight: "{spacing.s12}",
  },
})
