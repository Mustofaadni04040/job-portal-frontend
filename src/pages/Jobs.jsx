import JobSkeleton from "@/components/fragments/JobSkeleton";
import FilterJobs from "@/components/fragments/jobsPage/FilterJobs";
import Job from "@/components/fragments/jobsPage/Job";
import { Button } from "@/components/ui/button";
import { setAllJobs } from "@/redux/jobSlice";
import { getData } from "@/utils/fetch";
import debounce from "debounce-promise";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Jobs() {
  const { allJobs } = useSelector((store) => store.job);
  const [sortFilterJobs, setSortFilterJobs] = useState("");
  const [input, setInput] = useState("");
  const { searchQuery } = useSelector((store) => store.job);
  const [skeletonCount, setSkeletonCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    Location: [],
    Salary: [],
    "Job Type": [],
    "Experience Level": [],
  });
  const [searchLocation, setSearchLocation] = useState("");
  const dispatch = useDispatch();
  const debouncedGetData = useMemo(() => debounce(getData, 1000), []);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      try {
        const params = {
          keyword: input || "",
          location: selectedFilter.Location?.join(",") || searchLocation || "",
          jobType: selectedFilter?.["Job Type"].join(",") || "",
          experienceLevel: selectedFilter?.["Experience Level"].join(",") || "",
        };
        const res = await debouncedGetData("/get-jobs", params);

        setSkeletonCount(res?.data?.jobs?.length);
        dispatch(setAllJobs(res?.data?.jobs));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [
    debouncedGetData,
    dispatch,
    input,
    searchLocation,
    selectedFilter,
    selectedFilter.Location,
  ]);

  const handleResetFilter = () => {
    setSelectedFilter({
      Location: [],
      Salary: [],
      "Job Type": [],
      "Experience Level": [],
    });
    setSearchLocation("");
  };

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex flex-col gap-5">
        <div className="">
          <FilterJobs
            handleResetFilter={handleResetFilter}
            setSortFilterJobs={setSortFilterJobs}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            setSearchLocation={setSearchLocation}
            setInput={setInput}
          />
        </div>
        {allJobs.length === 0 && (
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
              onClick={handleResetFilter}
            >
              Show all jobs
            </Button>
          </div>
        )}
        {loading ? (
          <div className="grid grid-cols-3 gap-5">
            {Array.from({ length: skeletonCount < 6 ? 6 : skeletonCount }).map(
              (_, index) => (
                <JobSkeleton key={index} />
              )
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {allJobs.map((data, index) => (
              <Job key={index} data={data} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
