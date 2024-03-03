"use client";
import React, { useState } from "react";
import CustomInput from "./customInput";
import CustomButton from "./customButton";

type MintOrBurnTokenProps = { isBurn?: boolean; formik?: any };

const MintOrBurnToken = ({
  formik = { errors: {}, values: {}, touched: {} },
  isBurn,
}: MintOrBurnTokenProps) => {
  const [showOnLoadClick, setShowOnloadClick] = useState(false);

  return (
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
          {isBurn ? "Burn Token" : "Mint Token"}
        </div>
        <CustomInput
          label="Token Address"
          id="tokenAddress"
          name="tokenAddress"
          value={formik?.values?.tokenAddress}
          onChange={formik?.handleChange}
          showSymbol={false}
          type={"text"}
          placeholder={"Enter Token Address"}
          showError={
            formik?.touched?.tokenAddress && formik.errors?.tokenAddress
              ? true
              : false
          }
          errorMessage={formik.errors.tokenAddress}
        />
        <div className="w-[90px] mt-6 flex justify-left">
          <CustomButton
            label="Load"
            onClick={() => {
              setShowOnloadClick(!showOnLoadClick);
            }}
          />
        </div>
        {showOnLoadClick && (
          <>
            <CustomInput
              label="Enter Amount"
              id="mintAmount"
              name="mintAmount"
              value={formik?.values?.mintAmount}
              onChange={formik?.handleChange}
              showSymbol={false}
              type={"text"}
              showCurrency={true}
              placeholder={"Enter Mint Amount"}
              showError={
                formik?.touched?.mintAmount && formik.errors?.mintAmount
                  ? true
                  : false
              }
              errorMessage={formik.errors.mintAmount}
            />
            <p className="text-xsmall text-yellow1 text-right my-2 mb-6">
              Balance: $738,162,324
            </p>
            <div className="w-full mt-6 flex justify-left">
              <CustomButton
                label={isBurn ? "Burn Token" : "Mint Token"}
                onClick={() => {
                  console.log("Mint token clicked!");
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MintOrBurnToken;
