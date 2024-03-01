import React, { CSSProperties } from "react";
// import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
  visible: boolean;
  size: number;
  wrapperStyle?: CSSProperties;
  color?: string;
}

const Toast = ({ visible, size, wrapperStyle, color }: ToastProps) => {
  return <></>;
};

export default Toast;
