export type PressEntry = {
  slug: string;
  kind: "Award" | "Press" | "Feature";
  title: string;
  publication?: string;
  date: string;
  readMinutes?: number;
  excerpt: string;
  image: string;
  size: "lg" | "md" | "sm";
};

export const press: PressEntry[] = [
  {
    slug: "aia-honor-award-2025",
    kind: "Award",
    title: "AIA San Francisco Honor Award · Roof of the Year",
    date: "May 2025",
    readMinutes: 4,
    excerpt:
      "Meridian's standing-seam zinc commission above the Presidio receives the chapter's first roofing-specific honor in a decade — cited for 'flawless line and an almost furniture-grade fit.'",
    image:
      "https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1800&q=80",
    size: "lg",
  },
  {
    slug: "dwell-on-craft",
    kind: "Press",
    title: "Inside the Bay Area's most exacting roofing crew",
    publication: "Dwell · Issue 142",
    date: "March 2025",
    excerpt:
      "Forty pages of process — from custom sheet-metal brake work in Meridian's Folsom Street shop to the four-person teams that hand-set every slate.",
    image:
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1400&q=80",
    size: "md",
  },
  {
    slug: "remodelista-folsom-shop",
    kind: "Feature",
    title: "The shop behind the city's quietest roofs",
    publication: "Remodelista",
    date: "November 2024",
    excerpt:
      "A studio visit to the Folsom Street workshop where every Meridian project begins — full-scale mockups, brass mock-ups, and a wall of historic samples.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    size: "sm",
  },
];

// Backward-compatible alias
export const journal = press;
