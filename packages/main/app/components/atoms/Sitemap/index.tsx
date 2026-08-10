import { Fragment } from "hono/jsx"

import { Block } from "@atoms/Block"
import { Heading4 } from "@atoms/Heading4"
import { PhotoGallerySitemap } from "@atoms/PhotoGallerySitemap"
import { TextWithIcon } from "@atoms/TextWithIcon"
import { AboutIcon } from "@icons/AboutIcon"
import { sitemapUlStyle } from "@shared/styles/sitemapUlStyle"
import { getHref } from "@shared/utils/getHref"

import type { FC } from "hono/jsx"

export const Sitemap: FC = () => (
  <Fragment>
    <section>
      <Heading4>
        <TextWithIcon icon={<AboutIcon />}>Common</TextWithIcon>
      </Heading4>

      <Block>
        <ul class={sitemapUlStyle}>
          <li>
            <a href={getHref({ id: "Profile" })}>Profile</a>
          </li>
          <li>
            <a href={getHref({ id: "About" })}>About</a>
          </li>
        </ul>
      </Block>
    </section>

    <PhotoGallerySitemap />
  </Fragment>
)
