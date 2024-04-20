import { AnimationToken } from "./const/AnimationToken"
import { ColorToken } from "./const/ColorToken"
import { SizeToken } from "./const/SizeToken"
import { SpaceToken } from "./const/SpaceToken"
import { ZIndexToken } from "./const/ZIndexToken"

// eslint-disable-next-line import/no-extraneous-dependencies
import type { Config } from "@pandacss/dev"

export const Theme = {
  tokens: {
    animations: AnimationToken,
    colors: ColorToken,
    sizes: SizeToken,
    spacing: SpaceToken,
    zIndex: ZIndexToken,
  },
} as const satisfies Config["theme"]
