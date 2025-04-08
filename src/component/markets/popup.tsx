import React from "react";
import Image from "next/image";
import Spotlight from "../memeverse/asset/spotlight.svg";

const Popup = () => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 transition-opacity top-[46px] bg-transparent/10 backdrop-blur-sm"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen top-[46px]">
        <div
          className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0 mt-[46px]"
          style={{ height: "calc(100vh - 75px)" }}
        >
          <div className="relative h-max pb-8 transform rounded-sm bg-[#161618] border border-borderColor rounded-[5px]  text-left shadow-xl transition-all w-[670px] ">
            <div className="absolute top-[-10] bg-[#161618] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[86px] w-[86px] flex justify-center items-center border border-borderColor rounded-[4px]">
              <Image src={Spotlight} alt="blank" />
            </div>
            <div className="flex flex-row items-center justify-center font-Inter font-medium text-[24px] text-white mt-16">
              MEMEVERSE{" "}
              <span className="text-yellow1 text-xsmall bg-[#323234] rounded-2xl px-2 py-1 font-light ml-2">
                Coming Soon
              </span>
            </div>
            <div className="text-center font-light text-normal text-[#989C9F] mt-4">
              Subscribe now to gain early access,
              <br /> and get a chance to win
              <span className="text-yellow1 mx-1">$MOONLY</span>
              airdrop.
            </div>
            <input
              placeholder="Enter Telegram Handle"
              className="h-[52px] w-[90%] m-auto rounded-[5px] mt-4 text-small text-white font-light flex justify-start items-center px-3  bg-[#222222cc]  border border-borderColor outline-none placeholder:text-white "
            />
            <div className=" bg-[#222222cc] w-max text-white px-6 py-3 rounded-3xl text-small mt-6 m-auto">
              SUBSCRIBE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
