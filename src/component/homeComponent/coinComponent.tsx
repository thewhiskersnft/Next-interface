import Image from "next/image";
import React from "react";
import { infoToast } from "../common/toast";

interface CoinComponentProps {
  index: number;
  isVerified?: boolean;
  isUp?: boolean;
}

const CoinComponent = ({ index, isVerified, isUp }: CoinComponentProps) => {
  return (
    <div className="w-full flex bg-bgDarkForComponent px-4 py-2 justify-between items-center cursor-pointer text-white hover:bg-black hover:text-yellow1">
      <div className="flex items-center">
        <Image
          src={index == 1 ? "/star.svg" : "/starDisabled.svg"}
          alt="Star Logo"
          className=""
          width={18}
          height={18}
          priority
        />
        <span className="relative">
          <img
            src={
              "https://imgs.search.brave.com/KpEVtxj9bgajWrm57jRK9jOGY9ps3NbSUJHQCzE4gp0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzA0Lzc1LzM5/LzM2MF9GXzcwNDc1/Mzk5M185WGpDVzJw/S0hCbVQyNlE4c2M2/WEJmSmprSmRlZzdY/Qi5qcGc"
            }
            style={{
              height: "45px",
              width: "45px",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "45px",
            }}
            className="mx-2"
          />
          {isVerified && (
            <Image
              src={"/verified.svg"}
              alt="Verified Logo"
              width={20}
              height={20}
              className="absolute bottom-0 left-[5px]"
              priority
            />
          )}
        </span>
        <div className="flex flex-col justify-between">
          <p className="text-small font-Oxanium">{`BONK`}</p>
          <div className="flex mt-0">
            {" "}
            <p
              className={`text-small text-[#C8C2B2] text-left font-Inter font-normal text-right w-[100px] truncate`}
            >
              {`kjkjdniwdwkdnkjwdhiuowndlwkdjnwdh`}
            </p>
            {/* <span className="flex">
              <p className="text-xsmall text-disabledLink font-Oxanium">
                24H VOL :{" "}
              </p>
              <p className="text-xsmall font-Oxanium">3.21 B</p>
            </span> */}
            {/* <span className="flex">
              <p className="text-xsmall text-disabledLink font-Oxanium">
                MCAP :{" "}
              </p>
              <p className="text-xsmall font-Oxanium">2.65 B</p>
            </span> */}
          </div>
          <div className="flex gap-4 mt-1">
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
                width={12}
                height={12}
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
                width={12}
                height={12}
                priority
              />
            </a>
            <a
              className="telegram cursor-pointer"
              href={"https://x.com/moonlytrade"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ pointerEvents: "auto" }}
            >
              <Image
                src={"/telegram.svg"}
                alt="telegram Logo"
                width={12}
                height={12}
                priority
              />
            </a>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Image
          src="/pill.svg"
          alt="From Logo"
          width={15}
          height={15}
          priority
        />
        <p
          className={`text-xsmall ${""} font-Inter font-normal w-full text-right`}
        >
          {`>`}
        </p>
        <Image
          src="/solana.svg"
          alt="To Logo"
          width={15}
          height={15}
          priority
        />
      </div>
      <div className="flex gap-2">
        <Image
          src="/revTime.svg"
          alt="Time Logo"
          width={15}
          height={15}
          priority
        />
        <p
          className={`text-xsmall ${""} font-Inter font-normal w-full text-right`}
        >
          {`20h 46m`}
        </p>
      </div>
      <div className="flex gap-2">
        <p
          className={`text-xsmall ${""} font-Inter font-normal w-full text-right`}
        >
          {`7.3729 K`}
        </p>
      </div>
      <div className="flex gap-2">
        <p
          className={`text-xsmall ${""} font-Inter font-normal w-full text-right`}
        >
          {`258 K`}
        </p>
      </div>
      <div className="flex flex-col gap-0">
        <section className="flex gap-1 items-center">
          <p
            className={`text-xsmall ${""} font-Inter font-normal w-full text-right`}
          >
            {`22`}
          </p>
          <p
            className={`text-xxsmall text-[#8D8D8D] font-Inter font-normal w-full text-right`}
          >
            {`TXNS`}
          </p>
        </section>
        <section className="flex gap-1 items-center">
          <p
            className={`text-xsmall ${""} font-Inter font-normal w-full text-right text-[#3BEA8E]`}
          >
            {`30`}
            <sub>B</sub>
          </p>
          <p
            className={`text-xxsmall text-[#F05555] font-Inter font-normal w-full text-right`}
          >
            {` / 7`}
            <sub>S</sub>
          </p>
        </section>
      </div>
      <div className="flex flex-col gap-0">
        <section className="flex gap-1 items-center">
          <p
            className={`text-xsmall ${""} font-Inter font-normal w-full text-right`}
          >
            {`22`}
          </p>
          <p
            className={`text-xxsmall text-[#8D8D8D] font-Inter font-normal w-full text-right`}
          >
            {`SOL`}
          </p>
        </section>
        <section className="flex gap-1 items-center">
          <p
            className={`text-xsmall ${""} font-Inter font-normal w-full text-right text-[#ffffff]`}
          >
            {`$ 14,000`}
          </p>
        </section>
      </div>
      <div className="flex flex-col gap-0">
        <section className="flex gap-1 items-end">
          <p
            className={`text-xsmall ${""} font-Inter font-normal w-full text-right`}
          >
            {`1`}
          </p>
          <p
            className={`text-xxsmall text-[#8D8D8D] font-Inter font-normal w-full text-right`}
          >
            {`B`}
          </p>
        </section>
      </div>
      <div className="flex flex-col gap-0">
        <section className="flex gap-1 items-center">
          <p
            className={`text-xsmall ${""} font-Inter font-normal w-full text-right`}
          >
            {`200`}
          </p>
          <p
            className={`text-xxsmall text-[#8D8D8D] font-Inter font-normal w-full text-right`}
          >
            {`K`}
          </p>
        </section>
        <section className="flex gap-1 items-center">
          <p
            className={`text-xxsmall ${""} font-Inter font-normal w-full text-right text-[#3BEA8E]`}
          >
            {`+32%`}
          </p>
        </section>
      </div>
      <div className="flex flex-row gap-1">
        <section className="flex flex-col bg-[transparent] w-[100px]">
          <Image
            src="/checked.svg"
            alt="Checked Logo"
            className="mx-auto"
            width={15}
            height={15}
            priority
          />
          <p
            className={`text-xxsmall font-Inter font-[400] w-[100px] text-center`}
          >
            {`Mint Auth Disabled`}
          </p>
        </section>
        <section className="flex flex-col bg-[transparent] w-[100px]">
          <Image
            src="/checked.svg"
            alt="Checked Logo"
            className="mx-auto"
            width={15}
            height={15}
            priority
          />
          <p
            className={`text-xxsmall font-Inter font-[400] w-[100px] text-center`}
          >
            {`Freeze Auth Disabled`}
          </p>
        </section>
        <section className="flex flex-col bg-[transparent] w-[100px]">
          <Image
            src="/checked.svg"
            alt="Checked Logo"
            className="mx-auto"
            width={15}
            height={15}
            priority
          />
          <p
            className={`text-xxsmall font-Inter font-[400] w-[100px] text-center`}
          >
            {`Freeze Auth Disabled`}
          </p>
        </section>
      </div>
      <div className="flex flex-row gap-1">
        <section className="flex flex-col bg-[transparent] w-[100px]">
          <p
            className={`text-xsmall font-Inter font-[400] w-[100px] text-center text-[#3BEA8E]`}
          >
            {`22.45%`}
          </p>
          <p
            className={`text-xxsmall font-Inter font-[400] w-[100px] text-center`}
          >
            {`Mint Auth Disabled`}
          </p>
        </section>
      </div>
      <div>
        <p
          className={`flex text-xsmall font-Inter font-normal w-full text-center text-white bg-[#222222CC] px-3 py-3 rounded-xl hover:text-yellow1 hover:scale-95`}
          onClick={() => {
            infoToast({ message: "Coming Soon!" });
          }}
        >
          <Image
            src="/bolt.svg"
            alt="Bolt Logo"
            className=""
            width={15}
            height={15}
            priority
          />
          {`Quick Buy`}
        </p>
      </div>
    </div>
  );
};

export default CoinComponent;
