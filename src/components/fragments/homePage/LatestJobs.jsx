import LatestJobCards from "@/components/elements/LatestJobCards";
import { Button } from "@/components/ui/button";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
export default function LatestJobs() {
  return (
    <div className="w-full max-w-5xl mx-auto my-28">
      <h1 className="text-3xl font-medium">
        <span className="text-primary">Latest & Top Jobs</span> Opening
      </h1>
      <div className="grid grid-cols-3 gap-5 my-5">
        {randomJobs.slice(0, 6).map((_, index) => (
          <LatestJobCards key={index} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
