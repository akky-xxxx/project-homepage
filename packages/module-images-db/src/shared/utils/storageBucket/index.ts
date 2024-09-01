import { Storage } from "@google-cloud/storage"

import { CREDENTIALS } from "../../const/CREDENTIALS"
import { Environment } from "../../const/Environment"

const storage = new Storage({
  credentials: CREDENTIALS,
})

export const storageBucket = storage.bucket(Environment.BUCKET)
