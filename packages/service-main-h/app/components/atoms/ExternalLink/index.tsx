import { css } from "hono/css"

import { NewWindowIcon } from "@icons/NewWindowIcon"
import { Spaces } from "@shared/styles/Spaces"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

const { SPACE04 } = Spaces

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

const rootStyle = css`
  display: inline-flex;
  column-gap: ${SPACE04}rem;
`
