import { defineField, defineType } from "sanity"
import { ImageIcon } from "@sanity/icons"

export const galleryCategoryType = defineType({
  name: "galleryCategory",
  title: "Gallery Category",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      description: "Example: Illustration, Photography, Branding",
    }),
    defineField({
      name: "projectDate",
      title: "Date",
      type: "string",
      description: "Example: March 2025",
    }),
    defineField({
      name: "summary",
      title: "Short Summary (right side text)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Main Project Image (top large image)",
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
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "projectType",
    },
  },
})