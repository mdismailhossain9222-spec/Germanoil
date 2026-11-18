import dynamicImport from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import Reach from "@/components/Reach";
import Testimonials from "@/components/Testimonials";
import SiteFooter from "@/components/SiteFooter";

// Lazy-load below-the-fold sections so the initial HTML is light and fast,
// especially on mobile. Each chunk is SSR-enabled (ssr: false would hurt SEO).
const BrandStory = dynamicImport(() => import("@/components/BrandStory"), {
  ssr: true,
});
const Quality = dynamicImport(() => import("@/components/Quality"), {
  ssr: true,
});

export const dynamic = "force-dynamic";

/** GermanOil Project — single-page premium showcase (no e-commerce). */
export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <BrandStory />
        <ProductShowcase />
        <Quality />
        <Reach />
        <Testimonials />
      </main>
      <SiteFooter />
    </>
  );
}