import {
  Drawer,
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

export default function DrawerFilter({
  selectedFilter,
  setSelectedFilter,
  handleApplyMobileFilter,
  handleResetFilter,
}) {
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
                            type="checkbox"
                            id={`${data.filterType}-${index}`}
                            checked={selectedFilter[data.filterType]?.includes(
                              value
                            )}
                            onChange={(e) => {
                              const current =
                                selectedFilter[data.filterType] || [];
                              const newFilter = e.target.checked
                                ? [...current, value]
                                : current.filter((v) => v !== value);
                              setSelectedFilter((prev) => ({
                                ...prev,
                                [data.filterType]: newFilter,
                              }));
                            }}
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
            <Button
              onClick={handleApplyMobileFilter}
              className="bg-primary hover:bg-[#e7407d]"
            >
              Terapkan Filter
            </Button>
            <Button variant="ghost" onClick={handleResetFilter}>
              Reset
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
