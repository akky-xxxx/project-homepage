import { Hamburger } from "./components/Hamburger"
import { Menu } from "./components/Menu"
import { backdropStyle } from "./styles/backdropStyle"
import { headerStyle } from "./styles/headerStyle"
import { heading1Style } from "./styles/heading1Style"
import { labelStyle } from "./styles/labelStyle"
import { navigationStyle } from "./styles/navigationStyle"
import { rootStyle } from "./styles/rootStyle"
import { siteNameStyle } from "./styles/siteNameStyle"

import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"
import type { FC } from "hono/jsx"

type Props = PhotoGallerySearchQueries

export const SideColumn: FC = (props: Props) => (
  <div class={rootStyle}>
    <header class={headerStyle}>
      <h1 class={heading1Style}>
        <a class={siteNameStyle} href="/">
          akky-xxxx
        </a>
      </h1>
    </header>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label class={labelStyle}>
      <input type="checkbox" />
      <Hamburger />
    </label>
    <nav class={navigationStyle}>
      <Menu {...props} />
    </nav>
    <div class={backdropStyle} />
  </div>
)
