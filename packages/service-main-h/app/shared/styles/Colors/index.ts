import type { ByExterior } from "../../types/ByExterior"
import type { Color } from "../../types/Color"

type ColorsTypeKey = Uppercase<`COLOR_${number | string}`>
type ColorsType = Record<ColorsTypeKey, Color> | Record<Uppercase<string>, ByExterior>

const COLOR_303030 = "#303030"
const COLOR_3C3C3C = "#3C3C3C"
const COLOR_663030 = "#663030"
const COLOR_AA0000 = "#AA0000"
const COLOR_E0E0E0 = "#E0E0E0"
const COLOR_FAFAFA = "#FAFAFA"
const COLOR_FF0000 = "#FF0000"
const COLOR_FFE0E0 = "#FFE0E0"

const PRIMARY_BACKGROUND = {
  DARK: COLOR_303030,
  LIGHT: COLOR_FAFAFA,
} as const satisfies ByExterior

const SECONDARY_BACKGROUND = {
  DARK: COLOR_3C3C3C,
  LIGHT: COLOR_E0E0E0,
} as const satisfies ByExterior

const PRIMARY_COLOR = {
  DARK: COLOR_FAFAFA,
  LIGHT: COLOR_303030,
} as const satisfies ByExterior

const PRIMARY_RED = {
  DARK: COLOR_AA0000,
  LIGHT: COLOR_FF0000,
} as const satisfies ByExterior

export const Colors = {
  COLOR_303030,
  COLOR_3C3C3C,
  COLOR_663030,
  COLOR_AA0000,
  COLOR_E0E0E0,
  COLOR_FAFAFA,
  COLOR_FF0000,
  COLOR_FFE0E0,

  PRIMARY_BACKGROUND,
  PRIMARY_COLOR,
  PRIMARY_RED,

  SECONDARY_BACKGROUND,
} as const satisfies ColorsType
