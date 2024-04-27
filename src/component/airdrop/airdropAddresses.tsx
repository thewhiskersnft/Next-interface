"use client";
import React, { useRef, useState } from "react";
import CustomButton from "../common/customButton";
import Image from "next/image";

const PasteIcon = (
  <Image
    src={"/paste.svg"}
    alt='paste'
    width={18}
    height={18}
    priority
    style={{ marginRight: "5px" }}
  />
);
const ClearAllIcon = (
  <Image
    src={"/clearAll.svg"}
    alt='paste'
    width={18}
    height={18}
    priority
    style={{ marginRight: "5px" }}
  />
);

const UploadIcon = (
  <Image
    src={"/upload.svg"}
    alt='paste'
    width={18}
    height={18}
    priority
    style={{ marginRight: "5px" }}
  />
);

// Any to be replace when data is finalized
interface AirdropAddressesProps {
  fileUploadAllowed?: boolean;
  fees: Array<any>;
}

function AirdropAddresses({
  fileUploadAllowed = false,
  fees,
}: AirdropAddressesProps) {
  const fileInput = useRef<any>(null);
  const [addresses, setAddresses] = useState("");
  const onPaste = async () => {
    let data = await navigator.clipboard.readText();
    setAddresses(data);
  };

  const onClear = () => setAddresses("");

  return (
    <div className='mt-4'>
      <div className='flex justify-between mb-1'>
        <div className='flex flex-col'>
          <p className='text-white text-small font-Orbitron mb-2'>
            Enter Addresses
          </p>
          <p className='text-disabledLink text-xsmall font-Oxanium font-normal tracking-normal'>
            Enter one address per line
          </p>
        </div>
        <div className='flex flex-col'>
          <p className='text-yellow1 text-xsmall text-right font-Orbitron mb-2'>
            Fees
          </p>
          {fees.map((item, index) => {
            return (
              <p
                className='text-disabledLink text-xsmall text-right font-Oxanium font-normal mb-2'
                key={index}
              >
                {item?.label}{" "}
                <span className='text-yellow1 text-xsmall'>
                  {item?.amount + " " + item?.token}
                </span>
              </p>
            );
          })}
        </div>
      </div>
      <div className='flex flex-col mb-4'>
        <div>
          <textarea
            className={
              "flex min-h-[120px] w-full bg-darkGrey px-3 py-2 text-xsmall shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            }
            placeholder={`askdjhfakjsdfherfhjweoirbvqoekljvnfs.dfkuvhna;ourevjnaw.
askdjhfakjsdfherfhjweoirbvqoekljvnfs.dfkuvhna;ourevjnaw.
askdjhfakjsdfherfhjweoirbvqoekljvnfs.dfkuvhna;ourevjnaw.
askdjhfakjsdfherfhjweoirbvqoekljvnfs.dfkuvhna;ourevjnaw.
            `}
            value={addresses}
            onChange={(e) => setAddresses(e.target.value)}
          />
        </div>
        <div className='flex justify-between mt-4 gap-x-3'>
          <div>
            <CustomButton
              onClick={onPaste}
              label={"Paste"}
              disabled={false}
              loading={false}
              containerStyles={{
                backgroundColor: "#222222",
              }}
              labelStyles={{ fontFamily: "Oxanium", fontSize: "14px" }}
              icon={PasteIcon}
            />
          </div>
          <div className='grow'>
            {fileUploadAllowed && (
              <>
                <input
                  type='file'
                  accept='.csv'
                  className='hidden'
                  ref={fileInput}
                />
                <CustomButton
                  onClick={() => {
                    if (fileInput.current) fileInput.current.click();
                  }}
                  label={"Upload CSV"}
                  disabled={false}
                  loading={false}
                  containerStyles={{
                    backgroundColor: "#222222",
                  }}
                  labelStyles={{
                    fontFamily: "Oxanium",
                    fontSize: "14px",
                  }}
                  icon={UploadIcon}
                />
              </>
            )}
          </div>
          <div>
            <CustomButton
              onClick={onClear}
              label={"Clear"}
              disabled={false}
              loading={false}
              containerStyles={{
                backgroundColor: "#222222",
              }}
              labelStyles={{
                fontFamily: "Oxanium",
                fontSize: "14px",
              }}
              icon={ClearAllIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirdropAddresses;
