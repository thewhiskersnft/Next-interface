import React, { CSSProperties, FC, ChangeEvent } from "react";
import Loader from "./loader";

interface CustomButtonProps {
  label?: string;
  htmlFor?: string;
  onClick: () => void;
  containerStyles?: CSSProperties;
  labelStyles?: CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
}

const CustomButton: FC<CustomButtonProps> = ({
  label,
  icon,
  iconPosition = "left",
  htmlFor,
  onClick,
  containerStyles,
  labelStyles,
  disabled,
  loading,
}) => {
  return (
    <div
      className='click:animate-bounce block cursor-pointer w-full'
      onClick={() => {
        if (!disabled && !loading) {
          onClick();
        }
      }}
      style={{ ...containerStyles }}
    >
      <label htmlFor={htmlFor || ""}>
        <span
          className={`block text-xsmall cursor-pointer text-center border-1 border-yellow1 ${
            disabled || loading
              ? "text-disabledLink"
              : "text-white hover:bg-yellow1 hover:text-black border-white"
          } font-Orbitron p-1 px-2 h-[28px] ${
            loading ? "flex w-full items-center justify-center" : ""
          }`}
          style={{ border: "1px solid #FFC83A", ...labelStyles }}
        >
          {loading ? (
            <Loader visible={true} size={19} />
          ) : icon ? (
            <div
              className={`flex flex-1 ${
                iconPosition === "left" ? "flex-row" : "flex-row-reverse"
              } items-center justify-center`}
            >
              {icon}
              {label}
            </div>
          ) : (
            label
          )}
        </span>
      </label>
    </div>
  );
};

export default CustomButton;
