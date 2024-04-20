"use client";
import React, { useEffect, useState } from "react";
import {
  WalletMultiButton,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import "@solana/wallet-adapter-react-ui/styles.css";
import CustomInput from "./customInput";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { TokenRoutes, headerData } from "@/constants";
import { errorToast } from "./toast";
import Loader from "./loader";
import { setAppLoading } from "../../redux/slice/appDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { HeaderItem } from "@/interfaces";
import { SigninMessage } from "@/utils/auth/SigninMessage";
import bs58 from "bs58";
import base58 from "bs58";
import { numberWithCommas } from "@/utils/common";

const borderColor: string = "#4D4D4D";

interface HeaderProps {
  selectedLink?: string;
  handleClickProp?: Function;
}

const Header: React.FC<HeaderProps> = ({ selectedLink, handleClickProp }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [showButton, setShowButton] = useState(false);
  const [signature, setSignature] = useState();
  const [rewards, setRewards] = useState(234332);

  const wallet = useWallet();
  // const { publicKey, signMessage } = useWallet();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const tokenAction = searchParams.get("action");

  const { appLoading } = useSelector((state: any) => state.appDataSlice);

  useEffect(() => {
    setShowButton(true);
    if (appLoading) {
      dispatch(setAppLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (item: HeaderItem) => {
    if (tokenAction) {
    } else {
      if (!item.disabled) {
        dispatch(setAppLoading(true));
        router.push(item.navigateTo);
      } else {
        errorToast({ message: "Coming Soon!" });
      }
    }
  };

  // const handleSignIn = async () => {
  //   try {
  //     console.log("Wallet : ", wallet);
  //     console.log("walletModal : ", walletModal);
  //     if (!wallet.connected) {
  //       walletModal.setVisible(true);
  //     }

  //     const csrf = await getCsrfToken();
  //     console.log("CSFR : ", csrf);
  //     if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

  //     const message = new SigninMessage({
  //       domain: window.location.host,
  //       publicKey: wallet.publicKey?.toBase58(),
  //       statement: `Sign this message to sign in to the app.`,
  //       nonce: csrf,
  //     });
  //     console.log("Message : ", message);

  //     const data = new TextEncoder().encode(message.prepare());
  // const signature = await wallet.signMessage(data);
  //     const serializedSignature = bs58.encode(signature);
  //     console.log("data : ", data);
  //     console.log("signature : ", signature);
  //     console.log("serializedSignature : ", serializedSignature);

  //     signIn("credentials", {
  //       message: JSON.stringify(message),
  //       redirect: false,
  //       signature: serializedSignature,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSignIn = async () => {
    const messageToSign = `Moonly wants you to signin!
    Please signin after reading terms and conditions.
    
    ${JSON.stringify({
      address: "9PzXGVBpyghgKDXA5eUxDJp17b1gdfrzJX2f5Ff5dpuV",
      statement:
        "moonly.trade wants you to sign in with your Solana account:\n9PzXGVBpyghgKDXA5eUxDJp17b1gdfrzJX2f5Ff5dpuV\n\nClick Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee",
      nonce: "7chut45Mzg",
      chainId: "mainnet",
      issuedAt: "2024-04-20T16:49:32.389Z",
      resources: ["https://moonly.trade"],
    })}`;
    // JSON.stringify({
    //   address: "9PzXGVBpyghgKDXA5eUxDJp17b1gdfrzJX2f5Ff5dpuV",
    //   statement:
    //     "moonly.trade wants you to sign in with your Solana account:\n9PzXGVBpyghgKDXA5eUxDJp17b1gdfrzJX2f5Ff5dpuV\n\nClick Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee",
    //   nonce: "7chut45Mzg",
    //   chainId: "mainnet",
    //   issuedAt: "2024-04-20T16:49:32.389Z",
    //   resources: ["https://moonly.trade"],
    // });
    try {
      const message = new TextEncoder().encode(messageToSign);
      if (wallet.signMessage) {
        const uint8arraySignature = await wallet.signMessage(message);
        console.log(uint8arraySignature);
        setSignature(base58.encode(uint8arraySignature) as any);
        console.log(base58.encode(uint8arraySignature));
      }
    } catch (e) {
      console.log("could not sign message");
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
          onClick={handleSignIn}
        >
          <Image
            src={"/menuDisabled.svg"}
            alt="menu Logo"
            width={16}
            height={16}
            priority
          />
        </div>
        {headerData.map((item, index) => {
          return (
            <div
              className="px-4 flex items-center h-full"
              style={{
                borderRightWidth: "2px",
                borderColor: borderColor,
              }}
              key={index}
            >
              <div
                className={`text-center ${
                  item.disabled
                    ? "text-disabledLink"
                    : selectedLink === item.title
                    ? "text-yellow1"
                    : "text-white hover:text-yellow1"
                } text-small font-Orbitron w-100 cursor-pointer`}
                onClick={() => handleClick(item)}
              >
                {item.title}
              </div>
            </div>
          );
        })}
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
          <span
            className="flex pr-2 justify-between items-center h-max"
            style={{
              borderRightWidth: "2px",
              borderColor: borderColor,
            }}
          >
            <Image
              src={"/moon.svg"}
              alt="moon Logo"
              width={28}
              height={28}
              priority
            />
            <p className="font-Oxanium text-xsmall text-white ml-2">
              {numberWithCommas(rewards)}
            </p>
          </span>
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
