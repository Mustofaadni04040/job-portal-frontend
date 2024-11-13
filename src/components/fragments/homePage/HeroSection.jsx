import { Button } from "@/components/ui/button";
import SearchIcon from "../../../assets/icons/search-icon.svg";

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto my-14">
      <div className="text-center">
        <h1 className="text-[42px] font-bold">
          Find your <span className="text-primary">Dream Jobs</span> Today
        </h1>
        <p className="text-md text-slate-500">
          jobs in all of sectors are waiting for you.
        </p>
      </div>

      <div className="my-10 flex mx-auto w-full max-w-3xl items-center">
        <div className="flex items-center gap-3 w-full border border-slate-200 px-3 py-2 rounded-md">
          <img src={SearchIcon} alt="search-icon" />
          <input
            type="text"
            placeholder="What position are you looking for?"
            className="w-full border-none outline-none text-slate-500"
          />
        </div>
        <Button
          type="submit"
          className="bg-primary min-w-36 hover:bg-[#e7407d]"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
