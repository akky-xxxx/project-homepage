import { Block } from "@atoms/Block"
import { Heading2 } from "@atoms/Heading2"
import { PhotoGallerySearchForm } from "@atoms/PhotoGallerySearchForm"

import type { FC } from "hono/jsx"

export const Search: FC = () => (
  <section>
    <Heading2>Search</Heading2>

    <Block>
      <PhotoGallerySearchForm />
    </Block>
  </section>
)
