import { SideColumn } from "./components/SideColumn"
import { mainStyle } from "./styles/mainStyle"
import { rootStyle } from "./styles/rootStyle"

import type { FcWithChildren } from "@shared/types/FcWithChildren"
import type { FilterQueries } from "@shared/types/FilterQueries"

type Props = FilterQueries

export const Layout: FcWithChildren<Props> = (props) => {
  const { children, ...filterQueries } = props

  return (
    <div class={rootStyle}>
      <SideColumn {...filterQueries} />

      <main class={mainStyle}>{children}</main>
    </div>
  )
}
