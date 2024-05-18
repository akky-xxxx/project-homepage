import { SideColumn } from "./components/SideColumn"
import { mainStyle } from "./styles/mainStyle"
import { rootStyle } from "./styles/rootStyle"

import type { FcWithChildren } from "@shared/types/FcWithChildren"
import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"

type Props = PhotoGallerySearchQueries

export const Layout: FcWithChildren<Props> = (props) => {
  const { children, ...photoGallerySearchQueries } = props

  return (
    <div class={rootStyle}>
      <SideColumn {...photoGallerySearchQueries} />

      <main class={mainStyle}>{children}</main>
    </div>
  )
}
