import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({
      name: "images",
      type: "array",
      description: "Screenshots. The first image is the cover; drag to reorder. Click an image's crop icon to crop it and set its focus point.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
      options: { layout: "grid" },
    }),
    defineField({ name: "tags", title: "Stack", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    // Hidden field set by dragging projects in the Studio's "Projects" list; new projects go first.
    orderRankField({ type: "project", newItemPosition: "before" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "title", subtitle: "liveUrl", media: "images.0" },
  },
});
