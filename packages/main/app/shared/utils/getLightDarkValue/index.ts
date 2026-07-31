import type { ByExterior } from "../../types/ByExterior"

export const getLightDarkValue = (colors: ByExterior) => {
  const { DARK, LIGHT } = colors
  return `light-dark(${LIGHT}, ${DARK})`
}
