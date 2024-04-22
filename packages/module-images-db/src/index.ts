/* eslint-disable sonarjs/no-duplicate-string, strict-check/forbidden-multiple-named-exports, max-lines */
import { sortImageDataBase } from "./modules/sortImageDataBase"
import { sortTags } from "./modules/sortTags"

import type { ImagesDataBaseRecord } from "./types/ImagesDataBaseRecord"

const ImagesDataBaseOrigin = [
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0006-d7da057e-2858-46de-b909-c835f82eb611",
    tags: ["紅葉"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0038-e5bc8520-76e0-4e70-b292-6ab4d6b44bff",
    tags: ["川", "大噴湯"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0077-6c183805-7877-43a0-9877-9f895b368ac2",
    tags: ["川", "紅葉"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0165-472a61b6-7d08-4970-9d6c-006e3ddd867d",
    tags: ["山", "空", "紅葉"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0170-24b46a21-c306-45ac-813a-e868c3539859",
    tags: ["山", "空", "紅葉"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0178-2efcf5bb-f709-43ee-bd67-673ad15e56b8",
    tags: ["星", "空"],
  },
  {
    area: "秋田県",
    date: "2018-11-03",
    imageId: "_DSC0224-63cbba8b-597d-413f-8a0c-915fbaccc7ac",
    tags: ["山", "鳥海山"],
  },
  {
    area: "秋田県",
    date: "2018-11-03",
    imageId: "_DSC0257-e3bc079a-2001-464e-8394-6936c3465f6c",
    tags: ["滝", "紅葉"],
  },
  {
    area: "秋田県",
    date: "2018-11-03",
    imageId: "_DSC0366-aaf427ae-a46a-4d4f-aa93-9c8ca5478074",
    tags: ["夕日", "空", "海"],
  },
  {
    area: "秋田県",
    date: "2018-11-03",
    imageId: "_DSC0310-8fb72d42-8845-453f-b534-fe486e329637",
    tags: ["すすき"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9313-7197d278-d509-4da9-8b57-4b22aa599877",
    tags: ["冬", "雪", "小樽", "運河"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9331-bc5a77c8-6ac9-4363-a256-4783f7a6a43d",
    tags: ["冬", "鳥", "街灯", "小樽"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9344-6022a68b-7081-44fc-8933-1a81946a53e0",
    tags: ["小樽", "屋内"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9377-c295283a-675e-421b-b306-a8eec77703d8",
    tags: ["冬", "雪", "小樽", "イルミネーション"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9403-e7369210-48b0-42b5-9713-0f2b34456875",
    tags: ["冬", "小樽", "運河"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9410-3aa7c8b2-f525-4f37-8b99-17337da5917a",
    tags: ["冬", "雪", "小樽", "街灯", "植物", "夜景"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9436-fc374590-f8a3-4885-affe-b0606e81d2db",
    tags: ["冬", "雪", "小樽", "運河", "夜景", "イルミネーション"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9451-cef68639-5905-42e1-9ee8-a05f9026406c",
    tags: ["冬", "雪", "森", "空"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9471-d3963e44-d0b5-4bf4-97c7-d0f7e0ca87a2",
    tags: ["冬", "雪", "空"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9498-078f2dac-a7ea-4253-97ab-ce8869aa6d8e",
    tags: ["冬", "雪"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9613-c789adf6-13f8-4203-ba10-289a25bbd83a",
    tags: ["冬", "室蘭", "橋", "夜景"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9691-4faf518c-b036-4b8f-955b-834007ac19d7",
    tags: ["冬", "室蘭", "夜景"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9700-d4363871-14a3-472a-b489-147bca1f1dac",
    tags: ["冬", "月", "室蘭"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0004-2714b1e6-0931-401d-8a5c-d3c139e068cd",
    tags: ["冬", "雪", "樹氷", "蔵王"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0016-86e51262-5cb0-4049-ab61-6fbc60b39fff",
    tags: ["冬", "雪", "樹氷", "蔵王"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0052-f1a907c1-c00e-42bb-a901-8e2f1833e1ce",
    tags: ["冬", "雪", "樹氷", "蔵王"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0071-c836043e-e252-4dd7-9f64-e29eeb0efb57",
    tags: ["冬", "雪", "植物", "建物", "蔵王"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0077-425f1c13-73e5-443c-a678-03c520cee622",
    tags: ["冬", "雪", "植物", "空", "蔵王"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0083-24fcdbb0-108e-4d9d-b1d4-5fef46ddd858",
    tags: ["冬", "雪", "空", "蔵王"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0093-61a24e58-d958-42ce-ad36-34a26ac959db",
    tags: ["冬", "雪", "空", "植物", "夕日", "蔵王"],
  },
  {
    area: "山形県",
    date: "2019-01-05",
    imageId: "_DSC0732-a12b450d-3624-489b-9536-5e51917ce604",
    tags: ["冬", "雪", "街灯", "建物", "銀山温泉"],
  },
  {
    area: "山形県",
    date: "2019-01-05",
    imageId: "_DSC0749-8261a1c7-0378-4fff-b28d-2b785be13fec",
    tags: ["冬", "雪", "街灯", "建物", "銀山温泉"],
  },
  {
    area: "山形県",
    date: "2019-01-05",
    imageId: "_DSC0790-29a78491-2298-4a7c-970a-1605ef7e0825",
    tags: ["冬", "雪", "街灯", "建物", "銀山温泉"],
  },
  {
    area: "山形県",
    date: "2019-01-05",
    imageId: "_DSC0809-b81ca6df-a179-4871-b8ca-a69920427737",
    tags: ["冬", "雪", "街灯", "建物", "銀山温泉"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC2937-fa0dc9ae-e504-4b78-942d-e58e439bb8e4",
    tags: ["建物", "日光"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC2977-f3d474a7-bd14-430d-ade5-289db7890bf5",
    tags: ["湖", "滝", "山", "日光", "中禅寺湖", "華厳の滝"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3154-e3ff4f64-cd23-4daa-826e-5c3f8521d89f",
    tags: ["山", "空", "日光", "戦場ヶ原"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3164-0d11eb7c-6b28-4232-9576-d482e79c9a72",
    tags: ["植物", "マクロ", "日光"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3172-c9b33948-93a4-458d-bf34-627280b41d0f",
    tags: ["山", "空", "日光", "男体山"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3228-c762b409-23b1-4841-8e9f-ff25780e3a6a",
    tags: ["植物", "壁", "通り", "日光"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3233-f784e081-a7e9-4a82-9d65-a66fd2799860",
    tags: ["植物", "マクロ", "日光"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3238-7c4b388b-78da-4f85-a518-d381e36a2519",
    tags: ["通り", "植物", "日光"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3312-095f558e-de2a-4d80-9796-813092933294",
    tags: ["通り", "植物", "日光"],
  },
] satisfies Readonly<ImagesDataBaseRecord[]>

export const ImagesDataBase = [...ImagesDataBaseOrigin].sort(sortImageDataBase).map(sortTags)
export const Locations = [...new Set(ImagesDataBase.map(({ area }) => area))]
export const Tags = [...new Set(ImagesDataBase.flatMap(({ tags }) => tags))].sort()
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const Months = [...new Set(ImagesDataBase.map(({ date }) => date.slice(0, -3)))]
  .sort()
  .reverse()
