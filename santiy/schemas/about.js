import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    },
    {
      name: "clientsImage",
      title: "Clients Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    },
    {
      name: "jobsImage",
      title: "Jobs Image",
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
