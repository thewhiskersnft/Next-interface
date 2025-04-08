import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet"; // Adjust the import path as needed
import FilterIcon from "./asset/filter-horizontal.svg";

interface FilterButtonWithSheetProps {
  filterCount: number;
}

const FilterButtonWithSheet: React.FC<FilterButtonWithSheetProps> = ({
  filterCount,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-row text-disabledLink items-center border border-darkGrey rounded-sm px-3 py-1 bg-darkBlack cursor-pointer">
          <button className="flex flex-row text-sm items-center justify-center mr-3">
            <Image
              src={FilterIcon}
              alt="filter icon"
              width={16}
              height={16}
              className="mr-2"
            />
            Filter
            {filterCount > 0 && (
              <span className="ml-2 text-yellow1">{filterCount}</span>
            )}
          </button>
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-darkBlack text-white border-0 shadow-none"
      >
        <SheetHeader>
          <SheetTitle>Filter Options</SheetTitle>
          <SheetDescription>Select your filter criteria</SheetDescription>
        </SheetHeader>
        {/* Add your filter UI elements here */}
      </SheetContent>
    </Sheet>
  );
};

export default FilterButtonWithSheet;
