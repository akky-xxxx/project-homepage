type Props =
  | {
      id: "PhotoDateDetail"
      date: string
    }
  | {
      id: "PhotoDetail"
      imageId: string
    }
  | {
      id: "PhotoGallery"
    }
  | {
      id: "PhotoLocationDetail"
      location: string
    }
  | {
      id: "PhotoTagDetail"
      tag: string
    }

export type GetHref = (props: Props) => string
