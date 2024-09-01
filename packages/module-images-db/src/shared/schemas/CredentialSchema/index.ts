import { z } from "zod"

/* eslint-disable sonarjs/todo-tag */
// TODO: Upper camel を許容後にコメント消す
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CredentialSchema = z.object({
  // credential の都合のため
  /* eslint-disable @typescript-eslint/naming-convention */
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
  /* eslint-enable @typescript-eslint/naming-convention */
})
