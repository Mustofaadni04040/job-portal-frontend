import { Avatar, AvatarImage } from "@/components/ui/avatar";
import verifiedIcon from "../../../assets/icons/verified-logo.svg";
import locationIcon from "../../../assets/icons/location-icon.svg";
import peopleIcon from "../../../assets/icons/people-icon.svg";
import moneyIcon from "../../../assets/icons/money-icon.svg";
import { Bookmark, Dot, FileUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import convertIDR from "@/utils/currency";
import { timeAgo } from "@/utils/date";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import useSavedJobs from "@/hooks/useSavedJobs";

export default function JobDetailsDescription({
  detailJob,
  applied,
  handleApplyJob,
  totalApplicants,
}) {
  const { handleAddArchive, handleRemoveArchive } = useSavedJobs();
  const { getArchived } = useSelector((state) => state.job);
  const isArchived = getArchived.includes(detailJob?._id);

  return (
    <div className="min-h-[1000px] relative border border-slate-200 rounded-xl">
      <div className="flex justify-between m-8">
        <div className="flex flex-col md:flex-row gap-3">
          <Avatar className="border border-slate-200 p-2 rounded-full w-16 h-16 md:w-20 md:h-20">
            <AvatarImage src={detailJob?.company?.logo} alt="company-icon" />
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-base md:text-xl font-medium">
              {detailJob?.title}
            </h1>
            <div className="flex items-center gap-1 mb-2">
              <p className="text-sm md:text-md text-primary font-medium">
                PT. {detailJob?.company?.name}
              </p>
              <img src={verifiedIcon} alt="verfied-icon" className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1">
              <img src={locationIcon} alt="location-icon" className="w-4 h-4" />
              <p className="text-xs md:text-sm text-slate-700">
                {detailJob?.location}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img src={peopleIcon} alt="people-icon" className="w-4 h-4" />
              <p className="flex items-center text-xs md:text-sm text-slate-700">
                {detailJob?.jobType} <Dot /> {detailJob?.position} Posisi
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img src={moneyIcon} alt="money-icon" className="w-4 h-4" />
              <p className="text-xs md:text-sm text-slate-700">
                {convertIDR(detailJob?.salary)}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-1 md:mt-0">
              <FileUser alt="applications-icon" className="w-4 h-4" />
              <p className="text-xs md:text-sm text-slate-700">
                {totalApplicants > 0
                  ? `${totalApplicants} pelamar`
                  : "Belum ada pelamar"}
              </p>
            </div>

            <div className="my-3 flex items-center gap-3">
              <Button
                onClick={applied ? null : handleApplyJob}
                disabled={applied}
                className={`rounded-full py-1 px-5 md:px-10 ${
                  applied ? "bg-primary" : "bg-primary hover:bg-[#e7407d]"
                }`}
              >
                {applied ? "Sudah Lamar" : "Lamar Sekarang"}
              </Button>
              {isArchived ? (
                <button className="border border-slate-200 p-2 bg-white rounded-full hover:bg-slate-50">
                  <Bookmark
                    size={22}
                    className="text-primary"
                    fill="#ff498b"
                    onClick={() => handleRemoveArchive(detailJob?._id)}
                  />
                </button>
              ) : (
                <button
                  className="border border-slate-200 p-2 bg-white rounded-full hover:bg-slate-50"
                  onClick={() => handleAddArchive(detailJob?._id)}
                >
                  <Bookmark size={22} className="text-primary" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="absolute top-5 right-5 h-fit w-fit text-xs text-slate-900 bg-green-500 bg-opacity-30 py-1 px-3 rounded-md">
        {timeAgo(detailJob?.createdAt)}
      </p>
      <hr className="w-full" />
      <div className="m-8">
        <div>
          <h3 className="text-base md:text-lg font-bold mb-2">
            Kebutuhan Pekerjaan
          </h3>

          <div className="flex flex-col gap-3 my-3">
            <p className="text-sm md:text-base">
              Pengalaman : {detailJob?.experienceLevel} Tahun
            </p>
            <div className="flex flex-col items-start md:flex-row md:items-center text-sm md:text-base gap-2">
              Skill Dibutuhkan :{" "}
              {detailJob?.requirements[0] === "No requirements needed" ? (
                <span className="border border-primary border-opacity-50 px-5 rounded-full">
                  Tidak Dibutuhkan Skill
                </span>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  {detailJob?.requirements?.map((skill, index) => (
                    <span
                      key={index}
                      className="border border-primary border-opacity-50 px-5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="textbase md:text-lg font-bold mb-2">
            Deskripsi Pekerjaan
          </h3>
          <div className="description-content text-sm md:text-base font-normal">
            {detailJob?.description && HTMLReactParser(detailJob?.description)}
          </div>
        </div>
      </div>
    </div>
  );
}
JobDetailsDescription.propTypes = {
  detailJob: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }),
    applications: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
    experienceLevel: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    salary: PropTypes.number.isRequired,
    requirements: PropTypes.array.isRequired,
  }),
  applied: PropTypes.bool.isRequired,
  handleApplyJob: PropTypes.func.isRequired,
  totalApplicants: PropTypes.number.isRequired,
};
