import { Label } from "@/components/ui/label";
import convertIDR from "@/utils/currency";
import PropTypes from "prop-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BookMarked, SlidersHorizontal } from "lucide-react";
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
import Search from "@/components/elements/Search";
import { filterData } from "@/utils/filterData";

export default function FilterJobs({
  handleResetFilter,
  setSortFilterJobs,
  setInput,
  selectedFilter,
  setSelectedFilter,
  setSearchLocation,
}) {
  return (
    <div className="w-full border border-slate-400 shadow-md rounded-xl p-5">
      <div className="grid grid-cols-3 gap-1 mb-2">
        <Search
          classname="col-span-2"
          setInput={setInput}
          placeholder="Cari pekejeraan impianmu disini..."
          id="search-job"
        />
        <Button className="col-span-1 flex items-center gap-2 bg-primary hover:bg-[#e7407d]">
          <BookMarked size={28} strokeWidth={3} />
          Tersimpan
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-3">
        {filterData.map((data, index) => (
          <Popover key={index}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-slate-400">
                {data.filterTitle}{" "}
                <SlidersHorizontal className="text-primary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit h-60 overflow-y-auto">
              <div className="grid gap-4">
                <div className="flex items-start justify-between gap-4 font-semibold">
                  <h4 className="font-medium leading-none">
                    {data.filterType}
                  </h4>

                  <PopoverClose
                    onClick={handleResetFilter}
                    className="text-xs text-primary font-semibold"
                  >
                    Reset
                  </PopoverClose>
                </div>
                {/* search for location */}
                {data.filterType === "Location" && (
                  <Search
                    id="search-location"
                    classnameIcon="w-5 h-5"
                    setInput={(e) => {
                      setSearchLocation(e);
                    }}
                  />
                )}
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
                        {data.filterType === "Lokasi"}
                        <input
                          value={displayedValue} // optional: karena sudah diatur di onChange
                          id={displayedValue}
                          type="checkbox"
                          onChange={(e) => {
                            const currentFilter =
                              selectedFilter[data.filterType] || [];
                            const newFilter = e.target.checked
                              ? [...currentFilter, displayedValue]
                              : currentFilter.filter(
                                  (item) => item !== displayedValue
                                );

                            setSelectedFilter({
                              ...selectedFilter,
                              [data.filterType]: newFilter,
                            });
                          }}
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

        <div className="col-span-2 ml-3 flex items-center gap-3">
          <p className="text-sm font-semibold min-w-fit">Urut Berdasarkan</p>
          <Select onValueChange={(value) => setSortFilterJobs(value)}>
            <SelectTrigger className="border-slate-400">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className="flex items-center justify-between">
                  <SelectLabel>Urutkan</SelectLabel>
                </div>
                <SelectItem value="highestSalary" className="cursor-pointer">
                  Gaji Tertinggi
                </SelectItem>
                <SelectItem value="latestPost" className="cursor-pointer">
                  Terbaru
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
  handleResetFilter: PropTypes.func,
  setSortFilterJobs: PropTypes.func,
  setInput: PropTypes.func,
  selectedFilter: PropTypes.object,
  setSelectedFilter: PropTypes.func,
  setSearchLocation: PropTypes.func,
};
