import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", hidden: true },

    { name: "street", title: "Street, Nr", type: "string" },

    { name: "zip", title: "ZIP", type: "string" },
    { name: "city", title: "City", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "email", title: "Email", type: "string" },
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          name: "zip",
          title: "ZIP",
          type: "object",
          fields: [
            { name: "title", title: "Link Name", type: "string" },
            { name: "link", title: "Link", type: "url" },
          ],
        },
      ],
    },
  ],
});
