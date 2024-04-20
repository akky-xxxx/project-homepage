// eslint-disable-next-line import/no-extraneous-dependencies
import type { Tokens } from "@pandacss/dev"

export const ZIndexToken = {
  sideColumn: {
    label: {
      value: "20",
    },
    navigation: {
      value: "10",
    },
  },
} as const satisfies Tokens["zIndex"]
