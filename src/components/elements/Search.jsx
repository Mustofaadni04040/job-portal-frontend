// import { Button } from "@/components/ui/button";
import SearchIcon from "../../assets/icons/search-icon.svg";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setSearchQuery } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Search({ classname, setInput }) {
  return (
    <div className={classname}>
      <div className="flex items-center gap-3 w-full border border-slate-400 py-2 pl-3 rounded-md hover:border-primary duration-200">
        <label htmlFor="search">
          <img src={SearchIcon} alt="search-icon" />
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by job title & company"
          className="w-full border-none outline-none text-slate-500"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
}

Search.propTypes = {
  classname: PropTypes.string,
  setInput: PropTypes.func.isRequired,
};
