import CategoryCarousel from "@/components/fragments/homePage/CategoryCarousel";
import HeroSection from "@/components/fragments/homePage/HeroSection";
import LatestJobs from "@/components/fragments/homePage/LatestJobs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/recruiter/companies");
    }
  }, [navigate, user?.role]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
}
