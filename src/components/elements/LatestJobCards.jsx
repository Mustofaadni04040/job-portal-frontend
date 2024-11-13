import verifiedIcon from "../../assets/icons/verified-logo.svg";
import unarchivedIcon from "../../assets/icons/unarchive-icon.svg";
import locationIcon from "../../assets/icons/location-icon.svg";
import peopleIcon from "../../assets/icons/people-icon.svg";
import moneyIcon from "../../assets/icons/money-icon.svg";
import reactIcon from "../../assets/react.svg";
import { Dot } from "lucide-react";
import { Button } from "../ui/button";

export default function LatestJobCards() {
  return (
    <div className="my-3 p-4 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium">Fullstack Developer</h1>
          <div className="flex items-center gap-2">
            <div className="rounded border border-slate-200 p-1">
              <img src={reactIcon} alt="company-logo" className="w-3 h-3" />
            </div>
            <p className="text-sm text-slate-500">PT. React Indonesia</p>
            <img src={verifiedIcon} alt="verfied-icon" className="w-3 h-3" />
          </div>
        </div>
        <button>
          <img src={unarchivedIcon} alt="unarchived-icon" />
        </button>
      </div>

      <div className="mt-1">
        <div className="flex items-center gap-2">
          <img src={locationIcon} alt="location-icon" className="w-4 h-4" />
          <p className="text-sm">Location</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={peopleIcon} alt="people-icon" className="w-4 h-4" />
          <p className="flex items-center text-sm">
            Part Time <Dot /> 12 Positions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <img src={moneyIcon} alt="money-icon" className="w-4 h-4" />
          <p className="flex items-center text-sm">Negotiable</p>
        </div>

        <p className="mt-3 text-sm text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi deleniti
          accusamus earum
        </p>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Button variant="outline" className="">
          Details
        </Button>
        <Button className="bg-primary hover:bg-[#e7407d]">Apply</Button>
      </div>
    </div>
  );
}
