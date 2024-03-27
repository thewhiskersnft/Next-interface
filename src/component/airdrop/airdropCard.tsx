"use client";
import React, { useState } from "react";
import Image from "next/image";
import { get } from "lodash";
import EligibleWalletModal from "./eligibleWalletModal";

function AirdropCard({ item, onViewEligibleModal }: any) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='flex flex-col airdrop-card-border hover:border-yellow1 px-5 py-8'>
      <div className='flex-1 flex justify-center'>
        <Image src={"/jupiter.svg"} alt='paste' width={104} height={89} />
      </div>
      <div className='flex flex-row justify-between mt-4 border-b-[0.2px] border-b-variant1 py-2'>
        <p className='text-disabledLink text-xsmall text-right font-Oxanium font-normal'>
          Tokens
        </p>
        <p className='text-white text-xsmall text-right font-light'>
          {get(item, "tokens", "1000000000.00")}
        </p>
      </div>
      <div className='flex flex-row justify-between mt-4 border-b-[0.2px] border-b-variant1 py-2'>
        <p className='text-disabledLink text-xsmall text-right font-Oxanium font-normal'>
          FDMC
        </p>
        <p className='text-white text-xsmall text-right font-light'>
          {`${get(item, "currency", "$")} ${get(item, "amount", "64,092,048")}`}
        </p>
      </div>
      <button
        onClick={onViewEligibleModal}
        className='flex flex-row justify-center items-center border-none bg-none hover:bg-buttonBlack mt-4 py-2'
      >
        <Image src={"/visibility.svg"} alt='paste' width={20} height={20} />
        <p className='text-yellow1 text-xsmall text-right font-Orbitron ml-2 font-Oxanium'>
          View 76 Eligible Wallets
        </p>
      </button>
    </div>
  );
}

export default React.memo(AirdropCard);
