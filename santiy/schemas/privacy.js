import { defineField, defineType } from "sanity";

export default defineType({
  name: "privacy",
  title: "Privacy",
  type: "document",
  fields: [
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
