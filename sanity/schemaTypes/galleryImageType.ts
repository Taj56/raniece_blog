import { defineField, defineType } from "sanity"
import { ImageIcon } from "@sanity/icons"

export const galleryImageType = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title (optional)",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "galleryCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      categoryTitle: "category.title",
    },
    prepare({ title, media, categoryTitle }) {
      return {
        title: title || "Gallery Image",
        subtitle: categoryTitle ? `Category: ${categoryTitle}` : "No category",
        media,
      }
    },
  },
})