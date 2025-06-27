import Breadcrumbs from "@/components/fragments/Breadcrumb";
import JobSkeleton from "@/components/fragments/JobSkeleton";
import Job from "@/components/fragments/jobsPage/Job";
import { Button } from "@/components/ui/button";
import { setGetArchived } from "@/redux/jobSlice";
import { getData } from "@/utils/fetch";
import debounce from "debounce-promise";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Browse() {
  const debouncedGetData = useMemo(() => debounce(getData, 1000), []);
  const [loading, setLoading] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(6);
  const dispatch = useDispatch();
  const [browseJobs, setBrowseJobs] = useState([]);
  const { searchQuery } = useSelector((store) => store.job);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);

      const params = {
        keyword: searchQuery || "",
      };

      try {
        const res = await debouncedGetData(
          `${import.meta.env.VITE_JOB_API_END_POINT}/get-jobs`,
          params,
          null,
          true
        );

        if (res.data.success) {
          setSkeletonCount(res?.data?.jobs?.length);
          setBrowseJobs(res?.data?.jobs);
          dispatch(setGetArchived(res?.data?.archived.map((item) => item._id)));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [debouncedGetData, dispatch, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto my-10 min-h-screen">
      <Breadcrumbs textSecond="Pencarian" textThird={searchQuery} />
      <h1 className="text-lg font-medium mb-5 mt-10 text-slate-600">
        Hasil pencarian untuk{" "}
        <span className="text-primary">{searchQuery}</span> (
        <span className="font-bold">{browseJobs.length}</span>)
      </h1>

      {browseJobs.length === 0 && !loading && (
        <div className="flex flex-col items-center">
          <img
            src="/not-found-logo.png"
            alt="not-found-logo"
            className="w-96 h-96"
          />
          <p className="text-center text-xl">
            Maaf, pekerjaan yang kamu cari belum ada nih 🙏😊
          </p>
          <Button
            variant="secondary"
            className="mt-5 bg-primary bg-opacity-10 hover:bg-opacity-10 hover:bg-primary text-primary"
            onClick={() => navigate("/all-jobs")}
          >
            Show all jobs
          </Button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-3 gap-5 my-5">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <JobSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {browseJobs.map((data, index) => (
            <Job key={`${data?._id}-${index}`} data={data} />
          ))}
        </div>
      )}
    </div>
  );
}
