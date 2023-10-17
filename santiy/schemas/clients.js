import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "clients",
  title: "Clients",
  type: "document",
  fields: [
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "link",
      title: "Link",
      type: "url",
    },
    orderRankField({ type: "clients" }),
  ],
});
