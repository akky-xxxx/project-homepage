import { createFetch } from "ofetch"

import { ENVIRONMENT } from "@shared/const/ENVIRONMENT"

export const fetch = createFetch({
  defaults: {
    baseURL: ENVIRONMENT.CMS_HOST,
    headers: {
      authorization: `api-keys API-Key ${ENVIRONMENT.CMS_API_KEY}`,
    },
  },
})
