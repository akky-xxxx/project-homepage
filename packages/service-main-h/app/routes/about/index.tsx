import { createRoute } from "honox/factory"

import { About } from "../../components/pages/About"

export default createRoute((c) =>
  c.render(<About />, {
    description: "Web Frontend Developer の akky-xxxx が思いのまま作ってるサイトです",
    title: "About",
  }),
)
