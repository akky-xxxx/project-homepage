import { Block } from "@atoms/Block"
import { ExternalLink } from "@atoms/ExternalLink"
import { Heading2 } from "@atoms/Heading2"
import { Heading3 } from "@atoms/Heading3"
import { Heading4 } from "@atoms/Heading4"
import { Section } from "@atoms/Section"

import { SkillList } from "./components/SkillList"
import { Frameworks } from "./const/Frameworks"
import { Infrastructures } from "./const/Infrastructures"
import { Languages } from "./const/Languages"
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
        <Heading3>Skills</Heading3>
      </Block>

      <Section>
        <Block>
          <Heading4>Languages</Heading4>
        </Block>
        <Block>
          <SkillList skills={Languages} />
        </Block>
      </Section>

      <Section>
        <Block>
          <Heading4>Libraries / Frameworks</Heading4>
        </Block>
        <Block>
          <SkillList skills={Frameworks} />
        </Block>
      </Section>

      <Section>
        <Block>
          <Heading4>Infrastructures</Heading4>
        </Block>
        <Block>
          <SkillList skills={Infrastructures} />
        </Block>
      </Section>
    </Section>

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
