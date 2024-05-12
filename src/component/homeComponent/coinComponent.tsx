import Image from "next/image";
import React from "react";

interface CoinComponentProps {
  index: number;
  isVerified?: boolean;
  isUp?: boolean;
}

const CoinComponent = ({ index, isVerified, isUp }: CoinComponentProps) => {
  return (
    <div className="w-full flex bg-bgDarkForComponent px-4 py-2 justify-between items-center cursor-pointer text-white hover:scale-95 hover:bg-black hover:text-yellow1">
      <div className="flex items-center">
        <p className="text-small font-Oxanium">{`#${index}`}</p>
        <span className="relative">
          <img
            src={
              "https://imgs.search.brave.com/KpEVtxj9bgajWrm57jRK9jOGY9ps3NbSUJHQCzE4gp0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzA0Lzc1LzM5/LzM2MF9GXzcwNDc1/Mzk5M185WGpDVzJw/S0hCbVQyNlE4c2M2/WEJmSmprSmRlZzdY/Qi5qcGc"
            }
            style={{
              height: "60px",
              width: "60px",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "60px",
            }}
            className="mx-2"
          />
          {isVerified && (
            <Image
              src={"/verified.svg"}
              alt="Verified Logo"
              width={20}
              height={20}
              className="absolute bottom-0 right-[5px]"
              priority
            />
          )}
        </span>
        <div className="flex flex-col justify-between">
          <p className="text-small font-Oxanium">{`BONK`}</p>
          <div className="flex mt-2">
            <span className="flex">
              <p className="text-xsmall text-disabledLink font-Oxanium">
                24H VOL :{" "}
              </p>
              <p className="text-xsmall font-Oxanium">3.21 B</p>
            </span>
            <span className="flex">
              <p className="text-xsmall text-disabledLink font-Oxanium">
                MCAP :{" "}
              </p>
              <p className="text-xsmall font-Oxanium">2.65 B</p>
            </span>
          </div>
        </div>
      </div>
      <div>
        <p
          className={`text-small ${""} font-Orbitron font-semibold w-full text-right`}
        >
          {`$6.32`}
        </p>
        <span className="flex items-center gap-1">
          <p
            className={`text-xsmall ${
              isUp ? "text-textGreen" : "text-textRed"
            } font-Orbitron font-semibold w-full text-right`}
          >
            {`${isUp ? "+" : "-"}$6.32`}
          </p>
          <Image
            src={isUp ? "/upGreen.svg" : "/downRed.svg"}
            alt="Rate Logo"
            width={15}
            height={15}
            priority
          />
        </span>
      </div>
    </div>
  );
};

export default CoinComponent;
