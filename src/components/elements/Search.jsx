import { Button } from "@/components/ui/button";
import SearchIcon from "../../assets/icons/search-icon.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchJobs = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="my-10 flex mx-auto w-full max-w-3xl items-center">
      <div className="flex items-center gap-3 w-full border border-slate-200 px-3 py-2 rounded-md">
        <img src={SearchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="What position are you looking for?"
          className="w-full border-none outline-none text-slate-500"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="bg-primary min-w-36 hover:bg-[#e7407d]"
        onClick={handleSearchJobs}
      >
        Search
      </Button>
    </div>
  );
}
