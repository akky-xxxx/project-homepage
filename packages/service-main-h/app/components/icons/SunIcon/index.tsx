import { SvgSize } from "@shared/const/SvgSize"

import type { FC } from "hono/jsx"

type Props = Partial<Record<"height" | "width", number>>

export const SunIcon: FC<Props> = (props) => {
  const { height = SvgSize, width = SvgSize } = props

  return (
    <svg height={height} viewBox="0 0 16 16" width={width}>
      <circle cx="8.5" cy="7.5" r="4.5" />
      <rect height="2" width="1" x="8" />
      <rect height="2" width="1" x="8" y="13" />
      <rect height="1" width="2" x="14" y="7" />
      <rect height="1" width="2" x="1" y="7" />
      <rect
        height="2"
        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.7175 12.8033)"
        width="1"
        x="12.596"
        y="11.096"
      />
      <rect
        height="2"
        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.9099 3.6109)"
        width="1"
        x="3.404"
        y="1.904"
      />
      <rect
        height="1"
        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.4099 6.3033)"
        width="2"
        x="2.904"
        y="11.596"
      />
      <rect
        height="1"
        transform="matrix(0.7071 -0.7071 0.7071 0.7071 1.7823 10.1107)"
        width="2"
        x="12.096"
        y="2.404"
      />
    </svg>
  )
}
