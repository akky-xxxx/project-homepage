import { betterAuthCollections, createBetterAuthPlugin, payloadAdapter } from '@delmaredigital/payload-better-auth'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { betterAuth } from 'better-auth'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Areas } from './collections/Areas'
import { Photos } from './collections/Photos'
import { Tags } from './collections/Tags'
import { betterAuthOptions } from './shared/utilities/betterAuthOptions'
import { getBaseUrl } from './shared/utilities/getBaseUrl'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const baseUrl = getBaseUrl()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Areas, Photos, Tags],
  editor: lexicalEditor(),
  routes: {
    admin: '/',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    betterAuthCollections({
      betterAuthOptions,
      skipCollections: ['user'],
    }),
    createBetterAuthPlugin({
      createAuth: (payload) =>
        betterAuth({
          ...betterAuthOptions,
          database: payloadAdapter({ payloadClient: payload }),
          advanced: { database: { generateId: 'serial' } },
          baseURL: baseUrl,
          secret: process.env.BETTER_AUTH_SECRET,
          trustedOrigins: [baseUrl],
        }),
      admin: {
        betterAuthOptions,
        loginViewComponent:
          '@delmaredigital/payload-better-auth/components/login-passkey#LoginViewWrapperWithPasskey',
        logoutButtonComponent: '@/components/LogoutButton#LogoutButton',
        login: {
          afterLoginPath: '/',
          enablePasskey: true,
          enablePassword: false,
          enableSignUp: false,
          enableForgotPassword: false,
          enableMagicLink: false,
          enableEmailOtp: false,
        },
      },
    }),
  ],
})
