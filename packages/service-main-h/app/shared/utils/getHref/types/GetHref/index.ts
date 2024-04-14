type Props =
  | {
      id: "PhotoDetail"
      imageId: string
    }
  | {
      id: "PhotoGallery"
    }

export type GetHref = (props: Props) => string
