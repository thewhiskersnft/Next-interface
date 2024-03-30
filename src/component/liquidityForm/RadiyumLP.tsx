import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "../common/customButton";
import { Stepper } from "react-form-stepper";
import CustomInput from "../common/customInput";
import RightSidebar from "../common/rightSidebar";

const RadiyumLP = ({}) => {
  const [step, setStep] = useState(0);

  const incrementStep = () => {
    setStep((step) => step + 1);
  };

  return (
    <div className="flex">
      <div className="w-full">
        <div
          id="stepper"
          className="px-8 py-4 flex-1 border-[1px] border-lightGrey mr-4 mt-4 h-min text-yellow1"
        >
          <Stepper
            steps={[
              { label: "Import OpenBook Market ID" },
              { label: "Price & intital" },
              { label: "Pool Created" },
            ]}
            stepClassName="text-yellow1"
            connectorStateColors={true}
            connectorStyleConfig={{
              completedColor: "#FFC83A",
              activeColor: "#FFC83A",
              disabledColor: "grey",
              size: 1,
              stepSize: "2em",
              style: "solid",
            }}
            activeStep={step}
            styleConfig={{
              activeBgColor: "#FFC83A",
              activeTextColor: "black",
              completedBgColor: "#FFC83A",
              completedTextColor: "black",
              inactiveBgColor: "#222222",
              inactiveTextColor: "white",
              size: 28,
              circleFontSize: 12,
              labelFontSize: 12,
              borderRadius: 3,
              fontWeight: 3,
            }}
          />
        </div>
        <div className="px-8 py-4 flex-1 border-[1px] border-lightGrey mr-4 mt-4 h-min">
          {step == 0 && (
            <>
              <CustomInput
                label="OpenBook Market ID"
                id="openbookMarketId"
                name="openbookMarketId"
                value={""}
                onChange={(e) => {}}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Token Address"}
                showError={false}
                errorMessage={""}
                showCopy={false}
              />
              <div className="flex justify-left w-[87px] mt-8">
                <CustomButton
                  disabled={false}
                  label={"Confirm"}
                  onClick={() => {
                    incrementStep();
                  }}
                />
              </div>
            </>
          )}
          {step == 1 && (
            <>
              <section className="w-full">
                <p className="font-Oxanium text-xsmall text-disabledLink">
                  Base Token Initial Liquidity :
                </p>
                <div className="w-full mt-2 bg-background py-4 px-4 flex justify-between">
                  <div className="flex items-center">
                    <p className="pr-4 border-r-[1px] border-white font-Oxanium text-normal">
                      SOL
                    </p>

                    <span className="border-[1px] border-white h-min ml-6 px-2 py-1 cursor-pointer">
                      <p className="text-white font-Oxanium text-xsmall">
                        Half
                      </p>
                    </span>
                    <span className="border-[1px] border-white h-min ml-4 px-2 py-1 cursor-pointer">
                      <p className="text-white font-Oxanium text-xsmall">Max</p>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-Oxanium text-disabledLink text-xsmall text-right">{`Balance : 3746293746.12`}</p>
                    <p className="font-Oxanium text-white text-normal text-right mt-1">{`34872934872`}</p>
                    <p className="font-Oxanium text-disabledLink text-right text-xsmall mt-1">{`$ 7,423.00`}</p>
                  </div>
                </div>
              </section>
              <section className="w-full mt-8">
                <p className="font-Oxanium text-xsmall text-disabledLink">
                  Quote Token Initial Liquidity :
                </p>
                <div className="w-full mt-2 bg-background py-4 px-4 flex justify-between">
                  <div className="flex items-center">
                    <p className="pr-4 border-r-[1px] border-white font-Oxanium text-normal">
                      SOL
                    </p>

                    <span className="border-[1px] border-white h-min ml-6 px-2 py-1 cursor-pointer">
                      <p className="text-white font-Oxanium text-xsmall">
                        Half
                      </p>
                    </span>
                    <span className="border-[1px] border-white h-min ml-4 px-2 py-1 cursor-pointer">
                      <p className="text-white font-Oxanium text-xsmall">Max</p>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-Oxanium text-disabledLink text-xsmall text-right">{`Balance : 3746293746.12`}</p>
                    <p className="font-Oxanium text-white text-normal text-right mt-1">{`34872934872`}</p>
                    <p className="font-Oxanium text-disabledLink text-right text-xsmall mt-1">{`$ 7,423.00`}</p>
                  </div>
                </div>
              </section>
              <CustomInput
                label="Start Time ( Optional )"
                id="startTime"
                name="startTime"
                value={""}
                onChange={(e) => {}}
                showSymbol={false}
                type={"text"}
                placeholder={"Enter Start Time"}
                showError={false}
                errorMessage={""}
                showCopy={true}
              />
              <p className="font-Oxanium text-xsmall text-center mt-14 text-disabledLink">
                A Creation Fees of <span className="text-yellow1">0.68</span>{" "}
                SOL is required for new raydium Pools
              </p>
              <div className="flex justify-left w-full mt-4">
                <CustomButton
                  disabled={false}
                  label={"Submit"}
                  onClick={() => {
                    incrementStep();
                  }}
                />
              </div>
            </>
          )}
          {step == 2 && (
            <section>
              <span className="flex">
                <Image
                  src={"/check.svg"}
                  alt="Check Logo"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  priority
                />
                <p className="font-Orbitron text-white text-small ml-2">
                  Pool is successfully created
                </p>
              </span>
              <div className="border-[1px] border-yellow1 bg-buttonBlack flex mt-4 mb-2 py-4 items-center justify-center">
                <p className="text-white font-Oxanium text-small">AMM ID : </p>
                <p className="text-yellow1 font-Oxanium text-xsmall">
                  sdvns...asdfa
                </p>
                <Image
                  src={"/copy.svg"}
                  alt="Copy Logo"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                  priority
                />
              </div>
            </section>
          )}
        </div>
      </div>
      <section>
        <div className="flex justify-center items-center border-[1px] border-yellow1 py-8 cursor-pointer mt-4">
          <Image
            src={"/radiyum.svg"}
            alt="Radiyum Logo"
            width={64}
            height={64}
            className="cursor-pointer"
            priority
          />
          <section className="h-[64px] flex flex-col justify-between mx-4 py-2">
            <p className="font-Orbitron text-xsmall text-white">Raydium</p>
            <p className="font-Oxanium text-xsmall text-disabledLink">
              For v1 Leagacy SPL
            </p>
          </section>
        </div>
        <RightSidebar
          hidePreview={false}
          hideLinks={true}
          data={{
            "Pool Details": {
              "Trading Pair": "WHIZ/USDC",
              "Token A": "sdvns...asdfa",
              "Token B": "sdvns...asdfa",
              "Trade Fee": "0.02",
              "Owner Trade Fee": "0.005",
              "Owner Withdraw Fee": 0,
              "Curve Type": "Constant Price",
              "Starting Price": "1 WHIZ ≈ 0.00000000 SOL",
            },
          }}
          logo={""}
          showInfo={true}
          createBtnText={""}
          logoContainerStyles={{ height: "104px" }}
          logoStyles={{ height: "64px", width: "64px" }}
          mediaLinks={{
            website: "",
            twitter: "",
            telegram: "",
            discord: "",
          }}
          formik={null}
          label={""}
          loading={false}
          hideCreateBtn={true}
          infoData={[
            "Mint Authority: This is the authority (anaccount) that has the permission to mintnew tokens of a specific type. If a tokenaccount has a mint authority set, thataccount can create more tokens at anytime, increasing the supply.",
            "Freeze Authority: This is the authority that has the capability to freeze and unfreeze token accounts. When a token account is frozen, it can no longer send or receivetokens. This is useful for enforcingcompliance or addressing securityconcerns.",
            "Mutable Metadata: SPL tokens can haveassociated metadata that describes thetoken, like its name, symbol, and otherdetails. If the metadata is mutable, itmeans that the information can bechanged after the token is created.Disabling the mutability makes themetadata permanent and unchangeable.",
          ]}
        />
      </section>
    </div>
  );
};

export default RadiyumLP;
