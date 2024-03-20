"use client";
import React from "react";
import CustomButton from "../customButton";
import Image from "next/image";
import CustomInput from "../customInput";

export default function AirdropChecker() {
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

  const SortIcon = (
    <Image
      src={"/swapVertical.svg"}
      alt='paste'
      width={18}
      height={18}
      priority
      style={{ marginRight: "5px" }}
    />
  );

  return (
    <div className='flex flex-col flex-1 h-full overflow-auto scroll-smooth p-4'>
      {/* Airdrop address form */}
      <div className='flex flex-col border-[0.2px] border-variant1 p-6 lg:p-8 xl:p-10 mb-4'>
        <p className='text-white text-large font-Orbitron'>Airdrop Checker</p>
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
              <p className='text-disabledLink text-xsmall text-right font-Oxanium font-normal mb-2'>
                Upto 5 Addresses:{" "}
                <span className='text-yellow1 text-xsmall'>Free</span>
              </p>
              <p className='text-disabledLink text-xsmall text-right font-Oxanium font-normal'>
                More than 5 Addresses:{" "}
                <span className='text-yellow1 text-xsmall'>0.01 Sol</span>
              </p>
            </div>
          </div>
          <div className='flex flex-col mb-4'>
            <div>
              <textarea
                className={
                  "flex min-h-[120px] w-full bg-darkGrey px-3 py-2 text-xsmall shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                }
                placeholder='askdjhfakjsdfherfhjweoirbvqoekljvnfs.dfkuvhna;ourevjnaw.'
              />
            </div>
            <div className='flex justify-between mt-4'>
              <div>
                <CustomButton
                  onClick={() => {}}
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
              <div>
                <CustomButton
                  onClick={() => {}}
                  label={"Clear"}
                  disabled={false}
                  loading={false}
                  containerStyles={{
                    backgroundColor: "#222222",
                  }}
                  labelStyles={{ fontFamily: "Oxanium", fontSize: "14px" }}
                  icon={ClearAllIcon}
                />
              </div>
            </div>
          </div>
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
      </div>

      {/* Cards Sections */}
      <div className='flex flex-col border-[0.2px] border-variant1 p-6 lg:p-8 xl:p-10 mb-4'>
        <div className='flex flex-row justify-between items-start'>
          <p className='text-white text-large basis-1/2 font-Orbitron'>
            Eligibility
          </p>
          <div className='flex items-center flex-row basis-1/2'>
            <CustomInput
              label={""}
              value={""}
              onChange={(e) => {
                console.log("searchInput -->", e.target.value);
              }}
              containerStyles={{ marginTop: 0, height: "28px" }}
              placeholderColor={"#989C9F"}
              placeholder={"Search for Tokens"}
              type={"string"}
            />
            <div className='ml-4'>
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
        <div className='grid grid-cols-3 gap-8 mt-6'>
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <div
                className='flex flex-col airdrop-card-border px-5 py-8'
                key={index}
              >
                <div className='flex-1 flex justify-center'>
                  <Image
                    src={"/jupiter.svg"}
                    alt='paste'
                    width={104}
                    height={89}
                  />
                </div>
                <div className='flex flex-row justify-between mt-4 border-b-[0.2px] border-b-variant1 py-2'>
                  <p className='text-disabledLink text-xsmall text-right font-Oxanium font-normal'>
                    Tokens
                  </p>
                  <p className='text-white text-xsmall text-right font-light'>
                    1000000000.00
                  </p>
                </div>
                <div className='flex flex-row justify-between mt-4 border-b-[0.2px] border-b-variant1 py-2'>
                  <p className='text-disabledLink text-xsmall text-right font-Oxanium font-normal'>
                    FDMC
                  </p>
                  <p className='text-white text-xsmall text-right font-light'>
                    $ 64,092,048
                  </p>
                </div>
                <div className='flex flex-row justify-center items-center mt-4'>
                  <Image
                    src={"/visibility.svg"}
                    alt='paste'
                    width={20}
                    height={20}
                  />
                  <p className='text-yellow1 text-xsmall text-right font-Orbitron ml-2 font-Oxanium'>
                    View 76 Eligible Wallets
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
