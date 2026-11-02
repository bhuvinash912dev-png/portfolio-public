"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  title: "Portfolio Admin",
  projectId: projectId || "missing",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            // Profile is a singleton: always opens the one document with id "profile".
            S.listItem().title("Profile").id("profile").child(S.document().schemaType("profile").documentId("profile")),
            // Drag the handles in this list to set the order projects appear on the site.
            orderableDocumentListDeskItem({ type: "project", title: "Projects", S, context }),
          ]),
    }),
  ],
  document: {
    newDocumentOptions: (prev) => prev.filter((t) => t.templateId !== "profile"),
    actions: (prev, { schemaType }) =>
      schemaType === "profile" ? prev.filter(({ action }) => action !== "delete" && action !== "duplicate" && action !== "unpublish") : prev,
  },
});
