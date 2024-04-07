import "./globals.css"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"

import { cx } from "@panda/css"

import { ExteriorConfigSetter } from "./components/organisms/ExteriorConfigSetter"
import { getExteriorConfig } from "./modules/getExteriorConfig"
import { getExteriorMode } from "./modules/getExteriorMode"
import { bodyStyle } from "./styles/bodyStyle"
import { redStyle } from "./styles/redStyle"
import { CookieKeys } from "../shared/constants/CookieKeys"

import type { Metadata } from "next"
import type { FC, PropsWithChildren } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",

  description: "Generated by create next app",
}

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props
  const exteriorConfig = getExteriorConfig(cookies().get(CookieKeys.EXTERIOR_CONFIG))
  const exteriorMode = getExteriorMode(exteriorConfig.isManual && exteriorConfig.isDarkMode)

  return (
    <html className={`is-${exteriorMode}`} lang="ja">
      <body className={cx(inter.className, bodyStyle)}>
        <ExteriorConfigSetter {...exteriorConfig} />
        {children}
        <div className={redStyle}>赤文字</div>
      </body>
    </html>
  )
}

export default RootLayout
