"use client";
import React, { useState } from "react";
import CustomInput from "../common/customInput";
import CustomButton from "../common/customButton";
import Image from "next/image";
import Modal from "../common/modal";
import RightSidebar from "../common/rightSidebar";
import CustomRadio from "../common/customRadio";
import TokenModal from "./TokenModal";
import { demoTokens } from "@/constants";

const CreateOpenBookMarketId = () => {
  const [showBaseTokenModal, setShowBaseTokenModal] = useState(false);
  // const [showTokenSetting, setShowTokenSetting] = useState(false);
  // const [radiyumTokenList, setRadiyumTokenList] = useState(false);
  // const [solanaTokenList, setSolanaTokenList] = useState(false);
  // const [jupiterStrictTokenList, setJupiterStrictTokenList] = useState(false);
  // const [userAddedTokenList, setUserAddedTokenList] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const toggleBaseTokenModal = () => {
    setShowBaseTokenModal(!showBaseTokenModal);
  };

  // const toggleShowTokenSetting = () => {
  //   setShowTokenSetting(!showTokenSetting);
  // };

  const toggleShowAdvancedSettings = () => {
    setShowAdvancedSettings(!showAdvancedSettings);
  };

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
          {/* <Modal open={showBaseTokenModal} onClose={toggleBaseTokenModal}>
            <div className="w-[601px] h-[598px] bg-modalBG text-white px-4 py-4 drop-shadow-whitexl">
              <CustomInput
                label="Select a Token"
                id="tokenAddress"
                name="tokenAddress"
                value={""}
                onChange={(e) => {}}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Token Address"}
                showError={false}
                errorMessage={""}
                showCopy={false}
                showSearch={true}
              />
              <Image
                src={"/close.svg"}
                alt="Close Logo"
                width={15}
                height={15}
                className="cursor-pointer absolute right-[15px] top-[15px]"
                priority
                onClick={toggleBaseTokenModal}
              />
              <p className="font-Orbitron text-xsmall mt-4">
                Recommended Tokens
              </p>
              <section className="flex justify-between items-center mt-2">
                {[1, 2, 3, 4].map((token: any, ind: number) => {
                  return (
                    <div
                      className="w-[125px] h-[46px] bg-background border-[1px] border-solid border-variant1 hover:border-white"
                      key={ind}
                    >
                      <section
                        className="flex justify-start items-center px-2 h-full cursor-pointer"
                        //   onClick={toggleBaseTokenModal}
                      >
                        <Image
                          src={"/cat1.svg"}
                          alt="Token Logo"
                          width={33}
                          height={33}
                          className="cursor-pointer mb-[2px]"
                          priority
                        />
                        <p className="text-xsmall font-Oxanium text-center ml-2">
                          WIZZ
                        </p>
                      </section>
                    </div>
                  );
                })}
              </section>
              <hr className="border-[0.5px] border-variant1 my-4" />
              {!showTokenSetting && (
                <section className="flex justify-between items-center">
                  <span className="flex">
                    <p className="font-Orbitron text-xsmall mr-2">Token</p>
                    <Image
                      src={"/setting.svg"}
                      alt="setting Logo"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      // style={{ marginRight: "5px" }}
                      priority
                      onClick={toggleShowTokenSetting}
                    />
                  </span>
                  <span>
                    <p className="font-Orbitron text-xsmall mr-2">
                      Balance/Address
                    </p>
                  </span>
                </section>
              )}
              {!showTokenSetting && (
                <section className="h-[340px] w-full overflow-scroll scroll-smooth mt-2">
                  {demoTokens.map((token: any, index: number) => {
                    return (
                      <div
                        className="flex justify-between items-center my-4 border-[0.5px] border-variant1 bg-black py-2 px-2"
                        key={index}
                      >
                        <section className="flex">
                          <Image
                            src={"/cat1.svg"} // replace with logo
                            alt="Token Logo"
                            width={38}
                            height={38}
                            className="cursor-pointer mb-[2px]"
                            priority
                          />
                          <span className="ml-2">
                            <p className="text-xsmall font-Oxanium text-left text-white">
                              {token.name}
                            </p>
                            <p className="text-xxsmall font-Oxanium text-left text-disabledLink">
                              {token.owner}
                            </p>
                          </span>
                        </section>
                        <section className="ml-2 w-[150px] truncate">
                          <p className="text-xsmall font-Oxanium text-right text-white truncate">
                            {token.amt}
                          </p>
                          <span className="flex mt-1">
                            <Image
                              src={"/copy.svg"} // replace with logo
                              alt="Copy Logo"
                              width={16}
                              height={16}
                              className="cursor-pointer mr-2"
                              priority
                            />
                            <p className="text-xxsmall font-Oxanium text-center text-yellow1 truncate">
                              {token.address}
                            </p>
                            <Image
                              src={"/exportWhite.svg"} // replace with logo
                              alt="Export Logo"
                              width={16}
                              height={16}
                              className="cursor-pointer ml-1"
                              priority
                            />
                          </span>
                        </section>
                      </div>
                    );
                  })}
                </section>
              )}
              {showTokenSetting && (
                <section className="flex items-center">
                  <Image
                    src={"/left.svg"}
                    alt="Left Logo"
                    width={18}
                    height={18}
                    className="cursor-pointer"
                    priority
                    onClick={toggleShowTokenSetting}
                  />
                  <p className="text-xsmall font-Orbitron text-center mx-2">
                    Token List Settings
                  </p>
                </section>
              )}
              {showTokenSetting && (
                <section className="">
                  <CustomRadio
                    label={"Radiyum Token List"}
                    description="275 Tokens"
                    value={radiyumTokenList}
                    showSymbol={true}
                    onChange={() => {
                      setRadiyumTokenList(!radiyumTokenList);
                    }}
                    containerStyles={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "300px",
                      fontSize: "12px",
                      fontFamily: "Orbitron",
                    }}
                  />
                  <CustomRadio
                    label={"Solana Token List"}
                    description="275 Tokens"
                    value={solanaTokenList}
                    showSymbol={true}
                    onChange={() => {
                      setSolanaTokenList(!solanaTokenList);
                    }}
                    containerStyles={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "300px",
                      fontSize: "12px",
                      fontFamily: "Orbitron",
                    }}
                  />
                  <CustomRadio
                    label={"Jupiter Strict Token List"}
                    description="275 Tokens"
                    value={jupiterStrictTokenList}
                    showSymbol={true}
                    onChange={() => {
                      setJupiterStrictTokenList(!jupiterStrictTokenList);
                    }}
                    containerStyles={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "300px",
                      fontSize: "12px",
                      fontFamily: "Orbitron",
                    }}
                  />
                  <CustomRadio
                    label={"User Added Token List"}
                    description="275 Tokens"
                    value={userAddedTokenList}
                    showSymbol={true}
                    onChange={() => {
                      setUserAddedTokenList(!userAddedTokenList);
                    }}
                    containerStyles={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "300px",
                      fontSize: "12px",
                      fontFamily: "Orbitron",
                    }}
                  />
                </section>
              )}
            </div>
          </Modal> */}
          <TokenModal
            isOpen={showBaseTokenModal}
            onClose={toggleBaseTokenModal}
            tokenList={demoTokens}
          />
          <p className="font-Orbitron text-small">Select Token</p>
          <section className="flex mt-2">
            <div className="w-[190px] h-[77px] bg-background border-[1px] border-solid border-variant1 hover:border-white">
              <p className="text-xxsmall font-Oxanium text-center border-b-[1px] border-solid border-variant1">
                Base Token
              </p>
              <section
                className="flex justify-between items-center px-4 h-[58px] cursor-pointer"
                onClick={toggleBaseTokenModal}
              >
                <Image
                  src={"/cat1.svg"}
                  alt="Token Logo"
                  width={33}
                  height={33}
                  className="cursor-pointer mb-[2px]"
                  priority
                />
                <p className="text-xsmall font-Oxanium text-center">WHIZ</p>
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
                onClick={toggleBaseTokenModal}
              >
                <p className="text-xsmall font-Oxanium text-center">
                  Quote Token
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
        {showAdvancedSettings && <div></div>}
        <div className="flex justify-left w-full mt-8">
          <CustomButton disabled={false} label={"Submit"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CreateOpenBookMarketId;
