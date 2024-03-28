import React, { useState } from "react";
import Modal from "../common/modal";
import CustomInput from "../common/customInput";
import Image from "next/image";
import CustomRadio from "../common/customRadio";

type TokenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tokenList: Array<any>;
};

const TokenModal = ({ isOpen, onClose, tokenList }: TokenModalProps) => {
  const [showTokenSetting, setShowTokenSetting] = useState(false);
  const [radiyumTokenList, setRadiyumTokenList] = useState(false);
  const [solanaTokenList, setSolanaTokenList] = useState(false);
  const [jupiterStrictTokenList, setJupiterStrictTokenList] = useState(false);
  const [userAddedTokenList, setUserAddedTokenList] = useState(false);
  const toggleShowTokenSetting = () => {
    setShowTokenSetting(!showTokenSetting);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
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
          onClick={onClose}
        />
        <p className="font-Orbitron text-xsmall mt-4">Recommended Tokens</p>
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
              <p className="font-Orbitron text-xsmall mr-2">Balance/Address</p>
            </span>
          </section>
        )}
        {!showTokenSetting && (
          <section className="h-[340px] w-full overflow-scroll scroll-smooth mt-2">
            {tokenList.map((token: any, index: number) => {
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
    </Modal>
  );
};

export default TokenModal;
