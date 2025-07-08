import Search from "@/components/elements/Search";
import Breadcrumbs from "@/components/fragments/Breadcrumb";
import DrawerFilter from "@/components/fragments/DrawerFilter";
import JobSkeleton from "@/components/fragments/JobSkeleton";
import FilterJobs from "@/components/fragments/jobsPage/FilterJobs";
import Job from "@/components/fragments/jobsPage/Job";
import { Button } from "@/components/ui/button";
import useMobile from "@/hooks/useMobile";
import { setAllJobs, setGetArchived } from "@/redux/jobSlice";
import { isFilterEmpty } from "@/utils/emptyFilter";
import { getData } from "@/utils/fetch";
import debounce from "debounce-promise";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const { allJobs } = useSelector((store) => store.job);
  const [sortFilterJobs, setSortFilterJobs] = useState("");
  const [input, setInput] = useState("");
  const [skeletonCount, setSkeletonCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    Salary: [],
    Location: [],
    "Job Type": [],
    "Experience Level": [],
  });
  const [limit, setLimit] = useState(6);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchLocation, setSearchLocation] = useState("");
  const dispatch = useDispatch();
  const debouncedGetData = useMemo(() => debounce(getData, 1000), []);
  const navigate = useNavigate();
  const isMobile = useMobile();

  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams();

    if (input) params.set("keyword", input);
    if (searchLocation) params.set("location", searchLocation);
    if (selectedFilter.Location.length > 0)
      params.set("location", selectedFilter.Location);
    if (selectedFilter["Job Type"].length > 0)
      params.set("jobType", selectedFilter["Job Type"]);
    if (selectedFilter["Experience Level"].length > 0)
      params.set("experience", selectedFilter["Experience Level"]);
    if (selectedFilter.Salary.length > 0)
      params.set(
        "salary",
        selectedFilter.Salary.map((item) => `${item.min}-${item.max}`)
      );
    if (sortFilterJobs) params.set("sortBy", sortFilterJobs);

    navigate(`/all-jobs?${params.toString()}`);
  }, [input, navigate, searchLocation, selectedFilter, sortFilterJobs]);

  useEffect(() => {
    updateSearchParams();
    const fetchAllJobs = async () => {
      setLoading(true);
      const salaryMin = selectedFilter.Salary.map((item) => item.min);
      const salaryMax = selectedFilter.Salary.map((item) => item.max);

      try {
        const params = {
          keyword: input || "",
          location: selectedFilter.Location?.join(",") || searchLocation || "",
          jobType: selectedFilter?.["Job Type"].join(",") || "",
          experienceLevel: selectedFilter?.["Experience Level"].join(",") || "",
          sortBy: sortFilterJobs || "",
          limit,
          salaryMin,
          salaryMax,
        };
        const res = await debouncedGetData(
          `${import.meta.env.VITE_JOB_API_END_POINT}/get-jobs`,
          params,
          null,
          true
        );

        if (res.data.success) {
          setSkeletonCount(res?.data?.jobs?.length);
          setTotalJobs(res?.data?.total);
          dispatch(setAllJobs(res?.data?.jobs));
          dispatch(setGetArchived(res?.data?.archived.map((item) => item._id)));
        }
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
    limit,
    searchLocation,
    selectedFilter,
    selectedFilter.Location,
    sortFilterJobs,
    updateSearchParams,
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
    <div className="mb-10">
      <div className="w-full px-5 md:max-w-7xl mx-auto my-10">
        <Breadcrumbs />
      </div>
      <div className="w-full px-5 md:max-w-5xl mx-auto">
        <div className="flex flex-col gap-5">
          {isMobile ? (
            <div className="grid grid-cols-6 gap-1">
              <Search
                classname="col-span-5"
                setInput={setInput}
                placeholder="Cari pekejeraan impianmu disini..."
                id="search-job"
              />
              <DrawerFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                handleResetFilter={handleResetFilter}
                setSkeletonCount={setSkeletonCount}
                updateSearchParams={updateSearchParams}
              />
            </div>
          ) : (
            <FilterJobs
              handleResetFilter={handleResetFilter}
              setSortFilterJobs={setSortFilterJobs}
              setSelectedFilter={setSelectedFilter}
              selectedFilter={selectedFilter}
              setSearchLocation={setSearchLocation}
              setInput={setInput}
            />
          )}
          {allJobs.length === 0 && (
            <div className="flex flex-col items-center">
              <img
                src="/not-found-logo.png"
                alt="not-found-logo"
                className="w-80 h-80 md:w-96 md:h-96"
              />
              <p className="text-center text-sm md:text-base lg:text-xl">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                {allJobs.map((data, index) => (
                  <Job key={index} data={data} />
                ))}
              </>
            )}
          </div>

          {!loading && isFilterEmpty(selectedFilter) && input.length === 0 && (
            <div className="w-full flex justify-center">
              <Button
                className="text-xs md:text-sm rounded-full bg-primary bg-opacity-10 shadow-sm font-bold text-primary hover:bg-primary hover:bg-opacity-10"
                onClick={() =>
                  limit < totalJobs ? setLimit(limit + 6) : setLimit(limit - 6)
                }
              >
                {limit < totalJobs ? "Lebih Banyak" : "Lebih Sedikit"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
