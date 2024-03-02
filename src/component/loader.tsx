import React, { CSSProperties } from "react";
import { ColorRing } from "react-loader-spinner";

interface LoaderProps {
  visible: boolean;
  size: number;
  wrapperStyle?: CSSProperties;
  color?: string;
}

const Loader = ({ visible, size, wrapperStyle, color }: LoaderProps) => {
  return (
    <>
      <ColorRing
        visible={visible}
        height={`${size}`}
        width={`${size}`}
        ariaLabel="color-ring-loading"
        wrapperStyle={{ ...(wrapperStyle as any) }}
        wrapperClass="color-ring-wrapper"
        colors={
          color
            ? [`${color}`, `${color}`, `${color}`, `${color}`, `${color}`]
            : ["#FFC83A", "#FFC83A", "#FFC83A", "#FFC83A", "#FFC83A"]
        }
      />
    </>
  );
};

export default Loader;
