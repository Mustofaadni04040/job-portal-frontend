// import { Button } from "@/components/ui/button";
import SearchIcon from "../../assets/icons/search-icon.svg";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setSearchQuery } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Search({ classname }) {
  // const [query, setQuery] = useState("");
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleSearchJobs = () => {
  //   dispatch(setSearchQuery(query));
  //   navigate("/browse");
  // };

  return (
    <div className={classname}>
      <div className="flex items-center gap-3 w-full border border-slate-400 px-3 py-2 rounded-md hover:border-primary duration-200">
        <img src={SearchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="What position are you looking for?"
          className="w-full border-none outline-none text-slate-500"
          // onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* <Button
        type="submit"
        className="bg-primary min-w-36 hover:bg-[#e7407d]"
        onClick={handleSearchJobs}
      >
        Search
      </Button> */}
    </div>
  );
}

Search.propTypes = {
  classname: PropTypes.string,
};
