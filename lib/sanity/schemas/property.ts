// Sanity schema stub for Property documents.
// Drop into a Sanity Studio (v3) `schemas/` directory and register in the
// `schemaTypes` array. No backend wiring required for the marketing site to
// render — wire up `next-sanity` and a GROQ fetch later.

export default {
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Property name",
      type: "string",
      description: "e.g. The Promontory, Ridge House, Sky Villa 47",
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Available", "Reserved", "Private Offering", "Sold"],
        layout: "radio",
      },
    },
    {
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "neighborhood",
      title: "Neighborhood",
      type: "reference",
      to: [{ type: "neighborhood" }],
    },
    {
      name: "specs",
      title: "Specs",
      type: "object",
      fields: [
        { name: "beds", type: "number", title: "Bedrooms" },
        { name: "baths", type: "number", title: "Bathrooms" },
        { name: "sqft", type: "number", title: "Square feet" },
        { name: "acres", type: "number", title: "Lot acres" },
        { name: "year", type: "number", title: "Year built" },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
    },
    {
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt text", type: "string" },
        { name: "caption", title: "Caption", type: "string" },
      ],
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    },
    {
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first in the featured carousel.",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "neighborhood.name", media: "heroImage" },
  },
};
