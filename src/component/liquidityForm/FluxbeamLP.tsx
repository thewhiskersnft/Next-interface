"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TokenModal from "./TokenModal";
import { demoTokens } from "@/constants";
import CustomButton from "../common/customButton";
import RightSidebar from "../common/rightSidebar";
import CustomInput from "../common/customInput";
import { fetchUserSPLTokens } from "@/solana/query/fetchUserSPLTokens";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { fetchUserToken22Tokens } from "@/solana/query/fetchUserToken22Tokens";
import { get } from "lodash";
import { errorToast } from "../common/toast";
import { createPoolFluxBeam } from "@/solana/liquidityPool/fluxbeam";
import { isMainnet } from "@/global/hook/getConnectedClusterInfo";
import { Connection } from "@solana/web3.js";
import { useSelector } from "react-redux";

const FluxbeamLP = ({}) => {
  const [showBaseTokenModal, setShowBaseTokenModal] = useState(false);
  const [showQuoteTokenModal, setShowQuoteTokenModal] = useState(false);
  const [baseTokenAmt, setBaseTokenAmt] = useState(0);
  const [quoteTokenAmt, setQuoteTokenAmt] = useState(0);
  const [baseToken, setBaseToken] = useState(null as any);
  const [quoteToken, setQuoteToken] = useState(null as any);
  const [baseTokenList, setBaseTokenList] = useState([] as any);
  const [quoteTokenList, setQuoteTokenList] = useState([] as any);
  const [baseToken22List, setBaseToken22List] = useState([] as any);
  const [quoteToken22List, setQuoteToken22List] = useState([] as any);

  const { currentEndpoint, priorityFees } = useSelector(
    (state: any) => state.connectionDataSlice
  );

  const wallet = useWallet();
  const connection = useConnection();

  const toggleBaseTokenModal = () => {
    setShowBaseTokenModal(!showBaseTokenModal);
  };

  const toggleQuoteTokenModal = () => {
    setShowQuoteTokenModal(!showQuoteTokenModal);
  };

  const handleBaseTokenSelect = (token: any, index: number) => {
    setBaseToken(token);
    toggleBaseTokenModal();
  };

  const handleQuoteTokenSelect = (token: any, index: number) => {
    setQuoteToken(token);
    toggleQuoteTokenModal();
  };

  const handleSubmit = () => {
    // if (!isMainnet()) {
    //   errorToast({ message: "Please switch to mainnet!" });
    //   return;
    // }
    if (!baseToken) {
      errorToast({ message: "Please select base token" });
      return;
    }
    if (!quoteToken) {
      errorToast({ message: "Please select quote token" });
      return;
    }
    const lpConnection = new Connection(currentEndpoint);
    createPoolFluxBeam(
      baseToken.mint,
      baseTokenAmt,
      quoteToken.mint,
      quoteTokenAmt,
      baseToken.decimal as number,
      process.env.NEXT_PUBLIC_HELIUS_API_KEY || "",
      lpConnection,
      wallet
    );
  };

  useEffect(() => {
    const fetchTokenData = async () => {
      const data = await fetchUserSPLTokens(wallet, connection.connection);
      console.log("data : ", data);
      if (data && Array.isArray(data)) {
        setBaseTokenList(data); // base tokens list
        setQuoteTokenList(data); // quote token list
      }
    };
    const fetchToken22Data = async () => {
      const data = await fetchUserToken22Tokens(
        wallet.publicKey?.toString()!,
        connection.connection
      );
      console.log("data22 : ", data);
      if (data && Array.isArray(data)) {
        setBaseToken22List(data); // base tokens list
        setQuoteToken22List(data); // quote token list
      }
    };
    fetchTokenData();
    fetchToken22Data();
  }, []);

  return (
    <div className="flex">
      <TokenModal
        isOpen={showBaseTokenModal}
        onClose={toggleBaseTokenModal}
        tokenList={[...baseTokenList, ...baseToken22List]}
        handleTokenSelect={handleBaseTokenSelect}
      />
      <TokenModal
        isOpen={showQuoteTokenModal}
        onClose={toggleQuoteTokenModal}
        tokenList={[...quoteTokenList, ...quoteToken22List]}
        handleTokenSelect={handleQuoteTokenSelect}
      />
      <div className="px-8 py-4 flex-1 border-[1px] border-lightGrey mr-4 mt-4 h-min">
        <section className="w-full">
          <p className="font-Oxanium text-xsmall text-disabledLink">
            Base Token Initial Liquidity :
          </p>
          <div className="w-full mt-2 bg-background py-4 px-4 flex justify-between">
            <div className="flex items-center">
              <div className="w-[190px] h-[50px] bg-background border-[1px] border-solid border-variant1 hover:border-white">
                <section
                  className="flex justify-between items-center px-4 h-[50px] cursor-pointer"
                  onClick={toggleBaseTokenModal}
                >
                  {baseToken?.image ? (
                    <img
                      src={baseToken.image}
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
                  <p className="text-xsmall font-Oxanium text-center truncate ml-2">
                    {get(baseToken, "name", "")}
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
              <span className="border-[1px] border-white h-min ml-6 px-2 py-1 cursor-pointer">
                <p className="text-white font-Oxanium text-xsmall">Half</p>
              </span>
              <span className="border-[1px] border-white h-min ml-4 px-2 py-1 cursor-pointer">
                <p className="text-white font-Oxanium text-xsmall">Max</p>
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-Oxanium text-disabledLink text-xsmall text-right">{`Balance : 3746293746.12`}</p>
              <CustomInput
                label=""
                id="baseTokenAmount"
                name="baseTokenAmount"
                value={baseTokenAmt}
                onChange={(e) => {
                  setBaseTokenAmt(e.target.value);
                }}
                showSymbol={false}
                type={"number"}
                placeholder={"Enter Base Token Amt."}
                showError={false}
                errorMessage={""}
                showCopy={false}
                showSearch={false}
                containerStyles={{ marginTop: "2px", textAlign: "right" }}
                inputStyles={{
                  textAlign: "right",
                  paddingRight: 0,
                  fontFamily: "Oxanium",
                  fontSize: "16px",
                }}
              />
              <p className="font-Oxanium text-disabledLink text-right text-xsmall mt-1">{`$ 7,423.00`}</p>
            </div>
          </div>
        </section>
        <section className="w-full mt-8">
          <p className="font-Oxanium text-xsmall text-disabledLink">
            Quote Token Initial Liquidity :
          </p>
          <div className="w-full mt-2 bg-background py-4 px-4 flex justify-between">
            <div className="flex items-center">
              <div className="w-[190px] h-[50px] bg-background border-[1px] border-solid border-variant1 hover:border-white">
                <section
                  className="flex justify-between items-center px-4 h-[50px] cursor-pointer"
                  onClick={toggleQuoteTokenModal}
                >
                  {quoteToken?.image ? (
                    <img
                      src={quoteToken.image}
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
                  <p className="text-xsmall font-Oxanium text-center truncate ml-2">
                    {get(quoteToken, "name", "")}
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
              <span className="border-[1px] border-white h-min ml-6 px-2 py-1 cursor-pointer">
                <p className="text-white font-Oxanium text-xsmall">Half</p>
              </span>
              <span className="border-[1px] border-white h-min ml-4 px-2 py-1 cursor-pointer">
                <p className="text-white font-Oxanium text-xsmall">Max</p>
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-Oxanium text-disabledLink text-xsmall text-right">{`Balance : 3746293746.12`}</p>
              <CustomInput
                label=""
                id="quoteTokenAmount"
                name="quoteTokenAmount"
                value={quoteTokenAmt}
                onChange={(e) => {
                  setQuoteTokenAmt(e.target.value);
                }}
                showSymbol={false}
                type={"number"}
                placeholder={"Enter Quote Token Amt."}
                showError={false}
                errorMessage={""}
                showCopy={false}
                showSearch={false}
                containerStyles={{
                  marginTop: "2px",
                  textAlign: "right",
                }}
                inputStyles={{
                  textAlign: "right",
                  paddingRight: 0,
                  fontFamily: "Oxanium",
                  fontSize: "16px",
                }}
              />
              <p className="font-Oxanium text-disabledLink text-right text-xsmall mt-1">{`$ 7,423.00`}</p>
            </div>
          </div>
        </section>
        <div className="flex justify-left w-full mt-8">
          <CustomButton
            disabled={false}
            label={"Submit"}
            onClick={handleSubmit}
          />
        </div>
      </div>
      <section>
        <div className="flex justify-center items-center border-[1px] border-yellow1 py-8 cursor-pointer mt-4">
          <Image
            src={"/fluxbeam.svg"}
            alt="Fluxbeam Logo"
            width={64}
            height={64}
            className="cursor-pointer"
            priority
          />
          <section className="h-[64px] flex flex-col justify-between mx-4 py-2">
            <p className="font-Orbitron text-xsmall text-white">FluxBeam</p>
            <p className="font-Oxanium text-xsmall text-disabledLink">
              For v2 Token-22 SPL
            </p>
          </section>
        </div>
        <RightSidebar
          hidePreview={false}
          hideLinks={true}
          data={{
            "Pool Details": {
              "Trading Pair": "WHIZ/USDC",
              "Token A": "sdvns...asdfa",
              "Token B": "sdvns...asdfa",
              "Trade Fee": "0.02",
              "Owner Trade Fee": "0.005",
              "Owner Withdraw Fee": 0,
              "Curve Type": "Constant Price",
              "Starting Price": "1 WHIZ ≈ 0.00000000 SOL",
            },
          }}
          logo={""}
          showInfo={true}
          createBtnText={""}
          logoContainerStyles={{ height: "104px" }}
          logoStyles={{ height: "64px", width: "64px" }}
          mediaLinks={{
            website: "",
            twitter: "",
            telegram: "",
            discord: "",
          }}
          formik={null}
          label={""}
          loading={false}
          hideCreateBtn={true}
          infoData={[
            "Mint Authority: This is the authority (anaccount) that has the permission to mintnew tokens of a specific type. If a tokenaccount has a mint authority set, thataccount can create more tokens at anytime, increasing the supply.",
            "Freeze Authority: This is the authority that has the capability to freeze and unfreeze token accounts. When a token account is frozen, it can no longer send or receivetokens. This is useful for enforcingcompliance or addressing securityconcerns.",
            "Mutable Metadata: SPL tokens can haveassociated metadata that describes thetoken, like its name, symbol, and otherdetails. If the metadata is mutable, itmeans that the information can bechanged after the token is created.Disabling the mutability makes themetadata permanent and unchangeable.",
          ]}
        />
      </section>
    </div>
  );
};

export default FluxbeamLP;
