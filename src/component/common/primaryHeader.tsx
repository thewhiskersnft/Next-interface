"use client";
import App from "next/app";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { envs } from "@/constants";
import { isMainnet } from "@/global/hook/getConnectedClusterInfo";
import CustomInput from "./customInput";
import { useDispatch, useSelector } from "react-redux";
import { setPriorityFees } from "@/redux/slice/connectionSlice";

const borderColor: string = "#4D4D4D";

const PrimaryHeader: FC = () => {
  const [price, setPrice] = useState();
  const [Volume, setVolume] = useState();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showPriorityFeeModal, setShowPriorityFeeModal] = useState(false);
  const { priorityFees } = useSelector(
    (state: any) => state.connectionDataSlice
  );

  const dispatch = useDispatch();

  // const convertedPriorityFee =

  useEffect(() => {
    const price = async () => {
      try {
        const soltokenpriceData = await axios.get(
          "https://price.jup.ag/v4/price?ids=SOL"
        );
        const soltokenPrice = soltokenpriceData.data.data["SOL"].price;
        setPrice(parseFloat(soltokenPrice.toFixed(2)) as any);
      } catch (e) {
        return;
      }
    };
    price();
    const Volume = async () => {
      try {
        const soltokenpriceData = await axios.get(
          "https://cache.jup.ag/stats/day"
        );
        const a = soltokenpriceData.data.lastXVolumeInUSD;
        const language = "en";
        const b = Intl.NumberFormat(language, { notation: "compact" }).format(
          parseFloat(a)
        ); //output - "234K"
        setVolume(b as any);
      } catch (e) {
        return;
      }
    };
    Volume();
  }, []);

  const getLambports = (sol: number) => {
    return sol * 10 ** 9;
  };

  const getSol = (lambports: number) => {
    return lambports / 10 ** 9;
  };

  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal);
  };
  const togglePriorityFeeModal = () => {
    setShowPriorityFeeModal(!showPriorityFeeModal);
  };

  const handlePriorityFeeChange = (val: number) => {
    // do calculations here if any for priority fees
    dispatch(setPriorityFees(val));
  };

  const txPriorityData = [
    {
      label: "Fast",
      value: 0.0001,
    },
    {
      label: "Turbo",
      value: 0.001,
    },
    {
      label: "Ultra",
      value: 0.01,
    },
  ];

  const selectedPriorityFeeTx = txPriorityData.filter(
    (tx: any, index: number) => {
      return tx.value === getSol(priorityFees);
    }
  )[0];

  return (
    <div
      className="w-full bg-black flex justify-between py-[5px]"
      style={{ borderTopWidth: "0.2px", borderColor: borderColor }}
    >
      <div className="flex">
        <div
          className="px-6 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer flex items-center">
            <Image
              src={"/solana.svg"}
              alt="solana Logo"
              width={16}
              height={16}
              style={{ marginRight: "5px" }}
              priority
            />
            {price} USD
          </div>
        </div>
        <div
          className="px-6 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            TPS: 2,778
          </div>
        </div>
        <div
          className="px-6 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            24h Volume: {Volume} USD
          </div>
        </div>
      </div>
      <div className="flex">
        <span
          className="flex items-center px-6 cursor-pointer relative"
          style={{
            borderLeftWidth: "2px",
            // borderRightWidth: "2px",
            borderColor: borderColor,
          }}
          onClick={togglePriorityFeeModal}
        >
          {showPriorityFeeModal && (
            <section
              className="flex flex-col absolute bg-background p-4 bottom-[28px] right-[15px] w-[max-content] border-[1px] border-variant1 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between">
                <>
                  <Image
                    src={"/txPriority.svg"}
                    alt="TxPriority Logo"
                    width={20}
                    height={20}
                    style={{ marginRight: "5px" }}
                    priority
                  />
                  <p className="color-white font-small font-Orbitron">
                    Transaction Priority
                  </p>
                </>
                <Image
                  src={"/close.svg"}
                  alt="Close Logo"
                  width={9.68}
                  height={9.68}
                  style={{ marginLeft: "90px" }}
                  priority
                  onClick={togglePriorityFeeModal}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex mt-4">
                {txPriorityData.map((txPriority: any, index: number) => {
                  const { label, value } = txPriority;
                  const isSelected = getSol(priorityFees) == value;
                  return (
                    <section
                      className={`bg-black grow border-[2px] cursor-pointer ${
                        isSelected
                          ? "border-yellow1"
                          : "border-[rgba(255,255,255,0.5)]"
                      }`}
                      key={index}
                      onClick={() => {
                        handlePriorityFeeChange(getLambports(value));
                      }}
                    >
                      <p
                        className={`text-center px-6 py-2 font-Oxanium font-xsmall ${
                          isSelected ? "text-yellow1" : "text-white"
                        }`}
                      >
                        {label} <br /> {value}
                      </p>
                    </section>
                  );
                })}
              </div>
              <div>
                <CustomInput
                  label="Custom (Max 0.01 Sol)"
                  id="transactionPriority"
                  name="transactionPriority"
                  value={getSol(priorityFees)}
                  onChange={(e) =>
                    handlePriorityFeeChange(getLambports(e.target.value))
                  }
                  showSymbol={false}
                  type={"number"}
                  placeholder={"Enter Custom (SOL)"}
                  showError={false}
                  errorMessage={""}
                  inputStyles={{
                    border: "1px solid #4D4D4D",
                    backgroundColor: "#4D4D4D",
                  }}
                />
              </div>
            </section>
          )}
          <Image
            src={"/priorityFee.svg"}
            alt="online Logo"
            width={18}
            height={18}
            // style={{ marginRight: "5px" }}
            priority
          />
          <p className="font-Orbitron text-xsmall text-yellow1 ml-4">
            {selectedPriorityFeeTx ? selectedPriorityFeeTx["label"] : "Custom"}
          </p>
          <Image
            src={"/arrowUp.svg"}
            alt="Up Logo"
            width={8}
            height={4}
            priority
            className={`cursor-pointer ml-3 ${
              showPriorityFeeModal ? "rotate-180" : ""
            }`}
          />
        </span>
        <span
          className="flex items-center px-6"
          style={{
            borderLeftWidth: "2px",
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
          onClick={() => {}}
        >
          <Image
            src={"/online.svg"}
            alt="online Logo"
            width={18}
            height={18}
            // style={{ marginRight: "5px" }}
            priority
          />
          <p className="font-Orbitron text-xsmall text-textGreen ml-2">
            {isMainnet() ? envs.mainnet : envs.devnet}
          </p>
        </span>

        <div
          className="text-white text-xsmall font-Orbitron text-left items-center px-6 flex flex-row"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            Lite
          </div>
          <label className="switch text-xsmall mx-4">
            <input
              onClick={() => {}}
              checked={true}
              type="checkbox"
              onChange={() => {}}
            />
            <span className="slider round"></span>
          </label>
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            Pro
          </div>
        </div>
        <div
          className="relative px-4 flex items-center hover:bg-[]"
          style={
            {
              // borderRightWidth: "2px",
              // borderColor: borderColor,
            }
          }
          onClick={toggleSettingsModal}
        >
          <Image
            src={"/setting.svg"}
            alt="setting Logo"
            width={20}
            height={20}
            className="cursor-pointer"
            // style={{ marginRight: "5px" }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default PrimaryHeader;
