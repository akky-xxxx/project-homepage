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
    // CMS_HOST・CMS_API_KEY は VITE_ prefix の変数と同じ「import.meta.env 経由で client に
    // 公開されうる」仕組みに乗っており、prefix が無いことは client 非公開を保証しない。
    // 早期検知として eslint.config.mjs の import/no-restricted-paths で
    // app/islands・app/client.ts から apiClient/ENVIRONMENT への直接 import を禁止しているが、
    // このルールは import.meta.env.CMS_API_KEY への直接参照や中継モジュール経由の推移的な
    // import までは検知できない。実際の保証手段は package.json の
    // check:client-bundle-secrets(client ビルド成果物 dist/static にカナリア値が
    // 含まれていないことを検査する CI gate)側にある。
    // なお CMS_API_KEY は SSR/Worker ビルド成果物(dist/_worker.js)には平文で埋め込まれるが、
    // これは Worker が Cloudflare 側でのみ実行されブラウザへ送信されないため許容している。
    // check:client-bundle-secrets の検査対象は client ビルド成果物(dist/static)のみで、
    // dist/_worker.js は対象外。
    envPrefix: ["VITE_", "CMS_HOST", "CMS_API_KEY"],
    plugins,
  }
})
