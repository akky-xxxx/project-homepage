import { createRoute } from "honox/factory"

import { Search } from "../../components/pages/Search"

export default createRoute((c) => c.render(<Search />, { description: "写真の検索", title: "Search" }))
