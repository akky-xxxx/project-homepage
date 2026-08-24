import build from "@hono/vite-build/cloudflare-pages"
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
  const pluginsBase = mode === "client" ? [client()] : [honox(), build()]
  const plugins = [...pluginsBase, tsconfigPaths()]

  return {
    ...userConfig,
    // CMS_HOST は VITE_ prefix の変数と同じ「import.meta.env 経由で client に公開されうる」
    // 仕組みに乗っており、prefix が無いことは client 非公開を保証しない。現時点で安全なのは
    // apiClient/ENVIRONMENT を app/islands・app/client.ts 側の import グラフが
    // 一切参照していないため。
    envPrefix: ["VITE_", "CMS_HOST"],
    plugins,
  }
})
