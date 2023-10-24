import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const myStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "header",
        title: "Header",
        S,
        context,
      }),

      S.divider(),

      orderableDocumentListDeskItem({
        type: "projects",
        title: "Projects",
        S,
        context,
      }),

      S.divider(),

      S.listItem()
        .title("About")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),

      orderableDocumentListDeskItem({
        type: "clients",
        title: "Clients",
        S,
        context,
      }),
      
      S.listItem()
        .title("Clients")
        .schemaType("clients")
        .child(
          S.documentList()
            .title("Clients")
            .filter('_type == "clients"')
        ),

      orderableDocumentListDeskItem({
        type: "jobs",
        title: "Jobs",
        S,
        context,
      }),

      S.divider(),

      S.listItem()
        .title("Imprint")
        .id("imprint")
        .child(S.document().schemaType("imprint").documentId("imprint")),

      S.listItem()
        .title("Privacy")
        .id("privacy")
        .child(S.document().schemaType("privacy").documentId("privacy")),
    ]);
