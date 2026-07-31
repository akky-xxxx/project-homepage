import { Locations } from "module-images-db/src"

import { Block } from "@atoms/Block"
import { Heading5 } from "@atoms/Heading5"
import { TextWithIcon } from "@atoms/TextWithIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { sitemapUlStyle } from "@shared/styles/sitemapUlStyle"
import { getHref } from "@shared/utils/getHref"

import type { FC } from "hono/jsx"

export const Location: FC = () => (
  <Block>
    <section>
      <Heading5>
        <TextWithIcon icon={<LocationIcon />}>Location</TextWithIcon>
      </Heading5>

      <ul className={sitemapUlStyle}>
        {Locations.map((location) => (
          <li key={location}>
            <a href={getHref({ id: "PhotoLocationDetail", location })}>{location}</a>
          </li>
        ))}
      </ul>
    </section>
  </Block>
)
