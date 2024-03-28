import React, { ChangeEvent, useEffect, useState } from "react";
import CustomInput from "../common/customInput";
import CustomButton from "../common/customButton";
import CustomRadio from "../common/customRadio";
import AirdropAddresses from "../airdrop/airdropAddresses";

interface AirdropHolderProps {
  onTokenSubmit: (values: any) => void;
  isTokenLoading: boolean;
  tokenValue: string;
}

const AirdropHolder = ({
  onTokenSubmit,
  isTokenLoading,
  tokenValue,
}: AirdropHolderProps) => {
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [tokenInputVal, setTokenInputVal] = useState("");
  const [data, setData] = useState({
    createAssociatedAccount: false,
    allocationMethod: "",
    amountPerAddress: "",
    balance: "728162942.3333",
    addresses: [],
    fees: [
      {
        label: "Network Fees",
        amount: "0.002",
        token: "SOL / Address",
      },
      {
        label: "Platform Fees:",
        amount: "0.0005",
        token: "SOL / Address",
      },
    ],
  });

  useEffect(() => {
    setTokenInputVal(tokenValue);
  }, [tokenValue]);

  const onChangeTokenVal = (e: ChangeEvent<HTMLInputElement>) => {
    setTokenInputVal(e.target.value);
  };

  const handleLoadClick = () => {
    onTokenSubmit(tokenInputVal);
    setShowSetupForm(true);
  };

  return (
    <div
      style={{ alignItems: "center" }}
      className='flex flex-col h-max mt-12 w-full mx-auto'
    >
      <div
        className={`bg-black h-max mb-5  ${"p-12 w-[95%]"}`}
        style={{
          border: "1px solid #FFC83A",
          minHeight: "max-content",
        }}
      >
        <div className='text-white text-left width-4/5 text-large font-Orbitron mb-6'>
          Send Airdrops
        </div>
        <CustomInput
          label='Token Address'
          id='tokenAddress'
          name='tokenAddress'
          value={tokenInputVal}
          onChange={onChangeTokenVal}
          showSymbol={false}
          type={"text"}
          placeholder={"Enter Token Address"}
          showError={false}
          errorMessage={""}
          showCopy={false}
        />
        <div className='w-[90px] mt-6 flex justify-left'>
          <CustomButton
            label='Load'
            loading={false}
            onClick={handleLoadClick}
          />
        </div>
      </div>
      {showSetupForm && (
        <div
          className={`bg-black h-max mb-5  ${"p-12 w-[95%]"}`}
          style={{
            border: "1px solid #FFC83A",
            minHeight: "max-content",
          }}
        >
          <div>
            <div className='text-white text-left width-4/5 text-medium font-Orbitron'>
              Setup
            </div>
            <div className='flex mt-2'>
              <label className='label cursor-pointer'>
                <input
                  type='checkbox'
                  checked={data?.createAssociatedAccount}
                  onChange={() =>
                    setData((prev) => ({
                      ...prev,
                      createAssociatedAccount: !prev.createAssociatedAccount,
                    }))
                  }
                  className='checkbox checkbox-sm border-white mr-3 [--chkbg:theme(colors.yellow1)] checked:border-yellow1'
                />
                <span className='label-text font-Orbitron text-white text-xsmall'>
                  Create Associated Accounts
                </span>
              </label>
            </div>
          </div>

          <div className='my-4'>
            <div className='text-white text-left width-4/5 text-medium font-small font-Orbitron'>
              Allocation Method
            </div>
            <div className='flex mt-2'>
              <div className='flex flex-1'>
                <label className='label cursor-pointer'>
                  <input
                    type='radio'
                    name='allocation-method'
                    className='radio radio-sm	 mr-3 border-white checked:bg-yellow1 checked:border-yellow1'
                    value='fixed'
                    checked={data?.allocationMethod === "fixed"}
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        allocationMethod: e.target.value,
                      }));
                    }}
                  />
                  <span className='label-text font-Orbitron text-white text-xsmall'>
                    Fixed Amount
                  </span>
                </label>
              </div>
              <div className='flex flex-1'>
                <label className='label cursor-pointer'>
                  <input
                    type='radio'
                    name='allocation-method'
                    className='radio radio-sm	 mr-3 border-white checked:bg-yellow1 checked:border-yellow1'
                    value='dynamic'
                    checked={data?.allocationMethod === "dynamic"}
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        allocationMethod: e.target.value,
                      }));
                    }}
                  />
                  <span className='label-text font-Orbitron text-white text-xsmall'>
                    Dynamic Amount
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <CustomInput
              label={"Amount per Address"}
              value={data.amountPerAddress}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  amountPerAddress: e.target.value,
                }));
              }}
              containerStyles={{
                marginTop: 0,
                height: "28px",
              }}
              placeholderColor={"#989C9F"}
              placeholder={"Enter Amount"}
              type='number'
            />
            <p className='text-xsmall text-yellow1 text-right mt-1'>
              Balance: {parseFloat(data?.balance).toFixed(2)}
            </p>
          </div>

          <AirdropAddresses fileUploadAllowed={true} fees={data.fees} />
          <div className='mt-5'>
            <CustomButton
              onClick={() => {}}
              label={"Send Airdrops"}
              disabled={false}
              loading={false}
              containerStyles={{
                backgroundColor: "#FFC83A",
                paddingTop: 8,
                paddingBottom: 8,
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
      )}
    </div>
  );
};

export default AirdropHolder;
