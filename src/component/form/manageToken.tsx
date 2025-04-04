"use client";
import React, { useState } from "react";
import CustomInput from "../common/customInput";
import CustomButton from "../common/customButton";
import { revokeMintAuthTxBuilder } from "@/solana/txBuilder/revokeMintAuthTxBuilder";
import { PublicKey } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { revokeFreezeAuthTxBuilder } from "@/solana/txBuilder/revokeFreezeAuthTxBuilder";
import { errorToast, successToast } from "../common/toast";
import { getMint } from "@solana/spl-token";
import { useDispatch } from "react-redux";
import {
  setFreezeAuthority,
  setMintAuthority,
} from "@/redux/slice/formDataSlice";

type ManageTokenProps = { formik?: any; priorityFees: number };

const ManageToken = ({
  formik = { errors: {}, values: {}, touched: {} },
  priorityFees,
}: ManageTokenProps) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [showManageTokenData, setShowManageTokenData] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [freezeLoading, setFreezeLoading] = useState(false);

  const revokeMintAuth = async () => {
    setMintLoading(true);
    try {
      if (!formik?.values?.tokenAddress) {
        errorToast({ message: "Please enter token address" });
        return;
      }

      const txhash = await revokeMintAuthTxBuilder(
        connection,
        wallet,
        new PublicKey(formik?.values?.tokenAddress),
        priorityFees
      );
      if (txhash) {
        // correctly revoked
        formik.setFieldValue("mintAuthority", false);
        dispatch(setMintAuthority(false));
      } else {
        errorToast({ message: "Please try again" });
      }
      setMintLoading(false);
    } catch (error) {
      errorToast({ message: "Please try again!" });
      setMintLoading(false);
    }
  };

  const revokeFreezeAuth = async () => {
    setFreezeLoading(true);
    try {
      const txhash = await revokeFreezeAuthTxBuilder(
        connection,
        wallet,
        new PublicKey(formik?.values?.tokenAddress),
        priorityFees
      );
      if (txhash) {
        // correctly revoked
        formik.setFieldValue("freezeAuthority", false);
        dispatch(setFreezeAuthority(false));
      } else {
        errorToast({ message: "Please try again" });
      }
      setFreezeLoading(false);
    } catch (error) {
      errorToast({ message: "Please try again!" });
      setFreezeLoading(false);
    }
  };

  const dispatch = useDispatch();

  return (
    <>
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
            id="tokenAddress"
            name="tokenAddress"
            value={formik?.values?.tokenAddress}
            onChange={formik?.handleChange}
            showSymbol={false}
            type={"text"}
            placeholder={"Enter Token Address"}
          />
          <div className="w-[90px] mt-6 flex justify-left">
            <CustomButton
              label="Load"
              loading={tokenLoading}
              onClick={async () => {
                setTokenLoading(true);
                if (!formik?.values?.tokenAddress) {
                  errorToast({ message: "Please enter token address!" });
                  setTokenLoading(false);
                  return;
                }
                try {
                  let mintAccount = await getMint(
                    connection,
                    new PublicKey(formik?.values?.tokenAddress)
                  );

                  if (mintAccount) {
                    formik.setFieldValue(
                      "mintAuthority",
                      mintAccount.mintAuthority?.toBase58() ===
                        wallet.publicKey?.toBase58()
                    );
                    formik.setFieldValue(
                      "freezeAuthority",
                      mintAccount.freezeAuthority?.toBase58() ===
                        wallet.publicKey?.toBase58()
                    );
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
                    setTokenLoading(false);
                  } else {
                    errorToast({
                      message: "Please enter valid token address!",
                    });
                    setTokenLoading(false);
                  }
                } catch (e) {
                  errorToast({ message: "Please Check the address" });
                  setTokenLoading(false);
                  return;
                }
                // toggleShowManageTokenData();
                setShowManageTokenData(true);
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
                  {`${formik?.values.mintAuthority ? "Enabled" : "Disabled"}`}
                </p>
                <div className="flex justify-left w-[200px]">
                  <CustomButton
                    disabled={!formik?.values.mintAuthority}
                    loading={mintLoading}
                    label={formik?.values.mintAuthority ? "Revoke" : "Revoked"}
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
                  {`${
                    formik?.values?.freezeAuthority ? "Enabled" : "Disabled"
                  }`}
                </p>
                <div className="flex justify-left w-[200px]">
                  <CustomButton
                    disabled={!formik?.values.freezeAuthority}
                    loading={freezeLoading}
                    label={
                      formik?.values.freezeAuthority ? "Revoke" : "Revoked"
                    }
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
                  {`${formik?.values?.mutableMetadata ? "True" : "False"}`}
                </p>
                <div className="flex justify-left w-[200px]">
                  <CustomButton
                    disabled={true}
                    label={
                      formik?.values?.mutableMetadata ? "Disable" : "Enable"
                    }
                    onClick={() => {
                      errorToast({ message: "Coming Soon!" });
                      //   dispatch(setMutableMetadata(!formik?.values?.mutableMetadata));
                    }}
                  />
                </div>
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageToken;
