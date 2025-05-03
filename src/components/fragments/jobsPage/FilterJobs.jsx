import { Label } from "@/components/ui/label";
import convertIDR from "@/utils/currency";
import PropTypes from "prop-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  {
    filterType: "Experience Level",
    filterValue: [0, 1, 2, 3, 4, 5],
  },
];

export default function FilterJobs({
  handleCheckboxChange,
  handleResetFilter,
  setSortFilterJobs,
}) {
  return (
    <div className="w-full border border-slate-200 shadow-md rounded-xl p-5">
      <div className="grid grid-cols-6 gap-3">
        {filterData.map((data, index) => (
          <Popover key={index}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {data.filterType} <SlidersHorizontal className="text-primary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 h-60 overflow-y-auto">
              <div className="grid gap-4">
                <div className="flex items-start justify-between font-semibold">
                  <h4 className="font-medium leading-none">
                    Filter by {data.filterType}
                  </h4>

                  <PopoverClose
                    onClick={handleResetFilter}
                    className="text-xs text-primary font-semibold"
                  >
                    Reset
                  </PopoverClose>
                </div>
                <div className="flex flex-col gap-2">
                  {data.filterValue.map((value, index) => {
                    const displayedValue =
                      data.filterType === "Salary"
                        ? `${value.min}-${value.max}`
                        : value;

                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-2 my-2"
                      >
                        <input
                          value={displayedValue}
                          id={displayedValue}
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(
                              data.filterType,
                              displayedValue
                            )
                          }
                        />
                        <Label
                          htmlFor={displayedValue}
                          className="text-sm font-normal"
                        >
                          {data.filterType === "Salary"
                            ? `${convertIDR(value.min)} - ${convertIDR(
                                value.max
                              )}`
                            : data.filterType === "Experience Level"
                            ? `${value} ${value > 1 ? "Years" : "Year"}`
                            : value}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ))}

        <div className="col-span-2 flex items-center gap-3">
          <p className="text-sm font-semibold min-w-fit">Sort by</p>
          <Select
            onValueChange={(value) => setSortFilterJobs(value)}
            className="col-span-2"
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className="flex items-center justify-between">
                  <SelectLabel>Sort by</SelectLabel>
                </div>
                <SelectItem value="highestSalary" className="cursor-pointer">
                  Highest Salary
                </SelectItem>
                <SelectItem value="latestPost" className="cursor-pointer">
                  Latest Post
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

FilterJobs.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  handleResetFilter: PropTypes.func.isRequired,
  setSortFilterJobs: PropTypes.func.isRequired,
};
