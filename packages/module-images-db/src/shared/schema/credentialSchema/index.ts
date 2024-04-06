import { z } from "zod"

export const credentialSchema = z.object({
  auth_provider_x509_cert_url: z.string(),
  auth_uri: z.string(),
  client_email: z.string(),
  client_id: z.string(),
  client_x509_cert_url: z.string(),
  private_key: z.string(),
  private_key_id: z.string(),
  project_id: z.string(),
  token_uri: z.string(),
  type: z.string(),
  universe_domain: z.string(),
})
