import Job from "@/components/fragments/jobsPage/Job";
// import { useGetAllJobs } from "@/hooks/useGetAllJobs";
import { setSearchQuery } from "@/redux/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Browse() {
  // useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-lg font-medium mb-5 text-slate-500">
          Search Results: (<span className="font-bold">{allJobs.length}</span>)
        </h1>

        <div className="grid grid-cols-3 gap-5">
          {allJobs.map((data, index) => (
            <Job key={`${data?._id}-${index}`} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
