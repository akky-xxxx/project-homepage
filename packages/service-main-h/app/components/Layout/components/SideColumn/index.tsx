import ExteriorSwitch from "@islands/ExteriorSwitch"

import { Hamburger } from "./components/Hamburger"
import { Menu } from "./components/Menu"
import { backdropStyle } from "./styles/backdropStyle"
import { headerStyle } from "./styles/headerStyle"
import { heading1Style } from "./styles/heading1Style"
import { labelStyle } from "./styles/labelStyle"
import { navigationStyle } from "./styles/navigationStyle"
import { rootStyle } from "./styles/rootStyle"
import { toggleWrapperStyle } from "./styles/toggleWrapperStyle"

import type { ExteriorMode } from "@shared/types/ExteriorMode"
import type { FC } from "hono/jsx"

type Props = {
  exteriorMode: ExteriorMode
}

export const SideColumn: FC<Props> = (props) => {
  const { exteriorMode } = props
  return (
    <div className={rootStyle}>
      <header className={headerStyle}>
        <h1 className={heading1Style}>akky-xxxx</h1>
        <div className={toggleWrapperStyle}>
          <ExteriorSwitch exteriorMode={exteriorMode} />
        </div>
      </header>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={labelStyle}>
        <input type="checkbox" />
        <Hamburger />
      </label>
      <nav className={navigationStyle}>
        <Menu />
      </nav>
      <div className={backdropStyle} />
    </div>
  )
}
