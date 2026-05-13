import { Hero } from "@/components/sections/Hero";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { Philosophy } from "@/components/sections/Philosophy";
import { Neighborhoods } from "@/components/sections/Neighborhoods";
import { Journal } from "@/components/sections/Journal";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedListings />
      <Philosophy />
      <Neighborhoods />
      <Journal />
      <Contact />
      <Footer />
    </>
  );
}
