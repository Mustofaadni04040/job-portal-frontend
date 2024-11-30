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
    <div>
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {categoriesCarousel.map((category, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
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
    </div>
  );
}
