"use client";
import React, { useState } from "react";
import CustomInput from "./customInput";
import CustomButton from "./customButton";
import { revokeMintAuthTxBuilder } from "@/solana/txBuilder/revokeMintAuthTxBuilder";
import { PublicKey } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { revokeFreezeAuthTxBuilder } from "@/solana/txBuilder/revokeFreezeAuthTxBuilder";
import { errorToast, successToast } from "./toast";
import { getMint } from "@solana/spl-token";
import { useDispatch } from "react-redux";
import {
  setFreezeAuthority,
  setMintAuthority,
} from "@/redux/slice/formDataSlice";

type ManageTokenProps = { isBurn?: boolean; formik?: any };

const ManageToken = ({
  formik = { errors: {}, values: {}, touched: {} },
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
      if (!formik?.values?.tokenAddress) {
        errorToast({ message: "Please enter token address" });
        return;
      }

      const txhash = await revokeMintAuthTxBuilder(
        connection,
        wallet,
        new PublicKey(formik?.values?.tokenAddress)
      );

      console.log(txhash);
      if (txhash) {
        // correctly revoked
        formik.setFieldValue("mintAuthority", false);
        dispatch(setMintAuthority(false));
        // successToast({ message: ` Successfully Revoked ${txhash} `})
        successToast({
          keyPairs: {
            signature: {
              value: `${txhash}`,
              linkTo: `https://solscan.io/tx/${txhash}?cluster=devnet`,
            },
          },
          allowCopy: true,
        });
      }
      setMintLoading(false);
    } catch (error) {
      console.log(error);
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
        new PublicKey(formik?.values?.tokenAddress)
      );
      console.log(txhash);
      if (txhash) {
        // correctly revoked
        formik.setFieldValue("freezeAuthority", false);
        dispatch(setFreezeAuthority(false));
        // successToast({ message: `SuccessfullyRevoked ${txhash} ` });
        successToast({
          keyPairs: {
            signature: {
              value: `${txhash}`,
              linkTo: `https://solscan.io/tx/${txhash}?cluster=devnet`,
            },
          },
          allowCopy: true,
        });
      }
      setFreezeLoading(false);
    } catch (error) {
      console.log(error);
      errorToast({ message: "Please try again!" });
      setFreezeLoading(false);
    }
  };

  const toggleShowManageTokenData = () => {
    setShowManageTokenData(!showManageTokenData);
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
                // console.log("Load clicked");
                setTokenLoading(true);
                if (!formik?.values?.tokenAddress) {
                  errorToast({ message: "Please enter token address!" });
                  setTokenLoading(false);
                  return;
                }
                try{
                let mintAccount = await getMint(
                  connection,
                  new PublicKey(formik?.values?.tokenAddress)
                );
                
                
                console.log("MA : ", mintAccount);
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
                  // setTimeout(() => {
                  //   setTokenLoading(false);
                  // }, 1000);
                  setTokenLoading(false);
                } else {
                  errorToast({ message: "Please enter valid token address!" });
                  setTokenLoading(false);
                }
              }catch(e){
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
                    // disabled={true}
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
