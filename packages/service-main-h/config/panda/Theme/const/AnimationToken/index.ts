// eslint-disable-next-line import/no-extraneous-dependencies
import type { Tokens } from "@pandacss/dev"

export const AnimationToken = {
  "02": { value: "0.2s ease" },
  "03": { value: "0.3s ease" },
} as const satisfies Tokens["animations"]
