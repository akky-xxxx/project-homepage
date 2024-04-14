import { getCookie } from "hono/cookie"
import { createRoute } from "honox/factory"
import { ImagesDataBase } from "module-images-db/src"
import { pick } from "remeda"

import { CookieKeys } from "@shared/const/CookieKeys"
import { getExteriorMode } from "@shared/utils/getExteriorMode"

import { PhotoGallery } from "../../components/pages/PhotoGallery"
import { getFilteredImages } from "../../modules/photoGallery/getFilteredImages"

import type { PhotoGalleryFilterKey } from "@shared/types/PhotoGalleryFilterKey"

const filterPickKeys = ["date", "location", "tag"] satisfies PhotoGalleryFilterKey[]

export default createRoute((c) => {
  const exteriorMode = getExteriorMode(getCookie(c, CookieKeys.ExteriorMode))
  const filterQueries = pick(c.req.query(), filterPickKeys)
  const images = getFilteredImages(filterQueries)(ImagesDataBase)
  return c.render(<PhotoGallery images={images} />, {
    exteriorMode,
    title: "Photo Gallery",
  })
})
