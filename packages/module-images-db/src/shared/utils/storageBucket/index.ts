import { Storage } from "@google-cloud/storage"

import { CREDENTIALS } from "../../const/CREDENTIALS"
import { ENVIRONMENT } from "../../const/ENVIRONMENT"

const storage = new Storage({
  credentials: CREDENTIALS,
})

export const storageBucket = storage.bucket(ENVIRONMENT.BUCKET)
