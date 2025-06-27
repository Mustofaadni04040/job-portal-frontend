import axios from "axios";
import { useToast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useDispatch } from "react-redux";
import { addArchivedJob, removeArchivedJob } from "@/redux/jobSlice";

export default function useSavedJobs() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAddArchive = async (jobId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BOOKMARK_API_END_POINT}/add-bookmark`,
        { jobId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(addArchivedJob(jobId));
        toast({ title: "Success", description: res.data.message });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save job",
        description: error?.response?.data?.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleRemoveArchive = async (jobId) => {
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_BOOKMARK_API_END_POINT
        }/remove-bookmark/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(removeArchivedJob(jobId));
        toast({ title: "Success", description: res.data.message });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to remove saved job",
        description: error?.response?.data?.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return { handleAddArchive, handleRemoveArchive };
}
