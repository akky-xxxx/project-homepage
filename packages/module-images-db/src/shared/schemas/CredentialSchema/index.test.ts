import { describe, expect, it } from "bun:test"

import { CredentialSchema } from "."

/* eslint-disable @typescript-eslint/naming-convention */
const VALID_CREDENTIAL = {
  auth_provider_x509_cert_url: "https://example.com/cert",
  auth_uri: "https://example.com/auth",
  client_email: "example@example.com",
  client_id: "client-id",
  client_x509_cert_url: "https://example.com/client-cert",
  private_key: "private-key",
  private_key_id: "private-key-id",
  project_id: "project-id",
  token_uri: "https://example.com/token",
  type: "service_account",
  universe_domain: "googleapis.com",
}
/* eslint-enable @typescript-eslint/naming-convention */

const KEYS: Array<keyof typeof VALID_CREDENTIAL> = [
  "auth_provider_x509_cert_url",
  "auth_uri",
  "client_email",
  "client_id",
  "client_x509_cert_url",
  "private_key",
  "private_key_id",
  "project_id",
  "token_uri",
  "type",
  "universe_domain",
]

const omit = (key: keyof typeof VALID_CREDENTIAL) => Object.fromEntries(
  Object.entries(VALID_CREDENTIAL).filter(([entryKey]) => entryKey !== key),
)

describe("CredentialSchema", () => {
  describe("success", () => {
    it("必須のフィールドが全て string の場合、パースに成功する", () => {
      expect(CredentialSchema.parse(VALID_CREDENTIAL)).toStrictEqual(VALID_CREDENTIAL)
    })
  })

  describe("failure", () => {
    it.each(KEYS)("%s が欠落している場合、エラーを投げる", (key) => {
      expect(() => CredentialSchema.parse(omit(key))).toThrow()
    })
  })
})
