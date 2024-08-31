import { Tags as TagsData } from "module-images-db/src"

import { Block } from "@atoms/Block"
import { Heading5 } from "@atoms/Heading5"
import { TextWithIcon } from "@atoms/TextWithIcon"
import { TagIcon } from "@icons/TagIcon"
import { sitemapUlStyle } from "@shared/styles/sitemapUlStyle"
import { getHref } from "@shared/utils/getHref"

import type { FC } from "hono/jsx"

export const Tags: FC = () => (
  <Block>
    <section>
      <Heading5>
        <TextWithIcon icon={<TagIcon />}>Tags</TextWithIcon>
      </Heading5>

      <ul className={sitemapUlStyle}>
        {TagsData.map((tag) => (
          <li key={tag}>
            <a href={getHref({ id: "PhotoTagDetail", tag: [tag] })}>{tag}</a>
          </li>
        ))}
      </ul>
    </section>
  </Block>
)
