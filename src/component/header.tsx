"use client";
import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import CustomInput from "./customInput";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { TokenRoutes } from "@/constants";
import { errorToast } from "./toast";
import Loader from "./loader";
import { setAppLoading } from "../redux/slice/appDataSlice";
import { useDispatch, useSelector } from "react-redux";

const borderColor: string = "#4D4D4D";

interface HeaderProps {
  selectedLink?: string;
  handleClickProp?: Function;
}

const Header: React.FC<HeaderProps> = ({ selectedLink, handleClickProp }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [showButton, setShowButton] = useState(false);

  const wallet = useWallet();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const tokenAction = searchParams.get("action");

  const { appLoading } = useSelector((state: any) => state.appDataSlice);

  useEffect(() => {
    setShowButton(true);
    return () => {
      if (appLoading) {
        dispatch(setAppLoading(false));
      }
    };
  }, []);

  const handleClick = (tag: string) => {
    if (tokenAction) {
    } else {
      if (tag === "TOOLS") {
        // handleClickProp ? handleClickProp() : null;
        dispatch(setAppLoading(true));
        router.push(`/token?action=${TokenRoutes.createToken}`);
      } else {
        errorToast({ message: "Coming Soon!" });
      }
    }
  };

  return (
    <div>
      <div
        className="w-full bg-black items-center h-[46px] hidden lg:flex py-2" // desktop view header
        style={{ borderBottomWidth: "0.2px", borderColor: borderColor }}
      >
        <div
          className={`absolute h-[100vh] w-[100vw] top-[0] flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50 ${
            appLoading ? "visible" : "hidden"
          }`}
        >
          <Loader visible={appLoading} size={50} />
        </div>
        <div
          className="cursor-pointer px-4 flex items-center h-full"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
          onClick={() => {
            if (!tokenAction) {
              return;
            } else {
              dispatch(setAppLoading(true));
              router.push(`/`);
            }
          }}
        >
          <Image
            src={"/logo.svg"}
            alt="logo Logo"
            width={20}
            height={20}
            priority
          />
        </div>
        <div
          className="cursor-pointer px-4 flex items-center h-full"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <Image
            src={"/menuDisabled.svg"}
            alt="menu Logo"
            width={16}
            height={16}
            priority
          />
        </div>
        <div
          className="px-4 flex items-center h-full"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div
            className={`text-center ${
              selectedLink === "MARKET" ? "text-yellow1" : "text-disabledLink"
            } text-small font-Orbitron w-100 cursor-pointer`}
          >
            MARKETS
          </div>
        </div>
        <div
          className="px-4 flex items-center h-full"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div
            className={`text-center ${
              selectedLink === "TRADE" ? "text-yellow1" : "text-disabledLink"
            } text-small font-Orbitron w-100 cursor-pointer`}
          >
            TRADE
          </div>
        </div>
        <div
          className="px-4 flex items-center h-full"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div
            className={`text-center ${
              selectedLink === "PORTFOLIO"
                ? "text-yellow1"
                : "text-disabledLink"
            } text-small font-Orbitron w-100 cursor-pointer`}
          >
            PORTFOLIO
          </div>
        </div>
        <div
          className="px-4 flex items-center h-full"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div
            className={`text-center ${
              selectedLink === "TOOLS" ? "text-yellow1" : "text-white"
            } text-small font-Orbitron w-100 cursor-pointer hover:text-yellow1`}
            onClick={() => handleClick("TOOLS")}
          >
            TOOLS
          </div>
        </div>
        <div
          className="px-4"
          style={{
            borderColor: borderColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Image
            src={"/search.svg"}
            alt="search Logo"
            width={20}
            height={20}
            style={{ marginRight: "10px" }}
            priority
          />
          <CustomInput
            label={""}
            value={""}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            containerStyles={{ marginTop: 0 }}
            placeholderColor={"#989C9F"}
            placeholder={"Search for symbol, name, contract, or wallets"}
            type={"string"}
          />
        </div>
        <div
          className="px-4 flex items-center justify-center"
          style={{
            borderLeftWidth: "2px",
            borderColor: borderColor,
          }}
        >
          {wallet.connected ? (
            <></>
          ) : (
            <Image
              src={"/walletImg.svg"}
              alt="wallet Logo"
              width={20}
              height={20}
              priority
            />
          )}
          <div style={{}}>
            {showButton && (
              <WalletMultiButton
                style={{
                  borderRadius: "10px",
                  width: "max-content",
                  backgroundColor: "transparent",
                  border: "0px solid #67676F",
                  marginLeft: "10px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "12px",
                  padding: "5px",
                  height: "32px",
                  fontFamily: "Orbitron",
                  letterSpacing: "2px",
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className="w-full bg-black py-2 flex items-center h-[46px] block lg:hidden" // mobile view header
        style={{ borderBottomWidth: "0.2px", borderColor: borderColor }}
      >
        <div
          className="cursor-pointer px-4 flex items-center h-full"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
          onClick={() => {
            if (!tokenAction) {
              return;
            } else {
              handleClickProp ? handleClickProp() : null;
              router.push(`/`);
            }
          }}
        >
          <Image
            src={"/logo.svg"}
            alt="logo Logo"
            width={20}
            height={20}
            priority
          />
        </div>
        <div
          className="px-4"
          style={{
            borderColor: borderColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Image
            src={"/search.svg"}
            alt="search Logo"
            width={20}
            height={20}
            style={{ marginRight: "10px" }}
            priority
          />
          <CustomInput
            label={""}
            value={""}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            containerStyles={{ marginTop: 0 }}
            placeholderColor={"#989C9F"}
            placeholder={"Search"}
            type={"string"}
          />
        </div>
        <div
          className="px-4 h-full flex items-center justify-center"
          style={{
            borderLeftWidth: "2px",
            borderColor: borderColor,
          }}
        >
          {wallet.connected ? (
            <></>
          ) : (
            <Image
              src={"/walletImg.svg"}
              alt="wallet Logo"
              width={20}
              height={20}
              priority
            />
          )}
          <div
            style={{ borderLeftWidth: "2px", borderColor: borderColor }}
          ></div>
        </div>
        <div
          className="cursor-pointer px-4 flex items-center h-full"
          style={{
            borderLeftWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <Image
            src={"/menuDisabled.svg"}
            alt="menu Logo"
            width={20}
            height={20}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
