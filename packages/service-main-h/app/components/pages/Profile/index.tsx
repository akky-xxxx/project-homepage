import { Block } from "@atoms/Block"
import { ExternalLink } from "@atoms/ExternalLink"
import { Heading2 } from "@atoms/Heading2"
import { Heading3 } from "@atoms/Heading3"
import { Section } from "@atoms/Section"

import { liStyle } from "./styles/liStyle"
import { ulStyle } from "./styles/ulStyle"

import type { FC } from "hono/jsx"

export const Profile: FC = () => (
  <section>
    <Heading2>Profile</Heading2>

    <Section>
      <Block>
        <Heading3>Job</Heading3>
      </Block>

      <Block>
        <p>Web Frontend Developer</p>
      </Block>
    </Section>

    <Section>
      <Block>
        <Heading3>Github</Heading3>
      </Block>

      <Block>
        <p>
          <ExternalLink href="https://github.com/akky-xxxx">
            https://github.com/akky-xxxx
          </ExternalLink>
        </p>
      </Block>
    </Section>

    <Section>
      <Block>
        <Heading3>About this site</Heading3>
      </Block>

      <Block>
        <p>
          思いのままに作っているので、クロスブラウザとかは考慮してません
          <br />
          Chrome の最新版ならだいたい見れると思います
        </p>
      </Block>
    </Section>

    <Section>
      <Block>
        <Heading3>Hobby</Heading3>
      </Block>

      <Block>
        <ul className={ulStyle}>
          <li className={liStyle}>スノーボード</li>
          <li className={liStyle}>カメラ</li>
          <li className={liStyle}>酒</li>
        </ul>
      </Block>
    </Section>
  </section>
)
