import { Block } from "@atoms/Block"
import { ContentsWidthBlock } from "@atoms/ContentsWidthBlock"
import { Heading2 } from "@atoms/Heading2"

import type { FC } from "hono/jsx"

export const About: FC = () => (
  <section>
    <Heading2>About</Heading2>

    <Block>
      <ContentsWidthBlock>
        <p>
          思いのままに作っているので、クロスブラウザとかは考慮してません
          <br />
          Chrome の最新版ならだいたい見れると思います
        </p>
      </ContentsWidthBlock>
    </Block>
  </section>
)
