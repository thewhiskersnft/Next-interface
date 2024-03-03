import Image from "next/image";
import React, { CSSProperties, FC, ChangeEvent } from "react";
// import Help from "../asset/help.svg";

interface CustomRadioProps {
  label?: string;
  value: boolean;
  onChange: () => void;
  showSymbol?: boolean;
  containerStyles?: CSSProperties;
}

const CustomRadio: FC<CustomRadioProps> = ({
  label,
  value,
  onChange,
  showSymbol,
  containerStyles,
}) => {
  return (
    <>
      <div
        className="mt-6 text-white text-large font-Orbitron text-left flex items-center"
        style={{ ...containerStyles }}
      >
        <>
          {label || ""}
          {showSymbol && (
            <span>
              {/* <img className="ml-1" src={Help} alt="/help" /> */}
              <Image
                src={"/help.svg"}
                alt="Help Logo"
                width={14}
                height={5}
                priority
              />
            </span>
          )}
        </>
        <label className="switch">
          <input checked={value} onChange={onChange} type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </>
  );
};

export default CustomRadio;
