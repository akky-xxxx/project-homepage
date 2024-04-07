import { Switch } from "."

import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"

type Props = ComponentProps<typeof Switch>

const DarkMode = {
  parameters: {
    darkMode: {
      current: "dark",
    },
  },
} as const

const meta: Meta<Props> = {
  component: Switch,
  args: {
    handleChange: () => {
      console.log("handleChange")
    },
    label: "label text",
  },
}

export default meta

const OffEnabled: StoryObj<Props> = {
  args: {
    isChecked: false,
  },
}

const OnEnabled: StoryObj<Props> = {
  args: {
    isChecked: true,
  },
}

const OffDisabled: StoryObj<Props> = {
  args: {
    ...OffEnabled.args,
    isDisabled: true,
  },
}

const OnDisabled: StoryObj<Props> = {
  args: {
    ...OnEnabled.args,
    isDisabled: true,
  },
}

const NoLabel: StoryObj<Props> = {
  args: {
    label: "",
  },
}

const exportByPattern = (story: Record<string, unknown>) => [
  story,
  {
    ...story,
    ...DarkMode,
  },
]

const [
  LightOffEnabled,
  DarkOffEnabled,
  LightOnEnabled,
  DarkOnEnabled,
  LightOffDisabled,
  DarkOffDisabled,
  LightOnDisabled,
  DarkOnDisabled,
  LightNoLabel,
  DarkNoLabel,
] = [OffEnabled, OnEnabled, OffDisabled, OnDisabled, NoLabel].flatMap(exportByPattern)

export {
  LightOffEnabled,
  LightOnEnabled,
  LightOffDisabled,
  LightOnDisabled,
  LightNoLabel,
  DarkOffEnabled,
  DarkOnEnabled,
  DarkOffDisabled,
  DarkOnDisabled,
  DarkNoLabel,
}
