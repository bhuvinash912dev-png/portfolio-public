import { defineField, defineType } from "sanity";

// Singleton (document id "profile"), opened from the "Profile" item in the Studio sidebar.
export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "photo",
      type: "image",
      description: "Shown in the hero and navbar. Click the crop icon to crop, and drag the circle onto your face to set the focus point.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { media: "photo" },
    prepare: ({ media }) => ({ title: "Profile", media }),
  },
});
