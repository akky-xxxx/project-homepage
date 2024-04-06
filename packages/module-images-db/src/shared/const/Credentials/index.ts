import fs from "fs"
import path from "path"

import { credentialSchema } from "../../schema/credentialSchema"

const ProjectName = "project-my-homepage"
const FirstCharacter = 0

const credentialsJson: unknown = JSON.parse(
  fs
    .readFileSync(
      path.resolve(
        __dirname.slice(FirstCharacter, __dirname.indexOf(ProjectName) + ProjectName.length),
        ".credentials/eloquent-figure-263607-416d7d4c72af.json",
      ),
    )
    .toString(),
)

export const Credentials = credentialSchema.parse(credentialsJson)
