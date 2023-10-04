import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    },
    {
      name: "textEn",
      title: "Text English",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "textDe",
      title: "Text German",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
});
