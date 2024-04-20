// eslint-disable-next-line import/no-extraneous-dependencies
import type { Tokens } from "@pandacss/dev"

export const SizeToken = {
  menuIcon: {
    value: "45px",
  },
  thumbnail: {
    width: {
      value: "30rem",
    },
  },
} as const satisfies Tokens["sizes"]
