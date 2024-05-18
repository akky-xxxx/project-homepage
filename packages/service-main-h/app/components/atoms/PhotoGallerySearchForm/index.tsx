import { format } from "@formkit/tempo"
import { Fragment } from "hono/jsx"
import { Locations, Months, Tags } from "module-images-db/src"

import { FormBase } from "@atoms/PhotoGallerySearchForm/components/FormBase"
import { ShowClasses } from "@shared/const/ShowClasses"
import { TempoFormats } from "@shared/const/TempoFormats"

import { ConditionList } from "./components/ConditionList"
import { ConditionSelect } from "./components/ConditionSelect"

import type { ConditionComponentProps } from "./types/ConditionComponentProps"
import type { FC } from "hono/jsx"

const locationConditionData = {
  items: Locations.map((location) => ({
    display: location,
    value: location,
  })),
  name: "location",
} as const satisfies ConditionComponentProps

const monthConditionData = {
  items: Months.map((month) => ({
    display: format(month, TempoFormats.YYYY年M月),
    value: month,
  })),
  name: "date",
} as const satisfies ConditionComponentProps

const tagConditionData = {
  isMultiple: true,
  items: Tags.map((tag) => ({
    display: tag,
    value: tag,
  })),
  name: "tag",
} as const satisfies ConditionComponentProps

export const PhotoGallerySearchForm: FC = () => (
  <Fragment>
    <div class={ShowClasses.PC}>
      <FormBase
        locationCondition={<ConditionList {...locationConditionData} />}
        monthCondition={<ConditionList {...monthConditionData} />}
        tagCondition={<ConditionList {...tagConditionData} />}
      />
    </div>
    <div class={ShowClasses.SP}>
      <FormBase
        locationCondition={<ConditionSelect {...locationConditionData} />}
        monthCondition={<ConditionSelect {...monthConditionData} />}
        tagCondition={<ConditionSelect {...tagConditionData} />}
      />
    </div>
  </Fragment>
)
