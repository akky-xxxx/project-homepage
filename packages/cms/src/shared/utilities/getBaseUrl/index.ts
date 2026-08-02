import { ENVIRONMENT } from "@/shared/const/ENVIRONMENT"

export const getBaseUrl = (): string => {
  const { BETTER_AUTH_URL, VERCEL_URL } = ENVIRONMENT

  if (BETTER_AUTH_URL != null && BETTER_AUTH_URL !== "") {
    return BETTER_AUTH_URL
  }

  if (VERCEL_URL != null && VERCEL_URL !== "") {
    return `https://${VERCEL_URL}`
  }

  return "http://localhost:3000"
}
