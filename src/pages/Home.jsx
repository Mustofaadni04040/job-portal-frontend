import CategoryCarousel from "@/components/fragments/homePage/CategoryCarousel";
import HeroSection from "@/components/fragments/homePage/HeroSection";
import LatestJobs from "@/components/fragments/homePage/LatestJobs";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
}
