import {
  betterAuthCollections,
  createBetterAuthPlugin,
  payloadAdapter,
} from "@delmaredigital/payload-better-auth"
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { betterAuth } from "better-auth"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"
import { fileURLToPath } from "url"

import { GalleryAreas } from "./collections/GalleryAreas"
import { GalleryPhotos } from "./collections/GalleryPhotos"
import { GalleryTags } from "./collections/GalleryTags"
import { Users } from "./collections/Users"
import { ENVIRONMENT } from "./shared/const/ENVIRONMENT"
import { betterAuthOptions } from "./shared/utilities/betterAuthOptions"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const baseUrl = ENVIRONMENT.BETTER_AUTH_URL

export default buildConfig({
  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [GalleryAreas, GalleryPhotos, GalleryTags, Users],
  editor: lexicalEditor(),

  routes: {
    admin: "/",
  },

  secret: ENVIRONMENT.PAYLOAD_SECRET,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: vercelPostgresAdapter({
    pool: {
      connectionString: ENVIRONMENT.POSTGRES_URL,
    },
  }),

  sharp,

  plugins: [
    betterAuthCollections({
      betterAuthOptions,
      skipCollections: ["user"],
    }),
    createBetterAuthPlugin({
      createAuth: (payload) =>
        betterAuth({
          ...betterAuthOptions,
          database: payloadAdapter({ payloadClient: payload }),

          advanced: { database: { generateId: "serial" } },
          baseURL: baseUrl,
          secret: ENVIRONMENT.BETTER_AUTH_SECRET,
          trustedOrigins: [baseUrl],
        }),

      admin: {
        betterAuthOptions,
        loginViewComponent:
          "@delmaredigital/payload-better-auth/components/login-passkey#LoginViewWrapperWithPasskey",
        logoutButtonComponent: "@/components/LogoutButton#LogoutButton",

        login: {
          afterLoginPath: "/",
          enablePasskey: true,
          // password / サインアップは最初の 1 アカウントを作るためだけに開いている。
          // 作成後の password ログインと 2 回目以降のサインアップは authBeforeHook が拒否する。
          enablePassword: true,
          enableSignUp: true,

          enableForgotPassword: false,
          enableMagicLink: false,

          enableEmailOtp: false,
        },
      },
    }),
  ],
})
