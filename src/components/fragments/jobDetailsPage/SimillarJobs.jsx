import verifiedIcon from "../../../assets/icons/verified-logo.svg";
import locationIcon from "../../../assets/icons/location-icon.svg";
import peopleIcon from "../../../assets/icons/people-icon.svg";
import moneyIcon from "../../../assets/icons/money-icon.svg";
import { Bookmark, Dot } from "lucide-react";
import { Button } from "../../ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import PropTypes from "prop-types";
import useAddedArchived from "@/hooks/useAddedArchive";
import { useSelector } from "react-redux";

export default function SimillarJobs({ data }) {
  const { handleAddArchive, archived } = useAddedArchived();
  const { getArchived } = useSelector((state) => state.job);

  return (
    <div className="p-4 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium">{data?.title}</h1>
          <div className="flex items-center gap-2">
            <Avatar className="w-5 h-5 border border-slate-200 rounded">
              <AvatarImage src={data?.company?.logo} alt="company-icon" />
            </Avatar>
            <p className="text-sm text-slate-500">{data?.company?.name}</p>
            <img src={verifiedIcon} alt="verfied-icon" className="w-3 h-3" />
          </div>
        </div>
        {getArchived.includes(data?._id.toString()) || archived ? (
          <button>
            <Bookmark size={22} className="text-primary" fill="#ff498b" />
          </button>
        ) : (
          <button onClick={() => handleAddArchive(data?._id)}>
            <Bookmark size={22} className="text-primary" />
          </button>
        )}
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
          <p className="flex items-center text-sm">{data?.salary}</p>
        </div>

        <div className="mt-3 text-sm text-slate-400">{data?.description}</div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Button className="bg-primary hover:bg-[#e7407d]">
          <a href={`/job-details/${data?._id}`}>Detail</a>
        </Button>
      </div>
    </div>
  );
}

SimillarJobs.propTypes = {
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
