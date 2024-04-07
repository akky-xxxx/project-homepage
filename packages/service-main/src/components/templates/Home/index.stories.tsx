import { Home } from "./index"

import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"

type Props = ComponentProps<typeof Home>

const meta: Meta<Props> = {
  component: Home,
}

export default meta

export const Default: StoryObj<Props> = {}
