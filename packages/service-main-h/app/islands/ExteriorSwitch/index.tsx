import { MoonIcon } from "@icons/MoonIcon"
import { SunIcon } from "@icons/SunIcon"
import { ColorSchemaName } from "@shared/const/ColorSchemaName"

import { ClassNames } from "./const/ClassNames"
import { inputStyle } from "./styles/inputStyle"
import { labelStyle } from "./styles/labelStyle"
import { switchStyle } from "./styles/switchStyle"

import type { FC } from "hono/jsx"

const IconSize = 20
const { ICONS, ICON_DAY, ICON_NIGHT } = ClassNames

export const ExteriorSwitch: FC = () => (
  // TODO: jsx-a11y/label-has-associated-control の上書きがうまくいってない？
  //  https://zenn.dev/krntmm/articles/756fdf2f8fcdff
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={labelStyle}>
    <input className={inputStyle} name={ColorSchemaName} type="checkbox" />
    <div className={switchStyle}>
      <div className={ICONS}>
        <span className={ICON_DAY}>
          <SunIcon height={IconSize} width={IconSize} />
        </span>
        <span className={ICON_NIGHT}>
          <MoonIcon height={IconSize} width={IconSize} />
        </span>
      </div>
    </div>
  </label>
)
