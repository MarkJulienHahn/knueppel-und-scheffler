import { defineType } from "sanity";

export default defineType({
  name: "imprint",
  title: "Imprint",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", hidden: true },
    {
      name: "textEn",
      title: "Text English",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [{ title: "Emphasis", value: "em" }],
          },
        },
      ],
    },
    {
      name: "textDe",
      title: "Text German",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [{ title: "Emphasis", value: "em" }],
          },
        },
      ],
    },
  ],
});
