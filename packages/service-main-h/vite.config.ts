import pages from "@hono/vite-cloudflare-pages"
import honox from "honox/vite"
import client from "honox/vite/client"
import { defineConfig, type UserConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const userConfig: UserConfig = {
  optimizeDeps: {
    entries: ["./app/routes/index.tsx"],
  },
}

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
  const pluginsBase = mode === "client" ? [client()] : [honox(), pages()]
  const plugins = [...pluginsBase, tsconfigPaths()]

  return {
    ...userConfig,
    plugins,
  }
})
