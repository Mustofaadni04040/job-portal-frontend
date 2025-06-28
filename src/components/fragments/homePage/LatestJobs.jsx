import LatestJobCards from "@/components/fragments/homePage/LatestJobCards";
import { Button } from "@/components/ui/button";
import { setGetArchived } from "@/redux/jobSlice";
import { getData } from "@/utils/fetch";
import debounce from "debounce-promise";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import JobSkeleton from "../JobSkeleton";

export default function LatestJobs() {
  const debouncedGetData = useMemo(() => debounce(getData, 1000), []);
  const [loading, setLoading] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(6);
  const dispatch = useDispatch();
  const [latestJobs, setLatestJobs] = useState([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);

      try {
        const res = await debouncedGetData(
          `${import.meta.env.VITE_JOB_API_END_POINT}/get-jobs`,
          "",
          null,
          true
        );

        if (res.data.success) {
          setSkeletonCount(res?.data?.jobs?.length);
          setLatestJobs(res?.data?.jobs);
          dispatch(setGetArchived(res?.data?.archived.map((item) => item._id)));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [debouncedGetData, dispatch]);

  return (
    <div className="w-full px-5 mx-auto my-28 md:max-w-5xl">
      <h1 className="text-xl md:text-3xl font-medium">
        <span className="text-primary">Lowongan</span> Terbaru
      </h1>
      {latestJobs.length === 0 && !loading && (
        <p className="text-center text-xl font-medium mt-10 mb-5">
          Tidak ada lowongan terbaru
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-3 gap-5 my-5">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <JobSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-0 my-5 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestJobs.map((data, index) => (
            <LatestJobCards key={`${data?._id}-${index}`} data={data} />
          ))}
        </div>
      )}

      {latestJobs.length > 0 && (
        <div className="w-full flex justify-center">
          <Button variant="outline">
            <a href="/all-jobs">Lihat Semua</a>
          </Button>
        </div>
      )}
    </div>
  );
}
