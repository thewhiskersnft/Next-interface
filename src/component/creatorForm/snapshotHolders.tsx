import React, { useState } from "react";
import CustomInput from "../common/customInput";
import CustomButton from "../common/customButton";

const SnapshotHolder = ({}) => {
  const [showTokenDistribution, setShowTokenDistribution] = useState(false);

  const toggleShowTokenDistribution = () => {
    setShowTokenDistribution(!showTokenDistribution);
  };

  const handleLoadClick = () => {
    toggleShowTokenDistribution();
  };

  return (
    <div
      style={{ alignItems: "center" }}
      className="flex flex-row h-max mt-12 w-full mx-auto"
    >
      <div
        className={`bg-black h-max mb-5  ${"p-12 w-[95%]"}`}
        style={{
          border: "1px solid #FFC83A",
          minHeight: "max-content",
        }}
      >
        <div className="text-white text-left width-4/5 text-large font-Orbitron mb-6">
          Snapshot Token Holders
        </div>
        <CustomInput
          label="Token Address"
          id="tokenAddress"
          name="tokenAddress"
          value={""}
          onChange={(e) => {}}
          showSymbol={false}
          type={"text"}
          placeholder={"Enter Token Address"}
          showError={false}
          errorMessage={""}
          showCopy={false}
        />
        <div className="w-[90px] mt-6 flex justify-left">
          <CustomButton
            label="Load"
            loading={false}
            onClick={handleLoadClick}
          />
        </div>
        {showTokenDistribution && (
          <div className="mt-8">
            <section className="bg-buttonBlack px-4 py-6 flex justify-between items-center border-[1px] border-variant1">
              <p className="font-Orbitron text-xsmall font-bold">
                Token Distribution
              </p>
              <div className="w-[90px]">
                <CustomButton
                  label={"Top 100"}
                  loading={false}
                  onClick={() => {}}
                />
              </div>
            </section>
            <div className="bg-black border-[1px] border-variant1 px-4 py-6">
              <div className="border-[1px] border-yellow1 px-4 py-4">
                <section className="bg-black flex justify-between items-center">
                  <div className="flex justify-between items-center w-full">
                    <span className="flex">
                      <p className="text-darkText text-xsmall font-Oxanium mr-2">
                        Current Supply :
                      </p>
                      <p className="text-white text-xsmall font-Oxanium">
                        {` 39,141,234`}
                      </p>
                    </span>
                    <span className="flex">
                      <p className="text-darkText text-xsmall font-Oxanium mr-2">
                        Total Token Holder :
                      </p>
                      <p className="text-white text-xsmall font-Oxanium">
                        {` 329,141,234`}
                      </p>
                    </span>
                  </div>
                </section>
                <div className="flex flex-col w-full mt-[150px]">
                  <span className="flex">
                    <p className="text-darkText text-xsmall font-Oxanium mr-2">
                      The Top 100 Holders Collectively own
                    </p>
                    <p className="text-white text-xsmall font-Oxanium">
                      {` 270,123,154.5 Tokens (40.54%)`}
                    </p>
                  </span>
                  <span className="flex mt-2">
                    <p className="text-darkText text-xsmall font-Oxanium mr-2">
                      The Others Accounts own
                    </p>
                    <p className="text-white text-xsmall font-Oxanium">
                      {` 329,141,234.6 Tokens (60.13%)`}
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="font-Orbitron text-xsmall font-bold">Download</p>
              <section className="w-full flex justify-left items-center mt-4 gap-4">
                <div className="w-[90px]">
                  <CustomButton
                    label={"JSON"}
                    loading={false}
                    onClick={() => {}}
                  />
                </div>
                <div className="w-[90px]">
                  <CustomButton
                    label={"CSV"}
                    loading={false}
                    onClick={() => {}}
                  />
                </div>
                <div className="w-[90px]">
                  <CustomButton
                    label={"TXT"}
                    loading={false}
                    onClick={() => {}}
                  />
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnapshotHolder;
