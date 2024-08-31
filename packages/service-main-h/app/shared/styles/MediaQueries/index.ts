const DeviceBreakpoint = "768"

export const MediaQueries = {
  MEDIA_ONLY_HOVER: "@media (hover: hover) and (pointer: fine)",
  MEDIA_PC: `@media (width > ${DeviceBreakpoint}px)`,
  MEDIA_SP: `@media (width <= ${DeviceBreakpoint}px)`,
} as const
