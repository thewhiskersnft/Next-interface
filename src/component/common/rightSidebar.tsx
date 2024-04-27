"use client";
import React, { FC } from "react";
import { Extensions, PreviewData, TokenDetails } from "../../interfaces";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { metaplexBuilder } from "@/metaplex";
import { MetaplexFile } from "@metaplex-foundation/js";
import { createSPLTokenTxBuilder } from "@/solana/txBuilder/createSPLTokenTxBuilder";
import CustomButton from "./customButton";
import { numberWithCommas } from "@/utils/common";
// @ts-ignore
import Lottie from "react-lottie";
import * as moonAnimationData from "../../assets/gifs/13 Moon.json";
import * as rocketAnimationData from "../../assets/gifs/27 rocket toy.json";
import * as seasonAnimationData from "../../assets/gifs/18 Moon.json";
import * as referalAnimationData from "../../assets/gifs/45 reference point.json";

interface SidebarProps {
  data: PreviewData;
  infoData?: Array<string>;
  showInfo: boolean;
  hidePreview?: boolean;
  hideCreateBtn?: boolean;
  hideLinks?: boolean;
  logo: string;
  createBtnText: string;
  mediaLinks: {
    website: string;
    twitter: string;
    discord: string;
    telegram: string;
  };
  formik?: any;
  label?: string;
  loading?: boolean;
  logoStyles?: any;
  logoContainerStyles?: any;
  showRewards?: boolean;
  rewardPoints?: number;
  hideValuesOverflow?: boolean;
}

const RightSidebar: FC<SidebarProps> = ({
  data,
  showInfo,
  hidePreview,
  hideLinks,
  logo,
  createBtnText,
  mediaLinks,
  formik,
  label,
  loading,
  infoData,
  logoStyles,
  logoContainerStyles,
  hideCreateBtn,
  showRewards,
  rewardPoints,
  hideValuesOverflow,
}) => {
  const dataHeadings = Object.keys(data);

  const moonDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: moonAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const seasonDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: seasonAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const rocketDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rocketAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const referalDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: referalAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const rewardsCards = [
    {
      defOptions: seasonDefaultOptions,
      label: "Season 1 Multiplier",
      rightText: "2x",
    },
    {
      defOptions: rocketDefaultOptions,
      label: "Boost",
      rightText: "1.05x",
    },
    {
      defOptions: referalDefaultOptions,
      label: "Referals",
      rightText: "23",
    },
  ];

  return (
    <div className="mr-4 my-12 h-max w-[383px]">
      {!hidePreview && (
        <div
          className="border-2"
          style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <div
            className="border-b-2 py-2 text-white cursor-pointer font-Orbitron text-small text-left px-4"
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              backgroundColor: "#222222",
            }}
          >
            {label || "Preview"}
          </div>
          <div className="p-4 bg-black">
            {!showRewards && (
              <div
                className={`border-yellow1 border-2 flex items-center justify-center h-[343px] w-[343px]`}
                style={{ ...logoContainerStyles }}
              >
                {formik?.values.logo || logo ? (
                  <img
                    src={formik?.values.logo || logo} // default image is cat1 for now
                    alt="logo"
                    width={`${254}px`}
                    style={{
                      height: `${254}px`,
                      objectFit: "cover",
                      borderRadius: "200px",
                      ...logoStyles,
                    }}
                  />
                ) : (
                  <Image
                    src={"/cat1.svg"}
                    alt="Cat Logo"
                    width={254}
                    height={254}
                    style={{ ...logoStyles }}
                    priority
                  />
                )}
              </div>
            )}
            {!hideLinks && (
              <span className="w-[full] flex justify-between items-center my-[20px] px-[90px]">
                <a
                  className="website"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={mediaLinks.website}
                  onClick={(e) => {
                    if (!mediaLinks.website) e.preventDefault();
                  }}
                >
                  <Image
                    src={
                      mediaLinks.website
                        ? "/website.svg"
                        : "/websiteDisabled.svg"
                    }
                    alt="websity Logo"
                    width={23}
                    height={23}
                    priority
                  />
                </a>
                <a
                  className="twitter"
                  href={mediaLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!mediaLinks.twitter) e.preventDefault();
                  }}
                >
                  <Image
                    src={
                      mediaLinks.twitter
                        ? "/twitter.svg"
                        : "/twitterDisabled.svg"
                    }
                    alt="twitter Logo"
                    width={20}
                    height={20}
                    priority
                  />
                </a>
                <a
                  className="telegram"
                  href={mediaLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!mediaLinks.telegram) e.preventDefault();
                  }}
                >
                  <Image
                    src={
                      mediaLinks.telegram
                        ? "/telegram.svg"
                        : "/telegramDisabled.svg"
                    }
                    alt="telegram Logo"
                    width={20}
                    height={20}
                    priority
                  />
                </a>
                <a
                  className="discord"
                  href={mediaLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!mediaLinks.discord) e.preventDefault();
                  }}
                >
                  <Image
                    src={
                      mediaLinks.discord
                        ? "/discord.svg"
                        : "/discordDisabled.svg"
                    }
                    alt="discord Logo"
                    width={20}
                    height={20}
                    priority
                  />
                </a>
              </span>
            )}
            {showRewards && (
              <div className="mt-2 flex justify-between items-center">
                <p className="text-left text-small text-white font-Orbitron">
                  Moons Earned
                </p>
                <span className="flex items-center">
                  <p className="text-right text-small text-yellow1 font-Orbitron my-2 mr-4">
                    {numberWithCommas(rewardPoints || 0)}
                  </p>
                  <Lottie
                    options={moonDefaultOptions}
                    height={40}
                    width={40}
                    isStopped={false}
                    isPaused={false}
                  />
                </span>
              </div>
            )}
            {dataHeadings.map((heading: string, headingIndex: number) => {
              const keys = Object.keys(data[heading]);
              const headingData = data[heading];
              return (
                <React.Fragment key={headingIndex}>
                  <span
                    className={`text-white flex ${
                      showRewards ? "mt-2" : "mt-6"
                    }`}
                    key={headingIndex + "sp"}
                  >
                    <p className="w-1/2 text-left text-small text-yellow1 font-Orbitron my-[10px]">
                      {heading}
                    </p>
                  </span>
                  {keys.map((k, keyIndex) => {
                    const val = headingData[k];
                    return (
                      <span
                        className="text-white flex mt-2"
                        key={"hd-" + keyIndex}
                      >
                        <span className="w-1/3 flex justify-between">
                          <p className="text-left text-xsmall font-Oxanium">
                            {k}
                          </p>
                          <p className="text-left text-xsmall font-Oxanium">
                            {` : `}
                          </p>
                        </span>
                        <p
                          className={`w-2/3 text-left text-xsmall font-Oxanium pl-[7px] ${
                            hideValuesOverflow
                              ? "line-clamp-none truncate"
                              : "line-clamp-5"
                          }`}
                        >
                          {`${val}`}
                        </p>
                      </span>
                    );
                  })}
                </React.Fragment>
              );
            })}
            {showRewards && (
              <div className="my-4">
                {rewardsCards.map((reward: any, rIndex: number) => {
                  const { defOptions, label, rightText } = reward;
                  return (
                    <section
                      className="bg-background border-[1px] border-variant1 py-4 px-6 flex items-center justify-between mt-6"
                      key={rIndex + "rws"}
                    >
                      <span className="flex items-center">
                        <Lottie
                          options={defOptions}
                          height={40}
                          width={40}
                          isStopped={false}
                          isPaused={false}
                        />
                        <p className="font-Oxanium text-white text-xsmall ml-4">
                          {label}
                        </p>
                      </span>
                      <p className="font-Oxanium text-white text-xsmall ml-4">
                        {rightText}
                      </p>
                    </section>
                  );
                })}
              </div>
            )}
            {!hideCreateBtn && (
              <CustomButton
                onClick={formik?.handleSubmit}
                label={createBtnText || "Create"}
                disabled={false}
                loading={loading}
                containerStyles={{
                  marginTop: "10px",
                  backgroundColor: "#222222",
                }}
                labelStyles={{ fontFamily: "Oxanium" }}
              />
            )}
          </div>
        </div>
      )}
      {showInfo && (
        <div
          className={`border-2 ${hidePreview ? "" : "mt-4"}`}
          style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <div
            className="border-b-2 py-2 text-white cursor-pointer font-Orbitron text-small text-left px-4"
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              backgroundColor: "#222222",
            }}
          >
            Information
          </div>
          <div className="p-4 bg-black">
            {infoData && infoData.length ? (
              infoData.map((info: string, index: number) => {
                return (
                  <span className="text-white flex mt-2" key={index}>
                    <span className="w-[25px] mt-[3px]">
                      <Image
                        src={"/bullet.svg"}
                        alt="bullet Logo"
                        width={10}
                        height={10}
                        style={{ marginRight: "8px" }}
                        priority
                      />
                    </span>
                    <p className="w-full text-left font-Oxanium text-xsmall">
                      {info}
                    </p>
                  </span>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
