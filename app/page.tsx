import { Hero } from "@/app/components/home/hero";
import { FeaturedCollection } from "@/app/components/home/featured-collection";
import { CategoryGrid } from "@/app/components/home/category-grid";
import { RepCta } from "@/app/components/home/rep-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <CategoryGrid />
      <RepCta />
    </>
  );
}
