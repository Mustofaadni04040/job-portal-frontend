import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AlignHorizontalDistributeCenter, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { filterData } from "@/utils/filterData";
import { Label } from "@/components/ui/label";
import { useCallback, useMemo, useState } from "react";
import { getData } from "@/utils/fetch";
import debounce from "debounce-promise";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function DrawerFilter({ setSkeletonCount }) {
  const debouncedGetData = useMemo(() => debounce(getData, 1000), []);
  const [selectedFilter, setSelectedFilter] = useState({
    Salary: [],
    Location: [],
    "Job Type": [],
    "Experience Level": [],
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(selectedFilter);

  const handleChangeFilter = (e, data, value) => {
    const currentFilter = selectedFilter[data.filterType] || [];
    const newFilter = e.target.checked
      ? [...currentFilter, value]
      : currentFilter.filter((item) => item !== value);

    setSelectedFilter({
      ...selectedFilter,
      [data.filterType]: newFilter,
    });
  };

  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams();

    if (selectedFilter.Location.length > 0)
      params.set("location", selectedFilter.Location);
    if (selectedFilter["Job Type"].length > 0)
      params.set("jobType", selectedFilter["Job Type"]);
    if (selectedFilter["Experience Level"].length > 0)
      params.set("experience", selectedFilter["Experience Level"]);
    if (selectedFilter.Salary.length > 0)
      params.set(
        "salary",
        selectedFilter.Salary.map((item) => `${item.min}-${item.max}`)
      );

    navigate(`/all-jobs?${params.toString()}`);
  }, [navigate, selectedFilter]);

  const handleApplyFilter = async () => {
    setLoading(true);
    const salaryMin = selectedFilter.Salary.map((item) => item.min);
    const salaryMax = selectedFilter.Salary.map((item) => item.max);
    try {
      const params = {
        location: selectedFilter.Location?.join(",") || "",
        jobType: selectedFilter?.["Job Type"].join(",") || "",
        experienceLevel: selectedFilter?.["Experience Level"].join(",") || "",
        salaryMin,
        salaryMax,
      };
      const res = await debouncedGetData(
        `${import.meta.env.VITE_JOB_API_END_POINT}/get-jobs`,
        params,
        null,
        true
      );

      if (res.data.success) {
        dispatch(setAllJobs(res?.data?.jobs));
        setSkeletonCount(res?.data?.jobs?.length);
        updateSearchParams();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilter = () => {
    setSelectedFilter({
      Location: [],
      Salary: [],
      "Job Type": [],
      "Experience Level": [],
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <AlignHorizontalDistributeCenter
          strokeWidth={1.5}
          className="border border-slate-300 shadow-md rounded-md cursor-pointer p-2 h-full w-auto place-self-end text-primary"
        />
      </DrawerTrigger>

      <DrawerContent>
        <div className="max-h-96 overflow-y-auto">
          <DrawerTitle className="text-left pl-5 pt-10 text-lg font-bold">
            Filter
          </DrawerTitle>

          <DrawerDescription className="sr-only">
            Just for fixed shadcn warning
          </DrawerDescription>

          <div className="flex flex-col px-5 py-3 gap-4">
            {filterData.map((data, index) => (
              <div key={index} className="border-b pb-4">
                <h4 className="font-bold mb-4">{data.filterTitle}</h4>

                <div
                  className={`grid ${
                    data.filterType === "Salary" ? "grid-cols-1" : "grid-cols-2"
                  } gap-4`}
                >
                  {data.filterValue.map((value, index) => {
                    return (
                      <div
                        key={index}
                        className={`${
                          data.filterType === "Salary"
                            ? "flex flex-col items-end space-y-2"
                            : "flex items-center space-x-2"
                        }`}
                      >
                        {data.filterType === "Salary" ? (
                          <Slider
                            className="col-span-2"
                            defaultValue={[value.max]}
                            max={value.max}
                            step={1000000}
                            onValueChange={(val) => {
                              setSelectedFilter((prev) => ({
                                ...prev,
                                [data.filterType]: [{ min: 0, max: val }],
                              }));
                            }}
                          />
                        ) : (
                          <input
                            value={value}
                            type="checkbox"
                            id={`${data.filterType}-${index}`}
                            checked={selectedFilter[data.filterType]?.includes(
                              value
                            )}
                            onChange={(e) => handleChangeFilter(e, data, value)}
                          />
                        )}
                        <Label
                          htmlFor={`${data.filterType}-${index}`}
                          className="text-sm font-medium"
                        >
                          {data.filterType === "Salary"
                            ? `Rp. ${value.max.toLocaleString("id-ID")}`
                            : data.filterType === "Experience Level"
                            ? `${value} Tahun`
                            : value}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <DrawerFooter className="px-5 py-3">
            <DrawerClose asChild>
              <Button
                onClick={handleApplyFilter}
                className="bg-primary hover:bg-[#e7407d] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Terapkan Filter"
                )}
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="ghost" onClick={handleResetFilter}>
                Reset
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

DrawerFilter.propTypes = {
  setSkeletonCount: PropTypes.func.isRequired,
};
