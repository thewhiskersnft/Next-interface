"use client";
import React, { useEffect, useState } from "react";
// import Expand from "../asset/expand.svg";
import { TokenRoutes, sidebarData } from "../../constants";
import { SidebarItem } from "../../interfaces";
// import { useNavigate } from "react-router-dom";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { get } from "lodash";
import Image from "next/image";
import { errorToast } from "./toast";

type SidebarProps = {};

const Sidebar = ({}: SidebarProps) => {
  const [clicked, setClicked] = useState<string>("");
  const [refersh, setRefresh] = useState(false);
  const [childClicked, setChildClicked] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const action = searchParams.get("action");

  useEffect(() => {
    // const tokenAction = searchParams.get("action");
    // if (tokenAction === TokenRoutes.createToken) {
    //   setClicked("Token Management");
    //   setChildClicked("Create Token");
    // } else if (tokenAction === TokenRoutes.manageToken) {
    //   setClicked("Token Management");
    //   setChildClicked("Manage Token");
    // } else if (tokenAction === TokenRoutes.updateMetadata) {
    //   setClicked("Token Management");
    //   setChildClicked("Update Metadata");
    // } else if (tokenAction === TokenRoutes.mintToken) {
    //   setClicked("Token Management");
    //   setChildClicked("Mint Tokens");
    // } else if (tokenAction === TokenRoutes.burnToken) {
    //   setClicked("Token Management");
    //   setChildClicked("Burn Tokens");
    // }
    // if (pathName === `/airdrop`) {
    //   setClicked("Airdrop Checker");
    // }
    setRefresh(!refersh);
  }, [action]);

  const handleChildClick = (val: string, navigateTo: string | undefined) => {
    // if (childClicked === val) {
    // } else {
    // setChildClicked(val);
    // }
    if (navigateTo) {
      router.push(navigateTo);
    }
  };

  const handleClick = (val: string, navigateTo: string | undefined) => {
    if (clicked === val) {
      const menuEl = document.getElementById(`${val}`);
      if (menuEl) {
        menuEl.classList.remove("animate-open");
        menuEl.classList.add("animate-close");
        setTimeout(() => {
          setClicked("");
          setChildClicked("");
        }, 195);
      }
    } else {
      setClicked(val);
      if (navigateTo) router.push(navigateTo);
    }
  };

  return (
    <div
      className="w-[403px] overflow-auto scroll-smooth"
      style={{ borderRight: "1px solid #4D4D4D", height: "100%" }}
    >
      {sidebarData.map((side: SidebarItem, index: number) => {
        const isExpandable: boolean =
          (side.children && side.children.length > 0) || false;
        const {
          label,
          description,
          icon,
          activeIcon,
          children,
          disabled,
          navigateTo,
        } = side;
        return (
          <div key={index}>
            <div
              className="border border-#4D4D4D-600 flex bg-black flex-row h-48px justify-center align-center p-4 border-1 border-[#4D4D4D] hover:border-yellow1 cursor-pointer"
              onClick={() => {
                if (disabled) {
                  errorToast({ message: "Coming Soon!" });
                  return;
                }
                handleClick(label, navigateTo);
              }}
            >
              <div className="flex flex-row justify-center items-center mr-5 min-w-[48px]">
                <img
                  className="justify-center align-center"
                  src={clicked === label ? activeIcon : icon}
                  alt="svg"
                  style={{
                    height: "48px",
                    width: "48px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <div
                  className={`${
                    disabled
                      ? "text-disabledLink"
                      : clicked === label
                      ? "text-white"
                      : "text-white"
                  } text-left text-small font-Orbitron  mr-5 font-semibold tracking-normal`}
                  style={{ letterSpacing: "3px" }}
                >
                  {label}
                </div>
                <div
                  className={`${
                    disabled
                      ? "text-disabledLink"
                      : clicked === label
                      ? "text-white"
                      : "text-white"
                  }  text-xsmall text-left font-Oxanium font-normal mr-5 mt-1`}
                  style={{ letterSpacing: "1.5px" }}
                >
                  {`${description}`}
                </div>
              </div>
              {isExpandable && (
                <div className="flex flex-row h-48px justify-center items-center cursor-pointer min-w-[48px]">
                  {/* <img
                    className={`w-10 justify-center align-center ${
                      clicked === label ? "rotate-180" : ""
                    }`}
                    src={Expand}
                    style={{
                      height: "48px",
                      width: "48px",
                      objectFit: "contain",
                    }}
                    alt="svg"
                  /> */}
                  <Image
                    src={"/expand.svg"}
                    alt="expand Logo"
                    className={`w-10 justify-center align-center ${
                      clicked === label ? "rotate-180" : ""
                    }`}
                    width={48}
                    height={48}
                    // style={{ marginRight: "5px" }}
                    priority
                  />
                </div>
              )}
            </div>
            {isExpandable && clicked === label ? (
              <div
                id={label}
                className="flex flex-col justify-center align-center animate-open"
              >
                {isExpandable &&
                  children &&
                  children.map((child, childIndex) => {
                    const { label, description, navigateTo, disabled } = child;
                    let isChildChecked = false;
                    if (window) {
                      if (
                        window.location.href ===
                        `${window.location.origin}${navigateTo}`
                      ) {
                        isChildChecked = true;
                      }
                    }
                    return (
                      <div
                        className={`bg-background h-28 border-[1px] border-variant1 flex flex-col justify-center align-center p-6 hover:bg-variant1 cursor-pointer px-10 ${
                          childClicked === label ? "border-white" : ""
                        }`}
                        onClick={() => {
                          if (disabled) {
                            errorToast({ message: "Coming Soon!" });
                            return;
                          }
                          handleChildClick(label, navigateTo);
                        }}
                        key={childIndex}
                      >
                        <div
                          className={`text-left text-small font-Orbitron  font-medium tracking-normal ${
                            disabled
                              ? "text-disabledLink"
                              : isChildChecked
                              ? "text-yellow1"
                              : "text-white"
                          }`}
                          style={{ letterSpacing: "3px" }}
                        >
                          {label}
                        </div>
                        <div
                          className={`${
                            disabled ? "text-disabledLink" : "text-white"
                          } font-Oxanium text-xsmall mt-1  text-left font-normal`}
                          style={{ letterSpacing: "1.5px" }}
                        >
                          {`${description}`}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
