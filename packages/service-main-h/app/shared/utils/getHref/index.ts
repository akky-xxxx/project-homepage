import { unreachable } from "@shared/utils/unreachable"

import { getPhotoGalleryHref } from "./modules/getPhotoGalleryHref"

import type { GetHref } from "@shared/utils/getHref/types/GetHref"

// eslint-disable-next-line max-statements, complexity
export const getHref: GetHref = (props) => {
  const { id } = props

  switch (id) {
    case "About": {
      return "/about"
    }
    case "PhotoDetail": {
      const { imageId } = props
      return `/photo/${imageId}`
    }
    case "PhotoLocationDetail": {
      const { location } = props
      return `/photo-gallery?location=${encodeURIComponent(location)}`
    }
    case "PhotoDateDetail": {
      const { date } = props
      return `/photo-gallery?date=${encodeURIComponent(date)}`
    }
    case "PhotoTagDetail": {
      const { tag } = props
      const query = tag.map((record) => `tag=${encodeURIComponent(record)}}`).join("&")
      return `/photo-gallery?tag=${query}`
    }
    case "PhotoGallery": {
      return getPhotoGalleryHref(props)
    }
    case "Profile": {
      return "/profile"
    }
    case "Search": {
      return "/search"
    }
    default: {
      return unreachable(id)
    }
  }
}
