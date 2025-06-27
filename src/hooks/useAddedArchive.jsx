import { useToast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast";
import { setArchived } from "@/redux/jobSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function useAddedArchived() {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleAddArchive = async (jobId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BOOKMARK_API_END_POINT}/add-bookmark`,
        { jobId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setArchived(true));
        toast({
          title: "Success",
          description: res?.data?.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to add saved job",
        description: error?.response?.data?.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return { handleAddArchive };
}
