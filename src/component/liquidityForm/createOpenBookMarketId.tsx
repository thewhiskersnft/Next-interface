import React from "react";
import CustomInput from "../common/customInput";
import CustomButton from "../common/customButton";
import Image from "next/image";

const CreateOpenBookMarketId = () => {
  return (
    <div
      style={{ alignItems: "center" }}
      className="w-full flex flex-col justify-center align-center h-max"
    >
      <div
        className={`bg-black h-max mb-5  ${"p-12 w-[95%]"}`}
        style={{
          border: "1px solid #FFC83A",
          minHeight: "max-content",
        }}
      >
        <div className="text-white text-left width-4/5 text-large font-Orbitron mb-8">
          Create OpenBook Market
        </div>
        <section className="flex flex-1 w-full items-end">
          <section className="flex-1 mr-2">
            <CustomInput
              label="OpenBook Program ID"
              id="openBookProgramId"
              name="openBookProgramId"
              value={""}
              onChange={(e) => {}}
              showSymbol={false}
              type={"text"}
              placeholder={"Enter OpenBook Program ID"}
              showError={false}
              errorMessage={""}
            />
          </section>
          <Image
            src={"/export.svg"}
            alt="Export Logo"
            width={26}
            height={26}
            className="cursor-pointer mb-[2px]"
            priority
          />
        </section>
        <CustomInput
          label="Minimum Order Size"
          id="minimumOrderSize"
          name="minimumOrderSize"
          value={""}
          onChange={(e) => {}}
          showSymbol={false}
          type={"text"}
          placeholder={"Enter Minimum Order Size"}
          showError={false}
          errorMessage={""}
        />
        <CustomInput
          label="Minimum Price Tick Size"
          id="minimumPriceTickSize"
          name="minimumPriceTickSize"
          value={""}
          onChange={(e) => {}}
          showSymbol={false}
          type={"text"}
          placeholder={"Enter Minimum Price Tick Size"}
          showError={false}
          errorMessage={""}
        />
        <div className="flex justify-left w-full mt-8">
          <CustomButton disabled={false} label={"Submit"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CreateOpenBookMarketId;
