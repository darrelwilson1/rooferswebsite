import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/ui/Nav";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#0E0E0C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — ${site.company.title}`,
    template: `%s · ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "San Francisco roofing contractor",
    "Bay Area roofing",
    "standing seam metal roof",
    "slate roof restoration",
    "copper roofing",
    "cedar shake roof",
    "GAF Master Elite",
    "Marin roofing",
    "Napa roofing",
    "Meridian Roofworks",
  ],
  authors: [{ name: site.company.name }],
  creator: site.company.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.brand,
    title: `${site.brand} — ${site.company.title}`,
    description: site.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: site.brand,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.brand,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const roofingContractorSchema = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: site.company.name,
  image: `${site.url}/og.jpg`,
  url: site.url,
  telephone: site.company.phone,
  email: site.company.email,
  priceRange: "$$$$",
  foundingDate: String(site.company.foundedYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: "1428 Folsom Street",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94103",
    addressCountry: "US",
  },
  areaServed: [
    "San Francisco",
    "Marin County",
    "Sonoma County",
    "Napa County",
    "Berkeley",
    "Oakland",
    "Sausalito",
  ],
  knowsAbout: [
    "Standing seam metal roofing",
    "Natural slate roofing",
    "Copper and zinc roofing",
    "Cedar shake and shingle",
    "Historic roof restoration",
    "Storm response and repair",
  ],
  hasCredential: [
    "GAF Master Elite",
    "CertainTeed SELECT ShingleMaster",
    "California C-39 License",
  ],
  sameAs: [site.company.instagram, site.company.linkedin],
  brand: { "@type": "Brand", name: site.brand },
  openingHours: "Mo-Fr 07:00-18:00",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(roofingContractorSchema),
          }}
        />
      </head>
      <body className="bg-ink text-bone antialiased">
        <LenisProvider>
          <Cursor />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-bone focus:text-ink focus:px-4 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
