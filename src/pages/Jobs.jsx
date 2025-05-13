import FilterJobs from "@/components/fragments/jobsPage/FilterJobs";
import Job from "@/components/fragments/jobsPage/Job";
import { Button } from "@/components/ui/button";
import { setSearchJob } from "@/redux/jobSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Jobs() {
  const { allJobs } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortFilterJobs, setSortFilterJobs] = useState("");
  const [input, setInput] = useState("");
  const { searchJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const sortJobs = (jobs, sortBy) => {
    if (sortBy === "highestSalary") {
      return [...jobs].sort((a, b) => b.salary - a.salary);
    }

    if (sortBy === "latestPost") {
      return [...jobs].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return jobs;
  };

  useEffect(() => {
    dispatch(setSearchJob(input));
  }, [dispatch, input]);

  useEffect(() => {
    const searchJobs =
      allJobs?.length > 0 &&
      allJobs?.filter((job) => {
        if (!searchJob) {
          return true;
        }

        return (
          job?.company?.name?.toLowerCase().includes(searchJob.toLowerCase()) ||
          job?.title?.toLowerCase().includes(searchJob.toLowerCase())
        );
      });
    setFilteredJobs(searchJobs);
  }, [allJobs, searchJob]);

  useEffect(() => {
    let filtered = allJobs;

    if (selectedFilters.Location && selectedFilters.Location.length > 0) {
      filtered = filtered.filter((job) =>
        selectedFilters.Location.includes(job.location)
      );
    }

    if (selectedFilters.Salary && selectedFilters.Salary.length > 0) {
      filtered = filtered.filter((job) => {
        return selectedFilters.Salary.some((range) => {
          const [min, max] = range.split("-");
          return job.salary >= parseInt(min) && job.salary <= parseInt(max);
        });
      });
    }

    if (selectedFilters["Job Type"] && selectedFilters["Job Type"].length > 0) {
      filtered = filtered.filter((job) =>
        selectedFilters["Job Type"].includes(job.jobType)
      );
    }

    if (
      selectedFilters["Experience Level"] &&
      selectedFilters["Experience Level"].length > 0
    ) {
      filtered = filtered.filter((job) =>
        selectedFilters["Experience Level"].includes(job.experienceLevel)
      );
    }

    const sorted = sortJobs(filtered, sortFilterJobs);

    setFilteredJobs(sorted);
  }, [allJobs, selectedFilters, sortFilterJobs]);

  const handleCheckboxChange = (filterType, filterValue) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterType] || [];

      const updatedValues = currentValues.includes(filterValue)
        ? currentValues.filter((value) => value !== filterValue)
        : [...currentValues, filterValue];

      return { ...prev, [filterType]: updatedValues };
    });
  };

  const handleResetFilter = () => {
    setSelectedFilters({});
    setFilteredJobs(allJobs);
  };

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex flex-col gap-5">
        <div className="">
          <FilterJobs
            handleCheckboxChange={handleCheckboxChange}
            handleResetFilter={handleResetFilter}
            setSortFilterJobs={setSortFilterJobs}
            setInput={setInput}
          />
        </div>
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center">
            <img
              src="/not-found-logo.png"
              alt="not-found-logo"
              className="w-96 h-96"
            />
            <p className="text-center text-xl">
              The job that you are looking for is not available 🙏😊
            </p>
            <Button
              variant="secondary"
              className="mt-5 bg-primary bg-opacity-10 hover:bg-opacity-10 hover:bg-primary text-primary"
              onClick={handleResetFilter}
            >
              Show all jobs
            </Button>
          </div>
        ) : (
          <div className="">
            <div className="grid grid-cols-3 gap-5">
              {filteredJobs.map((data, index) => (
                <Job key={index} data={data} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
