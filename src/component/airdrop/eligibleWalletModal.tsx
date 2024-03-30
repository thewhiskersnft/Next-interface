"use client";

import React from "react";
import CustomInput from "../common/customInput";
import Modal from "../common/modal";
import Image from "next/image";

interface EligibleWalletModalProps {
  open: boolean;
  onClose: () => void;
}

const getShortenAddress = (
  address: string
): { label: string; value: string } => {
  let label = "";
  if (address.length < 15) {
    label = address;
  } else {
    label = address.substring(0, 5);
    label += "...";
    label += address.substring(address.length - 10);
  }

  return {
    label: label,
    value: address,
  };
};

function EligibleWalletModal({
  open = false,
  onClose,
}: EligibleWalletModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='w-[601px] h-[598px] bg-modalBG text-white px-4 py-4 drop-shadow-whitexl'>
        <CustomInput
          label='Eligible Wallets'
          id='walletAddress'
          name='walletAddress'
          value={""}
          onChange={(e) => {}}
          showSymbol={false}
          type={"text"}
          placeholder={"Search Wallets"}
          showError={false}
          errorMessage={""}
          showCopy={false}
          showSearch={true}
        />
        <Image
          src={"/close.svg"}
          alt='Close Logo'
          width={15}
          height={15}
          className='cursor-pointer absolute right-[15px] top-[15px]'
          priority
          onClick={onClose}
        />

        <div className='overflow-x-auto mt-4'>
          <table className='table border-separate border-spacing-y-3'>
            {/* head */}
            <thead>
              <tr>
                <th className='text-xsmall font-Orbitron text-white'>
                  Address
                </th>
                <th className='text-xsmall font-Orbitron text-white'>
                  Allocated Qty
                </th>
                <th className='text-xsmall font-Orbitron text-white'>
                  Value <span className='text-variant1'>(USD)</span>
                </th>
                <th className='text-xsmall font-Orbitron text-white'>Claim</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((item, index) => {
                let shortenAddress = getShortenAddress(
                  "abcdefghijklmnopqrstuvwxyz"
                );
                return (
                  <tr
                    key={index}
                    className='border border-variant1 hover:border-yellow1'
                  >
                    <td className='flex items-center border-l border-y border-variant1'>
                      <Image
                        src={"/copy.svg"} // replace with logo
                        alt='Copy Logo'
                        width={16}
                        height={16}
                        className='cursor-pointer mr-2'
                        priority
                      />
                      <p className='text-xsmall font-Oxanium text-center text-yellow1'>
                        {shortenAddress.label}
                      </p>
                      <Image
                        src={"/exportWhite.svg"} // replace with logo
                        alt='Export Logo'
                        width={16}
                        height={16}
                        className='cursor-pointer ml-1'
                        priority
                      />
                    </td>
                    <td className='text-xsmall font-Oxanium text-center text-white border-y border-variant1'>
                      22,000
                    </td>
                    <td className='text-xsmall font-Oxanium text-center text-white border-y border-variant1'>
                      $23,123,134.00
                    </td>
                    <td className='border-r border-y border-variant1'>
                      <Image
                        src={"/exportWhite.svg"} // replace with logo
                        alt='Export Logo'
                        width={16}
                        height={16}
                        className='cursor-pointer ml-1'
                        priority
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}

export default EligibleWalletModal;
