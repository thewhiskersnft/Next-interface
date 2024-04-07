import Image from "next/image";
import React, { useState } from "react";
import TokenModal from "./TokenModal";
import { demoTokens } from "@/constants";
import CustomButton from "../common/customButton";
import RightSidebar from "../common/rightSidebar";

const FluxbeamLP = ({}) => {
  const [showBaseTokenModal, setShowBaseTokenModal] = useState(false);

  const toggleBaseTokenModal = () => {
    setShowBaseTokenModal(!showBaseTokenModal);
  };
  return (
    <div className="flex">
      <TokenModal
        isOpen={showBaseTokenModal}
        onClose={toggleBaseTokenModal}
        tokenList={demoTokens}
        handleTokenSelect={() => {}}
      />
      <div className="px-8 py-4 flex-1 border-[1px] border-lightGrey mr-4 mt-4 h-min">
        <section className="w-full">
          <p className="font-Oxanium text-xsmall text-disabledLink">
            Base Token Initial Liquidity :
          </p>
          <div className="w-full mt-2 bg-background py-4 px-4 flex justify-between">
            <div className="flex items-center">
              <div className="w-[190px] h-[50px] bg-background border-[1px] border-solid border-variant1 hover:border-white">
                <section
                  className="flex justify-between items-center px-4 h-[50px] cursor-pointer"
                  onClick={toggleBaseTokenModal}
                >
                  <Image
                    src={"/cat1.svg"}
                    alt="Token Logo"
                    width={33}
                    height={33}
                    className="cursor-pointer mb-[2px]"
                    priority
                  />
                  <p className="text-xsmall font-Oxanium text-center">WHIZ</p>
                  <Image
                    src={"/arrowUp.svg"}
                    alt="Up Logo"
                    width={8}
                    height={4}
                    priority
                    className={`cursor-pointer ml-3 ${"rotate-180"}`}
                  />
                </section>
              </div>
              <span className="border-[1px] border-white h-min ml-6 px-2 py-1 cursor-pointer">
                <p className="text-white font-Oxanium text-xsmall">Half</p>
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
              <div className="w-[190px] h-[50px] bg-background border-[1px] border-solid border-variant1 hover:border-white">
                <section
                  className="flex justify-between items-center px-4 h-[50px] cursor-pointer"
                  onClick={toggleBaseTokenModal}
                >
                  <Image
                    src={"/cat1.svg"}
                    alt="Token Logo"
                    width={33}
                    height={33}
                    className="cursor-pointer mb-[2px]"
                    priority
                  />
                  <p className="text-xsmall font-Oxanium text-center">WHIZ</p>
                  <Image
                    src={"/arrowUp.svg"}
                    alt="Up Logo"
                    width={8}
                    height={4}
                    priority
                    className={`cursor-pointer ml-3 ${"rotate-180"}`}
                  />
                </section>
              </div>
              <span className="border-[1px] border-white h-min ml-6 px-2 py-1 cursor-pointer">
                <p className="text-white font-Oxanium text-xsmall">Half</p>
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
        <div className="flex justify-left w-full mt-8">
          <CustomButton disabled={false} label={"Submit"} onClick={() => {}} />
        </div>
      </div>
      <section>
        <div className="flex justify-center items-center border-[1px] border-yellow1 py-8 cursor-pointer mt-4">
          <Image
            src={"/fluxbeam.svg"}
            alt="Fluxbeam Logo"
            width={64}
            height={64}
            className="cursor-pointer"
            priority
          />
          <section className="h-[64px] flex flex-col justify-between mx-4 py-2">
            <p className="font-Orbitron text-xsmall text-white">FluxBeam</p>
            <p className="font-Oxanium text-xsmall text-disabledLink">
              For v2 Token-22 SPL
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

export default FluxbeamLP;
