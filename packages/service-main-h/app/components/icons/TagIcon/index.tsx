import { SvgSize } from "@shared/const/SvgSize"

import type { FC } from "hono/jsx"

type Props = Partial<Record<"height" | "width", number>>

export const TagIcon: FC<Props> = (props) => {
  const { height = SvgSize, width = SvgSize } = props

  return (
    <svg height={height} viewBox="0 0 448 512" width={width}>
      <path d="M0 60c0-15.46 12.54-28 28-28h186.8c12.76 0 30.58 7.381 39.6 16.4l177.2 177.2c21.87 21.87 21.87 57.33-.0008 79.2l-158.8 158.8c-21.87 21.87-57.33 21.87-79.19-.0017l-177.2-177.2C7.381 277.4 0 259.6 0 246.8V60zM80 144c0 17.68 14.33 32 32 32s32-14.32 32-32s-14.33-32-32-32S80 126.3 80 144z" />
    </svg>
  )
}
