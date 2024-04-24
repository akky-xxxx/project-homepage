import { format } from "@formkit/tempo"
import { Locations, Months, Tags } from "module-images-db/src"

import { Block } from "@atoms/Block"
import { Heading4 } from "@atoms/Heading4"
import { Heading5 } from "@atoms/Heading5"
import { TextWithIcon } from "@atoms/TextWithIcon"
import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { PhotoIcon } from "@icons/PhotoIcon"
import { TagIcon } from "@icons/TagIcon"
import { TempoFormats } from "@shared/const/TempoFormats"
import { getHref } from "@shared/utils/getHref"
import { sitemapUlStyle } from "app/shared/styles/sitemapUlStyle"

import type { FC } from "hono/jsx"

export const PhotoGallerySitemap: FC = () => (
  <section>
    <Block>
      <Heading4>
        <TextWithIcon icon={<PhotoIcon />}>Photo Gallery</TextWithIcon>
      </Heading4>

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
    </Block>

    <Block>
      <section>
        <Heading5>
          <TextWithIcon icon={<DateIcon />}>Dates</TextWithIcon>
        </Heading5>

        <ul className={sitemapUlStyle}>
          {Months.map((month) => (
            <li key={month}>
              <a href={getHref({ date: month, id: "PhotoDateDetail" })}>
                {format(month, TempoFormats.YYYY年M月)}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Block>

    <Block>
      <section>
        <Heading5>
          <TextWithIcon icon={<TagIcon />}>Tags</TextWithIcon>
        </Heading5>

        <ul className={sitemapUlStyle}>
          {Tags.map((tag) => (
            <li key={tag}>
              <a href={getHref({ id: "PhotoTagDetail", tag })}>{tag}</a>
            </li>
          ))}
        </ul>
      </section>
    </Block>
  </section>
)
