import { MoonIcon } from "@icons/MoonIcon"
import { SunIcon } from "@icons/SunIcon"
import { ColorSchemaName } from "@shared/const/ColorSchemaName"
import { invisibleInputStyle } from "@shared/styles/invisibleInputStyle"

import { ClassNames } from "./const/ClassNames"
import { labelStyle } from "./styles/labelStyle"
import { switchStyle } from "./styles/switchStyle"

import type { Props } from "./types/Props"
import type { FC } from "hono/jsx"

const IconSize = 20
const { ICONS, ICON_DAY, ICON_NIGHT } = ClassNames

export const View: FC<Props> = (props) => {
  const { isChecked, handleChange } = props
  return (
    // TODO: jsx-a11y/label-has-associated-control の上書きがうまくいってない？
    //  https://zenn.dev/krntmm/articles/756fdf2f8fcdff
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label class={labelStyle}>
      <input
        checked={isChecked}
        class={invisibleInputStyle}
        name={ColorSchemaName}
        type="checkbox"
        onChange={handleChange}
      />
      <div class={switchStyle}>
        <div class={ICONS}>
          <span class={ICON_DAY}>
            <SunIcon height={IconSize} width={IconSize} />
          </span>
          <span class={ICON_NIGHT}>
            <MoonIcon height={IconSize} width={IconSize} />
          </span>
        </div>
      </div>
    </label>
  )
}
