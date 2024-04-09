"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../common/customInput";
import CustomButton from "../common/customButton";
import Image from "next/image";
import Modal from "../common/modal";
import RightSidebar from "../common/rightSidebar";
import CustomRadio from "../common/customRadio";
import TokenModal from "./TokenModal";
import { demoTokens } from "@/constants";
import SettingsCard from "./settingsCard";
import { fetchUserSPLTokens } from "@/solana/query/fetchUserSPLTokens";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Token } from "@raydium-io/raydium-sdk";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { get } from "lodash";

const cardsData = [
  {
    title: "Bare Metal",
    description: "Recommended for development and testing only",
    price: 0.6,
    image: "/oneThirdMoon.svg",
  },
  {
    title: "Minimal Settings",
    description: "Recommended for short term meme coins",
    price: 1.55,
    image: "/halfMoon.svg",
  },
  {
    title: "Recommended",
    description: "Recommended for long term projects.",
    price: 3,
    image: "/fullMoon.svg",
  },
];

const CreateOpenBookMarketId = () => {
  const [showBaseTokenModal, setShowBaseTokenModal] = useState(false);
  const [showQuoteTokenModal, setShowQuoteTokenModal] = useState(false);
  // const [showTokenSetting, setShowTokenSetting] = useState(false);
  // const [radiyumTokenList, setRadiyumTokenList] = useState(false);
  // const [solanaTokenList, setSolanaTokenList] = useState(false);
  // const [jupiterStrictTokenList, setJupiterStrictTokenList] = useState(false);
  // const [userAddedTokenList, setUserAddedTokenList] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [baseTokenList, setBaseTokenList] = useState([] as any);
  const [quoteTokenList, setQuoteTokenList] = useState([] as any);
  const [baseToken, setBaseToken] = useState(null as any);
  const [baseTokenLogo, setBaseTokenLogo] = useState("");
  const [quoteToken, setQuoteToken] = useState(null as any);

  const toggleBaseTokenModal = () => {
    setShowBaseTokenModal(!showBaseTokenModal);
  };

  const toggleQuoteTokenModal = () => {
    setShowQuoteTokenModal(!showQuoteTokenModal);
  };

  const handleBaseTokenSelect = (token: any, index: number) => {
    // console.log(token, index);
    let newFormatToken = new Token(
      TOKEN_PROGRAM_ID,
      new PublicKey(token.mint),
      token.decimal,
      token.symbol,
      token.name
    );
    // console.log("Base token conv : ", newFormatToken);
    setBaseTokenLogo(token.image);
    setBaseToken(newFormatToken);
    toggleBaseTokenModal();
  };

  const handleQuoteTokenSelect = (token: any, index: number) => {
    // console.log(token, index);
    let newFormatToken = new Token(
      TOKEN_PROGRAM_ID,
      new PublicKey(token.mint),
      token.decimal,
      token.symbol,
      token.name
    );
    // console.log("Quote token conv : ", newFormatToken);
    setQuoteToken(newFormatToken);
    toggleQuoteTokenModal();
  };

  const handleSubmit = () => {
    console.log("Base token : ", baseToken);
    console.log("Quote token : ", quoteToken);
  };

  const toggleShowAdvancedSettings = () => {
    setShowAdvancedSettings(!showAdvancedSettings);
  };

  const wallet = useWallet();
  const connection = useConnection();
  // console.log("Fetching data");
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserSPLTokens(wallet, connection.connection);
      console.log("data : ", data);
      if (data && Array.isArray(data)) {
        setBaseTokenList(data); // base tokens list
        setQuoteTokenList(data); // quote token list
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{ alignItems: "center" }}
      className="flex flex-row h-max mt-12 w-full mx-auto"
    >
      <div
        className={`bg-black h-max mb-5  ${"p-12 w-[95%]"}`}
        style={{
          border: "1px solid #FFC83A",
          minHeight: "max-content",
        }}
      >
        <div className="text-white text-left width-4/5 text-large font-Orbitron mb-6">
          Create OpenBook Market
        </div>
        <section className="flex flex-1 w-full items-end">
          <section className="flex-1 mr-2">
            <CustomInput
              label="OpenBook Program ID"
              id="openBookProgramId"
              name="openBookProgramId"
              value={""}
              onChange={(e) => {}}
              showSymbol={false}
              type={"text"}
              placeholder={"Enter OpenBook Program ID"}
              showError={false}
              errorMessage={""}
              showCopy={true}
            />
          </section>
          <Image
            src={"/export.svg"}
            alt="Export Logo"
            width={26}
            height={26}
            className="cursor-pointer mb-[2px]"
            priority
          />
        </section>
        <section className="mt-5">
          <TokenModal
            isOpen={showBaseTokenModal}
            onClose={toggleBaseTokenModal}
            tokenList={baseTokenList}
            handleTokenSelect={handleBaseTokenSelect}
          />
          <TokenModal
            isOpen={showQuoteTokenModal}
            onClose={toggleQuoteTokenModal}
            tokenList={quoteTokenList}
            handleTokenSelect={handleQuoteTokenSelect}
          />
          <p className="font-Orbitron text-small">Select Token</p>
          <section className="flex mt-2">
            <div className="w-[190px] h-[77px] bg-background border-[1px] border-solid border-variant1 hover:border-white">
              <p className="text-xxsmall font-Oxanium text-center border-b-[1px] border-solid border-variant1 text-white">
                Base Token
              </p>
              <section
                className="flex justify-between items-center px-4 h-[58px] cursor-pointer"
                onClick={toggleBaseTokenModal}
              >
                {baseTokenLogo ? (
                  <img
                    src={baseTokenLogo}
                    alt="base token logo"
                    width={`${33}px`}
                    style={{
                      height: `${33}px`,
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <Image
                    src={"/cat1.svg"}
                    alt="Token Logo"
                    width={33}
                    height={33}
                    className="cursor-pointer mb-[2px]"
                    priority
                  />
                )}
                <p className="text-xsmall font-Oxanium text-center text-white">
                  {get(baseToken, "name", "Select Token")}
                </p>
                <Image
                  src={"/arrowUp.svg"}
                  alt="Up Logo"
                  width={8}
                  height={4}
                  priority
                  className={`cursor-pointer ml-3 ${"rotate-180"}`}
                />
              </section>
            </div>
            <div className="w-[190px] h-[77px] bg-background border-[1px] border-solid border-variant1 ml-6 hover:border-white">
              <section
                className="flex justify-between items-center px-4 h-[77px] cursor-pointer"
                onClick={toggleQuoteTokenModal}
              >
                <p className="text-xsmall font-Oxanium text-center text-white">
                  {get(quoteToken, "name", "Quote Token")}
                </p>
                <Image
                  src={"/arrowUp.svg"}
                  alt="Up Logo"
                  width={8}
                  height={4}
                  priority
                  className={`cursor-pointer ml-3 ${"rotate-180"}`}
                />
              </section>
            </div>
          </section>
        </section>
        <CustomInput
          label="Minimum Order Size"
          id="minimumOrderSize"
          name="minimumOrderSize"
          value={""}
          onChange={(e) => {}}
          showSymbol={false}
          type={"text"}
          placeholder={"Enter Minimum Order Size"}
          showError={false}
          errorMessage={""}
        />
        <CustomInput
          label="Minimum Price Tick Size"
          id="minimumPriceTickSize"
          name="minimumPriceTickSize"
          value={""}
          onChange={(e) => {}}
          showSymbol={false}
          type={"text"}
          placeholder={"Enter Minimum Price Tick Size"}
          showError={false}
          errorMessage={""}
        />
        <CustomRadio
          label={"Advanced Settings"}
          value={showAdvancedSettings}
          showSymbol={true}
          onChange={toggleShowAdvancedSettings}
          containerStyles={{
            fontSize: "18px",
            fontFamily: "Orbitron",
          }}
        />
        {showAdvancedSettings && (
          <div className="flex mt-6 gap-6 flex-wrap justify-center">
            {cardsData.map((item, index) => (
              <SettingsCard item={item} key={index} />
            ))}
          </div>
        )}
        <div className="flex justify-left w-full mt-8">
          <CustomButton
            disabled={false}
            label={"Submit"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateOpenBookMarketId;
