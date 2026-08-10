import { deleteUserByEmail } from "../deleteUserByEmail"
import { testUser } from "../testUser"

export const cleanupTestUser = async (): Promise<void> => {
  await deleteUserByEmail(testUser.email)
}
