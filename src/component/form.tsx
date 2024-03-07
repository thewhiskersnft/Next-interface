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
import ManageToken from "./manageToken";
import { updateSPLTokenMetadataTxBuilder } from "@/solana/txBuilder/updateMetadataTxBuilder";
import { validateAddress } from "@/solana/txBuilder/checkAddress";
import { getTokenMetadata } from "@/metaplex/getTokenMetadata";

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

  const [showUpdateMetadata, setShowUpdateMetadata] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const [renderForm, setRenderForm] = useState(false);
  useEffect(() => {
    setRenderForm(true);
  }, []);
  useEffect(() => {
    if (tokenAction === TokenRoutes.updateMetadata) {
      let updatedPreviewData = {
        "Token Details": {
          "Token Name": "",
          Description: "",
          Symbol: "",
        },
      };
      formik.setFieldValue("logo", "");
      dispatch(setPreviewData(updatedPreviewData));
      setFileData(null);
    }
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
    onSubmit: async (values) => {
      setButtonClicked(true);
      if (tokenAction === TokenRoutes.updateMetadata) {
        updateMetadataHandler();
      } else if (tokenAction === TokenRoutes.createToken) {
        if (selectedForm === keyPairs.createV1) {
          createTokenHandler(values);
        }
      }
    },
  });

  const oldMetaData = async () => {
    try {
      if (tokenAction === TokenRoutes.updateMetadata) {
        let oldData = await getTokenMetadata(
          new PublicKey(formik.values.tokenAddress),
          connection
        );
        console.log(oldData);
        if (oldData.isMutable) {
          formik.setFieldValue("name", oldData.tokenName);
          formik.setFieldValue("symbol", oldData.tokenSymbol);
          formik.setFieldValue("logo", oldData.tokenLogo);
          formik.setFieldValue("description", oldData.tokenDescription);
          let updatedPreviewData = {
              "Token Details": {
              "Token Name": oldData.tokenName,
              Description: oldData.tokenDescription,
              Symbol: oldData.tokenSymbol,
            },
          };
          formik.setFieldValue("logo", oldData.tokenLogo);
          dispatch(setPreviewData(updatedPreviewData));
          toggleShowUpdateMetadata();
        } else {
          errorToast({ message: "Metadata is Immutable!" });
        }
      }
    }
    catch (e) {
      errorToast({ message: "Please Check Your Address!" });

    }

  };

  const updateMetadataHandler = async () => {
    if (!wallet.connected) {
      errorToast({ message: "Please Connect The Wallet" });
      setButtonClicked(false);
      return;
    }
    let balance = 0;

    if (wallet.publicKey != null) {
      balance = await connection.getBalance(wallet.publicKey as any);
    }
    if (balance < 3000000) {
      errorToast({ message: "Insufficent Balance" });
      return;
    }
    try {
      const metaplexhandler = await metaplexBuilder(wallet, connection);
      const imgURI = await metaplexhandler.storage().upload(metaplexFileData);
      if (imgURI) {
        successToast({ message: `Image Uri Created` });
        const tokenMetadata = {
          name: formik.values.name,
          symbol: formik.values.symbol,
          description: formik.values.description,
          image: imgURI,
        };
        const { uri } = await metaplexhandler
          .nfts()
          .uploadMetadata(tokenMetadata);

        successToast({ message: `MetaData Uploaded` });
        const txData = await updateSPLTokenMetadataTxBuilder(
          formik.values.name,
          formik.values.symbol,
          uri,
          connection,
          wallet,
          new PublicKey(formik.values.tokenAddress)
        );
        console.log("txData", txData?.sig);
        let updatedPreviewData = {
          "Token Details": {
            "Token Name": formik.values.name,
            Description: formik.values.description,
            Symbol: formik.values.symbol,
          },
        };
        formik.setFieldValue("logo", "");
        dispatch(setPreviewData(updatedPreviewData));
        setFileData(metaplexFileData);
        setButtonClicked(false);
        successToast({
          keyPairs: {
            signature: {
              value: `${txData?.sig}`,
              linkTo: `https://solscan.io/tx/${txData?.sig}`,
            },
          },
          allowCopy: true,
        });
      } else {
        errorToast({ message: "Error In Uploading Logo" });
        setButtonClicked(false);
      }
    } catch (e) {
      errorToast({ message: "Try Again!" });
      setButtonClicked(false);
    }
  };

  const createTokenValidator = (values: any) => {
    let resp = {} as any;
    if (selectedForm === keyPairs.createV1) {
      // v1 token validator
      resp = v1TokenValidation(values);
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

  const createTokenHandler = async (values: any) => {
    if (!wallet.connected) {
      errorToast({ message: "Please Connect The Wallet" });
      setButtonClicked(false);
      return;
    }

    let balance = 0;
    if (wallet.publicKey != null) {
      balance = await connection.getBalance(wallet.publicKey as any);
      setBalance(balance);
    }
    if (balance > 5000000) {
      try {
        const isSPL = true;
        if (isSPL) {
          const metaplexhandler = await metaplexBuilder(wallet, connection);
          const imgURI = await metaplexhandler
            .storage()
            .upload(metaplexFileData);
          // console.log("MP data : ", metaplexFileData);
          console.log("Uploaded Image URI (Arweave)", imgURI);

          if (imgURI) {
            successToast({ message: `Image Uri Created` });
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
            successToast({ message: `MetaData Uploaded` });

            const txhash = await createSPLTokenTxBuilder(
              name,
              symbol,
              decimal,
              uri,
              supply,
              connection,
              wallet
            );
            successToast({
              keyPairs: {
                mintAddress: {
                  value: `${txhash?.mint}`,
                  linkTo: `https://solscan.io/token/${txhash?.mint}`,
                },
                signature: {
                  value: `${txhash?.sig}`,
                  linkTo: `https://solscan.io/tx/${txhash?.sig}`,
                },
              },
              allowCopy: true,
            });
            setButtonClicked(false);
          } else {
            setButtonClicked(false);
            errorToast({ message: "Error In Creating Token Please Retry" });
          }
        } else {
        }
      } catch (error) {
        errorToast({ message: "Try Again!" });

        // console.log(error);
        setButtonClicked(false);
      }
    } else {
      errorToast({ message: "Insufficent Balance" });
      setButtonClicked(false);
    }
  };

  const toggleShowUpdateMetadata = () => {
    // fetch and update token metadata in formik here!
    setShowUpdateMetadata(!showUpdateMetadata);
  };

  const getImageURL = () => {
    if (fileData && fileData.name) return URL.createObjectURL(fileData);
    return "";
  };

  const enableRightSidebar = () => {
    if (
      [TokenRoutes.createToken, TokenRoutes.updateMetadata].includes(
        tokenAction || ""
      )
    ) {
      return true;
    }
    return false;
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
      dispatch(setPreviewData(cloneDeep(updatedPreviewData)));
    }
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
          {loading && (
            <div className=" absolute top-[0] bottom-[0] left-[0] right-[0] bg-loaderBG flex flex-1 items-center justify-center">
              <Loader visible={loading} size={50} />
            </div>
          )}
          {tokenAction === TokenRoutes.createToken && (
            <CreateOrEditToken formik={formik} />
          )}
          {tokenAction === TokenRoutes.manageToken && (
            <ManageToken formik={formik} />
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
                  value={formik?.values?.tokenAddress}
                  id="tokenAddress"
                  name="tokenAddress"
                  onChange={formik?.handleChange}
                  // onChange={(e) => {
                  //   dispatch(setTokenAddress(e.target.value));
                  // }}
                  showSymbol={false}
                  type={"text"}
                  placeholder={"Enter Token Address"}
                />
                {showUpdateMetadata ? (
                  <CreateOrEditToken isEdit={true} formik={formik} />
                ) : (
                  <div className="w-[90px] mt-6 flex justify-left">
                    <CustomButton
                      label="Load"
                      onClick={() => {
                        // console.log("Load clicked");
                        // toggleShowUpdateMetadata();
                        oldMetaData();
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
          {enableRightSidebar() && (
            <RightSidebar
              data={previewData}
              logo={getImageURL()}
              showInfo={true}
              createBtnText={
                tokenAction === TokenRoutes.updateMetadata
                  ? "Update Metadata"
                  : selectedForm === keyPairs.createV1
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
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <Loader visible={true} size={30} />
        </div>
      )}
    </>
  );
}
