import fs from "fs"
import path from "path"

import { CredentialSchema } from "../../schemas/CredentialSchema"

const PROJECT_NAME = "project-homepage"
const FIRST_CHARACTER = 0

const credentialsJson: unknown = JSON.parse(
  fs
    .readFileSync(
      path.resolve(
        __dirname.slice(FIRST_CHARACTER, __dirname.indexOf(PROJECT_NAME) + PROJECT_NAME.length),
        ".credentials/eloquent-figure-263607-416d7d4c72af.json",
      ),
    )
    .toString(),
)

export const CREDENTIALS = CredentialSchema.parse(credentialsJson)
