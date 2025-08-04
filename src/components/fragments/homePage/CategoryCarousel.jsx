import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { setSearchQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const categoriesCarousel = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Graphic Designer",
  "Data Science",
];
export default function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchJobs = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <Carousel className="w-full max-w-[230px] mx-auto md:max-w-xl">
      <CarouselContent>
        {categoriesCarousel?.map((category, index) => (
          <CarouselItem key={index} className="basis-2/1 md:basis-1/3">
            <Button
              onClick={() => handleSearchJobs(category)}
              className="min-w-40 rounded-full"
              variant="outline"
            >
              {category}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
