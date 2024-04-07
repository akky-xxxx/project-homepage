import { View } from "./View"

import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"

type Props = ComponentProps<typeof View>

const meta: Meta<Props> = {
  component: View,
}

export default meta

export const Default: StoryObj<Props> = {}
