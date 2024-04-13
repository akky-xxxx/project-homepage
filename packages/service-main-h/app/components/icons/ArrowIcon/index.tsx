import { SvgSize } from "@shared/const/SvgSize"

import type { FC } from "hono/jsx"

type Props = Partial<Record<"height" | "width", number>>

export const ArrowIcon: FC<Props> = (props) => {
  const { height = SvgSize, width = SvgSize } = props

  return (
    <svg height={height} viewBox="0 0 48 48" width={width}>
      <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
      <path d="M0-.75h48v48h-48z" fill="none" />
    </svg>
  )
}
