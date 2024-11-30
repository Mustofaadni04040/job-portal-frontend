import FilterJobs from "@/components/fragments/jobsPage/FilterJobs";
import Job from "@/components/fragments/jobsPage/Job";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Jobs() {
  const { allJobs } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

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

    setFilteredJobs(filtered);
  }, [allJobs, selectedFilters]);

  const handleCheckboxChange = (filterType, filterValue) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterType] || [];

      const updatedValues = currentValues.includes(filterValue)
        ? currentValues.filter((value) => value !== filterValue)
        : [...currentValues, filterValue];

      return { ...prev, [filterType]: updatedValues };
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex gap-5">
        <div className="w-[20%] mb-5">
          <FilterJobs handleCheckboxChange={handleCheckboxChange} />
        </div>
        {filteredJobs.length === 0 ? (
          <div className="w-[80%]">
            <p className="text-center text-xl font-medium">Job not found</p>
          </div>
        ) : (
          <div className="w-[80%] flex-1 h-screen overflow-y-auto mb-5">
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
