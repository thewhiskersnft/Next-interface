import React, { CSSProperties, FC, ChangeEvent } from "react";

interface CustomButtonProps {
  label?: string;
  htmlFor?: string;
  onClick: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ label, htmlFor, onClick }) => {
  return (
    <div
      className="click:animate-bounce block cursor-pointer w-full"
      onClick={onClick}
    >
      <label htmlFor={htmlFor || ""}>
        <span
          className="block text-white text-xsmall cursor-pointer text-center border-1 border-yellow1 hover:bg-yellow1 hover:text-black font-Orbitron p-1 px-2 h-[28px]"
          style={{ border: "1px solid #FFC83A" }}
        >
          {label}
        </span>
      </label>
    </div>
  );
};

export default CustomButton;
