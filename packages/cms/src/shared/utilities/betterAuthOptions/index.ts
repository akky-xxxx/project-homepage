import { passkey } from '@better-auth/passkey'
import type { BetterAuthOptions } from 'better-auth'

import { getBaseUrl } from '../getBaseUrl'

const rpID = new URL(getBaseUrl()).hostname

export const betterAuthOptions: Partial<BetterAuthOptions> = {
  user: {
    additionalFields: {
      // input: false により role はサーバー側専用となり、サインアップ時にクライアントから
      // 指定できなくなる(権限昇格対策)。値は firstUserAdminHooks が付与する。
      role: { type: 'string', defaultValue: 'user', input: false },
    },
  },
  emailAndPassword: { enabled: false },
  plugins: [
    passkey({
      rpID,
      rpName: 'project-homepage CMS',
    }),
  ],
}
