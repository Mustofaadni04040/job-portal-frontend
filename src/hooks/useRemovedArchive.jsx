import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function useRemovedArchive() {
  const [removedArchive, setRemovedArchive] = useState(false);
  const { toast } = useToast();

  const handleRemoveArchive = async (jobId) => {
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_BOOKMARK_API_END_POINT
        }/remove-bookmark/${jobId}`,
        {
          withCredentials: true,
        }
      );

      console.log(res);

      if (res.data.success) {
        setRemovedArchive(true);
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

  return { removedArchive, handleRemoveArchive };
}
