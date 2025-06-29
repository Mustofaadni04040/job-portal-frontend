import Breadcrumbs from "@/components/fragments/Breadcrumb";
import JobSkeleton from "@/components/fragments/JobSkeleton";
import SavedJobsCard from "@/components/fragments/savedJobsPage/SavedJobsCard";
import { Button } from "@/components/ui/button";
import { setSavedJobs } from "@/redux/jobSlice";
import { getData } from "@/utils/fetch";
import debounce from "debounce-promise";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SavedJobs() {
  const debouncedGetData = useMemo(() => debounce(getData, 1000), []);
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(6);

  useEffect(() => {
    setLoading(true);
    const fetchSavadJobs = async () => {
      try {
        const res = await debouncedGetData(
          `${import.meta.env.VITE_BOOKMARK_API_END_POINT}/get-bookmarks`,
          "",
          null,
          true
        );

        if (res.data.success) {
          dispatch(setSavedJobs(res?.data?.bookmarks));
          setSkeletonCount(res?.data?.bookmarks?.length);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavadJobs();
  }, [debouncedGetData, dispatch]);
  return (
    <>
      <div className="max-w-7xl mx-auto mt-10">
        <Breadcrumbs textSecond="Lowongan Tersimpan" />
      </div>

      {savedJobs.length === 0 && !loading && (
        <div className="max-w-5xl mx-auto my-10">
          <div className="flex flex-col items-center">
            <img
              src="/not-found-logo.png"
              alt="not-found-logo"
              className="w-96 h-96"
            />
            <p className="text-center text-xl">
              Belum ada lowongan yang kamu simpan nih!
            </p>
            <Button className="bg-primary hover:bg-[#e7407d] mt-5">
              <a href={`/all-jobs`}>Lihat semua lowongan</a>
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto my-10">
        <div className="grid grid-cols-3 gap-5">
          {loading ? (
            <>
              {Array.from({
                length: skeletonCount,
              }).map((_, index) => (
                <JobSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {savedJobs.map((data, index) => (
                <SavedJobsCard key={index} data={data.job} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
