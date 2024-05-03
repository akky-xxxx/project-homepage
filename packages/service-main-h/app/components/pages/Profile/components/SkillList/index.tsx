import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

import type { Skill } from "@shared/types/Skill"
import type { FC } from "hono/jsx"

const { SPACE08, SPACE16 } = Spaces

type Props = {
  skills: Skill[]
}

export const SkillList: FC<Props> = (props) => {
  const { skills } = props

  return (
    <ul class={rootStyle}>
      {skills.map((skill) => {
        const { level, name } = skill
        return (
          <li>
            <div class={divStyle}>
              <span>{name}</span>
              <meter
                class={meterStyle}
                high={4}
                low={2}
                max={5}
                min={0}
                optimum={5}
                value={level}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

const rootStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACE16}rem;
`

const divStyle = css`
  align-items: center;
  display: flex;
  gap: ${SPACE08}rem;
`

const meterStyle = css`
  height: 20px;
`
