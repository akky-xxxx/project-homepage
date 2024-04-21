import { createRoute } from "honox/factory"

import { Profile } from "../../components/pages/Profile"

export default createRoute((c) =>
  c.render(<Profile />, { description: "akky-xxxx - Web Frontend Developer", title: "Profile" }),
)
