import React from "react";
import Memeverse from "./memeverse";
import Spotlight from "./asset/spotlight.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-stroke h-max px-0 md:px-6 py-6">
      <div className="flex flex-row items-center mb-6 w-full">
        <Image className="mr-2 md:mr-6" src={Spotlight} alt="spotlight" />
        <div className="flex flex-col">
          <div className="text-xl text-white">MEMEVERSE</div>
          <div className="text-md text-disabledLink">
            Search for symbol, name, contract, or wallets
          </div>
        </div>
      </div>
      <Memeverse />
    </div>
  );
}
