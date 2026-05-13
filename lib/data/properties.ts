export type Project = {
  slug: string;
  name: string;
  address: string;
  city: string;
  neighborhood: string;
  status: "Recently Completed" | "In Progress" | "Award Winner" | "Restoration";
  material: string;
  squares: number;
  pitch: string;
  duration: string;
  year: number;
  description: string;
  image: string;
  caption?: string;
};

export const projects: Project[] = [
  {
    slug: "presidio-residence",
    name: "Presidio Residence",
    address: "224 Lyon Street",
    city: "San Francisco, CA",
    neighborhood: "Pacific Heights",
    status: "Award Winner",
    material: "Standing Seam Zinc",
    squares: 86,
    pitch: "8:12",
    duration: "14 weeks",
    year: 2025,
    description:
      "A blackened zinc roof folded across a Craig Steely-designed retreat above the Presidio. Hand-soldered ridge caps, mitered hips, and a fully concealed gutter system carry water through the canopy of cypress.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80",
    caption: "Architecture by Craig Steely · Roof by Meridian",
  },
  {
    slug: "marin-headlands-house",
    name: "Headlands House",
    address: "9 Sea Cliff Way",
    city: "Sausalito, CA",
    neighborhood: "Marin County",
    status: "Recently Completed",
    material: "Welded Copper",
    squares: 64,
    pitch: "4:12",
    duration: "11 weeks",
    year: 2024,
    description:
      "A continuous copper roof — 6,400 square feet, fully welded — over a horizontal house carved into the Headlands. Designed to develop a verdigris patina within five years of coastal exposure.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2200&q=80",
    caption: "Marin Headlands · Concealed solar integration",
  },
  {
    slug: "noe-valley-victorian",
    name: "The Folsom Victorian",
    address: "1187 Castro Street",
    city: "San Francisco, CA",
    neighborhood: "Noe Valley",
    status: "Restoration",
    material: "Hand-Split Slate",
    squares: 42,
    pitch: "12:12",
    duration: "9 weeks",
    year: 2024,
    description:
      "A historically accurate slate restoration of an 1894 Stick Victorian. Every original Pennsylvania black slate was salvaged, sorted, and re-laid in a graduated coursed pattern — true to the architect's original drawings.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2200&q=80",
    caption: "Heritage SF · Approved Class A restoration",
  },
  {
    slug: "napa-vineyard-pavilion",
    name: "Vineyard Pavilion",
    address: "1700 Howell Mountain Road",
    city: "St. Helena, CA",
    neighborhood: "Napa Valley",
    status: "Award Winner",
    material: "Pre-Weathered Zinc",
    squares: 118,
    pitch: "2:12",
    duration: "16 weeks",
    year: 2023,
    description:
      "A low, single-pitched zinc roof over a Howard Backen pavilion. Eight panels run uninterrupted from ridge to eave — each 92 feet long, rolled on site, lifted by crane, and set in a single Saturday morning.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=80",
    caption: "Howard Backen, AIA · 2024 Custom Home of the Year",
  },
  {
    slug: "berkeley-modern",
    name: "Berkeley Modern",
    address: "76 Tunnel Road",
    city: "Berkeley, CA",
    neighborhood: "Berkeley Hills",
    status: "Recently Completed",
    material: "Cedar Shingle",
    squares: 51,
    pitch: "10:12",
    duration: "8 weeks",
    year: 2025,
    description:
      "Class-A fire-rated cedar over an Olle Lundberg-designed home in the Berkeley Hills. Hand-dipped Alaskan Yellow Cedar, factory fire-treated, and field-applied with stainless ringshank nails.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=80",
    caption: "Lundberg Design · WUI-compliant",
  },
  {
    slug: "sea-ranch-retreat",
    name: "Sea Ranch Retreat",
    address: "35820 Timber Cove Way",
    city: "Sea Ranch, CA",
    neighborhood: "Sonoma Coast",
    status: "In Progress",
    material: "Mechanically Seamed Steel",
    squares: 73,
    pitch: "6:12",
    duration: "12 weeks",
    year: 2026,
    description:
      "A weathering-steel roof system over a contemporary tribute to Joseph Esherick's original 1965 condominium. Designed to fail gracefully — a controlled patina meant to read as a fifty-year-old building from day one.",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2200&q=80",
    caption: "Sea Ranch Design Committee approved · 2026",
  },
];

// Backward-compatible alias for existing imports
export const properties = projects;
