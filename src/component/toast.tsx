import Image from "next/image";
import React, { CSSProperties } from "react";
// import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
  message: string;
  description?: string;
}

const ErrorComp = ({ message, description }: ToastProps) => {
  return (
    <div className="bg-yellow1 flex items-center w-full">
      <Image
        src={"/warning.svg"}
        alt="warning"
        width={48}
        height={48}
        priority
      />
      <span className="pl-2">
        <p className="text-small text-black font-extrabold">Error</p>
        <p className="text-xsmall text-black">{message}</p>
      </span>
    </div>
  );
};

export const errorToast = ({ message, description = "" }: ToastProps) => {
  toast(<ErrorComp message={message} description={description} />);
};

const SuccessComp = ({ message, description }: ToastProps) => {
  return (
    <div className="bg-yellow1 flex items-center w-full">
      <Image
        src={"/success.png"}
        alt="success"
        width={48}
        height={48}
        priority
      />
      <span className="pl-2">
        <p className="text-small text-black font-extrabold">Success</p>
        <p className="text-xsmall text-black">{message}</p>
      </span>
    </div>
  );
};

export const successToast = ({ message, description = "" }: ToastProps) => {
  toast(<SuccessComp message={message} description={description} />);
};
