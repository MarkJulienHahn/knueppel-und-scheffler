import { defineType } from "sanity";
// import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "kunden",
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
    // orderRankField({ type: "clients" }),
  ],
  orderings: [
    {
      title: "Name Aufsteigend",
      name: "nameAsc",
      by: [{ field: "client", direction: "asc" }],
    },
    {
      title: "Name Absteigend",
      name: "nameDesc",
      by: [{ field: "client", direction: "desc" }],
    },
  ],
  defaultOrdering: {
    name: 'nameAsc', // Set the default ordering here
  },
});
