// eslint-disable-next-line import/no-extraneous-dependencies
import type { Tokens } from "@pandacss/dev"

export const SpaceToken = {
  s04: { value: "0.4rem" },
  s08: { value: "0.8rem" },
  s12: { value: "1.2rem" },
  s16: { value: "1.6rem" },
  s20: { value: "2rem" },
  s32: { value: "3.2rem" },
} as const satisfies Tokens["spacing"]
