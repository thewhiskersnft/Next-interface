import React, { CSSProperties } from "react";
interface LoaderProps {
  visible: boolean;
  size: number;
}

const Loader = ({ visible, size }: LoaderProps) => {
  let borderWidth = size * 0.15 > 7 ? 7 : size * 0.15;
  return (
    <>
      {visible && (
        <div
          className={`loader ${size ? `w-[${size}px] h-[${size}px]` : ""}`}
          style={
            size
              ? {
                  height: `${size}px`,
                  width: `${size}px`,
                  border: `${borderWidth}px solid rgba(255, 255, 255, 0.4)`,
                  borderTop: `${borderWidth}px solid #ffc83a`,
                }
              : {}
          }
        ></div>
      )}
    </>
  );
};

export default Loader;
