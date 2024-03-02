"use client";
import React, { useState } from "react";
// import Expand from "../asset/expand.svg";
import { sidebarData } from "../constants";
import { SidebarItem } from "../interfaces";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { get } from "lodash";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const [clicked, setClicked] = useState<string>("");
  const [childClicked, setChildClicked] = useState<string>(""); // move these to redux and remove use client from top

  const router = useRouter();

  const handleChildClick = (val: string, navigateTo: string | undefined) => {
    if (childClicked === val) {
    } else {
      setChildClicked(val);
    }
    console.log(navigateTo);
    if (navigateTo) {
      console.log(navigateTo);
      router.push(navigateTo);
    }
  };

  const handleClick = (val: string) => {
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
        const { label, description, icon, activeIcon, children } = side;
        return (
          <div key={index}>
            <div
              className="border border-#4D4D4D-600 flex bg-black flex-row h-48px justify-center align-center p-4 border-1 border-[#4D4D4D] hover:border-yellow1 cursor-pointer"
              onClick={() => {
                handleClick(label);
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
                    clicked === label ? "text-white" : "text-white"
                  } text-left text-small font-Orbitron  mr-5 font-semibold tracking-normal`}
                  style={{ letterSpacing: "3px" }}
                >
                  {label}
                </div>
                <div
                  className={`${
                    clicked === label ? "text-white" : "text-white"
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
                    const { label, description, navigateTo } = child;
                    return (
                      <div
                        className={`bg-background h-28 border-[1px] border-variant1 flex flex-col justify-center align-center p-6 hover:bg-variant1 cursor-pointer px-10 ${
                          childClicked === label ? "border-white" : ""
                        }`}
                        onClick={() => handleChildClick(label, navigateTo)}
                        key={childIndex}
                      >
                        <div
                          className={`text-left text-small font-Orbitron  font-medium tracking-normal ${
                            childClicked === label
                              ? "text-yellow1"
                              : "text-white"
                          }`}
                          style={{ letterSpacing: "3px" }}
                        >
                          {label}
                        </div>
                        <div
                          className="text-white font-Oxanium text-xsmall mt-1  text-left font-normal"
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
