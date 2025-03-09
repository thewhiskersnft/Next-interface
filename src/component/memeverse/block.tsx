import React from "react";
import Image from "next/image";
import Coin from "./asset/coin.png";
import Bug from "./asset/bug.svg";
import Dev from "./asset/dev.svg";
import TopHolder from "./asset/topHolder.svg";
import Currency from "./asset/currency.svg";
import X from "./asset/x.svg";
import Telegram from "./asset/telegram.svg";
import Globe from "./asset/globe.svg";
import Discord from "./asset/discord.svg";
import Copy from "./asset/copy.svg";
import SolanaIcon from "./asset/solana.svg";
import Light from "./asset/light.svg";
import TotalHolder from "./asset/totalHolder.svg";

interface TokenData {
  tokenName: string;
  tokenAddress: string;
  topHolders: string; // e.g., "15%"
  marketCap: string; // e.g., "25M"
  volume: string; // e.g., "1.2M"
  insiders: string; // e.g., "5%"
  devHolds: string; // e.g., "6%"
  timeSinceCreation: string;
  bondingCurve: string;
}

interface BlockProps {
  data: TokenData[];
}

const Block: React.FC<BlockProps> = ({ data }) => {
  return (
    // <div className="w-full rounded-xs">
    //   {data.map((token, index) => (
    //     <div
    //       key={index}
    //       className="flex flex-row justify-between items-center border border-darkGrey bg-lightBlack w-full p-3 rounded-[4px] shadow-md mb-3"
    //     >
    //       {/* Left Section */}
    //       <div className="flex w-7/12 items-center space-x-4">
    //         <Image
    //           className="flex-shrink-0"
    //           height={20}
    //           width={80}
    //           src={Coin}
    //           alt="coin"
    //         />
    //         <div className="flex flex-col space-y-2">
    //           <div className="flex items-center space-x-2">
    //             <span className="text-sm text-white">{token.tokenName}</span>
    //             <Image src={Currency} alt="currency" />
    //             <span className="text-xs text-disabledLink truncate max-w-[120px]">
    //               {token.tokenAddress.slice(0, 4)}...
    //               {token.tokenAddress.slice(-4)}
    //             </span>
    //             <Image className="cursor-pointer" src={Copy} alt="copy" />
    //           </div>
    //           <div className="flex items-center space-x-4 text-xxsmall text-gray-400">
    //             <span className="text-xs">{token.timeSinceCreation}</span>
    //             <div className="flex items-center space-x-1">
    //               <Image src={TopHolder} alt="top holders" />
    //               <span className="text-red-500 text-xs">
    //                 {token.topHolders}
    //               </span>
    //             </div>
    //             <div className="flex items-center space-x-1">
    //               <Image src={Dev} alt="dev holds" />
    //               <span className="text-red-500 text-xs">{token.devHolds}</span>
    //             </div>
    //             <div className="flex items-center space-x-1">
    //               <Image src={Bug} alt="insiders" />
    //               <span className="text-red-500 text-xs">{token.insiders}</span>
    //             </div>
    //           </div>
    //           <div className="flex space-x-2">
    //             <Image className="cursor-pointer" src={X} alt="x" />
    //             <Image
    //               className="cursor-pointer"
    //               src={Telegram}
    //               alt="telegram"
    //             />
    //             <Image className="cursor-pointer" src={Discord} alt="discord" />
    //             <Image className="cursor-pointer" src={Globe} alt="globe" />
    //           </div>
    //         </div>
    //       </div>

    //       {/* Right Section */}
    //       <div className="flex w-5/12 flex-col items-end h-max space-y-4">
    //         <div className="flex flex-row items-center bg-buttonBlack rounded-3xl px-3 py-2">
    //           <Image src={SolanaIcon} alt="solana" className="mr-1" />
    //           <span className="text-xs text-white">0.1</span>
    //           <Image src={Light} alt="light" className="ml-2" />
    //         </div>
    //         <div className="flex flex-row text-xs space-x-4">
    //           <div className="flex flex-row items-center text-white text-xs">
    //             <Image className="mr-1" src={TotalHolder} alt="total holders" />
    //             <span>{token.topHolders}</span>
    //           </div>
    //           <div className="flex flex-row items-center text-white text-xs">
    //             <span className="font-semibold text-xs text-disabledLink mr-1">
    //               V
    //             </span>
    //             ${token.volume}
    //           </div>
    //           <div className="flex flex-row items-center text-white text-xs">
    //             <span className="font-semibold text-xs text-disabledLink mr-1">
    //               MC
    //             </span>
    //             ${token.marketCap}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="w-full rounded-xs">
      {data.map((token, index) => {
        // Convert bonding curve percentage to angle (360° is full)
        const bondingAngle = (parseFloat(token.bondingCurve) / 100) * 360;

        return (
          <div
            key={index}
            className="flex flex-row justify-between items-center border border-darkGrey bg-lightBlack w-full p-3 rounded-[4px] shadow-md mb-3"
          >
            {/* Left Section */}
            <div className="flex w-7/12 items-center space-x-4">
              {/* Image Wrapper with Border */}
              <div
                className="relative p-1 rounded-full"
                style={{
                  background: `conic-gradient(#FFD700 ${bondingAngle}deg, transparent ${bondingAngle}deg 360deg)`,
                  borderRadius: "50%",
                  padding: "3px",
                }}
              >
                <Image
                  className="rounded-full bg-lightBlack p-1"
                  height={20}
                  width={80}
                  src={Coin}
                  alt="coin"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-white">{token.tokenName}</span>
                  <Image src={Currency} alt="currency" />
                  <span className="text-xs text-disabledLink truncate max-w-[120px]">
                    {token.tokenAddress.slice(0, 4)}...
                    {token.tokenAddress.slice(-4)}
                  </span>
                  <Image className="cursor-pointer" src={Copy} alt="copy" />
                </div>
                <div className="flex items-center space-x-4 text-xxsmall text-gray-400">
                  <span className="text-xs">{token.timeSinceCreation}</span>
                  <div className="flex items-center space-x-1">
                    <Image src={TopHolder} alt="top holders" />
                    <span className="text-red-500 text-xs">
                      {token.topHolders}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Image src={Dev} alt="dev holds" />
                    <span className="text-red-500 text-xs">
                      {token.devHolds}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Image src={Bug} alt="insiders" />
                    <span className="text-red-500 text-xs">
                      {token.insiders}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Image className="cursor-pointer" src={X} alt="x" />
                  <Image
                    className="cursor-pointer"
                    src={Telegram}
                    alt="telegram"
                  />
                  <Image
                    className="cursor-pointer"
                    src={Discord}
                    alt="discord"
                  />
                  <Image className="cursor-pointer" src={Globe} alt="globe" />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex w-5/12 flex-col items-end h-max space-y-4">
              <div className="flex flex-row items-center bg-buttonBlack rounded-3xl px-3 py-2">
                <Image src={SolanaIcon} alt="solana" className="mr-1" />
                <span className="text-xs text-white">0.1</span>
                <Image src={Light} alt="light" className="ml-2" />
              </div>
              <div className="flex flex-row text-xs space-x-2">
                <div className="flex flex-row items-center text-white text-xs">
                  <Image
                    className="mr-1"
                    src={TotalHolder}
                    alt="total holders"
                  />
                  <span>{token.topHolders}</span>
                </div>
                <div className="flex flex-row items-center text-white text-xs">
                  <span className="font-semibold text-xs text-disabledLink mr-1">
                    V
                  </span>
                  ${token.volume}
                </div>
                <div className="flex flex-row items-center text-white text-xs">
                  <span className="font-semibold text-xs text-disabledLink mr-1">
                    MC
                  </span>
                  ${token.marketCap}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Block;
