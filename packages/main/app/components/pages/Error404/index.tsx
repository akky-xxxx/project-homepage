import { Block } from "@atoms/Block"
import { ContentsWidthBlock } from "@atoms/ContentsWidthBlock"
import { Heading2 } from "@atoms/Heading2"
import { Heading3 } from "@atoms/Heading3"
import { Section } from "@atoms/Section"
import { Sitemap } from "@atoms/Sitemap"

import type { FC } from "hono/jsx"

export const Error404: FC = () => (
  <section>
    <Heading2>404 - Not Found</Heading2>

    <Block>
      <ContentsWidthBlock>
        <p>ページが見つかりませんでした</p>
      </ContentsWidthBlock>
    </Block>

    <Section>
      <Block>
        <Heading3>Site map</Heading3>
      </Block>

      <Block>
        <ContentsWidthBlock>
          <Sitemap />
        </ContentsWidthBlock>
      </Block>
    </Section>
  </section>
)
