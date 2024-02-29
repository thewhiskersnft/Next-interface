"use client";
import React, { useEffect, useState } from "react";
// import {
//   Connection,
//   SystemProgram,
//   Transaction,
//   LAMPORTS_PER_SOL,
//   clusterApiUrl,
//   PublicKey,
//   Keypair,
//   sendAndConfirmTransaction,
// } from "@solana/web3.js";
// import bs58 from "bs58";
// import {
//   MINT_SIZE,
//   TOKEN_PROGRAM_ID,
//   createInitializeMint2Instruction,
//   createMint,
//   getMinimumBalanceForRentExemptMint,
//   updateTokenMetadata,
// } from "@solana/spl-token";
// import Help from "../asset/help.svg";
import CustomInput from "./customInput";
import CustomRadio from "./customRadio";
import RightSidebar from "./rightSidebar";
import { TokenRoutes, keyPairs } from "../constants";
import help from "../asset/help.svg";
import helpDark from "../asset/helpDark.png";
import { PreviewData } from "../interfaces";
import { useSelector, useDispatch } from "react-redux";
import {
  setConfigAuthority,
  setDecimal,
  setDefaultAccountState,
  setDefaultAccountStateOption,
  setDelegate,
  setDescription,
  setDiscord,
  setEnableExtensions,
  setFee,
  setInterestBearing,
  setMaxFee,
  setName,
  setNonTransferable,
  setPermanentDelegate,
  setPreviewData,
  setRate,
  setSelectedForm,
  setSupply,
  setSymbol,
  setTelegram,
  setToggled,
  setFileData,
  setTransferTax,
  setTwitter,
  setWebsite,
  setWithdrawAuthority,
  setTokenAddress,
  setMintAuthority,
  setFreezeAuthority,
  setMutableMetadata,
} from "../redux/slice/formDataSlice";
import CustomImagePicker from "./customImagePicker";
// import { useSearchParams } from "react-router-dom";
import { useSearchParams } from "next/navigation";
import CustomButton from "./customButton";
import CreateOrEditToken from "./createOrEditToken";

// const initialV1Token: PreviewData = {
//   "Token Details": {
//     "Token Name": "",
//     Description: "",
//     Symbol: "",
//     Supply: "",
//     Decimals: "",
//   },
// };

// const initialV2Token: PreviewData = {
//   "Token Details": {
//     "Token Name": "",
//     Description: "",
//     Symbol: "",
//     Supply: "",
//     Decimals: "",
//   },
//   Extensions: {
//     "Fee %": "",
//     "Max Fee": "",
//     "Interest Rate": "",
//     "Account State": "",
//     "Permanent Delegate": "",
//     "Non Transferable": "",
//   },
// };

export default function Form() {
  const {
    name,
    previewData,
    delegate,
    defaultAccountStateOption,
    rate,
    configAuthority,
    withdrawAuthority,
    maxFee,
    fee,
    nonTransferable,
    permanentDelegate,
    defaultAccountState,
    interestBearing,
    transferTax,
    enableExtensions,
    selectedForm,
    isToggled,
    discord,
    telegram,
    twitter,
    fileData,
    website,
    decimal,
    supply,
    description,
    symbol,
    tokenAddress,
    mintAuthority,
    freezeAuthority,
    mutableMetadata,
  } = useSelector((state: any) => state.formDataSlice);

  const dispatch = useDispatch();

  // const [searchParams, setSearchParams] = useSearchParams();
  const searchParams = useSearchParams();

  const tokenAction = searchParams.get("action");

  // const [previewData, setPreviewData] = useState<PreviewData>({
  //   ...initialV1Token,
  // });

  const [showManageTokenData, setShowManageTokenData] = useState(false);
  const [showUpdateMetadata, setShowUpdateMetadata] = useState(false);

  const toggleShowManageTokenData = () => {
    // add validations here
    setShowManageTokenData(!showManageTokenData);
  };

  const toggleShowUpdateMetadata = () => {
    setShowUpdateMetadata(!showUpdateMetadata);
  };

  const handleToggle = () => {
    dispatch(setToggled(!isToggled));
  };

  const getImageURL = () => {
    if (fileData && fileData.name) return URL.createObjectURL(fileData);
    return "";
  };

  useEffect(() => {
    let updatedPreviewData: PreviewData = {} as PreviewData;
    if (selectedForm === keyPairs.createV1) {
      updatedPreviewData = {
        "Token Details": {
          "Token Name": name,
          Description: description,
          Symbol: symbol,
          Supply: `${supply}`,
          Decimals: `${decimal}`,
        },
      };
    }
    if (selectedForm === keyPairs.createV2) {
      updatedPreviewData = {
        "Token Details": {
          "Token Name": name,
          Description: description,
          Symbol: symbol,
          Supply: `${supply}`,
          Decimals: `${decimal}`,
        },
        Extensions: {
          "Fee %": fee,
          "Max Fee": maxFee,
          "Interest Rate": rate,
          "Account State": defaultAccountStateOption,
          "Permanent Delegate": delegate,
          "Non Transferable": `${nonTransferable}`,
        },
      };
    }
    dispatch(setPreviewData(updatedPreviewData));
  }, [
    name,
    symbol,
    description,
    supply,
    decimal,
    selectedForm,
    fee,
    maxFee,
    rate,
    defaultAccountStateOption,
    delegate,
    nonTransferable,
    dispatch,
  ]);

  return (
    <div className="flex flex-row flex-1 h-full overflow-auto scroll-smooth">
      {tokenAction === TokenRoutes.createToken && <CreateOrEditToken />}
      {tokenAction === TokenRoutes.manageToken && (
        <div
          style={{ alignItems: "center" }}
          className="w-5/6 flex flex-col justify-center align-center h-max mt-12"
        >
          <div
            className="bg-black w-[95%] h-max mb-5 p-12"
            style={{
              border: "1px solid #FFC83A",
              minHeight: "max-content",
            }}
          >
            <div className="text-white text-left width-4/5 text-large font-Orbitron">
              Manage Token
            </div>
            <CustomInput
              label="Token Address"
              value={tokenAddress}
              onChange={(e) => {
                dispatch(setTokenAddress(e.target.value));
              }}
              showSymbol={false}
              type={"text"}
              placeholder={"Enter Token Address"}
            />
            <div className="w-[90px] mt-6 flex justify-left">
              <CustomButton
                label="Load"
                onClick={() => {
                  console.log("Load clicked");
                  toggleShowManageTokenData();
                }}
              />
            </div>
            {showManageTokenData && (
              <>
                <span className="text-white flex mt-6 w-[375px] justify-between items-center">
                  <span className="w-[320px] flex justify-between">
                    <p className="text-left text-xsmall font-Orbitron w-[160px]">
                      {"Mint Authority"}
                    </p>
                    <p className="text-left text-xsmall font-Orbitron">{` : `}</p>
                  </span>
                  <p className="w-2/3 text-left text-xsmall font-Orbitron pl-[12px]">
                    {`${mintAuthority ? "Enabled" : "Disabled"}`}
                  </p>
                  <div className="flex justify-left w-[200px]">
                    <CustomButton
                      label="Revoke"
                      onClick={() => {
                        dispatch(setMintAuthority(!mintAuthority));
                      }}
                    />
                  </div>
                </span>
                <span className="text-white flex mt-6 w-[375px] justify-between items-center">
                  <span className="w-[320px] flex justify-between">
                    <p className="text-left text-xsmall font-Orbitron w-[160px]">
                      {"Freeze Authority"}
                    </p>
                    <p className="text-left text-xsmall font-Orbitron">{` : `}</p>
                  </span>
                  <p className="w-2/3 text-left text-xsmall font-Orbitron pl-[12px]">
                    {`${freezeAuthority ? "Enabled" : "Disabled"}`}
                  </p>
                  <div className="flex justify-left w-[200px]">
                    <CustomButton
                      label="Revoke"
                      onClick={() => {
                        dispatch(setFreezeAuthority(!freezeAuthority));
                      }}
                    />
                  </div>
                </span>
                <span className="text-white flex mt-6 w-[375px] justify-between items-center">
                  <span className="w-[320px] flex justify-between">
                    <p className="text-left text-xsmall font-Orbitron w-[160px]">
                      {"Mutable Metadata"}
                    </p>
                    <p className="text-left text-xsmall font-Orbitron">{` : `}</p>
                  </span>
                  <p className="w-2/3 text-left text-xsmall font-Orbitron pl-[12px]">
                    {`${mutableMetadata ? "True" : "False"}`}
                  </p>
                  <div className="flex justify-left w-[200px]">
                    <CustomButton
                      label={mutableMetadata ? "Disable" : "Enable"}
                      onClick={() => {
                        dispatch(setMutableMetadata(!mutableMetadata));
                      }}
                    />
                  </div>
                </span>
              </>
            )}
          </div>
        </div>
      )}
      {tokenAction === TokenRoutes.updateMetadata && (
        <div
          style={{ alignItems: "center" }}
          className="w-5/6 flex flex-col justify-center align-center h-max mt-12"
        >
          <div
            className="bg-black w-[95%] h-max mb-5 p-12"
            style={{
              border: "1px solid #FFC83A",
              minHeight: "max-content",
            }}
          >
            <div className="text-white text-left width-4/5 text-large font-Orbitron">
              Update Metadata
            </div>
            <CustomInput
              label="Token Address"
              value={tokenAddress}
              onChange={(e) => {
                dispatch(setTokenAddress(e.target.value));
              }}
              showSymbol={false}
              type={"text"}
              placeholder={"Enter Token Address"}
            />
            {showUpdateMetadata ? (
              <CreateOrEditToken isEdit={true} />
            ) : (
              <div className="w-[90px] mt-6 flex justify-left">
                <CustomButton
                  label="Load"
                  onClick={() => {
                    console.log("Load clicked");
                    toggleShowUpdateMetadata();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <RightSidebar
        data={previewData}
        logo={getImageURL()}
        showInfo={true}
        createBtnText={
          selectedForm === keyPairs.createV1
            ? "Create v1 SPL Token"
            : "Create v2 SPL Token"
        }
        mediaLinks={{
          website,
          twitter,
          telegram,
          discord,
        }}
      />
    </div>
  );
}
