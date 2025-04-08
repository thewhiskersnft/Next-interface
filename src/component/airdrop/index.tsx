"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../common/customButton";
import Image from "next/image";
import CustomInput from "../common/customInput";
import AirdropCard from "./airdropCard";
import EligibleWalletModal from "./eligibleWalletModal";
import { useRouter } from "next/navigation";
import AirdropAddresses from "./airdropAddresses";

export default function AirdropChecker() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const SortIcon = (
    <Image
      src={"/swapVertical.svg"}
      alt="paste"
      width={18}
      height={18}
      priority
      style={{ marginRight: "5px" }}
    />
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "production") router.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onViewEligibleModal = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-auto scroll-smooth p-4">
      {/* Airdrop address form */}
      <div className="flex flex-col border-[0.2px] border-variant1 p-6 lg:p-8 xl:p-10 mb-4">
        <p className="text-white text-large font-Orbitron">Airdrop Checker</p>
        <AirdropAddresses
          fees={[
            {
              label: "Upto 5 Addresses",
              amount: "Free",
              token: "",
            },
            {
              label: "More than 5 Addresses:",
              amount: "0.01",
              token: "SOL",
            },
          ]}
        />
        <CustomButton
          onClick={() => {}}
          label={"Check"}
          disabled={false}
          loading={false}
          containerStyles={{
            backgroundColor: "#FFC83A",
          }}
          labelStyles={{
            fontFamily: "Orbitron",
            color: "black",
            fontWeight: "500",
            textAlign: "center",
          }}
        />
      </div>

      {/* Cards Sections */}
      <div className="flex flex-col border-[0.2px] border-variant1 p-6 lg:p-8 xl:p-10 mb-4">
        <div className="flex flex-row justify-between items-start">
          <p className="text-white text-large basis-1/2 font-Orbitron">
            Eligibility
          </p>
          <div className="flex items-center flex-row basis-1/2">
            <CustomInput
              label={""}
              value={""}
              onChange={(e) => {}}
              containerStyles={{ marginTop: 0, height: "28px" }}
              placeholderColor={"#989C9F"}
              placeholder={"Search for Tokens"}
              type={"string"}
            />
            <div className="ml-4">
              <CustomButton
                onClick={() => {}}
                label={"Sort"}
                disabled={false}
                loading={false}
                containerStyles={{
                  backgroundColor: "#222222",
                }}
                labelStyles={{ fontFamily: "Oxanium" }}
                icon={SortIcon}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <AirdropCard
                item={item}
                key={index}
                onViewEligibleModal={onViewEligibleModal}
              />
            );
          })}
        </div>
      </div>
      <EligibleWalletModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
