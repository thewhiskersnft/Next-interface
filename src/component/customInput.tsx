import Image from "next/image";
import React, { CSSProperties } from "react";
// import Help from "../asset/help.svg";

interface CustomInputProps {
  label?: string;
  value?: string | number | readonly string[];
  onChange: (e: any) => void;
  showSymbol?: boolean;
  type: string;
  placeholder?: string;
  containerStyles?: CSSProperties;
  inputStyles?: CSSProperties;
  placeholderColor?: string;
  id?: string;
  name?: string;
  showError?: boolean;
  errorMessage?: string;
}

const CustomInput = ({
  label,
  value,
  onChange,
  showSymbol,
  type,
  placeholder,
  containerStyles,
  inputStyles,
  placeholderColor,
  id,
  name,
  showError,
  errorMessage,
}: CustomInputProps) => {
  return (
    <>
      <div
        className="text-left text-white font-Orbitron w-100 mt-5 flex text-small"
        style={{ ...containerStyles }}
      >
        {label || ""}
        {showSymbol && (
          <span className="flex items-center">
            {/* <img className="ml-1" src={Help} alt="/help" /> */}
            <Image
              src={"/help.svg"}
              alt="Help Logo"
              width={19}
              height={19}
              priority
            />
          </span>
        )}
      </div>
      <div className={`${label ? "mt-[10px]" : "mt-0"} w-[100%]`}>
        <input
          className={`outline-none w-100 bg-background text-xsmall font-Orbitron placeholder:${
            placeholderColor ? `text-${placeholderColor}` : "text-darkGrey"
          } p-1 px-[16px] text-white w-[100%] customInp hover:bg-hoverInputBg`}
          id={id}
          name={name}
          style={{ ...inputStyles }}
          type={type || "text"}
          value={value}
          placeholder={placeholder || ""}
          onChange={onChange}
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

export default CustomInput;
