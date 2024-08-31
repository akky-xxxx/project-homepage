import { Block } from "@atoms/Block"
import { Heading4 } from "@atoms/Heading4"
import { Dates } from "@atoms/PhotoGallerySitemap/components/Dates"
import { Location } from "@atoms/PhotoGallerySitemap/components/Location"
import { Tags } from "@atoms/PhotoGallerySitemap/components/Tags"
import { TextWithIcon } from "@atoms/TextWithIcon"
import { PhotoIcon } from "@icons/PhotoIcon"

import type { FC } from "hono/jsx"

export const PhotoGallerySitemap: FC = () => (
  <section>
    <Block>
      <Heading4>
        <TextWithIcon icon={<PhotoIcon />}>Photo Gallery</TextWithIcon>
      </Heading4>

      <Location />
    </Block>

    <Dates />

    <Tags />
  </section>
)
