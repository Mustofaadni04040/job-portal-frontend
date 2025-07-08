import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AlignHorizontalDistributeCenter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { filterData } from "@/utils/filterData";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import convertIDR from "@/utils/currency";

export default function DrawerFilter({
  handleApplyFilterMobile,
  setSelectedFilterMobile,
  selectedFilterMobile,
  handleResetFilter,
}) {
  const handleChangeCheckbox = (e, data, value) => {
    const currentFilter = selectedFilterMobile[data.filterType] || [];
    const newFilter = e.target.checked
      ? [...currentFilter, value]
      : currentFilter.filter((item) => item !== value);

    setSelectedFilterMobile({
      ...selectedFilterMobile,
      [data.filterType]: newFilter,
    });
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <AlignHorizontalDistributeCenter
          strokeWidth={1.5}
          className="border border-slate-300 shadow-sm rounded-md cursor-pointer p-2 h-full w-auto place-self-end text-primary"
        />
      </DrawerTrigger>

      <DrawerContent>
        <div className="max-h-96 overflow-y-auto">
          <DrawerTitle className="text-left pl-5 pt-5 text-lg font-bold">
            Filter
          </DrawerTitle>

          <DrawerDescription className="sr-only">
            Just for fixed shadcn description warning
          </DrawerDescription>

          <div className="flex flex-col px-5 py-3 gap-4">
            {filterData.map((data, index) => (
              <div key={index} className="border-b pb-4">
                <h4 className="font-bold mb-4 text-sm text-slate-700">
                  {data.filterTitle}
                </h4>

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
                            onValueChange={(e) => {
                              setSelectedFilterMobile((prev) => ({
                                ...prev,
                                [data.filterType]: [{ min: 0, max: e }],
                              }));
                            }}
                          />
                        ) : (
                          <input
                            value={value}
                            type="checkbox"
                            id={`${data.filterType}-${index}`}
                            checked={selectedFilterMobile[
                              data.filterType
                            ]?.includes(value)}
                            onChange={(e) =>
                              handleChangeCheckbox(e, data, value)
                            }
                          />
                        )}
                        <Label
                          htmlFor={`${data.filterType}-${index}`}
                          className="text-sm font-normal"
                        >
                          {data.filterType === "Salary"
                            ? convertIDR(
                                selectedFilterMobile?.Salary?.length === 1
                                  ? selectedFilterMobile?.Salary?.map(
                                      (item) => item.max
                                    )
                                  : value.max
                              )
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
                onClick={handleApplyFilterMobile}
                className="bg-primary hover:bg-[#e7407d] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Terapkan Filter
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleResetFilter}>
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
  handleApplyFilterMobile: PropTypes.func.isRequired,
  setSelectedFilterMobile: PropTypes.func.isRequired,
  selectedFilterMobile: PropTypes.object.isRequired,
  handleResetFilter: PropTypes.func.isRequired,
};
