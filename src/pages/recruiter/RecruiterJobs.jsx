import PaginationComponent from "@/components/fragments/Pagination";
import JobsTable from "@/components/fragments/recruiter/JobsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAllRecruiterJobs, setSearchJob } from "@/redux/jobSlice";
import { getData } from "@/utils/fetch";
import debounce from "debounce-promise";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RecruiterJobs() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(5);
  const debouncedGetData = useMemo(() => debounce(getData, 1000), []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, seetTotalPages] = useState(1);
  const { allRecruiterJobs } = useSelector((store) => store.job);
  console.log(allRecruiterJobs);

  useEffect(() => {
    const fetchRecruiterJobs = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: 5,
        };
        const res = await debouncedGetData(
          "/get-admin-jobs",
          params,
          null,
          true
        );

        if (res.data.success) {
          dispatch(setAllRecruiterJobs(res.data.jobs));
          seetTotalPages(res.data.pages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiterJobs();
  }, [dispatch, debouncedGetData, currentPage]);

  useEffect(() => {
    dispatch(setSearchJob(input));
  }, [dispatch, input]);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <Input
          className="max-w-60"
          placeholder="Filter by company name or role"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          className="flex items-center gap-2 bg-primary hover:bg-[#e7407d]"
          onClick={() => navigate("/recruiter/jobs/create")}
        >
          <Plus />
          New Job
        </Button>
      </div>
      <JobsTable loading={loading} />

      {allRecruiterJobs.length > 0 && (
        <PaginationComponent
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
