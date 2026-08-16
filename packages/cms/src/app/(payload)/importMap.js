import { ChangePasswordField as ChangePasswordField_a3d511bc4c9170e9d55ec5c0236dee75 } from '@/components/ChangePasswordField'
import { TwoFactorField as TwoFactorField_aa8e4427b70b37c7820895ace344eb78 } from '@delmaredigital/payload-better-auth/components'
import { PasskeysField as PasskeysField_b43647e48ab3e028b782c335a88830d2 } from '@delmaredigital/payload-better-auth/components/passkey'
import { LogoutButton as LogoutButton_db9ac62598c46d0f1db201f6af05442e } from '@/components/LogoutButton'
import { BeforeLogin as BeforeLogin_aa8e4427b70b37c7820895ace344eb78 } from '@delmaredigital/payload-better-auth/components'
import { ProductionDatabaseBanner as ProductionDatabaseBanner_d4631c17d6ffb66f51dce41b66596eb8 } from '@/components/ProductionDatabaseBanner'
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e } from '@payloadcms/storage-vercel-blob/client'
import { LoginView as LoginView_13ed31aaa4a517932adbf65b735fa4b1 } from '@/components/LoginView'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'

/** @type import('payload').ImportMap */
export const importMap = {
  "@/components/ChangePasswordField#ChangePasswordField": ChangePasswordField_a3d511bc4c9170e9d55ec5c0236dee75,
  "@delmaredigital/payload-better-auth/components#TwoFactorField": TwoFactorField_aa8e4427b70b37c7820895ace344eb78,
  "@delmaredigital/payload-better-auth/components/passkey#PasskeysField": PasskeysField_b43647e48ab3e028b782c335a88830d2,
  "@/components/LogoutButton#LogoutButton": LogoutButton_db9ac62598c46d0f1db201f6af05442e,
  "@delmaredigital/payload-better-auth/components#BeforeLogin": BeforeLogin_aa8e4427b70b37c7820895ace344eb78,
  "@/components/ProductionDatabaseBanner#ProductionDatabaseBanner": ProductionDatabaseBanner_d4631c17d6ffb66f51dce41b66596eb8,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e,
  "@/components/LoginView#LoginView": LoginView_13ed31aaa4a517932adbf65b735fa4b1,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1
}
