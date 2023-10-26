import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", hidden: true },
    {
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt", type: "string" },
        { name: "credit", title: "Credit", type: "string" },
      ],
    },
    {
      name: "clientsImage",
      title: "Clients Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt", type: "string" },
        { name: "credit", title: "Credit", type: "string" },
      ],
    },
    {
      name: "jobsImage",
      title: "Jobs Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt", type: "string" },
        { name: "credit", title: "Credit", type: "string" },
      ],
    },
    {
      name: "textEn",
      title: "Text English",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
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
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [{ title: "Emphasis", value: "em" }],
          },
        },
      ],
    },
  ],
});
