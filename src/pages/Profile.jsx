import Breadcrumbs from "@/components/fragments/Breadcrumb";
import AppliedJobTable from "@/components/fragments/profilePage/AppliedJobTable";
import UpdatePhotoModal from "@/components/fragments/profilePage/UpdatePhotoModal";
import UpdateProfileModal from "@/components/fragments/profilePage/UpdateProfileModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setJobsApplied } from "@/redux/jobSlice";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { CircleHelp, File, Mail, Pen, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((store) => store.auth);
  const [openModal, setOpenModal] = useState(false);
  const { jobsApplied } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [openModalPhoto, setOpenModalPhoto] = useState(false);

  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APPLICATION_API_END_POINT}/get-applied-jobs`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setJobsApplied(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAppliedJobs();
  }, [dispatch]);

  return (
    <>
      <div className="max-w-7xl mx-auto my-10">
        <Breadcrumbs textSecond="Profil" />
      </div>
      <div className="relative max-w-4xl mx-auto border border-slate-200 rounded-xl my-5 p-8">
        <div className="flex gap-5">
          <Avatar className="relative">
            <AvatarImage
              src={
                user?.profile?.profilePhoto
                  ? user?.profile?.profilePhoto
                  : "https://github.com/shadcn.png"
              }
              alt="avatar"
              className="w-20 h-20 rounded-full hover:cursor-pointer hover:opacity-80 duration-300"
              onClick={() => setOpenModalPhoto(true)}
            />
          </Avatar>
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm text-slate-500 mb-1">
                {user?.profile?.bio !== "undefined"
                  ? user?.profile?.bio
                  : "Update your description"}
              </p>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Phone className="w-4 h-4 text-primary" />
                {user?.email}
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Mail className="w-4 h-4 text-primary" />
                {user?.phoneNumber}
              </div>
            </div>
            <div>
              <h1 className="font-medium">Kemampuan</h1>
              <div className="flex items-center gap-2 flex-wrap">
                {user?.profile?.skills?.length === 0 ? (
                  <span className="text-sm text-slate-500">
                    You have no skills. Update your skills
                  </span>
                ) : (
                  user?.profile?.skills?.map((skill, index) => (
                    <p
                      key={index}
                      className="mt-1 border border-primary bg-primary bg-opacity-20 py-1 px-5 rounded-full text-primary font-medium"
                    >
                      {skill}
                    </p>
                  ))
                )}
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-2 mt-3">
              <Label className="font-medium">Resume</Label>
              {user?.profile?.resume ? (
                <div className="flex items-center gap-3">
                  <a
                    target="blank"
                    href={user?.profile?.resume}
                    className="w-fit flex items-center gap-3 bg-orange-500 shadow-md py-1 px-5 rounded-full text-white font-medium text-sm"
                  >
                    <File className="w-5 h-5" />
                    {user?.profile?.resumeOriginalName}
                  </a>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleHelp className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Use chrome browser if the resume not open</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : (
                <span className="text-sm text-slate-500">
                  Update your resume
                </span>
              )}
            </div>
          </div>

          <Button
            className="text-right absolute right-5 top-5"
            variant="ghost"
            onClick={() => setOpenModal(true)}
          >
            <Pen className="text-primary" />
          </Button>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-xl mt-10">
          <h1 className="text-xl font-medium mb-3">
            Lamaran Saya ({jobsApplied?.length})
          </h1>
          <AppliedJobTable />
        </div>
      </div>

      {openModal && (
        <UpdateProfileModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openModalPhoto && (
        <UpdatePhotoModal
          openModal={openModalPhoto}
          setOpenModal={setOpenModalPhoto}
        />
      )}
    </>
  );
}
