import { describe, it, expect } from "bun:test"

import { getHref } from "."

/* eslint-disable sonarjs/no-duplicate-string */
describe("shared/utils/getHref", () => {
  it.each<[Parameters<typeof getHref>[0], string]>([
    [{ id: "About" }, "/about"],
    [{ id: "PhotoGallery" }, "/photo-gallery"],
    [
      {
        date: "date-value",
        id: "PhotoGallery",
        location: "location-value",
        page: 1,
        tag: "tag-value",
      },
      "/photo-gallery?location=location-value&date=date-value&tag=tag-value&page=1",
    ],
    [
      {
        date: "date-value",
        id: "PhotoGallery",
        location: "location-value",
        tag: "tag-value",
      },
      "/photo-gallery?location=location-value&date=date-value&tag=tag-value",
    ],
    [
      {
        id: "PhotoGallery",
        location: "location-value",
        page: 1,
        tag: "tag-value",
      },
      "/photo-gallery?location=location-value&tag=tag-value&page=1",
    ],
    [
      {
        date: "date-value",
        id: "PhotoGallery",
        page: 1,
        tag: "tag-value",
      },
      "/photo-gallery?date=date-value&tag=tag-value&page=1",
    ],
    [
      {
        date: "date-value",
        id: "PhotoGallery",
        location: "location-value",
        page: 1,
      },
      "/photo-gallery?location=location-value&date=date-value&page=1",
    ],
    [{ id: "PhotoDetail", imageId: "image-id-value" }, "/photo/image-id-value"],
    [
      { id: "PhotoLocationDetail", location: "location-value" },
      "/photo-gallery?location=location-value",
    ],
    [{ id: "PhotoDateDetail", date: "date-value" }, "/photo-gallery?date=date-value"],
    [{ id: "PhotoTagDetail", tag: "tag-value" }, "/photo-gallery?tag=tag-value"],
    [{ id: "Profile" }, "/profile"],
  ] as const)("引数が「%o」の時、「%s」を返す", (input, output) => {
    expect(getHref(input)).toBe(output)
  })
})
