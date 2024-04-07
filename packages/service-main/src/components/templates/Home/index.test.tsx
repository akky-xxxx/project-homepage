import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"

import * as stories from "./index.stories"

const { Default } = composeStories(stories)

// TODO: 仮テスト
describe("Default", () => {
  it("仮テスト", () => {
    const renderResult = render(<Default />)
    expect(renderResult.getByText("Home")).toBeTruthy()
  })
})
