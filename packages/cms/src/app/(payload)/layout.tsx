/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from "@payload-config"

import "@payloadcms/next/css"
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts"

import { importMap } from "./importMap.js"

import type { ServerFunctionClient } from "payload"
import type React from "react"
import "./custom.scss"

type Arguments = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (arguments_) {
  "use server"
  return handleServerFunctions({
    ...arguments_,
    config,
    importMap,
  })
}

const Layout = ({ children }: Arguments) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
