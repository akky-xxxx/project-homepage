import {
  betterAuthCollections,
  createBetterAuthPlugin,
  payloadAdapter,
} from "@delmaredigital/payload-better-auth"
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
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

const MEGA_BYTE = 1_048_576
const MAXIMUM_UPLOAD_MEGA_BYTES = 30

export default buildConfig({
  admin: {
    user: Users.slug,

    components: {
      beforeNavLinks: ["@/components/ProductionDatabaseBanner#ProductionDatabaseBanner"],
    },

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

  // multipart の解析は access 判定より前に走る(payload の wrapInternalEndpoints)ため、
  // ここでの上限は未認証リクエストに対する防御にもなる。
  // なお Vercel Function 経由のアップロードはプラットフォーム側の 4.5MB が先に効く
  upload: {
    abortOnLimit: true,
    limits: { fileSize: MAXIMUM_UPLOAD_MEGA_BYTES * MEGA_BYTE },
  },

  plugins: [
    // トークンが無いローカル開発・CI ではローカルディスク保存のまま動かす。
    // 本番 DB に接続している場合はトークンを EnvironmentSchema が必須にしている
    vercelBlobStorage({
      enabled: ENVIRONMENT.BLOB_READ_WRITE_TOKEN != null,
      token: ENVIRONMENT.BLOB_READ_WRITE_TOKEN,

      collections: {
        [GalleryPhotos.slug]: true,
      },
    }),

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
