import { Block } from "@atoms/Block"
import { Heading3 } from "@atoms/Heading3"
import { Heading4 } from "@atoms/Heading4"
import { Section } from "@atoms/Section"

import { SkillList } from "./components/SkillList"
import { Frameworks } from "../../const/Frameworks"
import { Infrastructures } from "../../const/Infrastructures"
import { Languages } from "../../const/Languages"

import type { FC } from "hono/jsx"

export const Skills: FC = () => (
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
)
