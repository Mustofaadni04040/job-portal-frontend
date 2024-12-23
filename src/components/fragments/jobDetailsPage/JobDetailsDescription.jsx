import { Avatar, AvatarImage } from "@/components/ui/avatar";
import verifiedIcon from "../../../assets/icons/verified-logo.svg";
import locationIcon from "../../../assets/icons/location-icon.svg";
import peopleIcon from "../../../assets/icons/people-icon.svg";
import moneyIcon from "../../../assets/icons/money-icon.svg";
import unarchivedIcon from "../../../assets/icons/unarchive-icon.svg";
import archivedIcon from "../../../assets/icons/archive-icon.svg";
import { Dot, FileUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import convertIDR from "@/utils/currency";
import { timeAgo } from "@/utils/date";
import PropTypes from "prop-types";

export default function JobDetailsDescription({
  detailJob,
  applied,
  handleApplyJob,
}) {
  const isArchived = false;

  return (
    <div className="h-full border border-slate-200 rounded-xl">
      <div className="flex justify-between m-8">
        <div className="flex gap-3">
          <Avatar className="border border-slate-200 p-2 rounded-full w-20 h-20">
            <AvatarImage src={detailJob?.company?.logo} alt="company-icon" />
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-xl font-medium">{detailJob?.title}</h1>
            <div className="flex items-center gap-1">
              <p className="text-md text-primary font-medium">
                PT. {detailJob?.company?.name}
              </p>
              <img src={verifiedIcon} alt="verfied-icon" className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1">
              <img src={locationIcon} alt="location-icon" className="w-4 h-4" />
              <p className="text-sm text-slate-700">{detailJob?.location}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src={peopleIcon} alt="people-icon" className="w-4 h-4" />
              <p className="flex items-center text-sm text-slate-700">
                {detailJob?.jobType} <Dot /> {detailJob?.position} Positions
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img src={moneyIcon} alt="money-icon" className="w-4 h-4" />
              <p className="text-sm text-slate-700">
                {convertIDR(detailJob?.salary)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FileUser alt="applications-icon" className="w-4 h-4" />
              <p className="text-sm text-slate-700">
                {detailJob?.applications?.length > 0
                  ? `${detailJob?.applications?.length} applied this job`
                  : "no one applied this job"}
              </p>
            </div>

            <div className="my-3 flex items-center gap-3">
              <Button
                onClick={applied ? null : handleApplyJob}
                disabled={applied}
                className={`rounded-full py-1 px-10 ${
                  applied ? "bg-primary" : "bg-primary hover:bg-[#e7407d]"
                }`}
              >
                {applied ? "Already Applied" : "Apply Now"}
              </Button>
              <button className="border border-slate-200 p-2 bg-white rounded-full hover:bg-slate-50">
                {isArchived ? (
                  <img
                    src={archivedIcon}
                    alt="archived-icon"
                    className="w-5 h-5"
                  />
                ) : (
                  <img
                    src={unarchivedIcon}
                    alt="unarchived-icon"
                    className="w-5 h-5"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        <p className="h-fit text-xs text-slate-900 bg-green-500 bg-opacity-30 py-1 px-3 rounded-md">
          {timeAgo(detailJob?.createdAt)}
        </p>
      </div>
      <hr className="w-full" />
      <div className="m-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Work Requirements</h3>

          <div className="flex flex-col gap-3 my-3">
            <p>Experience : {detailJob?.experienceLevel} Years</p>
            <div className="flex items-center gap-2">
              Skills Required :{" "}
              {detailJob?.requirements === 0 ? (
                "No Skills Required"
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
          <h3 className="text-lg font-bold mb-2">Work Description</h3>
          <p className="text-sm font-normal">{detailJob?.description}</p>
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
};
