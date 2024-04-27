import Image from "next/image";
import React, { useState } from "react";
import FluxbeamLP from "./FluxbeamLP";
import RadiyumLP from "./RadiyumLP";
import { errorToast } from "../common/toast";

const lpMethods = {
  radiyum: "radiyum",
  fluxbeam: "fluxbeam",
};

const CreateLiquidityPools = ({}) => {
  const [selectedMethod, setSelectedMethod] = useState(null as null | string);

  return (
    <div className="w-full">
      {selectedMethod && (
        <span
          className="flex items-center cursor-pointer mt-6 w-[180px]"
          onClick={() => {
            setSelectedMethod(null);
          }}
        >
          <Image
            src={"/left.svg"}
            alt="Left Logo"
            width={20}
            height={20}
            className="cursor-pointer"
            priority
          />
          <p className="font-Oxanium text-xsmall ml-1">Choose LP Provider</p>
        </span>
      )}
      {!selectedMethod && (
        <div className="border-[1px] border-lightGrey w-full py-8 px-12 mt-4">
          <>
            <p className="w-full text-center font-Orbitron text-large">
              Choose LP Provider
            </p>
            <div className="my-4 mt-8">
              <div
                className="flex justify-center items-center custom-card-border hover:border-[1px] hover:border-yellow1 py-4 cursor-pointer"
                onClick={() => {
                  errorToast({ message: "Coming Soon!" });
                  // setSelectedMethod(lpMethods.radiyum);
                }}
              >
                <Image
                  src={"/radiyum.svg"}
                  alt="Radiyum Logo"
                  width={64}
                  height={64}
                  className="cursor-pointer"
                  priority
                />
                <section className="h-[64px] flex flex-col justify-between mx-4 py-2">
                  <p className="font-Orbitron text-xsmall text-white">
                    Radiyum
                  </p>
                  <p className="font-Oxanium text-xsmall text-disabledLink">
                    For v1 Leagacy SPL
                  </p>
                </section>
              </div>
              <div
                className="flex justify-center items-center custom-card-border hover:border-[1px] hover:border-yellow1 py-4 cursor-pointer mt-16"
                onClick={() => {
                  errorToast({ message: "Coming Soon!" });
                  // setSelectedMethod(lpMethods.fluxbeam);
                }}
              >
                <Image
                  src={"/fluxbeam.svg"}
                  alt="Fluxbeam Logo"
                  width={64}
                  height={64}
                  className="cursor-pointer"
                  priority
                />
                <section className="h-[64px] flex flex-col justify-between mx-4 py-2">
                  <p className="font-Orbitron text-xsmall text-white">
                    FluxBeam
                  </p>
                  <p className="font-Oxanium text-xsmall text-disabledLink">
                    For v2 Token-22 SPL
                  </p>
                </section>
              </div>
            </div>
          </>
        </div>
      )}
      {selectedMethod === lpMethods.fluxbeam && <FluxbeamLP />}
      {selectedMethod === lpMethods.radiyum && <RadiyumLP />}
    </div>
  );
};

export default CreateLiquidityPools;
