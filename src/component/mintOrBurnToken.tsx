"use client";
import React, { useState } from "react";
import CustomInput from "./customInput";
import CustomButton from "./customButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import { createMintTokensTxBuilder } from "../solana/txBuilder/mintTokenTxBuilder"
import { validateAddress } from "@/solana/txBuilder/checkAddress";
import { errorToast, successToast } from "./toast";

type MintOrBurnTokenProps = { isBurn?: boolean; formik?: any };
const MintOrBurnToken = ({
  formik = { errors: {}, values: {}, touched: {} },
  isBurn,
}: MintOrBurnTokenProps) => {
  const [showOnLoadClick, setShowOnloadClick] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();

  const checkAddress = async () => {
   
    try {
      const mintAccount = await validateAddress(connection, formik.values.tokenAddress);
      console.log("mintAccount", mintAccount);
      if (!mintAccount) {
        errorToast({ message: "Please Check the address" });
      }

    }
    catch {
      errorToast({ message: "Please Check the address" });

    }
  }


  const mintToken = async () => {
    try {
      if (!wallet.publicKey) {
        errorToast({ message: "Please connect the wallet" });
        return;
      }
      const txhash = await createMintTokensTxBuilder(
        connection,
        wallet,
        new PublicKey(formik.values.tokenAddress),
        formik.values.mintAmount
      )
      console.log(txhash)
    }
    catch (e) {

      errorToast({ message: "Please try again" });

    }
  }


  const burnToken = async () => {
    try {
      if (!wallet.publicKey) {
        errorToast({ message: "Please connect the wallet" });
        return;
      }
      const txhash = await createMintTokensTxBuilder(
        connection,
        wallet,
        new PublicKey(formik.values.tokenAddress),
        formik.values.mintAmount
      )
      console.log(txhash)
    }
    catch (e) {
      errorToast({ message: "Please try again" });
    }
  }






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
              Balance: 738,162,324
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
