import { Block } from "@atoms/Block"
import { ExternalLink } from "@atoms/ExternalLink"
import { Heading2 } from "@atoms/Heading2"
import { Heading3 } from "@atoms/Heading3"
import { Section } from "@atoms/Section"

import { Skills } from "./components/Skills"
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

    <Skills />

    <Section>
      <Block>
        <Heading3>Hobby</Heading3>
      </Block>

      <Block>
        <ul class={ulStyle}>
          <li>スノーボード</li>
          <li>カメラ</li>
          <li>酒</li>
        </ul>
      </Block>
    </Section>
  </section>
)
