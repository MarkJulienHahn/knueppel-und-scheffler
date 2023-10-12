import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    },
    orderRankField({ type: "header" }),
  ],
  preview: {
    select: {
      media: "image",
      title: "image.alt",
    },
  },
});
