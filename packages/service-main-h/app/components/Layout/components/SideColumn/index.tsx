import { Hamburger } from "./components/Hamburger"
import { Menu } from "./components/Menu"
import { backdropStyle } from "./styles/backdropStyle"
import { headerStyle } from "./styles/headerStyle"
import { heading1Style } from "./styles/heading1Style"
import { inputStyle } from "./styles/inputStyle"
import { labelStyle } from "./styles/labelStyle"
import { navigationStyle } from "./styles/navigationStyle"
import { rootStyle } from "./styles/rootStyle"
import { siteNameStyle } from "./styles/siteNameStyle"

import type { FC } from "hono/jsx"

export const SideColumn: FC = () => (
  <div className={rootStyle}>
    <header className={headerStyle}>
      <h1 className={heading1Style}>
        <a className={siteNameStyle} href="/">
          akky-xxxx
        </a>
      </h1>
    </header>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label className={labelStyle}>
      <input className={inputStyle} type="checkbox" />
      <Hamburger />
    </label>
    <nav className={navigationStyle}>
      <Menu />
    </nav>
    <div className={backdropStyle} />
  </div>
)
