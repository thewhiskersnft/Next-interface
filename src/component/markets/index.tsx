"use client";
import React, { useEffect, useState } from "react";
import FavouriteSidebar from "../common/favouritesSidebar";
import Image from "next/image";
import CoinComponent from "../homeComponent/coinComponent";
import { infoToast } from "../common/toast";

interface MarketComponentProps {}

const tabs = {
  myRewards: "Top Coins",
  referals: "Trending",
  newPools: "New Pools",
  inventory: "Inventory",
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

const MarketComponent = ({}: MarketComponentProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs.myRewards);
  const [selectedTopFilter, setSelectedTopFilter] = useState({
    ...showTopData[0],
  });
  const [selectedTimeFilter, setSelectedTimeFilter] = useState({
    ...timeFilter[0],
  });
  useEffect(() => {
    infoToast({ message: "Coming Soon!" });
  }, []);
  return (
    <div
      className="bg-[transparent] w-[100vw] flex"
      style={{ height: "calc(100vh - 75px)" }}
    >
      <FavouriteSidebar />
      <div className="bg-[transparent] flex-1 py-4 px-4">
        <div className="flex justify-between gap-2">
          <div className="h-[305px] w-[30%] bg-[#161618] py-4 px-4 rounded-[4px] overflow-hidden relative border-[0.98px] border-[#2F2F2F]">
            {/* <div className="bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0 h-[305px]"></div> */}
            <h5 className="text-[#8D8D8D] font-Inter font-[600] text-[12px] uppercase">
              Trending / Profits
            </h5>
            <div className={"flex justify-between mt-4"}>
              <p className="text-[#C8C2B2] font-Inter font-[500] text-[12px] uppercase">
                Pair
              </p>
              <p className="text-[#C8C2B2] font-Inter font-[500] text-[12px] uppercase">
                PRICE
              </p>
              <p className="text-[#C8C2B2] font-Inter font-[500] text-[12px] uppercase">
                VOLUME
              </p>
              <p className="text-[#C8C2B2] font-Inter font-[500] text-[12px] uppercase">
                TXNS
              </p>
              <p className="text-[#C8C2B2] font-Inter font-[500] text-[12px] uppercase">
                Liquidity
              </p>
              <p className="text-[#C8C2B2] font-Inter font-[500] text-[12px] uppercase">
                MCAP
              </p>
            </div>
            <div className="h-[200px] bg-[transparent] overflow-auto mt-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 44].map(
                (trade: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={
                        index
                          ? "flex justify-between mt-4"
                          : "flex justify-between"
                      }
                    >
                      <p className="text-[#FFFFFF] font-Inter font-[500] text-[12px] uppercase">
                        MOON
                      </p>
                      <p className="text-[#909090] font-Inter font-[500] text-[12px] uppercase">
                        7.3729 K
                      </p>
                      <p className="text-[#909090] font-Inter font-[500] text-[12px] uppercase">
                        $258K
                      </p>
                      <p className="text-[#909090] font-Inter font-[500] text-[12px] uppercase">
                        $258K
                      </p>
                      <p className="text-[#909090] font-Inter font-[500] text-[12px] uppercase">
                        $158K
                      </p>
                      <p className="text-[#909090] font-Inter font-[500] text-[12px] uppercase">
                        $858K
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="h-[305px] w-[20%] bg-[#161618] flex items-center justify-center border-[0.98px] border-[#2F2F2F] flex-col">
            <Image
              src={"/addWidget.svg"}
              alt="Widget Logo"
              width={54}
              height={54}
              priority
            />
            <p className="text-[#FFFFFF] font-Inter font-[400] text-[14px] mt-2">
              Add Widget
            </p>
            <p className="text-[#8D8D8D] font-Inter font-[400] text-[12px] w-[70%] mx-auto text-center mt-2">
              Customize your arena, Add charts, performance, your current bids
              etc
            </p>
          </div>
          <div className="h-[305px] w-[50%] border-[0.98px] border-[#2F2F2F]">
            <img
              className="justify-center align-center"
              src={
                "https://img.freepik.com/premium-photo/teddy-bear-sits-lantern-light-that-says-teddy-bear_766363-8420.jpg"
              }
              alt="svg"
              style={{
                height: "305px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div>
          <div className="bg-[transparent] py-2 w-full px-4 mt-2">
            <div className="flex flex-1 flex-col py-0">
              <div className="flex justify-between">
                <div className="flex">
                  {Object.keys(tabs).map((tabKey: string, index: number) => {
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
                        } tracking-wide font-semibold font-Orbitron px-4 h-[40px] text-center justify-center text-xsmall flex items-center ${
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
                      const isSelected =
                        time.label === selectedTimeFilter.label;
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
                      const isSelected =
                        topData.label === selectedTopFilter.label;
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
            </div>
          </div>
        </div>
        <div
          className="w-full bg-[#161618] mb-4 overflow-auto"
          style={{ height: "calc(100vh - 480px)" }}
        >
          <div className="w-full bg-[transparent] p-4 grid grid-cols-1 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 33, 44, 55, 66, 77].map(
              (coin: any, index: number) => {
                return (
                  <div className="bg-[transparent]" key={index}>
                    <CoinComponent
                      index={index + 1}
                      isVerified={true}
                      isUp={!(index == 4)}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketComponent;
