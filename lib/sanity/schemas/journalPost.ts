export default {
  name: "journalPost",
  title: "Journal Post",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule: any) => Rule.required().max(140),
    },
    {
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: ["Journal", "Press", "Feature"],
        layout: "radio",
      },
      initialValue: "Journal",
    },
    {
      name: "publication",
      title: "Publication (for press)",
      type: "string",
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "readMinutes",
      title: "Read time (minutes)",
      type: "number",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    },
    {
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    },
    {
      name: "size",
      title: "Layout size",
      type: "string",
      description:
        "Determines magazine layout weight: lg = lead, md = medium, sm = side column.",
      options: { list: ["lg", "md", "sm"], layout: "radio" },
      initialValue: "md",
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publication", media: "coverImage" },
  },
};
