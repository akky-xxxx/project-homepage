/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

import { RootPage, generatePageMetadata } from "@payloadcms/next/views"

import config from "@payload-config"

import { importMap } from "../importMap"

import type { Metadata } from "next"

type Arguments = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<Record<string, string[] | string>>
}

export const generateMetadata = ({ params, searchParams }: Arguments): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Arguments) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
