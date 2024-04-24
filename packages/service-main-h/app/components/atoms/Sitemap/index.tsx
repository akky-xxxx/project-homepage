import { format } from "@formkit/tempo"
import { Fragment } from "hono/jsx"
import { Locations, Months, Tags } from "module-images-db/src"

import { Block } from "@atoms/Block"
import { Heading4 } from "@atoms/Heading4"
import { Heading5 } from "@atoms/Heading5"
import { TempoFormats } from "@shared/const/TempoFormats"
import { getHref } from "@shared/utils/getHref"

import { ulStyle } from "./styles/ulStyle"

import type { FC } from "hono/jsx"

export const Sitemap: FC = () => (
  <Fragment>
    <section>
      <Heading4>Common</Heading4>

      <Block>
        <ul class={ulStyle}>
          <li>
            <a href={getHref({ id: "Profile" })}>Profile</a>
          </li>
          <li>
            <a href={getHref({ id: "About" })}>About</a>
          </li>
        </ul>
      </Block>
    </section>

    <section>
      <Block>
        <Heading4>Photo Gallery</Heading4>

        <Block>
          <section>
            <Heading5>Location</Heading5>

            <ul class={ulStyle}>
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
          <Heading5>Dates</Heading5>

          <ul class={ulStyle}>
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
          <Heading5>Tags</Heading5>

          <ul class={ulStyle}>
            {Tags.map((tag) => (
              <li key={tag}>
                <a href={getHref({ id: "PhotoTagDetail", tag })}>{tag}</a>
              </li>
            ))}
          </ul>
        </section>
      </Block>
    </section>
  </Fragment>
)
