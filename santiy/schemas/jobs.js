import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "jobs",
  title: "Jobs",
  type: "document",
  fields: [
    {
      name: "jobTitleEn",
      title: "Job Title English",
      type: "string",
    },
    {
      name: "jobTitleDe",
      title: "Job Title German",
      type: "string",
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
    orderRankField({ type: "jobs" }),
  ],
});
