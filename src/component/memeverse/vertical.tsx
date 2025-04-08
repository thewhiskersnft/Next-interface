"use client";
import React from "react";
import Image from "next/image";
import FilterIcon from "./asset/filter-horizontal.svg"; // Adjust the path if needed
import { StaticImageData } from "next/image";
// import { Filter } from "lucide-react";
import FilterButtonWithSheet from "./filterButtonWithSheet";

interface VerticalProps {
  title: string;
  icon: StaticImageData | string;
  filterCount?: number;
  children: React.ReactNode;
  containerClassName?: string;
}

const Vertical: React.FC<VerticalProps> = ({
  title,
  icon,
  filterCount = 0,
  children,
  containerClassName = "",
}) => {
  return (
    <div
      className={`bg-darkBlack border-2 border-lightBlack rounded-sm px-0 md:px-2 py-3 ${containerClassName}`}
    >
      <div className="flex flex-row justify-between mb-6">
        <div className="text-md font-semibold flex flex-row items-center text-disabledLink mb-3">
          {/* Provide explicit width and height */}
          <Image
            src={icon}
            alt="section icon"
            width={20}
            height={20}
            className="mr-2"
          />
          {title}
        </div>
        {/* <div className="flex flex-row text-disabledLink items-center border border-darkGrey rounded-sm px-3 py-1 bg-darkBlack">
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
        </div> */}
        <FilterButtonWithSheet filterCount={filterCount} />
      </div>
      {children}
    </div>
  );
};

export default Vertical;
