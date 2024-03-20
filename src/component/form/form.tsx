"use client";
import React, { useEffect, useState, Suspense } from "react";
import CustomInput from "../customInput";
import RightSidebar from "./rightSidebar";
import { TokenRoutes, keyPairs } from "../../constants";
import { PreviewData } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { setPreviewData, setFileData } from "../../redux/slice/formDataSlice";
import { useSearchParams } from "next/navigation";
import CustomButton from "../customButton";
import CreateOrEditToken from "./createOrEditToken";
import { useFormik, Formik } from "formik";
import { metaplexBuilder } from "@/metaplex";
import { createSPLTokenTxBuilder } from "@/solana/txBuilder/createSPLTokenTxBuilder";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { v1TokenValidation } from "../../utils/formikValidators";
import { cloneDeep } from "lodash";
import { errorToast, successToast } from "../toast";
import MintOrBurnToken from "./mintOrBurnToken";
import { PublicKey } from "@solana/web3.js";
import ManageToken from "./manageToken";
import { updateSPLTokenMetadataTxBuilder } from "@/solana/txBuilder/updateMetadataTxBuilder";
import { getTokenMetadata } from "@/metaplex/getTokenMetadata";
import Loader from "../loader";
import caculateEndpointUrlByRpcConfig from "@/application/connection/calculateEndpointUrlByRpcConfig";
import { setCurrentEndpoint } from "@/redux/slice/connectionSlice";
import { NFTStorage, File, Blob } from "nft.storage";
// import { addHistoryItem } from "@/application/transaction/txHistory";
// import { setAlltxHistory } from "@/redux/slice/txDataSlice";
import { recursiveCheckTransitionStatus } from "@/utils/transactions";
import { AppENVConfig } from "@/global/config/config";
import { createToken22TxBuilder } from "@/solana/txBuilder/createToken22TxBuilder";

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
    nonTransferable,
    selectedForm,
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
  const { appLoading } = useSelector((state: any) => state.appDataSlice);
  const { allDevEndpoints, allMainEndpoints, currentEndpoint, priorityFees } =
    useSelector((state: any) => state.connectionDataSlice);
  // const { txHistory, alltxHistory } = useSelector(
  //   (state: any) => state.txDataSlice
  // );
  const dispatch = useDispatch();

  const wallet = useWallet();
  const { connection } = useConnection();

  const searchParams = useSearchParams();

  const tokenAction = searchParams.get("action");

  const [showUpdateMetadata, setShowUpdateMetadata] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [updateMetadataLoading, setUpdateMetadataLoading] = useState(false);

  const [renderForm, setRenderForm] = useState(false);
  useEffect(() => {
    setRenderForm(true);
    checkAndUpdateRPC();
  }, []);

  const checkAndUpdateRPC = async () => {
    //console.log("........................ main ", allMainEndpoints);
    let data = {
      strategy: "speed",
      success: true,
      rpcs: allMainEndpoints,
      devrpcs: allDevEndpoints,
    };
    const selectedEndpointUrl = await caculateEndpointUrlByRpcConfig(
      data as any
    );
    dispatch(setCurrentEndpoint(selectedEndpointUrl));
    //console.log("Selected endpoint : ", selectedEndpointUrl);
  };

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
      logo: "",
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

  const oldMetaData = async (isFetchOnly?: boolean) => {
    try {
      if (tokenAction === TokenRoutes.updateMetadata) {
        setUpdateMetadataLoading(true);
        let oldData = await getTokenMetadata(
          new PublicKey(formik.values.tokenAddress),
          connection
        );
        //console.log("Old data : ", oldData);
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
          //console.log("Updated metadata : ", updatedPreviewData);
          dispatch(setPreviewData(updatedPreviewData));
          if (!isFetchOnly) {
            toggleShowUpdateMetadata();
          }
          setUpdateMetadataLoading(false);
        } else {
          errorToast({ message: "Metadata is Immutable!" });
          setUpdateMetadataLoading(false);
        }
      }
    } catch (e) {
      errorToast({ message: "Please Check Your Address!" });
      setUpdateMetadataLoading(false);
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
      const uri = await createURI();
      let finalURI = "https://nftstorage.link/" + uri.url.replace("://", "/");
      //console.log("Final uri : ", finalURI);
      successToast({ message: `MetaData Uploaded` });
      const txData = await updateSPLTokenMetadataTxBuilder(
        formik.values.name,
        formik.values.symbol,
        finalURI,
        connection,
        wallet,
        new PublicKey(formik.values.tokenAddress),
        priorityFees
      );
      if (!txData) {
        setButtonClicked(false);
        errorToast({ message: "Please Try Again" });
        return;
      } else {
        let updatedPreviewData = {
          "Token Details": {
            "Token Name": formik.values.name,
            Description: formik.values.description,
            Symbol: formik.values.symbol,
          },
        };
        formik.setFieldValue("logo", getImageURL());
        //console.log("Updated metadata : ", updatedPreviewData);
        dispatch(setPreviewData(updatedPreviewData));
      }
      setButtonClicked(false);
    } catch (e) {
      errorToast({ message: "Try Again!" });
      setButtonClicked(false);
    }
  };

  const createTokenValidator = (values: any) => {
    let resp = {} as any;
    if (selectedForm === keyPairs.createV1) {
      resp = v1TokenValidation(values);
      ////console.log(metaplexFileData)
      if (!metaplexFileData?.fileName) {
        resp["logo"] = "Please select logo";
        errorToast({ message: "Please upload logo!" });
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
    }
    if (balance > 5000000) {
      try {
        const uri = await createURI();
        let finalURI = "https://nftstorage.link/" + uri.url.replace("://", "/");
        // console.log("Final uri : ", finalURI);
        successToast({ message: `MetaData Uploaded` });
        // const txhash = await createToken22TxBuilder(
        //   formik.values.name,
        //   formik.values.symbol,
        //   formik.values.decimal,
        //   finalURI,
        //   formik.values.supply,
        //   connection,
        //   wallet,
        //   currentEndpoint,
        //   priorityFees
        // );
        // console.log(txhash);
        const txhash = await createSPLTokenTxBuilder(
          formik.values.name,
          formik.values.symbol,
          formik.values.decimal,
          finalURI,
          formik.values.supply,
          connection,
          wallet,
          currentEndpoint,
          priorityFees
        );

        // //console.log("txhash : ", txhash);
        if (!txhash) {
          setButtonClicked(false);
          errorToast({ message: "Please Try Again" });
          return;
        }

        setButtonClicked(false);
      } catch (error) {
        console.log(error);
        errorToast({ message: "Try Again!" });
        setButtonClicked(false);
      }
    } else {
      errorToast({ message: "Insufficent Balance" });
      setButtonClicked(false);
    }
  };

  const toggleShowUpdateMetadata = () => {
    setShowUpdateMetadata(!showUpdateMetadata);
  };

  const getImageURL = () => {
    if (fileData && fileData.name) return URL.createObjectURL(fileData);
    return "";
  };

  const createURI = async () => {
    const NFT_STORAGE_TOKEN = AppENVConfig.nft_storage_api_key;
    //console.log(NFT_STORAGE_TOKEN, "token");

    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
    const imageFile = new File([fileData], "nft.png", { type: "image/png" });
    const imageMetadata = await client.store({
      // goto store in node_module and comment error for blob or image file expected thrown
      image: imageFile,
      name: formik.values.name,
      symbol: formik.values.symbol,
      description: formik.values.description,
    });
    //console.log(imageMetadata, imageMetadata.embed());
    // const imageURL = await getExampleImage(imageMetadata?.embed()?.image?.href);
    const imageURL = imageMetadata?.embed()?.image?.href;
    //console.log("Img url blob : ", imageURL);
    let tokenMetadata = {
      name: formik.values.name,
      symbol: formik.values.symbol,
      description: formik.values.description,
      image: imageURL,
    } as any;
    if (formik.values?.website) {
      tokenMetadata["website"] = formik.values.website;
    }
    if (formik.values?.telegram) {
      tokenMetadata["telegram"] = formik.values.telegram;
    }
    if (formik.values?.discord) {
      tokenMetadata["discord"] = formik.values.discord;
    }
    if (formik.values?.twitter) {
      tokenMetadata["twitter"] = formik.values.twitter;
    }
    const metadata = await client.store(tokenMetadata);
    //console.log("Metadat : ", metadata);
    //console.log("Metadat emb : ", metadata.embed());
    return metadata;
  };

  async function getExampleImage(imgUrl: string) {
    const imageOriginUrl = imgUrl;
    const r = await fetch(imageOriginUrl);
    if (!r.ok) {
      throw new Error(`error fetching image`);
    }
    return r.blob();
  }

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

  useEffect(() => {
    formik.resetForm();
    // dispatch(setFileData(null));
    if (tokenAction === TokenRoutes.updateMetadata) {
      let updatedPreviewData = {
        "Token Details": {
          "Token Name": "",
          Description: "",
          Symbol: "",
        },
      };
      // formik.setFieldValue("logo", "");
      dispatch(setPreviewData(updatedPreviewData));
      dispatch(setFileData(null));
    }
  }, [tokenAction]);

  return (
    <>
      {renderForm ? (
        <div className="flex flex-row flex-1 h-full overflow-auto scroll-smooth">
          {tokenAction === TokenRoutes.createToken && (
            <CreateOrEditToken formik={formik} />
          )}
          {tokenAction === TokenRoutes.manageToken && (
            <ManageToken formik={formik} priorityFees={priorityFees} />
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
                      loading={updateMetadataLoading}
                      onClick={() => {
                        oldMetaData();
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {tokenAction === TokenRoutes.mintToken && (
            <MintOrBurnToken formik={formik} priorityFees={priorityFees} />
          )}
          {tokenAction === TokenRoutes.burnToken && (
            <MintOrBurnToken
              formik={formik}
              isBurn={true}
              priorityFees={priorityFees}
            />
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
          {appLoading ? <></> : <Loader visible={true} size={30} />}
        </div>
      )}
    </>
  );
}
