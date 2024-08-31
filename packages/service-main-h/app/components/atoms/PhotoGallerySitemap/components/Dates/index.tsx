import { format } from "@formkit/tempo"
import { Months } from "module-images-db/src"

import { Block } from "@atoms/Block"
import { Heading5 } from "@atoms/Heading5"
import { TextWithIcon } from "@atoms/TextWithIcon"
import { DateIcon } from "@icons/DateIcon"
import { TempoFormats } from "@shared/const/TempoFormats"
import { sitemapUlStyle } from "@shared/styles/sitemapUlStyle"
import { getHref } from "@shared/utils/getHref"

import type { FC } from "hono/jsx"

export const Dates: FC = () => (
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
)
