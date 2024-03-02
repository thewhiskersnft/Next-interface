"use client";
import React, { useEffect, useState } from "react";
// import logo from "../asset/logo.jpeg";
// import menu from "../asset/menu.png";
// import search from "../asset/search.png";
// import walletImg from "../asset/walletImg.png";
import PrimaryHeader from "./primaryHeader";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  Connection,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Buffer } from "buffer";
import CustomInput from "./customInput";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";

const borderColor: string = "#4D4D4D";

interface HeaderProps {
  showPrimaryHeader: boolean;
}

const Header: React.FC<HeaderProps> = ({ showPrimaryHeader }) => {
  const [points, setPoints] = useState<number>(0);
  const [userAddress, setWalletAddress] = useState<null | string>(null);
  const [apiResponse, setApiResponse] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<string>("");
  const [showButton, setShowButton] = useState(false);

  const wallet = useWallet();

  useEffect(() => {
    setShowButton(true);
  }, []);

  return (
    <div>
      {showPrimaryHeader && <PrimaryHeader />}
      <div className="w-full bg-black flex items-center h-[46px]">
        <div
          className="cursor-pointer px-4 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          {/* <img
            src={logo}
            alt="logo"
            width={`${20}px`}
            style={{
              height: `${20}px`,
            }}
          /> */}
          <Image
            src={"/logo.jpeg"}
            alt="logo Logo"
            width={20}
            height={20}
            priority
          />
        </div>
        <div
          className="cursor-pointer px-4 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          {/* <img
            src={menu}
            alt="menu"
            width={`${16}px`}
            style={{
              height: `${16}px`,
            }}
          /> */}
          <Image
            src={"/menu.png"}
            alt="menu Logo"
            width={16}
            height={16}
            priority
          />
        </div>
        <div
          className="px-4 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-small font-Orbitron w-100 cursor-pointer">
            MARKETS
          </div>
        </div>
        <div
          className="px-4 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-small font-Orbitron w-100 cursor-pointer">
            TRADE
          </div>
        </div>
        <div
          className="px-4 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-small font-Orbitron w-100 cursor-pointer">
            PORTFOLIO
          </div>
        </div>
        <div
          className="px-4 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-small text-yellow1 font-Orbitron w-100 cursor-pointer">
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
          {/* <img
            src={search}
            alt="search"
            width={`${20}px`}
            style={{
              height: `${20}px`,
              marginRight: "10px",
            }}
          /> */}
          <Image
            src={"/search.png"}
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
            inputStyles={{ backgroundColor: "#FFC83A1A" }}
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
            // <img
            //   src={walletImg}
            //   alt="wallet"
            //   width={`${20}px`}
            //   style={{
            //     height: `${20}px`,
            //   }}
            // />
            <Image
              src={"/walletImg.png"}
              alt="wallet Logo"
              width={20}
              height={20}
              priority
            />
          )}
          {/* <div className="text-center text-white font-Orbitron w-100 cursor-pointer ml-3">
            Connect Wallet
          </div> */}
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
    </div>
  );
};

export default Header;
