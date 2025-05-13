import verifiedIcon from "../../../assets/icons/verified-logo.svg";
import unarchivedIcon from "../../../assets/icons/unarchive-icon.svg";
import archivedIcon from "../../../assets/icons/archive-icon.svg";
import locationIcon from "../../../assets/icons/location-icon.svg";
import peopleIcon from "../../../assets/icons/people-icon.svg";
import moneyIcon from "../../../assets/icons/money-icon.svg";
import { Dot } from "lucide-react";
import { Button } from "../../ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import PropTypes from "prop-types";
import convertIDR from "@/utils/currency";

export default function BrowseJobs({ data }) {
  const isArchived = true;
  return (
    <div className="p-4 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium">
            {data?.title?.slice(0, 22)}
            {data?.title?.length > 22 && "..."}
          </h1>
          <div className="flex items-center gap-2">
            <Avatar className="w-5 h-5 border border-slate-200 rounded">
              <AvatarImage src={data?.company?.logo} alt="company-icon" />
            </Avatar>
            <p className="text-sm text-slate-500">PT. {data?.company?.name}</p>
            <img src={verifiedIcon} alt="verfied-icon" className="w-3 h-3" />
          </div>
        </div>
        <button>
          {isArchived ? (
            <img src={archivedIcon} alt="archived-icon" className="w-5 h-5" />
          ) : (
            <img
              src={unarchivedIcon}
              alt="unarchived-icon"
              className="w-5 h-5"
            />
          )}
        </button>
      </div>

      <div className="mt-1">
        <div className="flex items-center gap-2">
          <img src={locationIcon} alt="location-icon" className="w-4 h-4" />
          <p className="text-sm">{data?.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={peopleIcon} alt="people-icon" className="w-4 h-4" />
          <p className="flex items-center text-sm">
            {data?.jobType} <Dot /> {data?.position} Posisi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <img src={moneyIcon} alt="money-icon" className="w-4 h-4" />
          <p className="flex items-center text-sm">
            {convertIDR(data?.salary)}
          </p>
        </div>

        <p className="mt-3 text-sm text-slate-400">
          {data?.description.slice(0, 60)}...
        </p>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Button variant="outline">
          <a href={`/job-details/${data?._id}`}>Details</a>
        </Button>
        <Button className="bg-primary hover:bg-[#e7407d]">Apply</Button>
      </div>
    </div>
  );
}

BrowseJobs.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    salary: PropTypes.number.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }),
  }),
};
