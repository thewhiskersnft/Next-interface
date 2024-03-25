import { get } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
  message?: string;
  description?: string;
  keyPairs?: any;
  allowCopy?: boolean;
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

const SuccessComp = ({
  message,
  description,
  keyPairs = {},
  allowCopy,
}: ToastProps) => {
  const keys = Object.keys(keyPairs);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    successToast({ message: "Copied!" });
  };
  return (
    <div className="bg-successGreen flex items-center w-full">
      <Image
        src={"/success.svg"}
        alt="success"
        width={48}
        height={48}
        priority
      />
      <span className="pl-2 text-white ml-4">
        <p className="text-small text-white font-extrabold font-Orbitron">
          Success
        </p>
        <p className="text-xsmall text-white font-Oxanium">{message}</p>
        {keys.map((key: string, index: number) => {
          let val = keyPairs[key];
          return (
            <span key={index} className="flex my-2 border-b-[1px] border-white">
              <p
                className="text-xsmall text-white font-Oxanium mr-4"
                style={{ textTransform: "capitalize", width: "100px" }}
              >
                {key}
              </p>
              {allowCopy ? (
                <Image
                  src={"/copy.svg"}
                  alt="copy"
                  width={16}
                  height={16}
                  priority
                  style={{ marginRight: "5px", cursor: "pointer" }}
                  onClick={() => {
                    handleCopy(val.value);
                  }}
                />
              ) : (
                <></>
              )}
              <Link legacyBehavior href={get(val, "linkTo", "")} passHref>
                <a target="_blank">
                  <p
                    className="text-xsmall text-white font-Oxanium"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "150px",
                    }}
                  >
                    {val.value}
                  </p>
                </a>
              </Link>
            </span>
          );
        })}
      </span>
    </div>
  );
};

export const successToast = ({
  message,
  description = "",
  allowCopy,
  keyPairs,
}: ToastProps) => {
  toast.success(
    <SuccessComp
      message={message}
      description={description}
      allowCopy={allowCopy}
      keyPairs={keyPairs}
    />
  );
};
