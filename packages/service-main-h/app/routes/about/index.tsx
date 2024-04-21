import { createRoute } from "honox/factory"

import { About } from "../../components/pages/About"

export default createRoute((c) => c.render(<About />, { title: "About" }))
