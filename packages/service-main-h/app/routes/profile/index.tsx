import { createRoute } from "honox/factory"

import { Profile } from "../../components/pages/Profile"

export default createRoute((c) => c.render(<Profile />, { title: "Profile" }))
