import JobsTable from "@/components/fragments/recruiter/JobsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetRecruiterJobs } from "@/hooks/useGetRecruiterJobs";
import { setSearchJob } from "@/redux/jobSlice";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RecruiterJobs() {
  useGetRecruiterJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

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
      <JobsTable />
    </div>
  );
}
