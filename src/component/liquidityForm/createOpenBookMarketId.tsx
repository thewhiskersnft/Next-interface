"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../common/customInput";
import CustomButton from "../common/customButton";
import Image from "next/image";
import Modal from "../common/modal";
import RightSidebar from "../common/rightSidebar";
import CustomRadio from "../common/customRadio";
import TokenModal from "./TokenModal";
import { TransactionSource, TransactionType, demoTokens } from "@/constants";
import SettingsCard from "./settingsCard";
import { fetchUserSPLTokens } from "@/solana/query/fetchUserSPLTokens";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Token } from "@raydium-io/raydium-sdk";
import { TOKEN_PROGRAM_ID, getAccount, getMint } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { get, isNumber } from "lodash";
import { MarketV2Updated } from "@/solana/market/createMarketID";

import {
  Base,
  CacheLTA,
  InstructionType,
  MARKET_STATE_LAYOUT_V2,
  TxVersion,
  ZERO,
  generatePubKey,
  splitTxAndSigners,
  struct,
  u16,
  u32,
  u64,
  u8,
} from "@raydium-io/raydium-sdk";
import {
  PROGRAMIDS,
  desiredMarketIdConfig,
  makeTxVersion,
} from "@/solana/market/config";
import { buildAndSendTx } from "@/solana/market/util";
import { isMainnet } from "@/global/hook/getConnectedClusterInfo";
import { handleCopy } from "@/utils/common";
import rewardService from "@/services/rewardService";
import { getLocalGUID } from "@/utils/apiService";

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
  const wallet = useWallet();
  const connection = useConnection();

  const [showBaseTokenModal, setShowBaseTokenModal] = useState(false);
  const [showQuoteTokenModal, setShowQuoteTokenModal] = useState(false);
  // const [showTokenSetting, setShowTokenSetting] = useState(false);
  // const [radiyumTokenList, setRadiyumTokenList] = useState(false);
  // const [solanaTokenList, setSolanaTokenList] = useState(false);
  // const [jupiterStrictTokenList, setJupiterStrictTokenList] = useState(false);
  // const [userAddedTokenList, setUserAddedTokenList] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(true);
  const [baseTokenList, setBaseTokenList] = useState([] as any);
  const [quoteTokenList, setQuoteTokenList] = useState([] as any);
  const [baseToken, setBaseToken] = useState(null as any);
  const [baseTokenLogo, setBaseTokenLogo] = useState("");
  const [quoteToken, setQuoteToken] = useState(null as any);
  const [baseTokenLoading, setBaseTokenLoading] = useState(false);
  const [quoteTokenLoading, setQuoteTokenLoading] = useState(false);
  const [minOrderSize, setMinOrderSize] = useState(1);
  const [minPriceTicketSize, setMinPriceTicketSize] = useState(0.01);
  const [selectedMarketIdConfig, setSelectedMarketIdConfig] = useState(1);
  const [confirmingTx, setConformingTx] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [createNewId, setCreateNewId] = useState(true);
  const [openBookMarketId, setOpenBookMarketId] = useState("");

  const toggleBaseTokenModal = () => {
    setShowBaseTokenModal(!showBaseTokenModal);
  };

  const toggleQuoteTokenModal = () => {
    setShowQuoteTokenModal(!showQuoteTokenModal);
  };

  const handleBaseTokenSelect = (token: any, index: number) => {
    let newFormatToken = new Token(
      TOKEN_PROGRAM_ID,
      new PublicKey(token.mint),
      token.decimal,
      token.symbol,
      token.name
    );
    setBaseTokenLogo(token.image);
    setBaseToken(newFormatToken);
    toggleBaseTokenModal();
  };

  const handleQuoteTokenSelect = (token: any, index: number) => {
    let newFormatToken = new Token(
      TOKEN_PROGRAM_ID,
      new PublicKey(token.mint),
      token.decimal,
      token.symbol,
      token.name
    );
    setQuoteToken(newFormatToken);
    toggleQuoteTokenModal();
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    const marketBytesData = desiredMarketIdConfig(selectedMarketIdConfig)!;

    const wSOLToken = new Token(
      TOKEN_PROGRAM_ID,
      new PublicKey("So11111111111111111111111111111111111111112"),
      9,
      "WSOL",
      "WSOL"
    );

    // -------- step 1: make instructions --------
    const createMarketInstruments =
      await MarketV2Updated.makeCreateMarketInstructionSimple({
        connection: connection.connection,
        wallet: wallet.publicKey!,
        baseInfo: baseToken,
        quoteInfo: wSOLToken,
        // lotSize: 0.001, // default 1 // minOrderSize from state
        // tickSize: 0.0001, // default 0.01 // minTickSize from state
        lotSize: minOrderSize,
        tickSize: minPriceTicketSize,
        dexProgramId: PROGRAMIDS.OPENBOOK_MARKET,
        makeTxVersion,
        marketBytesData,
      });
    setOpenBookMarketId(createMarketInstruments.address.marketId.toBase58());
    const txids = await buildAndSendTx(
      createMarketInstruments.innerTransactions,
      connection.connection,
      wallet,
      {
        skipPreflight: true,
      },
      (index: number) => {
        setConformingTx(index);
      }
    );
    setSubmitLoading(false);
    if (txids && Array.isArray(txids) && txids.length == 2) {
      // success
      setCreateNewId(false);
      let addRewardPoints = await rewardService.addUserPoints({
        trans_type: TransactionType.Rewarded,
        trans_source:
          selectedMarketIdConfig == 1
            ? TransactionSource.MarketIDBareMetal
            : selectedMarketIdConfig == 2
            ? TransactionSource.MarketIDMinimal
            : TransactionSource.MarketIDRecommended,
        user_guid: getLocalGUID(),
      });
    }
  };

  const toggleShowAdvancedSettings = () => {
    setShowAdvancedSettings(!showAdvancedSettings);
  };

  const getSolBalance = async (ownerPublicKey: string, connection: any) => {
    try {
      const recipientPublicKe = new PublicKey(ownerPublicKey);
      const senderBalance = await connection.connection.getBalance(
        recipientPublicKe
      );
      return {
        status: true,
        data: senderBalance / 1000000000,
      };
    } catch (e) {
      return {
        status: false,
        data: e,
      };
    }
  };

  const tokenBalance = async (
    ownerAddress: string,
    tokenAddress: string,
    connection: any
  ) => {
    try {
      const ownerPublicKey = new PublicKey(ownerAddress);
      const tokenPublicKey = new PublicKey(tokenAddress);
      const balance = await connection.connection.getParsedTokenAccountsByOwner(
        ownerPublicKey,
        {
          mint: tokenPublicKey,
        }
      );
      let bal = balance.value[0].account.data.parsed.info.tokenAmount.uiAmount;
      return {
        status: true,
        balance: bal,
      };
    } catch (e) {
      return {
        status: false,
        data: e,
      };
    }
  };

  const fetchData = async () => {
    setBaseTokenLoading(true);
    // setQuoteTokenLoading(true);
    const data = await fetchUserSPLTokens(wallet, connection.connection);
    if (data && Array.isArray(data)) {
      setBaseTokenList(data); // base tokens list
    }
    setBaseTokenLoading(false);
    // setQuoteTokenLoading(false);
  };
  const fetchAndSetQuoteTokens = async () => {
    const wsol = new Token(
      TOKEN_PROGRAM_ID,
      new PublicKey("So11111111111111111111111111111111111111112"),
      9,
      "WSOL",
      "WSOL"
    );
    // const usdc = new Token(
    //   TOKEN_PROGRAM_ID,
    //   new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    //   6,
    //   "USDC",
    //   "USDC"
    // );
    // const usdcAmt = await tokenBalance(
    //   wallet.publicKey?.toString() || "",
    //   isMainnet()
    //     ? "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    //     : "5Css4tPfqK8vnb61U4oUCNSz4VuWcMbGmSTiDwhhF5oo",
    //   connection
    // );
    const solAmt = await getSolBalance(
      wallet.publicKey?.toString() || "",
      connection
    );
    const quoteTokenList = isMainnet()
      ? [
          {
            amount: isNumber(solAmt.data) ? solAmt.data.toFixed(3) : 0,
            decimal: wsol.decimals,
            image:
              "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
            mint: "So11111111111111111111111111111111111111112",
            name: "SOLANA",
            symbol: "SOL",
          },
          // {
          //   amount: isNumber(usdcAmt.balance) ? usdcAmt.balance.toFixed(3) : 0,
          //   decimal: usdc.decimals,
          //   image: undefined,
          //   mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          //   name: usdc.name,
          //   symbol: usdc.symbol,
          // },
        ]
      : [
          {
            amount: isNumber(solAmt.data) ? solAmt.data.toFixed(3) : 0,
            decimal: wsol.decimals,
            image:
              "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
            mint: "So11111111111111111111111111111111111111112",
            name: "SOLANA",
            symbol: "SOL",
          },
        ];
    setQuoteTokenList(quoteTokenList);
  };

  const handleCreateOpenBookMarketId = () => {
    setOpenBookMarketId("");
    setCreateNewId(true);
  };

  useEffect(() => {
    fetchAndSetQuoteTokens();
    fetchData();
  }, []);

  return (
    <div
      style={{ alignItems: "center" }}
      className="flex flex-row h-max mt-12 w-full mx-auto"
    >
      {createNewId ? (
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
          {/* <section className="flex flex-1 w-full items-end">
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
        </section> */}
          <section className="mt-5">
            <TokenModal
              isOpen={showBaseTokenModal}
              loading={baseTokenLoading}
              onClose={toggleBaseTokenModal}
              tokenList={baseTokenList}
              handleTokenSelect={handleBaseTokenSelect}
            />
            <TokenModal
              isOpen={showQuoteTokenModal}
              loading={quoteTokenLoading}
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
                      src={"/noLogo.svg"}
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
            value={minOrderSize}
            onChange={(e) => {
              setMinOrderSize(e.target.value);
            }}
            showSymbol={false}
            type={"number"}
            placeholder={"Enter Minimum Order Size"}
            showError={false}
            errorMessage={""}
          />
          <CustomInput
            label="Minimum Price Tick Size"
            id="minimumPriceTickSize"
            name="minimumPriceTickSize"
            value={minPriceTicketSize}
            onChange={(e) => {
              setMinPriceTicketSize(e.target.value);
            }}
            showSymbol={false}
            type={"number"}
            placeholder={"Enter Minimum Price Tick Size"}
            showError={false}
            errorMessage={""}
          />
          {/* <CustomRadio
          label={"Advanced Settings"}
          value={showAdvancedSettings}
          showSymbol={true}
          onChange={toggleShowAdvancedSettings}
          containerStyles={{
            fontSize: "18px",
            fontFamily: "Orbitron",
          }}
        /> */}
          {showAdvancedSettings && (
            <div className="flex mt-16 gap-5 flex-wrap justify-center">
              {cardsData.map((item, index) => (
                // <section
                //   className={`border-[1px] ${
                //     selectedMarketIdConfig === index + 1
                //       ? "border-yellow1"
                //       : "border-transparent"
                //   }`}
                //   key={index}
                //   onClick={() => {
                //     setSelectedMarketIdConfig(index + 1);
                //   }}
                // >
                <SettingsCard
                  key={index}
                  item={item}
                  selected={selectedMarketIdConfig === index + 1}
                  handleClick={() => {
                    setSelectedMarketIdConfig(index + 1);
                  }}
                />
                // </section>
              ))}
            </div>
          )}
          <div className="flex justify-left w-full mt-8">
            <CustomButton
              labelStyles={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={false}
              label={"Submit"}
              onClick={handleSubmit}
              loading={submitLoading}
              loadingText={
                confirmingTx > 0 && confirmingTx < 3
                  ? `Confirming Transaction ${confirmingTx}/2`
                  : ""
              }
            />
          </div>
        </div>
      ) : (
        <div
          className={`bg-black h-max mb-5  ${"p-8 w-[95%]"}`}
          style={{
            border: "1px solid #FFC83A",
            minHeight: "max-content",
          }}
        >
          <section className="flex">
            <Image
              src={"/left.svg"}
              alt="Left Logo"
              width={28}
              height={28}
              className="cursor-pointer"
              priority
              onClick={handleCreateOpenBookMarketId}
            />
            <p className="text-white font-Orbitron text-large ml-2">
              Create OpenBook MarketId
            </p>
          </section>
          <section className="border-[1px] border-lightGrey w-[full] mx-auto mt-4 px-4 py-2">
            <section className="flex">
              <Image
                src={"/check.svg"}
                alt="Check Logo"
                width={18}
                height={18}
                className="cursor-pointer"
                priority
              />
              <p className="text-white font-Orbitron text-small ml-1">
                Your OpenBook Market ID is successfully created
              </p>
            </section>
            <section className="border-[1px] border-yellow1 bg-background w-[90%] mx-auto mt-8 mb-4 px-4 py-4 flex items-center justify-center">
              <p className="text-white font-Oxanium text-small">
                {`OpenBook Market Id : `}
              </p>
              <p className="text-yellow1 font-Oxanium text-small truncate w-[250px] ml-2">
                {` ${openBookMarketId}`}
              </p>
              <Image
                src={"/copy.svg"}
                alt="Copy Logo"
                width={14}
                height={14}
                className="cursor-pointer"
                priority
                onClick={() => {
                  handleCopy(openBookMarketId);
                }}
              />
            </section>
          </section>
        </div>
      )}
    </div>
  );
};

export default CreateOpenBookMarketId;
