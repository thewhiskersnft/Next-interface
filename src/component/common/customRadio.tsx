import Image from "next/image";
import React, { CSSProperties, FC, ChangeEvent } from "react";

interface CustomRadioProps {
  label?: string;
  description?: string;
  value: boolean;
  onChange: () => void;
  showSymbol?: boolean;
  containerStyles?: CSSProperties;
}

const CustomRadio: FC<CustomRadioProps> = ({
  label,
  description,
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
          <span>
            {label || ""}
            {description ? (
              <p className="text-disabledLink text-[8px] font-Orbitron">
                {description}
              </p>
            ) : null}
          </span>
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
