"use client";

import Image from "next/image";
import LaunpadDropCard from "./launchpadDropCard";
import FAQ from "./faq";

// import Image from "next/image";
// import React, { useState } from "react";
// import CoinComponent from "./coinComponent";

// const tabs = {
//   myRewards: "Top Coins",
//   referals: "Trending",
// } as { [key: string]: string };

// const timeFilter = [
//   { label: "10m", value: { val: 10, timeUnit: "m" } },
//   { label: "1h", value: { val: 1, timeUnit: "h" } },
//   { label: "6h", value: { val: 6, timeUnit: "h" } },
//   { label: "10h", value: { val: 10, timeUnit: "h" } },
// ];

// const showTopData = [
//   { label: "12", value: { val: 12 } },
//   { label: "30", value: { val: 30 } },
//   { label: "60", value: { val: 60 } },
//   { label: "120", value: { val: 120 } },
// ];

// const HomeComponent = () => {
//   const [selectedTab, setSelectedTab] = useState(tabs.myRewards);
//   const [selectedTopFilter, setSelectedTopFilter] = useState({
//     ...showTopData[0],
//   });
//   const [selectedTimeFilter, setSelectedTimeFilter] = useState({
//     ...timeFilter[0],
//   });
//   return (
//     <div className="bg-[transparent] flex-1 overflow-auto">
//       <div className="w-full h-[350px] bg-[transparent] relative overflow-hidden">
//         <img src="https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=3438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
//         <div className="absolute h-[350px] top-0 left-0 w-full bg-[rgba(0,0,0,0.5)] flex items-end bg-gradient-to-t from-black">
//           <div className="flex w-full bg-[transparent] py-0 px-4">
//             <div className="w-2/3">
//               <p className="text-normal text-white font-Orbitron font-semibold">
//                 DOGWIFHAT
//               </p>
//               <p className="text-xsmall text-white font-Oxanium font-medium mt-2 tracking-wide">
//                 GET REKT marks the inaugural entry in a series of GIFs
//                 celebrating Crypto Meme Culture—a nod to the lifestyle of degens
//                 and a sardonic toast to the forthcoming market pump Drawing
//                 inspiration from the legendary CC0 collection by Osf, this GIF
//                 springs from a frame of Rektguy #8329
//               </p>
//               <div className="flex mt-2">
//                 <span className="bg-variant1 px-2 py-1 hover:scale-105 cursor-pointer flex items-center">
//                   <p className="font-Orbitron text-white text-xsmall">TRADE</p>
//                   <Image
//                     src={"/export_white.svg"}
//                     alt="Export Logo"
//                     className="ml-2"
//                     width={17}
//                     height={17}
//                     style={{}}
//                     priority
//                   />
//                 </span>
//                 <a
//                   className="website ml-4 hover:scale-105 cursor-pointer"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   href={"website"}
//                   // onClick={(e) => {
//                   //   if (!mediaLinks.website) e.preventDefault();
//                   // }}
//                 >
//                   <Image
//                     // src={
//                     //   mediaLinks.website
//                     //     ? "/website.svg"
//                     //     : "/websiteDisabled.svg"
//                     // }
//                     src={"/website.svg"}
//                     alt="websity Logo"
//                     width={23}
//                     height={23}
//                     priority
//                   />
//                 </a>
//                 <a
//                   className="twitter ml-4 hover:scale-105 cursor-pointer"
//                   href={"mediaLinks.twitter"}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   // onClick={(e) => {
//                   //   if (!mediaLinks.twitter) e.preventDefault();
//                   // }}
//                 >
//                   <Image
//                     // src={
//                     //   mediaLinks.twitter
//                     //     ? "/twitter.svg"
//                     //     : "/twitterDisabled.svg"
//                     // }
//                     src={"/twitter.svg"}
//                     alt="twitter Logo"
//                     width={20}
//                     height={20}
//                     priority
//                   />
//                 </a>
//                 <a
//                   className="telegram ml-4 hover:scale-105 cursor-pointer"
//                   href={"mediaLinks.telegram"}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   // onClick={(e) => {
//                   //   if (!mediaLinks.telegram) e.preventDefault();
//                   // }}
//                 >
//                   <Image
//                     // src={
//                     //   mediaLinks.telegram
//                     //     ? "/telegram.svg"
//                     //     : "/telegramDisabled.svg"
//                     // }
//                     src={"/telegram.svg"}
//                     alt="telegram Logo"
//                     width={20}
//                     height={20}
//                     priority
//                   />
//                 </a>
//                 <a
//                   className="discord ml-4 hover:scale-105 cursor-pointer"
//                   href={"mediaLinks.discord"}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   // onClick={(e) => {
//                   //   if (!mediaLinks.discord) e.preventDefault();
//                   // }}
//                 >
//                   <Image
//                     // src={
//                     //   mediaLinks.discord
//                     //     ? "/discord.svg"
//                     //     : "/discordDisabled.svg"
//                     // }
//                     src={"/discord.svg"}
//                     alt="discord Logo"
//                     width={20}
//                     height={20}
//                     priority
//                   />
//                 </a>
//               </div>
//             </div>
//             <div className="flex w-1/3 items-end flex-col justify-end">
//               <p className="text-normal text-textGreen font-Orbitron font-semibold w-full text-right">
//                 {`$3.32`}
//               </p>
//               <div className="flex flex-row mt-2 w-full justify-between pl-8">
//                 <span className="flex">
//                   <p className="text-xsmall text-disabledLink font-Oxanium">
//                     24H VOL :{" "}
//                   </p>
//                   <p className="text-xsmall text-white font-Oxanium">3.21 B</p>
//                 </span>
//                 <span className="flex">
//                   <p className="text-xsmall text-disabledLink font-Oxanium">
//                     MCAP :{" "}
//                   </p>
//                   <p className="text-xsmall text-white font-Oxanium">2.65 B</p>
//                 </span>
//                 <span className="flex">
//                   <p className="text-xsmall text-disabledLink font-Oxanium">
//                     LIQUIDITY :{" "}
//                   </p>
//                   <p className="text-xsmall text-white font-Oxanium">30.21 M</p>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-[transparent] py-4 w-full px-4 mt-8">
//         <div className="flex flex-1 flex-col py-2">
//           <div className="flex justify-between">
//             <div className="flex">
//               {Object.keys(tabs).map((tabKey: string, index: number) => {
//                 // const isTabDisabled = disabledTabs.includes(tabs[tabKey]);
//                 const isTabDisabled = false;
//                 let tabLabel = tabs[tabKey] as any;
//                 return (
//                   <button
//                     key={index + "button"}
//                     disabled={isTabDisabled}
//                     className={`${
//                       selectedTab === tabLabel
//                         ? "text-white font-semibold border-b-[2px] border-yellow1"
//                         : "bg-transparent text-disabledLink font-semibold"
//                     } tracking-wide font-semibold font-Orbitron w-[180px] h-[40px] text-center justify-center text-xsmall flex items-center ${
//                       selectedTab === tabLabel
//                         ? ""
//                         : isTabDisabled
//                         ? ""
//                         : "hover:text-yellow1"
//                     }`}
//                     onClick={() => {
//                       if (!isTabDisabled) setSelectedTab(tabLabel);
//                     }}
//                   >
//                     {tabLabel}
//                   </button>
//                 );
//               })}
//             </div>
//             <div className="flex items-center">
//               <span className="flex items-center border-[2px] border-variant1">
//                 {timeFilter.map((time: any, index: number) => {
//                   const isSelected = time.label === selectedTimeFilter.label;
//                   return (
//                     <span
//                       key={index + "tf"}
//                       className={`${
//                         isSelected
//                           ? "bg-black text-yellow1 border-[1px] border-variant1"
//                           : "bg-bgDarkForComponent text-disabledLink"
//                       } text-xxsmall font-Orbitron py-2 px-2 hover:scale-105 cursor-pointer hover:text-white`}
//                       onClick={() => {
//                         setSelectedTimeFilter({ ...time });
//                       }}
//                     >
//                       {time.label}
//                     </span>
//                   );
//                 })}
//               </span>
//               <span className="flex items-center border-[2px] border-variant1 ml-4">
//                 <span
//                   className={`${"bg-bgDarkForComponent text-white"} text-xxsmall font-Orbitron py-2 px-2 border-r-[1px] border-variant1`}
//                 >
//                   {"Show Top"}
//                 </span>
//                 {showTopData.map((topData: any, index: number) => {
//                   const isSelected = topData.label === selectedTopFilter.label;
//                   return (
//                     <span
//                       key={index + "tf"}
//                       className={`${
//                         isSelected
//                           ? "bg-black text-yellow1 border-[1px] border-variant1"
//                           : "bg-bgDarkForComponent text-disabledLink"
//                       } text-xxsmall font-Orbitron py-2 px-2 hover:scale-105 cursor-pointer hover:text-white`}
//                       onClick={() => {
//                         setSelectedTopFilter({ ...topData });
//                       }}
//                     >
//                       {topData.label}
//                     </span>
//                   );
//                 })}
//               </span>
//               <span className="flex items-center border-[2px] border-variant1 ml-4 gap-2 bg-bgDarkForComponent">
//                 <span className="px-1">
//                   <Image
//                     src={"/listView.svg"}
//                     alt="List View Logo"
//                     className="hover:scale-125 cursor-pointer"
//                     width={20}
//                     height={20}
//                     style={{}}
//                     priority
//                   />
//                 </span>
//                 <span className="py-[5px] px-1 bg-black border-[1px] border-variant1">
//                   <Image
//                     src={"/gridView.svg"}
//                     alt="Grid View Logo"
//                     className="hover:scale-125 cursor-pointer"
//                     width={20}
//                     height={20}
//                     style={{}}
//                     priority
//                   />
//                 </span>
//               </span>
//               <span className="flex items-center border-[2px] border-variant1 ml-4">
//                 <span
//                   className={`${"bg-bgDarkForComponent text-disabledLink"} text-xxsmall font-Orbitron py-2 px-2 border-r-[1px] border-variant1 hover:bg-black hover:text-yellow1 cursor-pointer`}
//                 >
//                   {"See All"}
//                 </span>
//               </span>
//             </div>
//           </div>
//           <div
//             id="tab-content"
//             className="w-full box-border px-0 py-6"
//             // style={{ maxHeight: "calc(100% - 50px)", overflow: "scroll" }}
//           >
//             {selectedTab === tabs.myRewards && (
//               <>
//                 <div className="w-full bg-[transparent] p-4 grid grid-cols-3 gap-3">
//                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
//                     (coin: any, index: number) => {
//                       return (
//                         <div className="bg-[transparent]" key={index}>
//                           <CoinComponent
//                             index={index + 1}
//                             isVerified={index == 1}
//                             isUp={!(index == 4)}
//                           />
//                         </div>
//                       );
//                     }
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeComponent;

interface HomeComponentProps {}

const HomeComponent = ({}: HomeComponentProps) => {
  return (
    <div className="bg-[#131314] scroll-smooth" style={{ overflow: "auto" }}>
      <div
        className="w-[100vw]"
        style={{ height: "calc(100vh - 46px)", overflow: "hidden" }}
      >
        <iframe
          src="https://unicorn.studio/embed/mbs1rjklu6ZqRSlVd09Q"
          width="1440px"
          height="900px"
          loading="lazy"
        ></iframe>
      </div>
      <div className="bg-[#0D0D0F] w-[100vw] flex items-center justify-center">
        <p className="text-[#A0A0A0] font-[400] text-large font-Inter">
          Powered by TradingView
        </p>
        <Image
          src={"/tradingView.svg"}
          alt="Trading View Logo"
          // style={{ width: "100%" }}
          width={52}
          height={52}
          priority
        />
      </div>
      <div className="bg-[#131314] w-full text-center mt-20">
        <h3 className="font-[400] text-[44px] font-Inter linearGradientWhiteText">
          Everything you need
        </h3>
        <p className="text-[#A0A0A0] font-[400] text-[22px] font-Inter">
          Launch Tokens in a breeze
        </p>
        <div className="mt-20 grid grid-rows-5 grid-cols-3 grid-flow-row gap-8 px-10 py-4 h-[800px] w-[80vw] mx-auto">
          <div className="row-span-5 grid grid-rows-4 grid-cos-2 grid-flow-row gap-8 relative overflow-hidden">
            <div className="border-[1px] border-[#FFFFFF0D] row-span-2 overflow-hidden relative hover:scale-95 rounded">
              <Image
                src={"/solarCard.png"}
                alt="Solar Card Logo"
                style={{ width: "100%" }}
                width={200}
                height={100}
                priority
              />
              <section className="absolute left-[20px] bottom-[10px]">
                <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                  Gem Finder
                </p>
                <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                  Find Hidden Finds
                </p>
              </section>
            </div>
            <div className="border-[1px] border-[#FFFFFF0D] row-span-2 relative overflow-hidden hover:scale-95 rounded">
              <Image
                src={"/safetyAnalytics.png"}
                alt="Safety Analytics Logo"
                className="mx-auto my-8"
                style={{ width: "60%" }}
                width={200}
                height={100}
                priority
              />
              <section className="absolute left-[20px] bottom-[10px]">
                <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                  Safety Analytics
                </p>
                <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                  Managae your assets Find Hidden Finds
                </p>
              </section>
            </div>
          </div>
          {/* <div className="border-[1px] border-[#FFFFFF0D] row-span-2 overflow-hidden relative">
            <Image
              src={"/solarCard.png"}
              alt="Solar Card Logo"
              style={{ width: "100%" }}
              width={200}
              height={100}
              priority
            />
            <section className="absolute left-[20px] bottom-[10px]">
              <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                Gem Finder
              </p>
              <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                Find Hidden Finds
              </p>
            </section>
          </div> */}
          <div className="border-[1px] border-[#FFFFFF0D] row-span-3 relative overflow-hidden hover:scale-95 rounded">
            <Image
              src={"/balls.png"}
              alt="Solar Balls Logo"
              style={{ width: "100%" }}
              width={200}
              height={100}
              priority
            />
            <section className="absolute left-[20px] bottom-[10px]">
              <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                Portfolio Management
              </p>
              <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                Managae your assets Find Hidden Finds
              </p>
            </section>
          </div>
          <div className="row-span-3 grid grid-rows-4 grid-cos-2 grid-flow-row gap-8 relative overflow-hidden">
            <div className="border-[1px] border-[#FFFFFF0D] row-span-2 relative overflow-hidden hover:scale-95 rounded">
              <Image
                src={"/solarCard.png"}
                alt="Solar Balls Logo"
                style={{ width: "100%" }}
                width={200}
                height={100}
                priority
              />
              <section className="absolute left-[20px] bottom-[10px]">
                <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                  Creator Tools
                </p>
                <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                  Managae your asset
                </p>
              </section>
            </div>
            <div className="border-[1px] border-[#FFFFFF0D] row-span-2 relative overflow-hidden hover:scale-95 rounded">
              <Image
                src={"/solarCard.png"}
                alt="Solar Balls Logo"
                style={{ width: "100%" }}
                width={200}
                height={100}
                priority
              />
              <section className="absolute left-[20px] bottom-[10px]">
                <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                  Token Launchpad
                </p>
                <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                  Managae your asset
                </p>
              </section>
            </div>
          </div>
          {/* <div className="border-[1px] border-[#FFFFFF0D] row-span-[1.5] relative overflow-hidden">
            <Image
              src={"/solarCard.png"}
              alt="Solar Balls Logo"
              style={{ width: "100%" }}
              width={200}
              height={100}
              priority
            />
            <section className="absolute left-[20px] bottom-[10px]">
              <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                Creator Tools
              </p>
              <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                Managae your asset
              </p>
            </section>
          </div>
          <div className="border-[1px] border-[#FFFFFF0D] row-span-[1.5] relative overflow-hidden">
            <Image
              src={"/solarCard.png"}
              alt="Solar Balls Logo"
              style={{ width: "100%" }}
              width={200}
              height={100}
              priority
            />
            <section className="absolute left-[20px] bottom-[10px]">
              <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                Token Launchpad
              </p>
              <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                Managae your asset
              </p>
            </section>
          </div> */}
          {/* <div className="border-[1px] border-[#FFFFFF0D] row-span-2 relative overflow-hidden">
            <Image
              src={"/safetyAnalytics.png"}
              alt="Safety Analytics Logo"
              className="mx-auto my-8"
              style={{ width: "80%" }}
              width={200}
              height={100}
              priority
            />
            <section className="absolute left-[20px] bottom-[10px]">
              <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                Safety Analytics
              </p>
              <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                Managae your assets Find Hidden Finds
              </p>
            </section>
          </div> */}
          <div className="border-[1px] border-[#FFFFFF0D] row-span-2 relative overflow-hidden hover:scale-95 rounded">
            <Image
              src={"/customInterface.png"}
              alt="Custom Interface Logo"
              className="mx-auto mt-8"
              style={{ width: "70%" }}
              width={200}
              height={100}
              priority
            />
            <section className="absolute left-[20px] bottom-[10px]">
              <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                Customisable Interface
              </p>
              <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                Managae your assets Find Hidden Finds
              </p>
            </section>
          </div>
          <div className="border-[1px] border-[#FFFFFF0D] row-span-2 relative overflow-hidden hover:scale-95 rounded">
            <Image
              src={"/graph.png"}
              alt="Graph Logo"
              className="mx-auto mt-8"
              style={{ width: "70%" }}
              width={200}
              height={100}
              priority
            />
            <section className="absolute left-[20px] bottom-[10px]">
              <p className="font-Inter font-[400] text-[27px] linearGradientWhiteText text-left">
                Real-Time Monitoring
              </p>
              <p className="font-Inter font-[400] text-[14px] text-[#A0A0A0] text-left">
                Managae your assets Find Hidden Finds
              </p>
            </section>
          </div>
        </div>
      </div>
      <div
        className="bg-[#131314] w-full text-center mt-20 relative"
        style={{ zIndex: 2 }}
      >
        <h3 className="font-[400] text-[44px] font-Inter linearGradientWhiteText">
          Memeverse
        </h3>
        <p className="text-[#A0A0A0] font-[400] text-[22px] max-w-[500px] mx-auto font-Inter">
          Discover new tokens and filter by your preferences.
        </p>
        <Image
          src={"/memeverse.svg"}
          className="mx-auto mt-16"
          alt="Trading Logo"
          style={{ width: "80%", zIndex: 0 }}
          width={900}
          height={100}
          priority
        />
        <Image
          src={"/mesh.svg"}
          className="absolute right-0 top-20"
          alt="Mesh"
          style={{ width: "80%", zIndex: -1, opacity: 0.2 }}
          width={900}
          height={100}
          priority
        />
      </div>
      {/* <div
        className="bg-[#131314] w-full text-center mt-20 relative"
        style={{ zIndex: 2 }}
      >
        <h3 className="font-[400] text-[44px] font-Inter linearGradientWhiteText">
          Launchpad Drops
        </h3>
        <p className="text-[#A0A0A0] font-[400] text-[22px] max-w-[500px] mx-auto font-Inter">
          Discover new tokens and filter by your preferences.
        </p>
        <div className="flex gap-12 overflow-auto w-[80vw] mx-auto my-8">
          {[1, 2, 3, 4].map((dropCard: any, index: number) => {
            return (
              <section className="flex-shrink-1" key={index}>
                <LaunpadDropCard
                  name={"Get REKT"}
                  imgSrc={
                    index % 2
                      ? "https://as1.ftcdn.net/v2/jpg/06/82/65/06/1000_F_682650645_Y3sfPOVN8UkN8eVrHVZWXiHrudMqkYRj.jpg"
                      : "https://imgs.search.brave.com/BF3vMVFwRVikh3aHvl2T80TwRLOpeFFy1--XjG4qNi0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzc1LzE1LzA0/LzM2MF9GXzc1MTUw/NDQ1X0d6NVI5b0FI/VmJZVzg3ZU1RRnRv/SzVsYlIzNTFyWlF4/LmpwZw"
                  }
                />
              </section>
            );
          })}
        </div>
      </div> */}
      <div
        className="bg-[#131314] w-full text-center mt-20 relative"
        style={{ zIndex: 2 }}
      >
        <h3 className="font-[400] text-[44px] font-Inter linearGradientWhiteText">
          Automate your trading
        </h3>
        <p className="text-[#A0A0A0] font-[400] text-[22px] max-w-[500px] mx-auto font-Inter">
          Take your emotion out of the equation
        </p>
        <Image
          src={"/automateTrading.svg"}
          alt="Trading View Logo"
          className="mx-auto"
          style={{ width: "80%" }}
          width={52}
          height={52}
          priority
        />
        <span className="absolute top-[30%] left-[10%] bg-[rgba(0,0,0,0.8)]">
          <Image
            src={"/autoSuggestions.svg"}
            alt="Trading View Logo"
            style={{ background: "#29292D4D" }}
            width={351}
            height={264}
            priority
          />
        </span>
        <span className="absolute top-[50%] right-[10%] bg-[rgba(0,0,0,0.8)]">
          <Image
            src={"/autoStopLoss.svg"}
            alt="Trading View Logo"
            style={{ background: "#29292D4D" }}
            width={351}
            height={264}
            priority
          />
        </span>
        <Image
          src={"/solarBg.png"}
          alt="Solar BG"
          className="absolute top-[-400px] right-0"
          style={{ width: "50%" }}
          width={351}
          height={264}
          priority
        />
      </div>
      <div
        className="bg-[#131314] w-full text-center my-20 relative"
        style={{ zIndex: 2 }}
      >
        <Image
          src={"/mesh.svg"}
          className="absolute right-0"
          alt="Mesh"
          style={{ width: "80%", zIndex: -1, opacity: 0.02 }}
          width={900}
          height={100}
          priority
        />
        {/* <Image
          src={"/whiteGradient.svg"}
          className="absolute right-0 bottom-0"
          alt="Mesh"
          style={{ width: "50%", zIndex: -1, opacity: 1 }}
          width={900}
          height={100}
          priority
        /> */}
        <h3 className="font-[400] text-[44px] font-Inter linearGradientWhiteText">
          FAQ
        </h3>
        <p className="text-[#A0A0A0] font-[400] text-[22px] max-w-[500px] mx-auto font-Inter">
          Take your emotion out of the equation
        </p>
        {/* <div className="w-[80vw] flex gap-8 mx-auto flex-col mt-8">
          {[
            "What is moonly?",
            "What do I need to start using Moonly?",
            "Do I need to transfer my funds outside my account?",
            "How many clients already allocated their funds to Moonly?",
            "What exchanges are integrated with Moonly?",
            "What are the risks?",
            "Why should I trust you?",
          ].map((ques: any, index: number) => {
            return (
              <div
                key={"faq" + index}
                className="flex justify-between px-4 py-6 border-[1.05px] border-[#323232] rounded-[8px] cursor-pointer hover:border-[#BDBDBD]"
              >
                <p className="font-Inter font-[300] text-[18px] text-[#BDBDBD]">
                  {ques}
                </p>
                <Image
                  src={"/add.svg"}
                  alt="add"
                  width={12}
                  height={12}
                  priority
                />
              </div>
            );
          })}
        </div> */}
        <FAQ />
      </div>
      <div className="flex justify-between items-center py-6 px-[10%]  border-t-[0.8px] border-[#323232]">
        <section className="flex gap-6">
          <p className="text-[#BDBDBD] font-[300] text-[16px] font-Inter cursor-pointer">
            Privacy Policy
          </p>
          <p className="text-[#BDBDBD] font-[300] text-[16px] font-Inter cursor-pointer">
            Terms Of Use
          </p>
        </section>

        <section className="flex gap-6 z-10">
          <a
            className="twitter cursor-pointer"
            href={"https://x.com/moonlytrade"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ pointerEvents: "auto" }}
          >
            <Image
              src={"/twitter.svg"}
              alt="twitter Logo"
              width={20}
              height={20}
              priority
            />
          </a>
          <a
            className="discord"
            href={"https://discord.gg/hXbmdYXt"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ pointerEvents: "auto" }}
            // onClick={(e) => e.preventDefault()}
          >
            <Image
              src={"/discord.svg"}
              alt="discord Logo"
              width={20}
              height={20}
              priority
            />
          </a>
          <a
            className="telegram cursor-pointer"
            href={"https://t.me/moonlytrade"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ pointerEvents: "auto" }}
          >
            <Image
              src={"/telegram.svg"}
              alt="telegram Logo"
              width={20}
              height={20}
              priority
            />
          </a>
        </section>
      </div>
    </div>
  );
};

export default HomeComponent;
