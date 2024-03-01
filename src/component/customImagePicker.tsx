import Image from "next/image";
import React, { CSSProperties, FC, ChangeEvent } from "react";
// import Help from "../asset/help.svg";

interface CustomImagePickerProps {
  label?: string;
  value: string;
  fileName: string;
  onChange: (e: any) => void;
  showSymbol?: boolean;
  containerStyles?: CSSProperties;
  placeholder?: string;
  placeholderColor?: string;
  inputStyles?: CSSProperties;
}

const CustomImagePicker: FC<CustomImagePickerProps> = ({
  label,
  value,
  fileName,
  onChange,
  showSymbol,
  placeholder,
  placeholderColor,
  containerStyles,
  inputStyles,
}) => {
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
          id={`id_${label}`}
          className={`outline-none w-100 bg-background text-xsmall font-Orbitron placeholder:${
            placeholderColor ? `text-${placeholderColor}` : "text-darkGrey"
          } p-1 px-[16px] text-white w-[100%] customInp hover:bg-hoverInputBg`}
          //   style={{ ...inputStyles }}
          style={{ display: "none" }}
          type={"file"}
          // value={value}
          //   placeholder={placeholder || ""}
          onChange={onChange}
        />
        <section className="flex">
          <input
            className={`outline-none w-100 bg-background text-xsmall font-Orbitron placeholder:${
              placeholderColor ? `text-${placeholderColor}` : "text-darkGrey"
            } p-1 px-[16px] text-white w-[100%] customInp hover:bg-hoverInputBg`}
            style={{ ...inputStyles }}
            //   style={{ display: "none" }}
            type={"text"}
            value={fileName}
            placeholder={placeholder || ""}
            readOnly={true}
            //   onChange={onChange}
          />
          <label htmlFor={``}>
            <span
              className="text-white text-xsmall border-1 border-yellow1 mx-1 cursor-pointer hover:bg-yellow1 hover:text-black font-Orbitron p-1 h-[28px] px-[16px]"
              style={{ border: "1px solid #FFC83A" }}
              onClick={() => {
                // const elem = document.getElementById(`id_${label}`);
                // console.log(elem?.getAttribute(value));
                // elem?.setAttribute(value, "");
                onChange(null);
              }}
            >
              X
            </span>
          </label>
          <label htmlFor={`id_${label}`}>
            <span
              className="text-white text-xsmall border-1 border-yellow1 cursor-pointer hover:bg-yellow1 hover:text-black font-Orbitron p-1 h-[28px] px-[16px]"
              style={{ border: "1px solid #FFC83A" }}
            >
              Upload
            </span>
          </label>
        </section>
      </div>
    </>
  );
};

export default CustomImagePicker;
