import LatestJobCards from "@/components/fragments/homePage/LatestJobCards";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full max-w-5xl mx-auto my-28">
      <h1 className="text-3xl font-medium">
        <span className="text-primary">Lowongan</span> Terbaru
      </h1>
      {allJobs.length === 0 ? (
        <p className="text-center text-xl font-medium my-5">
          Tidak ada lowongan terbaru
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-5 my-5">
          {allJobs.slice(0, 6).map((data, index) => (
            <LatestJobCards key={`${data?._id}-${index}`} data={data} />
          ))}
        </div>
      )}
      {allJobs.length && (
        <div className="w-full flex justify-center">
          <Button variant="outline">
            <a href="/all-jobs">Lihat Semua</a>
          </Button>
        </div>
      )}
    </div>
  );
}
