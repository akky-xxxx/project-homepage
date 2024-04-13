import { cx } from "hono/css"

import { HiddenStyles } from "@shared/styles/HiddenStyles"

import { Menu } from "./components/Menu"
import { ExteriorSwitch } from "../../../../islands/ExteriorSwitch"
import { headerStyle } from "./styles/headerStyle"
import { heading1Style } from "./styles/heading1Style"
import { navigationStyle } from "./styles/navigationStyle"
import { rootStyle } from "./styles/rootStyle"
import { toggleWrapperStyle } from "./styles/toggleWrapperStyle"

import type { FC } from "hono/jsx"

const { HIDDEN_SP } = HiddenStyles

export const SideColumn: FC = () => (
  <div className={rootStyle}>
    <header className={headerStyle}>
      <h1 className={heading1Style}>akky-xxxx</h1>
      <div className={toggleWrapperStyle}>
        <ExteriorSwitch />
      </div>
    </header>
    <nav className={cx(navigationStyle, HIDDEN_SP)}>
      <Menu />
    </nav>
  </div>
)
