import { PasskeysField as PasskeysField_b43647e48ab3e028b782c335a88830d2 } from '@delmaredigital/payload-better-auth/components/passkey'
import { LogoutButton as LogoutButton_db9ac62598c46d0f1db201f6af05442e } from '@/components/LogoutButton'
import { BeforeLogin as BeforeLogin_aa8e4427b70b37c7820895ace344eb78 } from '@delmaredigital/payload-better-auth/components'
import { ProductionDatabaseBanner as ProductionDatabaseBanner_d4631c17d6ffb66f51dce41b66596eb8 } from '@/components/ProductionDatabaseBanner'
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e } from '@payloadcms/storage-vercel-blob/client'
import { LoginViewWrapperWithPasskey as LoginViewWrapperWithPasskey_32122ff130abf1886fc6ac22c8c20952 } from '@delmaredigital/payload-better-auth/components/login-passkey'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'

/** @type import('payload').ImportMap */
export const importMap = {
  "@delmaredigital/payload-better-auth/components/passkey#PasskeysField": PasskeysField_b43647e48ab3e028b782c335a88830d2,
  "@/components/LogoutButton#LogoutButton": LogoutButton_db9ac62598c46d0f1db201f6af05442e,
  "@delmaredigital/payload-better-auth/components#BeforeLogin": BeforeLogin_aa8e4427b70b37c7820895ace344eb78,
  "@/components/ProductionDatabaseBanner#ProductionDatabaseBanner": ProductionDatabaseBanner_d4631c17d6ffb66f51dce41b66596eb8,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e,
  "@delmaredigital/payload-better-auth/components/login-passkey#LoginViewWrapperWithPasskey": LoginViewWrapperWithPasskey_32122ff130abf1886fc6ac22c8c20952,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1
}
