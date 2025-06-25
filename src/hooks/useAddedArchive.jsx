import { useToast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast";
import axios from "axios";
import { useState } from "react";

export default function useAddedArchived() {
  const { toast } = useToast();
  const [archived, setArchived] = useState(false);

  const handleAddArchive = async (jobId) => {
    console.log("hooks", jobId);
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
        setArchived(true);
        toast({
          title: "Success",
          description: res?.data?.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to sign in",
        description: error?.response?.data?.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return { handleAddArchive, archived };
}
