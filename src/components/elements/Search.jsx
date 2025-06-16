import SearchIcon from "../../assets/icons/search-icon.svg";
import PropTypes from "prop-types";

export default function Search({
  classname,
  setInput,
  placeholder,
  classnameIcon,
  id,
}) {
  return (
    <div className={classname}>
      <div className="flex items-center gap-3 w-full border border-slate-400 py-2 pl-3 rounded-md hover:border-primary duration-200">
        <label htmlFor={id}>
          <img src={SearchIcon} alt="search-icon" className={classnameIcon} />
        </label>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
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
  placeholder: PropTypes.string,
  classnameIcon: PropTypes.string,
  id: PropTypes.string,
};
