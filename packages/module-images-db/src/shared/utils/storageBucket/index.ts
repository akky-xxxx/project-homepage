import { Storage } from "@google-cloud/storage"

import { Credentials } from "../../const/Credentials"
import { Environment } from "../../const/Environment"

const storage = new Storage({
  credentials: Credentials,
})

export const storageBucket = storage.bucket(Environment.BUCKET)
