import { SideColumn } from "./components/SideColumn"
import { mainStyle } from "./styles/mainStyle"
import { rootStyle } from "./styles/rootStyle"

import type { ExteriorMode } from "@shared/types/ExteriorMode"
import type { FcWithChildren } from "@shared/types/FcWithChildren"

type Props = {
  exteriorMode: ExteriorMode
}

export const Layout: FcWithChildren<Props> = (props) => {
  const { children, exteriorMode } = props

  return (
    <div className={rootStyle}>
      <SideColumn exteriorMode={exteriorMode} />

      <main className={mainStyle}>{children}</main>
    </div>
  )
}
