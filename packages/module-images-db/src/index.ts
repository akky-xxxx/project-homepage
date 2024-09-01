/* eslint-disable strict-check/forbidden-multiple-named-exports, max-lines */
import { sortImageDataBase } from "./modules/sortImageDataBase"
import { sortTags } from "./modules/sortTags"
import { Prefectures } from "./shared/const/Prefectures"

import type { ImagesDataBaseRecord } from "./types/ImagesDataBaseRecord"

const ImagesDataBaseOrigin = [
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0006-d7da057e-2858-46de-b909-c835f82eb611",
    tags: ["紅葉", "植物", "秋"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0038-e5bc8520-76e0-4e70-b292-6ab4d6b44bff",
    tags: ["川", "大噴湯", "秋"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0077-6c183805-7877-43a0-9877-9f895b368ac2",
    tags: ["川", "紅葉", "植物", "秋"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0165-472a61b6-7d08-4970-9d6c-006e3ddd867d",
    tags: ["山", "空", "紅葉", "植物", "秋"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0170-24b46a21-c306-45ac-813a-e868c3539859",
    tags: ["山", "空", "紅葉", "植物", "道路", "秋"],
  },
  {
    area: "秋田県",
    date: "2018-11-02",
    imageId: "_DSC0178-2efcf5bb-f709-43ee-bd67-673ad15e56b8",
    tags: ["星", "空", "夜"],
  },
  {
    area: "秋田県",
    date: "2018-11-03",
    imageId: "_DSC0224-63cbba8b-597d-413f-8a0c-915fbaccc7ac",
    tags: ["山", "鳥海山", "空"],
  },
  {
    area: "秋田県",
    date: "2018-11-03",
    imageId: "_DSC0257-e3bc079a-2001-464e-8394-6936c3465f6c",
    tags: ["滝", "紅葉", "植物", "秋"],
  },
  {
    area: "秋田県",
    date: "2018-11-03",
    imageId: "_DSC0366-aaf427ae-a46a-4d4f-aa93-9c8ca5478074",
    tags: ["夕日", "空", "海", "反射", "太陽"],
  },
  {
    area: "秋田県",
    date: "2018-11-03",
    imageId: "_DSC0310-8fb72d42-8845-453f-b534-fe486e329637",
    tags: ["すすき", "マクロ", "植物", "秋"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9313-7197d278-d509-4da9-8b57-4b22aa599877",
    tags: ["冬", "雪", "小樽", "運河", "建物"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9331-bc5a77c8-6ac9-4363-a256-4783f7a6a43d",
    tags: ["冬", "鳥", "街灯", "小樽", "動物"],
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
    tags: ["冬", "雪", "小樽", "イルミネーション", "建物"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9403-e7369210-48b0-42b5-9713-0f2b34456875",
    tags: ["冬", "小樽", "運河", "建物"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9410-3aa7c8b2-f525-4f37-8b99-17337da5917a",
    tags: ["冬", "雪", "小樽", "街灯", "植物", "夜景", "植物"],
  },
  {
    area: "北海道",
    date: "2017-11-24",
    imageId: "_DSC9436-fc374590-f8a3-4885-affe-b0606e81d2db",
    tags: ["冬", "雪", "小樽", "運河", "夜景", "イルミネーション", "建物", "反射"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9451-cef68639-5905-42e1-9ee8-a05f9026406c",
    tags: ["冬", "雪", "森", "空", "植物"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9471-d3963e44-d0b5-4bf4-97c7-d0f7e0ca87a2",
    tags: ["冬", "雪", "空", "すすき", "植物"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9498-078f2dac-a7ea-4253-97ab-ce8869aa6d8e",
    tags: ["冬", "雪", "マクロ", "植物"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9613-c789adf6-13f8-4203-ba10-289a25bbd83a",
    tags: ["室蘭", "橋", "夜景"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9691-4faf518c-b036-4b8f-955b-834007ac19d7",
    tags: ["室蘭", "夜景"],
  },
  {
    area: "北海道",
    date: "2017-11-25",
    imageId: "_DSC9700-d4363871-14a3-472a-b489-147bca1f1dac",
    tags: ["冬", "月", "室蘭", "空"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0004-2714b1e6-0931-401d-8a5c-d3c139e068cd",
    tags: ["冬", "雪", "樹氷", "蔵王", "スマホ", "植物"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0016-86e51262-5cb0-4049-ab61-6fbc60b39fff",
    tags: ["冬", "雪", "樹氷", "蔵王", "スマホ", "植物"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0052-f1a907c1-c00e-42bb-a901-8e2f1833e1ce",
    tags: ["冬", "雪", "樹氷", "蔵王", "スマホ", "植物", "スキー場"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0071-c836043e-e252-4dd7-9f64-e29eeb0efb57",
    tags: ["冬", "雪", "植物", "建物", "蔵王", "スマホ", "植物", "スキー場", "古民家"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0077-425f1c13-73e5-443c-a678-03c520cee622",
    tags: ["冬", "雪", "植物", "空", "蔵王", "スマホ", "植物", "スキー場"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0083-24fcdbb0-108e-4d9d-b1d4-5fef46ddd858",
    tags: ["冬", "雪", "空", "蔵王", "スマホ", "植物", "スキー場"],
  },
  {
    area: "山形県",
    date: "2019-01-03",
    imageId: "DSC_0093-61a24e58-d958-42ce-ad36-34a26ac959db",
    tags: ["冬", "雪", "空", "植物", "夕日", "蔵王", "スマホ", "植物", "太陽"],
  },
  {
    area: "山形県",
    date: "2019-01-05",
    imageId: "_DSC0732-a12b450d-3624-489b-9536-5e51917ce604",
    tags: ["冬", "雪", "街灯", "建物", "銀山温泉", "古民家"],
  },
  {
    area: "山形県",
    date: "2019-01-05",
    imageId: "_DSC0749-8261a1c7-0378-4fff-b28d-2b785be13fec",
    tags: ["冬", "雪", "街灯", "建物", "銀山温泉", "古民家"],
  },
  {
    area: "山形県",
    date: "2019-01-05",
    imageId: "_DSC0790-29a78491-2298-4a7c-970a-1605ef7e0825",
    tags: ["冬", "雪", "街灯", "建物", "銀山温泉", "古民家", "橋"],
  },
  {
    area: "山形県",
    date: "2019-01-05",
    imageId: "_DSC0809-b81ca6df-a179-4871-b8ca-a69920427737",
    tags: ["冬", "雪", "街灯", "建物", "銀山温泉", "古民家", "橋"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC2937-fa0dc9ae-e504-4b78-942d-e58e439bb8e4",
    tags: ["建物", "日光", "空"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC2977-f3d474a7-bd14-430d-ade5-289db7890bf5",
    tags: ["湖", "滝", "山", "日光", "中禅寺湖", "華厳の滝", "植物"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3154-e3ff4f64-cd23-4daa-826e-5c3f8521d89f",
    tags: ["山", "空", "日光", "戦場ヶ原", "植物"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3164-0d11eb7c-6b28-4232-9576-d482e79c9a72",
    tags: ["カンボク", "植物", "マクロ", "日光"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3172-c9b33948-93a4-458d-bf34-627280b41d0f",
    tags: ["山", "空", "日光", "男体山", "植物"],
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
    tags: ["植物", "マクロ", "日光", "苔"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3238-7c4b388b-78da-4f85-a518-d381e36a2519",
    tags: ["通り", "植物", "日光", "ボケ"],
  },
  {
    area: "栃木県",
    date: "2014-09-09",
    imageId: "_DSC3312-095f558e-de2a-4d80-9796-813092933294",
    tags: ["通り", "植物", "日光"],
  },
  {
    area: "埼玉県",
    date: "2016-05-03",
    imageId: "_DSC8601-e6084b20-d6bc-4dad-8068-af30f23a2b18",
    tags: ["森", "植物", "川", "秩父", "岩"],
  },
  {
    area: "埼玉県",
    date: "2016-05-03",
    imageId: "_DSC8602-1e840802-f477-4a40-a376-4c60842954cf",
    tags: ["虫", "岩", "秩父", "トンボ"],
  },
  {
    area: "埼玉県",
    date: "2016-05-03",
    imageId: "_DSC8609-743259f5-7956-4095-af6d-3112beec9d8e",
    tags: ["森", "岩", "秩父", "植物"],
  },
  {
    area: "埼玉県",
    date: "2016-05-03",
    imageId: "_DSC8613-1a12a8cb-63e9-4f20-a53b-5dacb20bc234",
    tags: ["川", "植物", "秩父", "藤"],
  },
  {
    area: "神奈川県",
    date: "2014-06-26",
    imageId: "_DSC2734-a22090b9-99ec-44b0-a654-15214e8c5e83",
    tags: ["植物", "紫陽花", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2014-06-26",
    imageId: "_DSC2749-18888b7a-7757-4a89-9218-a2d32730e649",
    tags: ["植物", "紫陽花", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2014-06-26",
    imageId: "_DSC2773-2f2cf6ff-a261-48fb-ba67-bae4d7ad2723",
    tags: ["植物", "紫陽花", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2014-06-26",
    imageId: "_DSC2788-bee4b537-1d49-4673-8b4e-ea59e1ae962f",
    tags: ["植物", "紫陽花", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2014-06-26",
    imageId: "_DSC2802-45a423b7-65e9-48f1-ac0c-eb1170da0e8a",
    tags: ["植物", "紫陽花", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2018-11-23",
    imageId: "_DSC0508-b0fc5877-b58f-48a6-8f64-e295922f8f94",
    tags: ["すすき", "植物", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2018-11-23",
    imageId: "_DSC0528-cd66eb62-c93a-4115-ae3a-0abb28da543b",
    tags: ["紅葉", "植物", "空", "通り"],
  },
  {
    area: "神奈川県",
    date: "2018-11-23",
    imageId: "_DSC0547-1594a7bc-e5f9-4267-996a-fa043e6c9347",
    tags: ["紅葉", "植物", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2018-11-23",
    imageId: "_DSC0583-f32c9626-5768-461d-8779-f23d3c10a4c0",
    tags: ["紅葉", "池", "植物", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2018-11-23",
    imageId: "_DSC0595-95b808e7-37c6-4db0-860b-cbaf60217e35",
    tags: ["紅葉", "池", "植物", "夕日", "太陽"],
  },
  {
    area: "神奈川県",
    date: "2018-11-23",
    imageId: "_DSC0609-f068dc02-6a4c-4e47-89a6-67ed5ed5734b",
    tags: ["紅葉", "植物"],
  },
  {
    area: "神奈川県",
    date: "2018-11-23",
    imageId: "_DSC0615-02e9c22f-3ac6-40dc-b7df-7fc85c28966d",
    tags: ["紅葉", "マクロ", "植物"],
  },
  {
    area: "神奈川県",
    date: "2019-05-02",
    imageId: "_DSC0820-9efc8743-077d-46ac-a2b2-a57f6ec2499b",
    tags: ["植物", "ツツジ", "マクロ"],
  },
  {
    area: "神奈川県",
    date: "2019-05-02",
    imageId: "_DSC0826-2af0c16e-f456-42c3-a6bf-60e47cf7cbe9",
    tags: ["植物", "ツツジ", "空", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2019-05-02",
    imageId: "_DSC0828-05d92d15-87e7-4285-a22d-c12b875b2887",
    tags: ["植物", "ツツジ", "虫", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2019-05-02",
    imageId: "_DSC0838-3b9c8c41-a761-42dc-a8ac-81141140ecb4",
    tags: ["植物", "ツツジ", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2019-05-02",
    imageId: "_DSC0842-bc7bdb44-f2a9-4260-8f4b-c33363786c31",
    tags: ["植物", "ツツジ", "虫", "マクロ"],
  },
  {
    area: "神奈川県",
    date: "2019-05-02",
    imageId: "_DSC0843-839b769c-e68d-4c59-a2fc-c1c860307a5d",
    tags: ["植物", "ツツジ", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2019-05-02",
    imageId: "_DSC0868-3c12920a-33e0-43a4-bc80-a671fe7a35a3",
    tags: ["植物", "ツツジ", "通り"],
  },
  {
    area: "神奈川県",
    date: "2019-05-02",
    imageId: "_DSC0878-74868f81-8d26-4b1f-99d6-70ac8f6a96cb",
    tags: ["植物", "ツツジ", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2019-05-02",
    imageId: "_DSC0910-54441657-61d8-4800-a189-44bced0986b9",
    tags: ["植物", "ツツジ", "マクロ", "ボケ"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8066-e4ac630a-7db6-4ee5-8d68-840cd9486c0d",
    tags: ["秋", "紅葉", "噴水", "庭園", "兼六園", "植物"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8084-5b5be37b-f4d3-419e-9921-9db3bca94afe",
    tags: ["橋", "池", "庭園", "兼六園", "植物"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8092-70451b02-b98a-4375-a361-42089d5f9593",
    tags: ["庭園", "兼六園", "通り", "植物"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8098-66ce330c-d82f-43c6-b061-54a3007dc977",
    tags: ["秋", "紅葉", "池", "庭園", "兼六園", "植物", "滝"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8108-80479982-14a7-43e6-8b51-e598b7d6566a",
    tags: ["秋", "紅葉", "池", "庭園", "兼六園", "建物"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8144-be0aea2e-a2ef-48c3-9f7e-31fe78e3f15e",
    tags: ["秋", "紅葉", "庭園", "兼六園", "川"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8169-25de3072-f429-471b-967b-ce1ac6946f62",
    tags: ["秋", "橋", "紅葉", "庭園", "兼六園", "植物"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8190-9621f5bc-e3f7-4c2c-a11e-3ee983dfb4e9",
    tags: ["秋", "紅葉", "植物", "兼六園", "マクロ", "苔"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8292-cc1e151a-aa0f-4d2a-b417-8dbf2a9cd747",
    tags: ["秋", "紅葉", "池", "庭園", "兼六園", "植物"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8485-0d1a4f06-62b9-48e6-93e7-9a7e37397b50",
    tags: ["秋", "棚田", "海", "空"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8493-be577484-b53a-496c-ab74-422329c37cfa",
    tags: ["秋", "棚田", "海", "空", "イルミネーション", "夜"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8502-f5ac971c-5287-47c1-8466-9222a1003e4d",
    tags: ["秋", "棚田", "海", "空", "イルミネーション", "夜"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8504-e22947f8-03be-468d-96e0-0edc8e045f69",
    tags: ["秋", "棚田", "海", "イルミネーション", "夜"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8513-819cd692-95d3-4942-8327-1635da5b85a9",
    tags: ["秋", "棚田", "海", "イルミネーション", "夜"],
  },
  {
    area: "石川県",
    date: "2015-11-25",
    imageId: "_DSC8529-a2d93279-54a7-4670-87b9-577a1783262d",
    tags: ["秋", "棚田", "イルミネーション", "夜"],
  },
  {
    area: "岐阜県",
    date: "2015-11-23",
    imageId: "_DSC7940-ce5908cd-cd9c-4795-8dde-181d96da8684",
    tags: ["建物", "飛騨", "古民家", "街灯", "通り"],
  },
  {
    area: "岐阜県",
    date: "2015-11-23",
    imageId: "_DSC7952-abdd7880-e8cb-4422-a51f-3586f56a5822",
    tags: ["建物", "飛騨", "古民家", "鯉", "魚", "街灯", "通り"],
  },
  {
    area: "岐阜県",
    date: "2015-11-23",
    imageId: "_DSC7961-8fa9312f-3d78-4d50-b607-9512069bcb4b",
    tags: ["建物", "飛騨", "古民家", "街灯", "通り"],
  },
  {
    area: "岐阜県",
    date: "2015-11-23",
    imageId: "_DSC7981-e8607d7f-6900-4b08-baa1-de3b404a49c9",
    tags: ["建物", "街灯", "飛騨", "古民家", "通り"],
  },
  {
    area: "岐阜県",
    date: "2015-11-24",
    imageId: "_DSC7992-3ed94637-ed47-499e-9638-39e51205fa55",
    tags: ["建物", "白川郷", "古民家"],
  },
  {
    area: "岐阜県",
    date: "2015-11-24",
    imageId: "_DSC8014-852f80fa-bddd-4a84-9e49-af603763b604",
    tags: ["建物", "白川郷", "古民家"],
  },
  {
    area: "岐阜県",
    date: "2015-11-24",
    imageId: "_DSC8026-a5851f55-edb4-4718-8836-180f3e001910",
    tags: ["秋", "建物", "白川郷", "古民家", "柿", "植物"],
  },
  {
    area: "岐阜県",
    date: "2015-11-24",
    imageId: "_DSC8031-c5a59e72-7ab3-4ca8-8ad1-80adcf3cb5d5",
    tags: ["建物", "白川郷", "古民家"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7148-7d470f05-8f37-4826-9c9f-5bd1612b63a3",
    tags: ["宿場町", "奈良井宿", "古民家", "建物", "通り"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7156-672952c7-e8b3-4d6e-b09d-cf7dc385c3a9",
    tags: ["宿場町", "奈良井宿", "古民家", "建物", "通り", "ボケ"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7162-359fd07a-63be-4262-bad3-7616413d8d78",
    tags: ["宿場町", "奈良井宿", "古民家", "建物", "通り", "ボケ"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7166-32923f99-bc10-4b8a-b675-dd61713eeebd",
    tags: ["宿場町", "奈良井宿", "古民家", "建物", "通り", "ボケ", "大根", "マクロ"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7171-e1931b1c-bb1e-4d7c-85cb-feb44aa08730",
    tags: ["宿場町", "奈良井宿", "古民家", "建物", "通り"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7197-d780c505-213a-4e97-9f3c-71b409bb4b6b",
    tags: ["宿場町", "奈良井宿", "古民家", "建物", "ボケ"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7274-bf5fe235-7555-4950-8791-d14763109193",
    tags: ["森", "植物"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7293-4219d970-72f8-4ed2-bd1b-30c6b639a543",
    tags: ["地蔵"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7319-0ef66c63-942f-4642-aad1-d7c14f17a9f5",
    tags: ["秋", "岩", "川", "植物", "紅葉", "森"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7325-348a7cfe-c4b2-4cc3-ab17-79f97d13681b",
    tags: ["秋", "紅葉", "山", "森", "植物"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7340-8bb4d856-cfad-44ae-962a-1cf721c76a60",
    tags: ["秋", "紅葉", "岩", "川", "植物", "森"],
  },
  {
    area: "長野県",
    date: "2015-11-21",
    imageId: "_DSC7400-d760c555-620c-4715-960b-fd7a8758609e",
    tags: ["岩", "川", "森", "植物"],
  },
  {
    area: "長野県",
    date: "2015-11-22",
    imageId: "_DSC7430-e736c124-b50c-4c92-830a-ac003a4d70a1",
    tags: ["城", "松本城", "空", "松本", "植物"],
  },
  {
    area: "長野県",
    date: "2015-11-22",
    imageId: "_DSC7449-aff10942-4cdc-4947-aba4-53e2b9b328a0",
    tags: ["秋", "城", "松本城", "空", "松本", "池", "反射"],
  },
  {
    area: "長野県",
    date: "2015-11-22",
    imageId: "_DSC7478-3c957ae4-a994-4db3-a565-25b8c08b0c59",
    tags: ["城", "松本城", "空", "橋", "動物", "鳥", "白鳥", "松本", "池"],
  },
  {
    area: "長野県",
    date: "2015-11-22",
    imageId: "_DSC7522-51f41b4c-80cf-4870-a76d-2da8cd931ad9",
    tags: ["秋", "紅葉", "城", "松本城", "空", "松本", "植物"],
  },
  {
    area: "長野県",
    date: "2015-11-22",
    imageId: "_DSC7566-9f6b29d6-844f-4a49-9d34-aef6480108d6",
    tags: ["森", "川", "滝"],
  },
  {
    area: "長野県",
    date: "2015-11-22",
    imageId: "_DSC7603-9e111e4f-5013-4813-add1-212f7a9d1333",
    tags: ["秋", "植物", "アザミ", "川", "ボケ"],
  },
  {
    area: "長野県",
    date: "2015-11-22",
    imageId: "_DSC7672-404482b6-f410-45e5-a3b4-b98eb03f5893",
    tags: ["秋", "植物", "アザミ", "川"],
  },
  {
    area: "長野県",
    date: "2016-09-22",
    imageId: "_DSC8668-7ea4d1ff-63d6-4005-8ee1-2bd98534a840",
    tags: ["川", "森", "上高地", "植物", "山"],
  },
  {
    area: "長野県",
    date: "2016-09-22",
    imageId: "_DSC8694-38302ae0-75a9-40eb-bc38-afbe193862c1",
    tags: ["川", "上高地", "植物", "枯れ木"],
  },
  {
    area: "長野県",
    date: "2016-09-22",
    imageId: "_DSC8696-5e4bd04d-bfaf-45d8-9af1-188e16418b37",
    tags: ["森", "川", "上高地", "植物"],
  },
  {
    area: "長野県",
    date: "2016-09-22",
    imageId: "_DSC8804-f50bd564-7e94-494a-9feb-3df717a76c74",
    tags: ["森", "上高地", "動物", "猿", "植物"],
  },
  {
    area: "長野県",
    date: "2016-09-22",
    imageId: "_DSC8839-e77f0706-41a5-48e7-b4d4-cf863633e1a7",
    tags: ["植物", "きのこ", "上高地"],
  },
  {
    area: "長野県",
    date: "2016-09-22",
    imageId: "_DSC8858-d2dd48dc-201a-4f8b-80c6-ee80ce75035f",
    tags: ["森", "川", "上高地", "森"],
  },
  {
    area: "長野県",
    date: "2016-09-24",
    imageId: "_DSC8926-b941b639-62b6-442e-9d59-a8c7ccb48b77",
    tags: ["川", "虫", "大王わさび農場", "バッタ", "マクロ", "ボケ", "水車"],
  },
  {
    area: "長野県",
    date: "2016-09-24",
    imageId: "_DSC8989-c27417b4-45e7-41da-8336-5475c1cead0c",
    tags: ["植物", "彼岸花", "大王わさび農場"],
  },
  {
    area: "長野県",
    date: "2016-10-15",
    imageId: "_DSC9169-8f9b1c57-d45e-449c-afa0-27fba0dcf71e",
    tags: ["森", "滝", "軽井沢", "植物"],
  },
  {
    area: "長野県",
    date: "2016-10-15",
    imageId: "_DSC9172-a406cbe4-6364-41e3-bc8b-bb462a09c9ce",
    tags: ["森", "滝", "軽井沢", "白糸の滝", "植物"],
  },
  {
    area: "長野県",
    date: "2016-10-15",
    imageId: "_DSC9183-0fc63c5b-49fb-4a4e-b3cd-e3315b601d2d",
    tags: ["森", "滝", "軽井沢", "植物"],
  },
  {
    area: "長野県",
    date: "2016-10-15",
    imageId: "_DSC9207-ee6e5918-84c8-4deb-8264-b1ab7fd49078",
    tags: ["森", "通り", "軽井沢", "植物"],
  },
  {
    area: "長野県",
    date: "2016-10-15",
    imageId: "_DSC9223-c7fec87d-a767-4d92-b134-579161504ee1",
    tags: ["森", "軽井沢", "植物"],
  },
  {
    area: "長野県",
    date: "2016-10-15",
    imageId: "_DSC9229-a20d5b24-9ece-4eda-91f6-b2664cf3f0f8",
    tags: ["秋", "紅葉", "池", "軽井沢", "植物", "反射"],
  },
  {
    area: "長野県",
    date: "2016-10-15",
    imageId: "_DSC9243-977624ff-35da-4a78-90d4-32a3ca5443f8",
    tags: ["蛇", "軽井沢", "動物"],
  },
  {
    area: "長野県",
    date: "2016-10-15",
    imageId: "_DSC9277-8021dda3-75fc-4438-bf20-e48afd6eeb21",
    tags: ["空", "池", "軽井沢", "植物", "反射"],
  },
  {
    area: "京都府",
    date: "2014-11-20",
    imageId: "_DSC3582-b8695c04-1047-4e1c-9f94-0323c7bf634a",
    tags: ["池", "建物", "平等院", "宇治", "反射"],
  },
  {
    area: "京都府",
    date: "2014-11-20",
    imageId: "_DSC3651-065b60b5-886c-48f3-973b-85d9382fb475",
    tags: ["建物", "平等院", "マクロ", "苔", "宇治"],
  },
  {
    area: "京都府",
    date: "2014-11-20",
    imageId: "_DSC3753-d654ba66-612c-482e-a36b-7de222a1b6b8",
    tags: ["秋", "建物", "宇治"],
  },
  {
    area: "京都府",
    date: "2014-11-20",
    imageId: "_DSC3821-8be4cd70-d72b-4358-aab4-3d8b52ab8752",
    tags: ["秋", "ライトアップ", "清水寺", "建物", "夜", "夜景", "紅葉", "植物"],
  },
  {
    area: "京都府",
    date: "2014-11-20",
    imageId: "_DSC3886-97e1f971-4ecc-4b23-830e-d33ffaf7765a",
    tags: ["秋", "紅葉寺", "池", "ライトアップ", "夜", "植物", "紅葉", "反射"],
  },
  {
    area: "京都府",
    date: "2014-11-20",
    imageId: "_DSC3925-fd1f12c7-5f48-4ac8-88cc-c81cd3dc2b32",
    tags: ["秋", "紅葉", "ライトアップ", "建物", "庭園", "植物", "夜"],
  },
  {
    area: "京都府",
    date: "2014-11-20",
    imageId: "_DSC3982-770dc1cc-8b7d-4675-83e6-22f6b2c16b43",
    tags: ["竹", "ライトアップ", "植物", "夜"],
  },
  {
    area: "京都府",
    date: "2014-11-20",
    imageId: "_DSC4007-4c2f1057-02ef-4094-8dc8-d99c21d758e8",
    tags: ["秋", "紅葉", "ライトアップ", "建物", "庭園", "屋内", "植物"],
  },
  {
    area: "京都府",
    date: "2014-11-21",
    imageId: "_DSC4103-c58de169-61f7-4e1c-b071-fd8cd9b64d14",
    tags: ["秋", "紅葉", "金閣寺", "池", "空", "植物", "山", "反射"],
  },
  {
    area: "京都府",
    date: "2014-11-21",
    imageId: "_DSC4191-677fa4d1-c634-4dec-b49d-19095dbb9fa7",
    tags: ["秋", "紅葉", "金閣寺", "空", "植物", "ボケ"],
  },
  {
    area: "京都府",
    date: "2014-11-21",
    imageId: "_DSC4292-a81967a5-9c33-4e15-a888-485d902429a4",
    tags: ["庭園", "マクロ", "ボケ"],
  },
  {
    area: "京都府",
    date: "2014-11-21",
    imageId: "_DSC4396-58570303-4bda-4580-a8dc-75193e6fc6e5",
    tags: ["秋", "紅葉", "庭園", "植物", "マクロ", "ボケ"],
  },
  {
    area: "京都府",
    date: "2014-11-21",
    imageId: "_DSC4488-4ba935ab-7941-4120-893b-1f2dc56ff1f1",
    tags: ["秋", "紅葉", "すすき", "植物", "マクロ", "ボケ"],
  },
  {
    area: "京都府",
    date: "2014-11-21",
    imageId: "_DSC4496-652b42e1-87fa-4db7-9c0f-c5a8dd6d98bf",
    tags: ["秋", "紅葉", "池", "植物", "反射"],
  },
  {
    area: "京都府",
    date: "2014-11-21",
    imageId: "_DSC4515-baae1724-f559-42e1-a207-09336ac0647c",
    tags: ["庭園", "苔"],
  },
  {
    area: "京都府",
    date: "2014-11-21",
    imageId: "_DSC4691-cedd80a0-b76c-4212-8a5e-e7fe8ff7c7f0",
    tags: ["紅葉", "ライトアップ", "マクロ", "ボケ", "植物", "夜", "秋"],
  },
  {
    area: "京都府",
    date: "2014-11-22",
    imageId: "_DSC4850-27879030-4d43-42e8-b4c2-c67b55d124c5",
    tags: ["秋", "紅葉", "すすき", "橋", "植物"],
  },
  {
    area: "京都府",
    date: "2014-11-22",
    imageId: "_DSC4868-33308e1f-20a0-4131-bf7c-2b3269972622",
    tags: ["秋", "紅葉", "空", "植物"],
  },
  {
    area: "京都府",
    date: "2014-11-22",
    imageId: "_DSC4878-8762aabb-5088-418b-8c19-a65c03d19ce7",
    tags: ["秋", "紅葉", "建物", "植物", "マクロ", "ボケ"],
  },
  {
    area: "京都府",
    date: "2014-11-22",
    imageId: "_DSC4918-a2c10c5a-e0c5-4ebd-b6ff-c125f9c822a4",
    tags: ["秋", "紅葉", "庭園", "池", "山", "空", "植物", "反射"],
  },
  {
    area: "京都府",
    date: "2014-11-22",
    imageId: "_DSC4936-ec263ae8-5b62-49f5-9ff8-2fe89ab58780",
    tags: ["庭園", "池"],
  },
  {
    area: "京都府",
    date: "2014-11-22",
    imageId: "_DSC4996-da264e44-f8f0-4d42-b557-0a82376917b5",
    tags: ["秋", "紅葉", "橋", "渡月橋", "植物", "山"],
  },
  {
    area: "山形県",
    date: "2020-07-22",
    imageId: "_DSC1281-b90b67ea-1f0d-4eb3-8a83-f77ac29af084",
    tags: ["植物", "ダリア"],
  },
  {
    area: "山形県",
    date: "2020-07-22",
    imageId: "_DSC1284-df6d9dfc-705a-4b9f-9485-7e50b6e7c122",
    tags: ["植物", "トマト"],
  },
  {
    area: "山形県",
    date: "2020-07-22",
    imageId: "_DSC1285-6da70421-4f5d-4e9a-bf8f-404468704d95",
    tags: ["植物", "コスモス"],
  },
  {
    area: "山形県",
    date: "2020-07-22",
    imageId: "_DSC1297-2a193ac6-a178-49a0-8c7e-787d9d2d978b",
    tags: ["植物", "庭園", "池"],
  },
  {
    area: "山形県",
    date: "2020-07-23",
    imageId: "_DSC1284-cd31092f-3dda-46d5-9d0a-d9fd9157725a",
    tags: ["森", "湖", "植物", "月山湖", "空"],
  },
  {
    area: "山形県",
    date: "2020-07-23",
    imageId: "_DSC1305-83b576b4-57fa-435e-98f4-f56b7f4c35ef",
    tags: ["森", "湖", "植物", "反射"],
  },
  {
    area: "山形県",
    date: "2020-07-23",
    imageId: "_DSC1334-84c428f7-5e9d-415c-8fba-5b9c7fc09e83",
    tags: ["蝶", "虫", "植物"],
  },
  {
    area: "山形県",
    date: "2020-07-23",
    imageId: "_DSC1338-4f5d237d-3ff0-47ad-bd61-0cad4f3ebabe",
    tags: ["トンボ", "虫", "ツメクサ", "植物"],
  },
  {
    area: "山形県",
    date: "2020-07-23",
    imageId: "_DSC1370-819b68f8-99d4-4930-b2ff-c945f939d032",
    tags: ["湖", "月山湖", "森", "植物", "噴水"],
  },
  {
    area: "山形県",
    date: "2020-07-23",
    imageId: "_DSC1389-053cd03f-46e1-416f-bc2f-a8af98bf33d2",
    tags: ["湖", "月山湖", "森", "植物", "噴水"],
  },
  {
    area: "山形県",
    date: "2020-07-23",
    imageId: "_DSC1407-3bec37ea-0a53-4618-84c2-c2f126cf1657",
    tags: ["ギボウシ", "植物"],
  },
  {
    area: "山形県",
    date: "2020-07-23",
    imageId: "_DSC1417-fb7dadb6-3c7a-4ed7-9224-3ce2ebde20e0",
    tags: ["森", "植物", "建物", "古民家"],
  },
  {
    area: "山形県",
    date: "2020-07-23",
    imageId: "_DSC1464-88d8d5ee-7072-470b-b1f1-eb89a99c2483",
    tags: ["杉", "植物", "トトロの木"],
  },
  {
    area: "山形県",
    date: "2020-07-24",
    imageId: "_DSC1642-dc7d326d-3196-4b8c-ae24-726f9645c07e",
    tags: ["森", "植物", "滝", "岩"],
  },
  {
    area: "山形県",
    date: "2020-07-24",
    imageId: "_DSC1655-5f181311-b71f-4c32-84be-0cb53dfccad4",
    tags: ["森", "植物"],
  },
  {
    area: "山形県",
    date: "2020-07-24",
    imageId: "_DSC1718-d327fa12-619a-41e0-9610-b60757e26c37",
    tags: ["夜", "夜景"],
  },
  {
    area: "山形県",
    date: "2020-07-24",
    imageId: "_DSC1718-d327fa12-619a-41e0-9610-b60757e26c37",
    tags: ["夜", "夜景"],
  },
  {
    area: "山形県",
    date: "2020-07-24",
    imageId: "_DSC1728-cbe0f349-59f5-4d3f-83a6-85a1ce65bff0",
    tags: ["夜", "夜景"],
  },
  {
    area: "岐阜県",
    date: "2022-11-19",
    imageId: "_DSC1898-fab165c6-2672-4c72-98d2-fa624fecdf3d",
    tags: ["紅葉", "植物", "秋"],
  },
  {
    area: "岐阜県",
    date: "2022-11-19",
    imageId: "_DSC1902-4262acb8-953f-427d-8985-259798dbefad",
    tags: ["紅葉", "植物", "秋"],
  },
  {
    area: "岐阜県",
    date: "2022-11-19",
    imageId: "_DSC1920-2add6f81-7bd5-41de-adea-98308f99ee7f",
    tags: ["紅葉", "植物", "ボケ", "秋"],
  },
  {
    area: "岐阜県",
    date: "2022-11-19",
    imageId: "_DSC1938-b792d66a-993f-4cbf-9eb9-a9eade4726bd",
    tags: ["紅葉", "植物", "反射", "苔", "秋"],
  },
  {
    area: "岐阜県",
    date: "2022-11-19",
    imageId: "_DSC2047-96c60515-280d-4e25-9397-214f2002dd94",
    tags: ["城", "藤橋城", "星", "夜"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2088-25cd5e54-3d27-468b-b135-a9a832919318",
    tags: ["山", "森", "植物", "川", "養老公園"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2097-c49721dd-b882-40f3-9ddc-c8c0948d09af",
    tags: ["山", "植物", "養老公園", "紅葉", "秋"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2110-6d95a3f6-0ba8-4b9e-b859-fc695bec37bc",
    tags: ["橋", "植物", "養老公園", "紅葉", "秋", "ボケ"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2114-debe40c5-ced3-43ac-aed4-3347860b38ed",
    tags: ["植物", "養老公園", "紅葉", "秋", "古民家", "森"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2124-2fc173d6-be29-43db-b2ff-cdb945af90fe",
    tags: ["植物", "養老公園", "養老の滝", "滝", "森"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2164-af64f226-ee44-46d0-9224-cd3e4eeb2f38",
    tags: ["植物", "森", "川", "山", "紅葉", "秋"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2172-b2eb3238-2fd9-4dda-978d-8e801675c3cb",
    tags: ["紅葉", "植物", "秋", "橋"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2201-ca0a4894-d3ac-4b5e-9267-dc5fbb05c496",
    tags: ["紅葉", "植物", "秋", "橋"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2230-c00a6c4e-8c1e-4ba0-90bf-b83b4d93f35e",
    tags: ["紅葉", "植物", "秋"],
  },
  {
    area: "岐阜県",
    date: "2022-11-20",
    imageId: "_DSC2277-0a2f8fc7-a6a9-40d1-a1dc-ec9859f8301d",
    tags: ["紅葉", "植物", "秋", "建物"],
  },
  {
    area: "岐阜県",
    date: "2022-11-21",
    imageId: "_DSC2305-9c9f0dd8-2e27-4843-a322-c897ba6482aa",
    tags: ["紅葉", "植物", "秋", "池", "反射"],
  },
  {
    area: "岐阜県",
    date: "2022-11-21",
    imageId: "_DSC2315-45732895-4c58-47c9-acea-9b684b373055",
    tags: ["紅葉", "植物", "秋", "山", "空"],
  },
  {
    area: "岐阜県",
    date: "2022-11-21",
    imageId: "_DSC2406-576333cb-1dd8-4f14-88fe-92e36ee03411",
    tags: ["紅葉", "植物", "秋", "山", "空", "城", "群青八幡城"],
  },
  {
    area: "岐阜県",
    date: "2022-11-21",
    imageId: "_DSC2415-63dcbf75-f9b1-4c4c-a845-7e809c23dc34",
    tags: ["紅葉", "植物", "秋", "群青八幡城"],
  },
  {
    area: "岐阜県",
    date: "2022-11-21",
    imageId: "_DSC2463-0cd425db-52ae-4ae3-b432-3c5a3d6d6348",
    tags: ["紅葉", "植物", "秋", "群青八幡城"],
  },
  {
    area: "岐阜県",
    date: "2022-11-21",
    imageId: "_DSC2482-05af69ea-2121-4628-b1b6-7acb051649fe",
    tags: ["紅葉", "植物", "秋", "群青八幡城", "城"],
  },
  {
    area: "岐阜県",
    date: "2022-11-21",
    imageId: "_DSC2504-9e6507a8-89e3-41a0-9610-cbb9c4261e27",
    tags: ["紅葉", "植物", "秋", "群青八幡城", "城"],
  },
  {
    area: "岐阜県",
    date: "2022-11-22",
    imageId: "_DSC2571-9904701a-0a04-4e5c-9bf1-972de9543155",
    tags: ["紅葉", "植物", "秋", "ボケ"],
  },
  {
    area: "岐阜県",
    date: "2022-11-22",
    imageId: "_DSC2610-47f0281a-be96-4823-8080-3f638ba2a2b7",
    tags: ["紅葉", "植物", "秋", "湖", "恵那峡"],
  },
  {
    area: "岐阜県",
    date: "2022-11-22",
    imageId: "_DSC2617-710e28ea-b664-490d-bf7c-71045db2562b",
    tags: ["紅葉", "植物", "秋", "恵那峡"],
  },
  {
    area: "岐阜県",
    date: "2022-11-22",
    imageId: "_DSC2684-3912d5da-1d0f-4d5b-a60d-fe558599d0e7",
    tags: ["紅葉", "植物", "秋", "反射", "曽木公園"],
  },
  {
    area: "岐阜県",
    date: "2022-11-22",
    imageId: "_DSC2694-d4199b6b-404f-46b0-b324-15a2e6ecd0fd",
    tags: ["紅葉", "植物", "秋", "曽木公園"],
  },
  {
    area: "新潟県",
    date: "2024-02-17",
    imageId: "DSC_0134-d34729eb-61d2-48e3-81ec-b601f502632b",
    tags: ["冬", "雪", "スキー場", "スマホ", "苗場"],
  },
  {
    area: "新潟県",
    date: "2024-02-18",
    imageId: "DSC_0138-0b276371-a4f7-4449-b4eb-1e31f90d5649",
    tags: ["冬", "雪", "スキー場", "スマホ", "苗場", "雲海"],
  },
  {
    area: "新潟県",
    date: "2024-02-18",
    imageId: "DSC_0142-ad47b2e2-7230-4116-9280-0bfb2f14f2fa",
    tags: ["冬", "雪", "スキー場", "スマホ", "苗場"],
  },
  {
    area: "山形県",
    date: "2024-01-17",
    imageId: "DSC_0090-4702a6c4-c057-48ac-b787-f9c346b2a79c",
    tags: ["冬", "雪", "スキー場", "スマホ", "蔵王", "空"],
  },
  {
    area: "山形県",
    date: "2024-01-17",
    imageId: "DSC_0095-6681a849-3e4b-4a3a-9851-9c0b95130d9b",
    tags: ["冬", "雪", "スキー場", "スマホ", "蔵王", "空", "樹氷", "太陽"],
  },
  {
    area: "山形県",
    date: "2024-01-17",
    imageId: "DSC_0102-10a49151-661f-496a-8fe9-1b07bbf2c872",
    tags: ["冬", "雪", "スキー場", "スマホ", "蔵王", "空", "樹氷"],
  },
  {
    area: "山形県",
    date: "2024-01-17",
    imageId: "DSC_0113-6a9dd0de-e615-4401-a312-efbc54602991",
    tags: ["冬", "雪", "スキー場", "スマホ", "蔵王", "空", "樹氷", "ヘリコプター"],
  },
  {
    area: "山形県",
    date: "2024-01-17",
    imageId: "DSC_0115-6742928f-7e13-45f2-be9f-d9490696b378",
    tags: ["冬", "雪", "スキー場", "スマホ", "蔵王", "空", "樹氷"],
  },
  {
    area: "山形県",
    date: "2024-01-17",
    imageId: "DSC_0119-00ef5128-0929-40a4-9d68-a0c6441d249f",
    tags: ["冬", "雪", "スキー場", "スマホ", "蔵王", "空", "樹氷"],
  },
  {
    area: "山形県",
    date: "2024-01-17",
    imageId: "DSC_0120-PANO-6fa9b035-7f91-481d-b6ca-7aa31e671bcd",
    tags: ["冬", "雪", "スキー場", "スマホ", "蔵王", "空", "樹氷", "パノラマ"],
  },
  {
    area: "山形県",
    date: "2024-01-17",
    imageId: "DSC_0122-4c315fa3-6c0a-47d1-b838-d8db9009f895",
    tags: ["冬", "雪", "スキー場", "スマホ", "蔵王", "空", "樹氷"],
  },
  {
    area: "長野県",
    date: "2023-12-28",
    imageId: "DSC_0075-81e5eb23-f82e-46bb-9e7e-9ef8fb561f18",
    tags: ["冬", "雪", "スキー場", "スマホ", "斑尾", "空"],
  },
  {
    area: "長野県",
    date: "2023-12-28",
    imageId: "DSC_0080-20d1c6d6-6bb3-472b-86ea-d970aef41a06",
    tags: ["冬", "雪", "スキー場", "スマホ", "斑尾", "空"],
  },
  {
    area: "神奈川県",
    date: "2012-09-17",
    imageId: "DSC00282-746c619d-be23-4cfe-95b9-df20d84680de",
    tags: ["栗", "植物"],
  },
  {
    area: "神奈川県",
    date: "2012-09-17",
    imageId: "DSC00310-416a9746-1a7c-401f-9e3e-5e6f9c16771e",
    tags: ["森", "植物", "橋"],
  },
  {
    area: "神奈川県",
    date: "2012-09-17",
    imageId: "DSC00366-fc860a01-1961-4657-b79d-3862a4f00fca",
    tags: ["鳥", "動物", "カワセミ"],
  },
  {
    area: "神奈川県",
    date: "2013-05-05",
    imageId: "_DSC0695-38cf358f-988c-4456-bf38-8eaa6252cc2f",
    tags: ["船", "日本丸", "ライトアップ", "夜", "みなとみらい"],
  },
  {
    area: "神奈川県",
    date: "2013-05-05",
    imageId: "_DSC0698-bd1e1d1a-b403-479b-9f2a-c086ea72b3e9",
    tags: ["建物", "ランドマークタワー", "ライトアップ", "夜", "みなとみらい"],
  },
  {
    area: "神奈川県",
    date: "2013-05-05",
    imageId: "_DSC0706-22381b83-8683-4d95-b2a9-9474d786320b",
    tags: [
      "建物",
      "クイーンズスクエア横浜",
      "コスモクロック21",
      "ライトアップ",
      "夜",
      "みなとみらい",
    ],
  },
  {
    area: "神奈川県",
    date: "2013-10-27",
    imageId: "_DSC0987-5a6b844a-a741-4482-950e-23a8c2e4a08a",
    tags: ["コスモス", "植物", "秋", "虫"],
  },
  {
    area: "神奈川県",
    date: "2013-10-27",
    imageId: "_DSC1014-7a668d94-7a03-4620-84f6-be3866bd6677",
    tags: ["すすき", "植物", "秋"],
  },
  {
    area: "神奈川県",
    date: "2013-10-27",
    imageId: "_DSC1023-e2df6529-351d-45c3-aeec-a80e811ae4f5",
    tags: ["江の島", "海"],
  },
  {
    area: "東京都",
    date: "2013-11-04",
    imageId: "_DSC1258-40a14c63-8e76-41a2-add1-dadf977f96f6",
    tags: ["紅葉", "植物", "秋", "通り", "昭和記念公園"],
  },
  {
    area: "東京都",
    date: "2013-11-04",
    imageId: "_DSC1263-470ed30c-2470-47a9-b5a5-768348505aef",
    tags: ["紅葉", "植物", "秋", "噴水", "昭和記念公園"],
  },
  {
    area: "東京都",
    date: "2013-11-04",
    imageId: "_DSC1279-a180649c-31e6-45a9-a7dc-ffef081f8c84",
    tags: ["植物", "昭和記念公園"],
  },
  {
    area: "神奈川県",
    date: "2013-11-16",
    imageId: "_DSC1357-1ef54675-000e-43d3-b794-ffd34be14e2a",
    tags: ["箱根", "山"],
  },
  {
    area: "神奈川県",
    date: "2013-11-16",
    imageId: "_DSC1365-0364fca1-5a7b-4b46-8b69-16a2c3509d2f",
    tags: ["箱根", "山", "富士山"],
  },
  {
    area: "神奈川県",
    date: "2013-11-16",
    imageId: "_DSC1379-25b1cfde-e698-4063-a454-a8b8fc71115e",
    tags: ["森", "植物", "紅葉", "空", "箱根"],
  },
  {
    area: "神奈川県",
    date: "2013-11-16",
    imageId: "_DSC1402-b14fdf01-f5bc-4a89-be8b-da4607da016e",
    tags: ["植物", "紅葉", "空", "箱根", "湖", "芦ノ湖", "船", "すすき"],
  },
  {
    area: "神奈川県",
    date: "2013-11-16",
    imageId: "_DSC1420-5f50b6a9-3788-4c20-83d8-333685c676c8",
    tags: ["箱根", "湖", "芦ノ湖", "反射", "空", "太陽"],
  },
  {
    area: "神奈川県",
    date: "2013-11-16",
    imageId: "_DSC1428-00f686de-8607-49c6-8a24-578f63617c0b",
    tags: ["箱根", "岩", "紅葉", "植物", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2013-11-16",
    imageId: "_DSC1459-6362d105-df48-4bd6-a1f4-ef0204177a31",
    tags: ["箱根", "看板", "マクロ", "ボケ"],
  },
  {
    area: "神奈川県",
    date: "2013-11-16",
    imageId: "_DSC1484-8fedb373-a358-4b53-9a37-5006dab27a09",
    tags: ["箱根", "夕日", "空", "山", "太陽"],
  },
  {
    area: "神奈川県",
    date: "2014-03-30",
    imageId: "_DSC2036-d3aca3f7-6041-46d0-9dc1-760ee113d760",
    tags: ["春", "桜", "植物"],
  },
  {
    area: "神奈川県",
    date: "2014-03-30",
    imageId: "_DSC2045-27118585-da7d-46ec-8735-049a326da911",
    tags: ["春", "桜", "植物"],
  },
  {
    area: "神奈川県",
    date: "2014-03-30",
    imageId: "_DSC2056-7dc25c32-427e-4f03-8b00-a67971513a33",
    tags: ["春", "桜", "植物", "通り"],
  },
  {
    area: "神奈川県",
    date: "2014-03-30",
    imageId: "_DSC2057-6f8a7418-18c8-4821-af87-1a39975f21ef",
    tags: ["建物", "ランドマークタワー", "空"],
  },
  {
    area: "神奈川県",
    date: "2014-03-30",
    imageId: "_DSC2066-d50218b8-116a-4680-934d-4df508ff88be",
    tags: ["植物", "バンジー"],
  },
  {
    area: "神奈川県",
    date: "2014-03-30",
    imageId: "_DSC2074-b1a446c6-a3a9-4756-a995-a75b08522a92",
    tags: ["植物", "梅", "春"],
  },
  {
    area: "神奈川県",
    date: "2014-03-30",
    imageId: "_DSC2091-1314ebfd-855b-4cac-932a-359d5ac66d45",
    tags: ["植物", "桜", "春", "電話ボックス"],
  },
  {
    area: "神奈川県",
    date: "2014-03-30",
    imageId: "_DSC2102-6c935fde-ee77-437d-bb42-ecad66bb706f",
    tags: ["空", "海", "橋", "ベイブリッジ", "みなとみらい"],
  },
  {
    area: "神奈川県",
    date: "2014-03-30",
    imageId: "_DSC2108-0d45dbdb-a3d7-41af-b805-6ff115e406ec",
    tags: ["建物", "マリンタワー", "みなとみらい"],
  },
] satisfies readonly ImagesDataBaseRecord[]

export const ImagesDataBase = [...ImagesDataBaseOrigin].sort(sortImageDataBase).map(sortTags)
const uniqueRegisterPrefectures = new Set<string>(ImagesDataBase.map(({ area }) => area))
export const Locations = Prefectures.filter((prefecture) => uniqueRegisterPrefectures.has(prefecture))
export const Tags = [...new Set(ImagesDataBase.flatMap(({ tags }) => tags))].sort()
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const Months = [...new Set(ImagesDataBase.map(({ date }) => date.slice(0, -3)))]
  .sort()
  .reverse()
