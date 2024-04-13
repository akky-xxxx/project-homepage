import { rootStyle } from "./styles/rootStyle"

import type { FcWithChildren } from "@shared/types/FcWithChildren"
import type { Child } from "hono/jsx"

type Props = {
  icon: Child
}

export const TextWithIcon: FcWithChildren<Props> = (props) => {
  const { icon, children } = props
  return (
    <div className={rootStyle}>
      {icon}
      <div>{children}</div>
    </div>
  )
}
