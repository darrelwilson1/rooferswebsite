export type Material = {
  slug: string;
  name: string;
  region: string;
  medianPrice: string;
  count: number;
  image: string;
  blurb: string;
};

// "Materials" — the six roofing systems Meridian installs.
// Schema kept compatible with existing components.
export const materials: Material[] = [
  {
    slug: "standing-seam",
    name: "Standing Seam Metal",
    region: "Zinc · Copper · Steel",
    medianPrice: "80–100 yr",
    count: 64,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
    blurb:
      "Continuous, mechanically-seamed panels rolled on site. The cleanest line in the trade — chosen for low-slope contemporary architecture.",
  },
  {
    slug: "natural-slate",
    name: "Natural Slate",
    region: "Welsh · Vermont · Spanish",
    medianPrice: "100+ yr",
    count: 21,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    blurb:
      "Hand-split slate from the quarries that have supplied roofs for three centuries. Graduated, random, or coursed — set by a four-person crew.",
  },
  {
    slug: "clay-tile",
    name: "Clay & Concrete Tile",
    region: "Mission · Flat · Barrel",
    medianPrice: "75 yr",
    count: 38,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    blurb:
      "Authentic terracotta and concrete profiles, often salvaged from de-roof projects across Spain and Italy and re-laid here in California.",
  },
  {
    slug: "cedar-shake",
    name: "Cedar Shake & Shingle",
    region: "Alaskan Yellow · Western Red",
    medianPrice: "40 yr",
    count: 29,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    blurb:
      "Class-A fire-rated cedar — factory pressure-treated, field-installed with stainless fasteners. WUI-compliant for every California fire zone.",
  },
  {
    slug: "architectural-asphalt",
    name: "Architectural Asphalt",
    region: "Designer · Luxury",
    medianPrice: "50 yr",
    count: 142,
    image:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1600&q=80",
    blurb:
      "GAF, CertainTeed, and Malarkey designer profiles. We are Master Elite installers — the top 2% of contractors nationwide.",
  },
  {
    slug: "flat-membrane",
    name: "Flat Membrane Systems",
    region: "TPO · EPDM · PVC",
    medianPrice: "30 yr",
    count: 47,
    image:
      "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&q=80",
    blurb:
      "Heat-welded single-ply membranes for low-slope contemporary homes and decks. Concealed drains and tapered insulation, sealed without a seam in sight.",
  },
];

// Backward-compatible alias for existing imports
export const neighborhoods = materials;
