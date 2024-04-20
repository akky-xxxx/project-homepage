import { NewWindowIcon } from "@icons/NewWindowIcon"
import { css } from "@panda/css"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

type Props = {
  href: string
}

export const ExternalLink: FcWithChildren<Props> = (props) => {
  const { children, href } = props

  return (
    <a className={rootStyle} href={href} rel="noreferrer" target="_blank">
      {children}
      <span style={{ fill: "red" }}>
        <NewWindowIcon />
      </span>
    </a>
  )
}

const rootStyle = css({
  columnGap: "{spacing.s04}",
  display: "inline-flex",
})
