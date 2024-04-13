import { SideColumn } from "./components/SideColumn"
import { mainStyle } from "./styles/mainStyle"
import { rootStyle } from "./styles/rootStyle"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

export const Layout: FcWithChildren = (props) => {
  const { children } = props

  return (
    <div className={rootStyle}>
      <SideColumn />

      <main className={mainStyle}>{children}</main>
    </div>
  )
}
