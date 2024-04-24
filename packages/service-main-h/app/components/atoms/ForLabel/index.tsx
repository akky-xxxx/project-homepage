import { css } from "hono/css"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

type Props = {
  htmlFor: string
}

export const ForLabel: FcWithChildren<Props> = (props) => {
  const { children, htmlFor } = props

  return (
    // eslint-disable-next-line react/no-unknown-property
    <label className={rootStyle} for={htmlFor}>
      {children}
    </label>
  )
}

const rootStyle = css`
  cursor: pointer;
`
