import React, { useEffect, useState } from "react";
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
} from "../redux/slice/formDataSlice";
import { keyPairs } from "../constants";
// import help from "../asset/help.svg";
// import helpDark from "../asset/helpDark.png";
import CustomInput from "./customInput";
import CustomImagePicker from "./customImagePicker";
import CustomRadio from "./customRadio";
import Image from "next/image";

type CreateOrEditTokenProps = { isEdit?: boolean };

const CreateOrEditToken = ({ isEdit = false }: CreateOrEditTokenProps) => {
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
  } = useSelector((state: any) => state.formDataSlice);

  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(setToggled(!isToggled));
  };
  // useEffect(() => {
  //   dispatch(setSelectedForm(keyPairs.createV1));
  // }, []);
  return (
    <div
      style={{ alignItems: "center" }}
      className="w-5/6 flex flex-col justify-center align-center h-max"
    >
      {!isEdit ? (
        <div className="w-[95%] mt-6 flex flex-row justify-left">
          <button
            className={`${
              selectedForm === keyPairs.createV1
                ? "bg-yellow1 text-black font-semibold"
                : "bg-black text-white font-light"
            } tracking-wide font-semibold font-Orbitron w-[150px] pt-0.5 pb-0.5 pl-1.5 pr-1.5 text-xsmall border-[1px] border-black flex items-center ${
              selectedForm === keyPairs.createV1
                ? ""
                : "hover:border-yellow1 hover:bg-variant1"
            }`}
            onClick={() => {
              dispatch(setToggled(false));
              dispatch(setSelectedForm(keyPairs.createV1));
            }}
          >
            v1 Legacy SPL
            <Image
              src={
                selectedForm === keyPairs.createV1
                  ? "/helpDark.png"
                  : "/help.svg"
              }
              alt="Help Logo"
              width={14}
              height={5}
              priority
            />
          </button>
          <button
            // style={{ border: "1px solid #4D4D4D" }}
            className={`${
              selectedForm === keyPairs.createV2
                ? "bg-yellow1 text-black font-semibold"
                : "bg-black text-white font-light"
            } tracking-wide font-semibold font-Orbitron w-[160px] pt-0.5 pb-0.5 pl-1.5 pr-1.5 text-xsmall border-[1px] border-black flex items-center ${
              selectedForm === keyPairs.createV2
                ? ""
                : "hover:border-yellow1 hover:bg-variant1"
            }`}
            onClick={() => {
              dispatch(setToggled(false));
              dispatch(setSelectedForm(keyPairs.createV2));
            }}
          >
            v2 Token-22 SPL
            <Image
              src={
                selectedForm === keyPairs.createV1
                  ? "/helpDark.png"
                  : "/help.svg"
              }
              alt="Help Logo"
              width={14}
              height={5}
              priority
            />
          </button>
        </div>
      ) : (
        <></>
      )}
      {selectedForm === keyPairs.createV1 && ( // v1 token
        <div
          className={`bg-black h-max mb-5  ${
            isEdit ? "w-full mt-4" : "p-12 w-[95%]"
          }`}
          style={{
            border: isEdit ? "0px" : "1px solid #FFC83A",
            minHeight: "max-content",
          }}
        >
          <div className="text-white text-left width-4/5 text-large font-Orbitron">
            Enter Details
          </div>
          <CustomInput
            label="Name"
            value={name}
            onChange={(e) => {
              dispatch(setName(e.target.value));
            }}
            showSymbol={false}
            type={"text"}
            placeholder={"Enter Token Name"}
          />
          <CustomInput
            label="Symbol"
            value={symbol}
            onChange={(e) => {
              dispatch(setSymbol(e.target.value));
            }}
            showSymbol={true}
            type={"text"}
            placeholder={"Enter Token Symbol"}
          />
          <CustomInput
            label="Description"
            value={description}
            onChange={(e) => {
              dispatch(setDescription(e.target.value));
            }}
            showSymbol={false}
            type={"text"}
            placeholder={"Enter Token Description"}
          />
          <CustomInput
            label="Supply"
            value={supply}
            onChange={(e) => {
              dispatch(setSupply(e.target.value));
            }}
            showSymbol={true}
            type={"number"}
            placeholder={"Enter Token Supply"}
          />
          <CustomInput
            label="Decimals"
            value={decimal}
            onChange={(e) => {
              dispatch(setDecimal(e.target.value));
            }}
            showSymbol={true}
            type={"number"}
            placeholder={"Enter Token Decimals"}
          />
          <CustomImagePicker
            label="Logo"
            value={fileData}
            fileName={(fileData && fileData.name) || ""}
            onChange={(e) => {
              // setDecimal(e.target.value);
              // console.log(e);
              // console.log("Image : ", e?.target?.files[0]);
              if (e?.target?.files && e.target.files[0])
                dispatch(setFileData(e.target.files[0]));
              else dispatch(setFileData(null));
            }}
            showSymbol={true}
            placeholder={"Select logo"}
          />
          <CustomRadio
            label={"Add Social Links"}
            value={isToggled}
            onChange={handleToggle}
          />
          {isToggled ? (
            <div className="flex flex-col">
              <CustomInput
                label="Website"
                value={website}
                onChange={(e) => {
                  dispatch(setWebsite(e.target.value));
                }}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Website URL"}
              />
              <CustomInput
                label="Twitter"
                value={twitter}
                onChange={(e) => {
                  dispatch(setTwitter(e.target.value));
                }}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Twitter Handle"}
              />
              <CustomInput
                label="Telegram"
                value={telegram}
                onChange={(e) => {
                  dispatch(setTelegram(e.target.value));
                }}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Telegram Id"}
              />
              <CustomInput
                label="Discord"
                value={discord}
                onChange={(e) => {
                  dispatch(setDiscord(e.target.value));
                }}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Discord Link"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {selectedForm === keyPairs.createV2 && ( // v2 token
        <div
          className="bg-black w-[95%] h-[max-content] mb-5 p-12"
          style={{ border: "1px solid #FFC83A" }}
        >
          <div className="text-white text-left width-4/5 text-large font-Orbitron">
            Enter Details
          </div>
          <CustomInput
            label="Name"
            value={name}
            onChange={(e) => {
              dispatch(setName(e.target.value));
            }}
            showSymbol={false}
            type={"text"}
            placeholder={"Enter Token Name"}
          />
          <CustomInput
            label="Symbol"
            value={symbol}
            onChange={(e) => {
              dispatch(setSymbol(e.target.value));
            }}
            showSymbol={true}
            type={"text"}
            placeholder={"Enter Token Symbol"}
          />
          <CustomInput
            label="Description"
            value={description}
            onChange={(e) => {
              dispatch(setDescription(e.target.value));
            }}
            showSymbol={false}
            type={"text"}
            placeholder={"Enter Token Description"}
          />
          <CustomInput
            label="Supply"
            value={supply}
            onChange={(e) => {
              dispatch(setSupply(e.target.value));
            }}
            showSymbol={true}
            type={"number"}
            placeholder={"Enter Token Supply"}
          />
          <CustomInput
            label="Decimals"
            value={decimal}
            onChange={(e) => {
              dispatch(setDecimal(e.target.value));
            }}
            showSymbol={true}
            type={"number"}
            placeholder={"Enter Token Decimals"}
          />
          <CustomImagePicker
            label="Logo"
            value={fileData}
            fileName={(fileData && fileData.name) || ""}
            onChange={(e) => {
              // setDecimal(e.target.value);
              // console.log(e);
              // console.log("Image : ", e?.target?.files[0]);
              if (e?.target?.files && e.target.files[0])
                dispatch(setFileData(e.target.files[0]));
              else dispatch(setFileData(null));
            }}
            showSymbol={true}
            placeholder={"Select logo"}
          />

          <CustomRadio
            label={"Enable Extensions"}
            value={enableExtensions}
            onChange={() => {
              dispatch(setEnableExtensions(!enableExtensions));
            }}
            containerStyles={{
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
            }}
          />
          {enableExtensions && (
            <div className="flex flex-col">
              <CustomRadio
                label={"Transfer Tax"}
                value={transferTax}
                showSymbol={true}
                onChange={() => {
                  dispatch(setTransferTax(!transferTax));
                }}
                containerStyles={{
                  fontSize: "16px",
                }}
              />
              {transferTax && (
                <div className="flex flex-col">
                  <CustomInput
                    label={`Fee (in %) `}
                    value={fee}
                    onChange={(e) => {
                      dispatch(setFee(e.target.value));
                    }}
                    showSymbol={true}
                    type={"text"}
                    placeholder={"Enter Text"}
                  />
                  <CustomInput
                    label={`Max Fee (0 = unlimited) `}
                    value={maxFee}
                    onChange={(e) => {
                      dispatch(setMaxFee(e.target.value));
                    }}
                    showSymbol={true}
                    type={"text"}
                    placeholder={"Enter Text"}
                  />
                  <CustomInput
                    label={`Withdraw Authority `}
                    value={withdrawAuthority}
                    onChange={(e) => {
                      dispatch(setWithdrawAuthority(e.target.value));
                    }}
                    showSymbol={true}
                    type={"text"}
                    placeholder={"Enter Text"}
                  />
                  <CustomInput
                    label={`Config Authority `}
                    value={configAuthority}
                    onChange={(e) => {
                      dispatch(setConfigAuthority(e.target.value));
                    }}
                    showSymbol={true}
                    type={"text"}
                    placeholder={"Enter Text"}
                  />
                </div>
              )}
              <CustomRadio
                label={"Interest Bearing"}
                value={interestBearing}
                showSymbol={true}
                onChange={() => {
                  dispatch(setInterestBearing(!interestBearing));
                }}
                containerStyles={{
                  fontSize: "16px",
                }}
              />
              {interestBearing && (
                <div className="flex flex-col">
                  <CustomInput
                    label={`Rate (in %) `}
                    value={rate}
                    onChange={(e) => {
                      dispatch(setRate(e.target.value));
                    }}
                    showSymbol={true}
                    type={"text"}
                    placeholder={"Enter Text"}
                  />
                </div>
              )}
              <CustomRadio
                label={"Default Account State"}
                value={defaultAccountState}
                showSymbol={true}
                onChange={() => {
                  dispatch(setDefaultAccountState(!defaultAccountState));
                }}
                containerStyles={{
                  fontSize: "16px",
                }}
              />
              {defaultAccountState && (
                <div className="flex flex-col">
                  <CustomInput
                    label={`Default State (to be replaced with dropdown)`}
                    value={defaultAccountStateOption}
                    onChange={(e) => {
                      dispatch(setDefaultAccountStateOption(e.target.value));
                    }}
                    showSymbol={true}
                    type={"text"}
                    placeholder={"Enter Text"}
                  />
                </div>
              )}
              <CustomRadio
                label={"Permanent Delegate"}
                value={permanentDelegate}
                showSymbol={true}
                onChange={() => {
                  dispatch(setPermanentDelegate(!permanentDelegate));
                }}
                containerStyles={{
                  fontSize: "16px",
                }}
              />
              {permanentDelegate && (
                <div className="flex flex-col">
                  <CustomInput
                    label={`Delegate `}
                    value={delegate}
                    onChange={(e) => {
                      dispatch(setDelegate(e.target.value));
                    }}
                    showSymbol={true}
                    type={"text"}
                    placeholder={"Enter Text"}
                  />
                </div>
              )}
              <CustomRadio
                label={"Non Transferable"}
                value={nonTransferable}
                showSymbol={true}
                onChange={() => {
                  dispatch(setNonTransferable(!nonTransferable));
                }}
                containerStyles={{
                  fontSize: "16px",
                }}
              />
            </div>
          )}

          <CustomRadio
            label={"Add Social Links"}
            value={isToggled}
            onChange={handleToggle}
            containerStyles={{
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
            }}
          />
          {isToggled ? (
            <div className="flex flex-col">
              <CustomInput
                label="Website"
                value={website}
                onChange={(e) => {
                  dispatch(setWebsite(e.target.value));
                }}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Website URL"}
              />
              <CustomInput
                label="Twitter"
                value={twitter}
                onChange={(e) => {
                  dispatch(setTwitter(e.target.value));
                }}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Twitter Handle"}
              />
              <CustomInput
                label="Telegram"
                value={telegram}
                onChange={(e) => {
                  dispatch(setTelegram(e.target.value));
                }}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Telegram Id"}
              />
              <CustomInput
                label="Discord"
                value={discord}
                onChange={(e) => {
                  dispatch(setDiscord(e.target.value));
                }}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Discord Link"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default CreateOrEditToken;
