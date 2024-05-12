"use client";
import Image from "next/image";
import React, { useState } from "react";
import CoinComponent from "./coinComponent";

const tabs = {
  myRewards: "Top Coins",
  referals: "Trending",
} as { [key: string]: string };

const timeFilter = [
  { label: "10m", value: { val: 10, timeUnit: "m" } },
  { label: "1h", value: { val: 1, timeUnit: "h" } },
  { label: "6h", value: { val: 6, timeUnit: "h" } },
  { label: "10h", value: { val: 10, timeUnit: "h" } },
];

const showTopData = [
  { label: "12", value: { val: 12 } },
  { label: "30", value: { val: 30 } },
  { label: "60", value: { val: 60 } },
  { label: "120", value: { val: 120 } },
];

const HomeComponent = () => {
  const [selectedTab, setSelectedTab] = useState(tabs.myRewards);
  const [selectedTopFilter, setSelectedTopFilter] = useState({
    ...showTopData[0],
  });
  const [selectedTimeFilter, setSelectedTimeFilter] = useState({
    ...timeFilter[0],
  });
  return (
    <div className="bg-[transparent] flex-1 overflow-auto">
      <div className="w-full h-[350px] bg-[transparent] relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=3438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <div className="absolute h-[350px] top-0 left-0 w-full bg-[rgba(0,0,0,0.5)] flex items-end bg-gradient-to-t from-black">
          <div className="flex w-full bg-[transparent] py-0 px-4">
            <div className="w-2/3">
              <p className="text-normal text-white font-Orbitron font-semibold">
                DOGWIFHAT
              </p>
              <p className="text-xsmall text-white font-Oxanium font-medium mt-2 tracking-wide">
                GET REKT marks the inaugural entry in a series of GIFs
                celebrating Crypto Meme Culture—a nod to the lifestyle of degens
                and a sardonic toast to the forthcoming market pump Drawing
                inspiration from the legendary CC0 collection by Osf, this GIF
                springs from a frame of Rektguy #8329
              </p>
              <div className="flex mt-2">
                <span className="bg-variant1 px-2 py-1 hover:scale-105 cursor-pointer flex items-center">
                  <p className="font-Orbitron text-white text-xsmall">TRADE</p>
                  <Image
                    src={"/export_white.svg"}
                    alt="Export Logo"
                    className="ml-2"
                    width={17}
                    height={17}
                    style={{}}
                    priority
                  />
                </span>
                <a
                  className="website ml-4 hover:scale-105 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"website"}
                  // onClick={(e) => {
                  //   if (!mediaLinks.website) e.preventDefault();
                  // }}
                >
                  <Image
                    // src={
                    //   mediaLinks.website
                    //     ? "/website.svg"
                    //     : "/websiteDisabled.svg"
                    // }
                    src={"/website.svg"}
                    alt="websity Logo"
                    width={23}
                    height={23}
                    priority
                  />
                </a>
                <a
                  className="twitter ml-4 hover:scale-105 cursor-pointer"
                  href={"mediaLinks.twitter"}
                  target="_blank"
                  rel="noopener noreferrer"
                  // onClick={(e) => {
                  //   if (!mediaLinks.twitter) e.preventDefault();
                  // }}
                >
                  <Image
                    // src={
                    //   mediaLinks.twitter
                    //     ? "/twitter.svg"
                    //     : "/twitterDisabled.svg"
                    // }
                    src={"/twitter.svg"}
                    alt="twitter Logo"
                    width={20}
                    height={20}
                    priority
                  />
                </a>
                <a
                  className="telegram ml-4 hover:scale-105 cursor-pointer"
                  href={"mediaLinks.telegram"}
                  target="_blank"
                  rel="noopener noreferrer"
                  // onClick={(e) => {
                  //   if (!mediaLinks.telegram) e.preventDefault();
                  // }}
                >
                  <Image
                    // src={
                    //   mediaLinks.telegram
                    //     ? "/telegram.svg"
                    //     : "/telegramDisabled.svg"
                    // }
                    src={"/telegram.svg"}
                    alt="telegram Logo"
                    width={20}
                    height={20}
                    priority
                  />
                </a>
                <a
                  className="discord ml-4 hover:scale-105 cursor-pointer"
                  href={"mediaLinks.discord"}
                  target="_blank"
                  rel="noopener noreferrer"
                  // onClick={(e) => {
                  //   if (!mediaLinks.discord) e.preventDefault();
                  // }}
                >
                  <Image
                    // src={
                    //   mediaLinks.discord
                    //     ? "/discord.svg"
                    //     : "/discordDisabled.svg"
                    // }
                    src={"/discord.svg"}
                    alt="discord Logo"
                    width={20}
                    height={20}
                    priority
                  />
                </a>
              </div>
            </div>
            <div className="flex w-1/3 items-end flex-col justify-end">
              <p className="text-normal text-textGreen font-Orbitron font-semibold w-full text-right">
                {`$3.32`}
              </p>
              <div className="flex flex-row mt-2 w-full justify-between pl-8">
                <span className="flex">
                  <p className="text-xsmall text-disabledLink font-Oxanium">
                    24H VOL :{" "}
                  </p>
                  <p className="text-xsmall text-white font-Oxanium">3.21 B</p>
                </span>
                <span className="flex">
                  <p className="text-xsmall text-disabledLink font-Oxanium">
                    MCAP :{" "}
                  </p>
                  <p className="text-xsmall text-white font-Oxanium">2.65 B</p>
                </span>
                <span className="flex">
                  <p className="text-xsmall text-disabledLink font-Oxanium">
                    LIQUIDITY :{" "}
                  </p>
                  <p className="text-xsmall text-white font-Oxanium">30.21 M</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[transparent] py-4 w-full px-4 mt-8">
        <div className="flex flex-1 flex-col py-2">
          <div className="flex justify-between">
            <div className="flex">
              {Object.keys(tabs).map((tabKey: string, index: number) => {
                // const isTabDisabled = disabledTabs.includes(tabs[tabKey]);
                const isTabDisabled = false;
                let tabLabel = tabs[tabKey] as any;
                return (
                  <button
                    key={index + "button"}
                    disabled={isTabDisabled}
                    className={`${
                      selectedTab === tabLabel
                        ? "text-white font-semibold border-b-[2px] border-yellow1"
                        : "bg-transparent text-disabledLink font-semibold"
                    } tracking-wide font-semibold font-Orbitron w-[180px] h-[40px] text-center justify-center text-xsmall flex items-center ${
                      selectedTab === tabLabel
                        ? ""
                        : isTabDisabled
                        ? ""
                        : "hover:text-yellow1"
                    }`}
                    onClick={() => {
                      if (!isTabDisabled) setSelectedTab(tabLabel);
                    }}
                  >
                    {tabLabel}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center">
              <span className="flex items-center border-[2px] border-variant1">
                {timeFilter.map((time: any, index: number) => {
                  const isSelected = time.label === selectedTimeFilter.label;
                  return (
                    <span
                      key={index + "tf"}
                      className={`${
                        isSelected
                          ? "bg-black text-yellow1 border-[1px] border-variant1"
                          : "bg-bgDarkForComponent text-disabledLink"
                      } text-xxsmall font-Orbitron py-2 px-2 hover:scale-105 cursor-pointer hover:text-white`}
                      onClick={() => {
                        setSelectedTimeFilter({ ...time });
                      }}
                    >
                      {time.label}
                    </span>
                  );
                })}
              </span>
              <span className="flex items-center border-[2px] border-variant1 ml-4">
                <span
                  className={`${"bg-bgDarkForComponent text-white"} text-xxsmall font-Orbitron py-2 px-2 border-r-[1px] border-variant1`}
                >
                  {"Show Top"}
                </span>
                {showTopData.map((topData: any, index: number) => {
                  const isSelected = topData.label === selectedTopFilter.label;
                  return (
                    <span
                      key={index + "tf"}
                      className={`${
                        isSelected
                          ? "bg-black text-yellow1 border-[1px] border-variant1"
                          : "bg-bgDarkForComponent text-disabledLink"
                      } text-xxsmall font-Orbitron py-2 px-2 hover:scale-105 cursor-pointer hover:text-white`}
                      onClick={() => {
                        setSelectedTopFilter({ ...topData });
                      }}
                    >
                      {topData.label}
                    </span>
                  );
                })}
              </span>
              <span className="flex items-center border-[2px] border-variant1 ml-4 gap-2 bg-bgDarkForComponent">
                <span className="px-1">
                  <Image
                    src={"/listView.svg"}
                    alt="List View Logo"
                    className="hover:scale-125 cursor-pointer"
                    width={20}
                    height={20}
                    style={{}}
                    priority
                  />
                </span>
                <span className="py-[5px] px-1 bg-black border-[1px] border-variant1">
                  <Image
                    src={"/gridView.svg"}
                    alt="Grid View Logo"
                    className="hover:scale-125 cursor-pointer"
                    width={20}
                    height={20}
                    style={{}}
                    priority
                  />
                </span>
              </span>
              <span className="flex items-center border-[2px] border-variant1 ml-4">
                <span
                  className={`${"bg-bgDarkForComponent text-disabledLink"} text-xxsmall font-Orbitron py-2 px-2 border-r-[1px] border-variant1 hover:bg-black hover:text-yellow1 cursor-pointer`}
                >
                  {"See All"}
                </span>
              </span>
            </div>
          </div>
          <div
            id="tab-content"
            className="w-full box-border px-0 py-6"
            // style={{ maxHeight: "calc(100% - 50px)", overflow: "scroll" }}
          >
            {selectedTab === tabs.myRewards && (
              <>
                <div className="w-full bg-[transparent] p-4 grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                    (coin: any, index: number) => {
                      return (
                        <div className="bg-[transparent]" key={index}>
                          <CoinComponent
                            index={index + 1}
                            isVerified={index == 1}
                            isUp={!(index == 4)}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
