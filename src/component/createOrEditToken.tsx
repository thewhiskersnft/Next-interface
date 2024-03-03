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
  setMetaplexFileData,
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
import { toMetaplexFileFromBrowser } from "@metaplex-foundation/js";
import CustomDropdown from "./customDropdown";

type CreateOrEditTokenProps = { isEdit?: boolean; formik?: any };

const CreateOrEditToken = ({
  isEdit = false,
  formik = { errors: {}, values: {}, touched: {} },
}: CreateOrEditTokenProps) => {
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
                  ? "/helpDark.svg"
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
                  ? "/help.svg"
                  : "/helpDark.svg"
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
          id="name"
          name="name"
          value={formik?.values?.name}
          onChange={formik?.handleChange}
          showSymbol={false}
          type={"text"}
          placeholder={"Enter Token Name"}
          showError={
            formik?.touched?.name && formik.errors?.name ? true : false
          }
          errorMessage={formik.errors.name}
        />
        <CustomInput
          label="Symbol"
          id="symbol"
          name="symbol"
          value={formik?.values?.symbol}
          onChange={formik?.handleChange}
          showSymbol={true}
          type={"text"}
          placeholder={"Enter Token Symbol"}
          showError={
            formik?.touched?.symbol && formik.errors?.symbol ? true : false
          }
          errorMessage={formik.errors.symbol}
        />
        <CustomInput
          label="Description"
          id="description"
          name="description"
          value={formik?.values?.description}
          onChange={formik?.handleChange}
          showSymbol={false}
          type={"text"}
          placeholder={"Enter Token Description"}
          showError={
            formik?.touched?.description && formik.errors?.description
              ? true
              : false
          }
          errorMessage={formik.errors.description}
        />
        {!isEdit && (
          <CustomInput
            label="Supply"
            id="supply"
            name="supply"
            value={formik?.values?.supply}
            onChange={formik?.handleChange}
            showSymbol={true}
            type={"number"}
            placeholder={"Enter Token Supply"}
            showError={
              formik?.touched?.supply && formik.errors?.supply ? true : false
            }
            errorMessage={formik.errors.supply}
          />
        )}
        {!isEdit && (
          <CustomInput
            label="Decimals"
            id="decimal"
            name="decimal"
            value={formik?.values?.decimal}
            onChange={formik?.handleChange}
            showSymbol={true}
            type={"number"}
            placeholder={"Enter Token Decimals"}
            showError={
              formik?.touched?.decimal && formik.errors?.decimal ? true : false
            }
            errorMessage={formik.errors.decimal}
          />
        )}
        <CustomImagePicker
          label="Logo"
          value={fileData}
          fileName={(fileData && fileData.name) || ""}
          onChange={async (e) => {
            // console.log("Image : ", e?.target?.files[0]);
            if (e?.target?.files && e.target.files[0]) {
              const imgMetaplexFile = await toMetaplexFileFromBrowser(
                e.target.files[0]
              );
              dispatch(setMetaplexFileData(imgMetaplexFile));
              dispatch(setFileData(e.target.files[0]));
            } else {
              dispatch(setFileData(null));
              dispatch(setMetaplexFileData(null));
            }
          }}
          showSymbol={true}
          placeholder={"Select Logo"}
        />
        {selectedForm === keyPairs.createV2 ? (
          <>
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
                      id="fee"
                      name="fee"
                      value={formik?.values?.fee}
                      onChange={formik?.handleChange}
                      showSymbol={true}
                      type={"text"}
                      placeholder={"Enter Text"}
                      showError={
                        formik?.touched?.fee && formik.errors?.fee
                          ? true
                          : false
                      }
                      errorMessage={formik.errors.fee}
                    />
                    <CustomInput
                      label={`Max Fee (0 = unlimited) `}
                      id="maxFee"
                      name="maxFee"
                      value={formik?.values?.maxFee}
                      onChange={formik?.handleChange}
                      showSymbol={true}
                      type={"text"}
                      placeholder={"Enter Text"}
                      showError={
                        formik?.touched?.maxFee && formik.errors?.maxFee
                          ? true
                          : false
                      }
                      errorMessage={formik.errors.maxFee}
                    />
                    <CustomInput
                      label={`Withdraw Authority `}
                      id="withdrawAuthority"
                      name="withdrawAuthority"
                      value={formik?.values?.withdrawAuthority}
                      onChange={formik?.handleChange}
                      showSymbol={true}
                      type={"text"}
                      placeholder={"Enter Text"}
                      showError={
                        formik?.touched?.withdrawAuthority &&
                        formik.errors?.withdrawAuthority
                          ? true
                          : false
                      }
                      errorMessage={formik.errors.withdrawAuthority}
                    />
                    <CustomInput
                      label={`Config Authority `}
                      id="configAuthority"
                      name="configAuthority"
                      value={formik?.values?.configAuthority}
                      onChange={formik?.handleChange}
                      showSymbol={true}
                      type={"text"}
                      placeholder={"Enter Text"}
                      showError={
                        formik?.touched?.configAuthority &&
                        formik.errors?.configAuthority
                          ? true
                          : false
                      }
                      errorMessage={formik.errors.configAuthority}
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
                      id="rate"
                      name="rate"
                      value={formik?.values?.rate}
                      onChange={formik?.handleChange}
                      showSymbol={true}
                      type={"text"}
                      placeholder={"Enter Text"}
                      showError={
                        formik?.touched?.rate && formik.errors?.rate
                          ? true
                          : false
                      }
                      errorMessage={formik.errors.rate}
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
                    <CustomDropdown
                      label="Default State"
                      value={formik?.values?.defaultAccountStateOption}
                      options={["Uninitialized", "Initialized", "Frozen"]}
                      placeholder="Select default account state"
                      onChange={(e) => {
                        formik.setFieldValue(
                          "defaultAccountStateOption",
                          e.value
                        );
                      }}
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
                      id="delegate"
                      name="delegate"
                      value={formik?.values?.delegate}
                      onChange={formik?.handleChange}
                      showSymbol={true}
                      type={"text"}
                      placeholder={"Enter Text"}
                      showError={
                        formik?.touched?.delegate && formik.errors?.delegate
                          ? true
                          : false
                      }
                      errorMessage={formik.errors.delegate}
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
          </>
        ) : (
          <></>
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
              id="website"
              name="website"
              value={formik?.values?.website}
              onChange={formik?.handleChange}
              showSymbol={false}
              type={"text"}
              placeholder={"Enter Website URL"}
              showError={
                formik?.touched?.website && formik.errors?.website
                  ? true
                  : false
              }
              errorMessage={formik.errors.website}
            />
            <CustomInput
              label="Twitter"
              id="twitter"
              name="twitter"
              value={formik?.values?.twitter}
              onChange={formik?.handleChange}
              showSymbol={false}
              type={"text"}
              placeholder={"Enter Twitter URL"}
              showError={
                formik?.touched?.twitter && formik.errors?.twitter
                  ? true
                  : false
              }
              errorMessage={formik.errors.twitter}
            />
            <CustomInput
              label="Telegram"
              id="telegram"
              name="telegram"
              value={formik?.values?.telegram}
              onChange={formik?.handleChange}
              showSymbol={false}
              type={"text"}
              placeholder={"Enter Telegram Invite Link"}
              showError={
                formik?.touched?.telegram && formik.errors?.telegram
                  ? true
                  : false
              }
              errorMessage={formik.errors.telegram}
            />
            <CustomInput
              label="Discord"
              id="discord"
              name="discord"
              value={formik?.values?.discord}
              onChange={formik?.handleChange}
              showSymbol={false}
              type={"text"}
              placeholder={"Enter Discord Invite Link"}
              showError={
                formik?.touched?.discord && formik.errors?.discord
                  ? true
                  : false
              }
              errorMessage={formik.errors.discord}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CreateOrEditToken;
