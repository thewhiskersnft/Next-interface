"use client";
import React, { useEffect, useState, Suspense } from "react";
import CustomInput from "./customInput";
import CustomRadio from "./customRadio";
import RightSidebar from "./rightSidebar";
import { TokenRoutes, keyPairs } from "../constants";
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
import { useSearchParams } from "next/navigation";
import CustomButton from "./customButton";
import CreateOrEditToken from "./createOrEditToken";
import { useFormik, Formik } from "formik";
import { metaplexBuilder } from "@/metaplex";
import { MetaplexFile } from "@metaplex-foundation/js";
import { createSPLTokenTxBuilder } from "@/solana/txBuilder/createSPLTokenTxBuilder";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { v1TokenValidation } from "../utils/formikValidators";
import { cloneDeep } from "lodash";
import { errorToast, successToast } from "./toast";
import MintOrBurnToken from "./mintOrBurnToken";
import { getMint } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { revokeMintAuthTxBuilder } from "@/solana/txBuilder/revokeMintAuthTxBuilder";
import { revokeFreezeAuthTxBuilder } from "@/solana/txBuilder/revokeFreezeAuthTxBuilder";
import { createMintTokensTxBuilder } from "@/solana/txBuilder/mintTokenTxBuilder";
import { createBurnTokensTxBuilder } from "@/solana/txBuilder/burnTokenTxBuilder";
import Loader from "./loader";

const initialV1Token: PreviewData = {
  "Token Details": {
    "Token Name": "",
    Description: "",
    Symbol: "",
    Supply: "",
    Decimals: "",
  },
};

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
    metaplexFileData,
    website,
    decimal,
    supply,
    description,
    symbol,
    tokenAddress,
    mintAuthority,
    freezeAuthority,
    mutableMetadata,
    mintAmount,
  } = useSelector((state: any) => state.formDataSlice);

  const dispatch = useDispatch();

  const wallet = useWallet();
  const { connection } = useConnection();

  const searchParams = useSearchParams();

  const tokenAction = searchParams.get("action");

  const [showManageTokenData, setShowManageTokenData] = useState(false);
  const [showUpdateMetadata, setShowUpdateMetadata] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [balance, setBalance] = useState(0);

  const [renderForm, setRenderForm] = useState(false);
  useEffect(() => {
    setRenderForm(true);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: name,
      symbol: symbol,
      description: description,
      supply: supply,
      decimal: decimal,
      website: website,
      twitter: twitter,
      telegram: telegram,
      discord: discord,
      logo: "", // not currently used here (used from redux state)
      fee: "",
      maxFee: maxFee,
      withdrawAuthority: withdrawAuthority,
      configAuthority: configAuthority,
      rate: rate,
      defaultAccountStateOption: defaultAccountStateOption,
      delegate: delegate,
      nonTransferable: nonTransferable,
      tokenAddress: tokenAddress,
      mintAmount: mintAmount,
      mintAuthority: mintAuthority,
      freezeAuthority: freezeAuthority,
      mutableMetadata: mutableMetadata,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => createTokenValidator(values),
    onSubmit: (values) => {
      setButtonClicked(true);
      if (selectedForm === keyPairs.createV1) {
        // v1 token creation
        createTokenHandler(values);
      }
    },
  });

  const createTokenValidator = (values: any) => {
    let resp = {} as any;
    if (selectedForm === keyPairs.createV1) {
      // v1 token validator
      resp = v1TokenValidation(values);
      // check if logo added
      if (!fileData?.name) {
        resp["logo"] = "Please select logo";
        errorToast({ message: "Please upload logo!" });
      }
      let errors = Object.keys(resp).length;
      if (errors < 1) {
        // no errors so updating redux state
        dispatch(setName(formik.values.name));
        dispatch(setSymbol(formik.values.symbol));
        dispatch(setDescription(formik.values.description));
        dispatch(setSupply(formik.values.supply));
        dispatch(setDecimal(formik.values.decimal));
      }
    }
    return resp;
  };

  const revokeMintAuth = async () => {
    try {
      // handler to mint TOKEns
      // const amount = "1000000000000"; // multiply with decimal later
      // const txhash = await createMintTokensTxBuilder(
      //   connection,
      //   wallet,
      //   new PublicKey(tokenAddress),
      //   amount
      // );

      // handler to burn tokens
      // const amount = "1000000000000";
      // const txhash = await createBurnTokensTxBuilder(
      //   connection,
      //   wallet,
      //   new PublicKey(tokenAddress),
      //   amount
      // );

      const txhash = await revokeMintAuthTxBuilder(
        connection,
        wallet,
        new PublicKey(tokenAddress)
      );

      console.log(txhash);
    } catch (error) {
      console.log(error);
    }
  };

  const revokeFreezeAuth = async () => {
    try {
      const txhash = await revokeFreezeAuthTxBuilder(
        connection,
        wallet,
        new PublicKey(tokenAddress)
      );
      console.log(txhash);
    } catch (error) {
      console.log(error);
    }
  };

  const createTokenHandler = async (values: any) => {
    console.log("Values : ", values);
    if (!wallet.connected) {
      errorToast({ message: "Please connect the wallet" });
      console.log("Wallet not connected");
      setButtonClicked(false);

      return ; 
    }
    //  console.log("fsfs dkcfds",wallet);
    if (wallet.publicKey != null) {
      let balance = await connection.getBalance(wallet.publicKey as any);
      setBalance(balance);
      // console.log("sdfd",balance);
    }
    if (balance > 5000000) {
      try {
        const isSPL = true;
        if (isSPL) {
          const metaplexhandler = await metaplexBuilder(wallet, connection);
          const imgURI = await metaplexhandler
            .storage()
            .upload(metaplexFileData);
          console.log("MP data : ", metaplexFileData);
          console.log("Uploaded Image URI (Arweave)", imgURI);

          if (imgURI) {
            const tokenMetadata = {
              name: name,
              symbol: symbol,
              description: description,
              image: imgURI,
            };
            const { uri } = await metaplexhandler
              .nfts()
              .uploadMetadata(tokenMetadata);

            console.log("Uploaded Metadata URI (Arweave)", uri);

            const txhash = await createSPLTokenTxBuilder(
              name,
              symbol,
              decimal,
              uri,
              supply,
              connection,
              wallet
            );

            console.log("txhash", txhash);
            setButtonClicked(false);
          } else {
            setButtonClicked(false);
            errorToast({ message: "Error in creating token please retry" });
          }
        } else {
        }
      } catch (error) {
        console.log(error);
        setButtonClicked(false);
      }
    } else {
      errorToast({ message: "Insufficent balance" });
      setButtonClicked(false);
    }
  };

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
    if (tokenAction === TokenRoutes.createToken) {
      // create token
      if (selectedForm === keyPairs.createV1) {
        updatedPreviewData = {
          "Token Details": {
            "Token Name": formik.values.name,
            Description: formik.values.description,
            Symbol: formik.values.symbol,
            Supply: formik.values.supply,
            Decimals: formik.values.decimal,
          },
        };
      }
      if (selectedForm === keyPairs.createV2) {
        updatedPreviewData = {
          "Token Details": {
            "Token Name": formik.values.name,
            Description: formik.values.description,
            Symbol: formik.values.symbol,
            Supply: formik.values.supply,
            Decimals: formik.values.decimal,
          },
          Extensions: {
            "Fee %": formik.values.fee,
            "Max Fee": formik.values.maxFee,
            "Interest Rate": formik.values.rate,
            "Account State": formik.values.defaultAccountStateOption,
            "Permanent Delegate": formik.values.delegate,
            "Non Transferable": `${nonTransferable}`,
          },
        };
      }
    } else if (tokenAction === TokenRoutes.updateMetadata) {
      // update metadata
      updatedPreviewData = { ...initialV1Token };
    } else {
      // default cond (setting to empty vals)
      updatedPreviewData = { ...initialV1Token };
    }
    dispatch(setPreviewData(cloneDeep(updatedPreviewData)));
  }, [
    formik.values.name,
    formik.values.symbol,
    formik.values.description,
    formik.values.supply,
    formik.values.decimal,
    selectedForm,
    formik.values.fee,
    formik.values.maxFee,
    formik.values.rate,
    formik.values.defaultAccountStateOption,
    formik.values.delegate,
    nonTransferable,
    dispatch,
    tokenAction,
  ]);

  return (
    <>
      {renderForm ? (
        <div className="flex flex-row flex-1 h-full overflow-auto scroll-smooth">
          {tokenAction === TokenRoutes.createToken && (
            <CreateOrEditToken formik={formik} />
          )}
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
                    onClick={async () => {
                      console.log("Load clicked");
                      let mintAccount = await getMint(
                        connection,
                        new PublicKey(tokenAddress)
                      );
                      if (mintAccount) {
                        dispatch(
                          setMintAuthority(
                            mintAccount.mintAuthority?.toBase58() ===
                              wallet.publicKey?.toBase58()
                          )
                        );
                        dispatch(
                          setFreezeAuthority(
                            mintAccount.freezeAuthority?.toBase58() ===
                              wallet.publicKey?.toBase58()
                          )
                        );
                      }
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
                          onClick={async () => {
                            await revokeMintAuth();
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
                          onClick={async () => {
                            await revokeFreezeAuth();
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
          {tokenAction === TokenRoutes.mintToken && (
            <MintOrBurnToken formik={formik} />
          )}
          {tokenAction === TokenRoutes.burnToken && (
            <MintOrBurnToken formik={formik} isBurn={true} />
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
              website: formik.values.website,
              twitter: formik.values.twitter,
              telegram: formik.values.telegram,
              discord: formik.values.discord,
            }}
            formik={formik}
            label={
              tokenAction === TokenRoutes.updateMetadata
                ? "Preview (Old Metadata)"
                : "Preview"
            }
            loading={buttonClicked}
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <Loader visible={true} size={30} />
        </div>
      )}
    </>
  );
}
