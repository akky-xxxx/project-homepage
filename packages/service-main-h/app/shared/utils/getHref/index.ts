import { unreachable } from "@shared/utils/unreachable"

import type { GetHref } from "@shared/utils/getHref/types/GetHref"

export const getHref: GetHref = (props) => {
  const { id } = props

  switch (id) {
    case "PhotoDetail": {
      const { imageId } = props
      return `/photo/${imageId}`
    }
    case "PhotoGallery": {
      return "/photo-gallery"
    }
    default: {
      return unreachable(id)
    }
  }
}
