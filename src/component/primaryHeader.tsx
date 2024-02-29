import Image from "next/image";
import React, { FC } from "react";
// import logo from "../asset/logo.jpeg";
// import solana from "../asset/solana.png";
// import setting from "../asset/setting.png";

const borderColor: string = "#4D4D4D";

const PrimaryHeader: FC = () => {
  return (
    <div
      className="w-full bg-black flex justify-between py-[5px]"
      style={{ borderBottomWidth: "0.2px", borderColor: borderColor }}
    >
      <div className="flex">
        <div
          className="px-6 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer flex items-center">
            {/* <img
              src={solana}
              alt="settings"
              width={`${16}px`}
              style={{
                height: `${16}px`,
                marginRight: "5px",
              }}
            /> */}
            <Image
              src={"/solana.png"}
              alt="solana Logo"
              width={16}
              height={16}
              style={{ marginRight: "5px" }}
              priority
            />
            92.21 USDT
          </div>
        </div>
        <div
          className="px-6 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            TSP: 2.778
          </div>
        </div>
        <div
          className="px-6 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            24h Volume: 3.2m USDT
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className="cursor-pointer px-4 flex items-center hover:bg-[]"
          style={{
            borderLeftWidth: "0.5px",
            borderColor: borderColor,
          }}
        >
          {/* <img
            src={setting}
            alt="settings"
            width={`${20}px`}
            style={{
              height: `${20}px`,
            }}
          /> */}
          <Image
            src={"/setting.png"}
            alt="setting Logo"
            width={20}
            height={20}
            // style={{ marginRight: "5px" }}
            priority
          />
        </div>
        <div
          className="text-white text-xsmall font-Orbitron text-left items-center px-6 flex flex-row"
          style={{
            borderLeftWidth: "0.5px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            Light
          </div>
          <label className="switch text-xsmall mx-4">
            <input
              onClick={() => {
                console.log("Toggle theme");
              }}
              type="checkbox"
            />
            <span className="slider round"></span>
          </label>
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            Pro
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryHeader;
