import { ImagesDataBase } from "module-images-db/src"

import { Images } from "@atoms/Images"

import type { FC } from "hono/jsx"

export const PhotoGallery: FC = () => (
  <div>
    <h2>Photo Gallery</h2>
    <Images images={ImagesDataBase} />
  </div>
)
