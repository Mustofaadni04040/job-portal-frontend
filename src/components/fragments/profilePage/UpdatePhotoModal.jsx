import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";

export default function UpdatePhotoModal({ openModal, setOpenModal }) {
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    file: user?.profile?.profilePhoto,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleChangeFile = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_USER_API_END_POINT}/profilePhoto/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        Cookies.set("user", JSON.stringify(res.data.user));
        dispatch(setUser(res.data.user));
        toast({
          title: "Success update photo profile",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed update photo profile",
        description: error.response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
    setOpenModal(false);
  };

  return (
    <div>
      <Dialog open={openModal}>
        <DialogContent
          className="sm:max-w-[600px] [&>button]:hidden"
          onInteractOutside={() => setOpenModal(!openModal)}
        >
          <DialogHeader>
            <DialogTitle>Update Photo Profile</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file">Photo Profile</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  className="col-span-3"
                  onChange={handleChangeFile}
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setOpenModal(!openModal)}
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className={`bg-primary hover:bg-[#e7407d] ${
                  loading && "cursor-not-allowed opacity-50"
                }`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

UpdatePhotoModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
