import { Label } from "@/components/ui/label";
import convertIDR from "@/utils/currency";
import PropTypes from "prop-types";

const filterData = [
  {
    filterType: "Location",
    filterValue: [
      "Jakarta Pusat",
      "Jakarta Utara",
      "Jakarta Timur",
      "Jakarta Selatan",
      "Tangerang Selatan",
      "Jakarta",
    ],
  },
  {
    filterType: "Salary",
    filterValue: [
      { min: 0, max: 1000000 },
      { min: 1000000, max: 5000000 },
      { min: 5000000, max: 10000000 },
      { min: 10000000, max: 15000000 },
      { min: 15000000, max: 20000000 },
    ],
  },
  {
    filterType: "Job Type",
    filterValue: ["Full Time", "Part Time", "Internship", "Feelance"],
  },
];

export default function FilterJobs({ handleCheckboxChange }) {
  return (
    <div className="w-full h-screen overflow-y-auto border border-slate-200 rounded-md p-5">
      <h1 className="text-xl font-bold mb-3">Prioritise By</h1>
      {filterData.map((data, index) => (
        <div key={index}>
          <h2 className="text-lg font-medium">{data.filterType}</h2>
          {data.filterValue.map((value, index) => {
            const displayedValue =
              data.filterType === "Salary"
                ? `${value.min}-${value.max}`
                : value;

            return (
              <div key={index} className="flex items-center space-x-2 my-2">
                <input
                  value={displayedValue}
                  id={displayedValue}
                  type="checkbox"
                  onChange={() =>
                    handleCheckboxChange(data.filterType, displayedValue)
                  }
                />
                <Label htmlFor={displayedValue} className="text-md font-normal">
                  {data.filterType === "Salary"
                    ? `${convertIDR(value.min)} - ${convertIDR(value.max)}`
                    : value}
                </Label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

FilterJobs.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
};
