import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Image from "next/image";
import React, { CSSProperties, FC, ChangeEvent } from "react";

interface CustomDropdownProps {
  label?: string;
  value: string;
  onChange: (e: any) => void;
  showSymbol?: boolean;
  containerStyles?: CSSProperties;
  options: Array<any>;
  placeholder?: string;
  showError?: boolean;
  errorMessage?: string;
}

const CustomDropdown: FC<CustomDropdownProps> = ({
  label,
  value,
  onChange,
  showSymbol,
  containerStyles,
  options,
  placeholder,
  showError,
  errorMessage,
}) => {
  return (
    <>
      <div
        className="mt-6 text-white text-large font-Orbitron text-left flex flex-col"
        style={{ ...containerStyles }}
      >
        <>
          <p className="w-full flex flex-row">
            {label || ""}
            {showSymbol && (
              <span>
                {/* <Image
                  src={"/help.svg"}
                  alt="Help Logo"
                  width={14}
                  height={5}
                  priority
                /> */}
              </span>
            )}
          </p>
        </>
        <Dropdown
          className="dropdownContainer"
          placeholderClassName={`font-Orbitron bg-background text-xsmall ${
            value ? "text-white" : "text-darkGrey"
          }`}
          menuClassName="font-Orbitron bg-background text-xsmall border-0"
          options={options}
          onChange={onChange}
          value={value}
          placeholder={placeholder || ""}
        />
        {showError && (
          <div className="bg-[#D93535] text-[10px] font-Oxanium px-[16px]">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomDropdown;
