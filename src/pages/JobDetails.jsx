import JobDetailsDescription from "@/components/fragments/jobDetailsPage/JobDetailsDescription";
import SimillarJobs from "@/components/fragments/jobDetailsPage/SimillarJobs";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { setApplied, setDetailJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function JobDetails() {
  const params = useParams();
  const _id = params.id;
  const { user } = useSelector((store) => store.auth);
  const { allJobs } = useSelector((store) => store.job);
  const { detailJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { applied } = useSelector((store) => store.job);
  const { toast } = useToast();
  const [simillarJobs, setSimillarJobs] = useState([]);

  const handleApplyJob = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APPLICATION_API_END_POINT}/apply/${_id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setApplied(true));
        toast({
          title: "Success",
          description: res?.data?.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to appy job",
        description: error?.response?.data?.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_JOB_API_END_POINT}/get-job/${_id}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setDetailJob(res.data.job));
          dispatch(
            setApplied(
              res.data.job.applications.some(
                (application) => application.applicant === user?._id
              ) // make sure the state sync with fetch single job
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [dispatch, _id, user?._id]);

  useEffect(() => {
    const filterSimillarJobs = () => {
      const simillar = allJobs.filter((job) =>
        job?.requirements?.some((requirement) =>
          user?.profile?.skills?.some(
            (skill) =>
              skill?.trim().toLowerCase() === requirement?.trim().toLowerCase()
          )
        )
      );
      setSimillarJobs(simillar);
    };
    filterSimillarJobs();
  }, [allJobs, user?.profile?.skills]);

  return (
    <div className="max-w-7xl mx-auto my-5">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <JobDetailsDescription
            detailJob={detailJob}
            applied={applied}
            handleApplyJob={handleApplyJob}
          />
        </div>
        {user &&
          (simillarJobs.length === 0 ? (
            <div className="col-span-1 bg-slate-50 border border-slate-200 p-5 rounded-xl">
              <h1 className="text-lg font-bold mb-3">Sesuai Kemampuan Anda</h1>
              <img
                src="/not-found-logo.png"
                alt="not-found-logo"
                className="w-72 h-auto mx-auto"
              />
              <p className="text-center text-sm font-semibold">
                Update skill anda untuk mendapatkan rekomendasi
              </p>
            </div>
          ) : (
            <div className="col-span-1 bg-slate-50 border border-slate-200 p-5 rounded-xl">
              <h1 className="text-lg font-bold mb-3">Sesuai Kemampuan Anda</h1>
              <div className="flex flex-col gap-3">
                {simillarJobs.map((data, index) => (
                  <SimillarJobs key={index} data={data} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
