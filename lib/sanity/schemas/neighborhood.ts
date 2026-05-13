export default {
  name: "neighborhood",
  title: "Neighborhood",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "region",
      title: "Region",
      type: "string",
      description: "e.g. Summerlin, Henderson, West Valley",
    },
    {
      name: "medianPrice",
      title: "Median price (display)",
      type: "string",
      description: "Formatted string, e.g. $4.8M",
    },
    {
      name: "image",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    },
    {
      name: "blurb",
      title: "Blurb",
      type: "text",
      rows: 3,
    },
    {
      name: "order",
      title: "Sort order",
      type: "number",
    },
  ],
  preview: { select: { title: "name", subtitle: "region", media: "image" } },
};
