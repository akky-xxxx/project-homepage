import { unreachable } from "@shared/utils/unreachable"

import type { GetHref } from "@shared/utils/getHref/types/GetHref"

// eslint-disable-next-line max-statements, complexity
export const getHref: GetHref = (props) => {
  const { id } = props

  switch (id) {
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
      return `/photo-gallery?tag=${encodeURIComponent(tag)}`
    }
    case "PhotoGallery": {
      return "/photo-gallery"
    }
    default: {
      return unreachable(id)
    }
  }
}
