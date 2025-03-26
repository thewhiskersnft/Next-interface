"use client";
import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import CustomInput from "./customInput";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { headerData } from "@/constants";
import { errorToast } from "./toast";
import Loader from "./loader";
import { setAppLoading } from "../../redux/slice/appDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { HeaderItem } from "@/interfaces";
import base58 from "bs58";
import { numberWithCommas } from "@/utils/common";
import authService from "@/services/authService";
import rewardService from "@/services/rewardService";
import { get } from "lodash";
import { clearLocalStorageForLogout, isSignedIn } from "@/utils/auth/checkAuth";
import { EVENTS } from "@/constants/eventListeners";
import {
  getLocalWalletAddress,
  getVariableFromLocalStorage,
} from "@/utils/apiService";
import { LocalStorageVariables } from "@/constants/appStorageVars";
import { setTotalRewards } from "@/redux/slice/userDataSlice";

const borderColor: string = "#4D4D4D";

interface HeaderProps {
  selectedLink?: string | undefined | null;
  handleClickProp?: Function;
}

const Header: React.FC<HeaderProps> = ({ selectedLink, handleClickProp }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [showButton, setShowButton] = useState(false);
  // const [rewards, setRewards] = useState(0);

  const wallet = useWallet();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const tokenAction = searchParams.get("action");

  const { appLoading } = useSelector((state: any) => state.appDataSlice);
  const { totalRewards } = useSelector((state: any) => state.userDataSlice);

  const attachEvents = () => {
    window.addEventListener(EVENTS.GET_REWARD_POINTS, fetchRewards);
  };

  const detachEvents = () => {
    window.removeEventListener(EVENTS.GET_REWARD_POINTS, fetchRewards);
  };

  useEffect(() => {
    if (selectedLink === undefined || selectedLink === null) {
      if (appLoading) {
        dispatch(setAppLoading(false));
      }
      setShowButton(true);
      return;
    }
    authenticateRouteAndFetchData();
    attachEvents();
    return () => {
      detachEvents();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedLink === undefined || selectedLink === null) {
      return;
    }
    const walletName = getVariableFromLocalStorage(
      LocalStorageVariables.walletName
    );
    if (wallet && !walletName) {
      // wallet disconnection
      console.warn("Please connect wallet!");
      clearLocalStorageForLogout();
    }
    if (
      wallet &&
      wallet.connected &&
      wallet?.publicKey?.toString() !== getLocalWalletAddress()
    ) {
      // wallet addr changed
      clearLocalStorageForLogout();
      // errorToast({ message: "Wallet address changed, please relogin!" });
    }
    if (wallet.connected && !isSignedIn()) {
      // wallet connected but not signed in
      handleSignIn();
    }
  }, [wallet?.connected]);

  const authenticateRouteAndFetchData = async () => {
    // const isAuthenticated = isSignedIn();
    setShowButton(true);
    // if (!isAuthenticated) {
    //   if (window?.location?.pathname !== "/")
    //     // errorToast({ message: "Please login!" });
    //     router.push("/");
    //   if (appLoading) {
    //     dispatch(setAppLoading(false));
    //   }
    //   return;
    // }
    if (appLoading) {
      dispatch(setAppLoading(false));
    }
    fetchRewards();
  };

  const fetchRewards = async () => {
    // const allRewards = await rewardService.fetchRewards();
    // if (allRewards?.status) {
    //   const updatedRewards = get(allRewards, "data.data.total_points", 0);
    //   // setRewards(updatedRewards);
    //   dispatch(setTotalRewards(updatedRewards));
    // }
  };

  const handleClick = (item: HeaderItem) => {
    // console.log(tokenAction, "tokenAction");
    // console.log(item, "item");
    if (tokenAction) {
    } else {
      if (!item.disabled) {
        // console.log("Pushing");
        dispatch(setAppLoading(true));
        router.push(item.navigateTo);
      } else {
        errorToast({ message: "Coming Soon!" });
      }
    }
  };

  const handleSignIn = async () => {
    if (!wallet.connected) {
      errorToast({ message: "Please connect wallet!" });
      return;
    }
    let loginMessage = await authService.loginMessage({
      walletAddress: wallet.publicKey?.toBase58(),
    });
    if (!loginMessage) {
      return;
    }
    const messageToShow = `${loginMessage.data?.data?.statement}\nnonce: ${
      loginMessage.data?.data?.nonce
    }\ndomain: ${
      loginMessage.data?.data?.resources &&
      loginMessage.data?.data?.resources[0]
    }\nissuedAt: ${loginMessage.data?.data?.issuedAt}`;
    try {
      const message = new TextEncoder().encode(messageToShow);
      if (wallet.signMessage) {
        const uint8arraySignature = await wallet.signMessage(message);
        if (uint8arraySignature) {
          let signInResp = await authService.login(
            {
              signature: base58.encode(uint8arraySignature),
              message: messageToShow,
              wallet_address: wallet.publicKey?.toBase58(),
              session_id: `${new Date().getTime()}_${wallet.publicKey?.toString()}`,
            },
            wallet.publicKey?.toString() || ""
          );
        }
      }
    } catch (e) {
      console.warn("could not sign message");
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
          <Loader visible={appLoading} size={80} />
        </div>
        <div
          className="cursor-pointer px-[18px] flex items-center h-full"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
          onClick={() => {
            if (get(window, "location.pathname", "") === "/") {
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
            className="hover:scale-125"
            priority
          />
        </div>
        <div
          className="cursor-pointer px-4 flex items-center h-full"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
          // onClick={handleSignIn}
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
                    : window?.location?.pathname === item.navigateTo
                    ? "text-yellow1"
                    : "text-white hover:text-yellow1"
                } text-small font-Orbitron w-100 cursor-pointer`}
                onClick={() => {
                  // console.log(item);
                  if (window?.location?.pathname === item.navigateTo) {
                    return;
                  }
                  handleClick(item);
                }}
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
          {/* <span
            className="flex pr-2 justify-between items-center h-max cursor-pointer"
            style={{
              borderRightWidth: "2px",
              borderColor: borderColor,
            }}
            onClick={() => {
              router.push("/rewards");
            }}
          >
            <Image
              src={"/moon.svg"}
              alt="moon Logo"
              className="hover:scale-125"
              width={28}
              height={28}
              priority
            />
            <p className="font-Oxanium text-xsmall text-white ml-2 mr-[10px]">
              {numberWithCommas(totalRewards)}
            </p>
          </span> */}
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
            // if (!tokenAction) {
            //   return;
            // } else {
            handleClickProp ? handleClickProp() : null;
            router.push(`/`);
            // }
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
