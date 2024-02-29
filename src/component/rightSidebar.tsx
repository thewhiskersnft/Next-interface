import React, { FC } from "react";
// import cat1 from "../asset/cat1.png";
// import website from "../asset/website.png";
// import twitter from "../asset/twitter.png";
// import discord from "../asset/discord.png";
// import telegram from "../asset/telegram.png";
import bullet from "../asset/bullet.png";
import { Extensions, PreviewData, TokenDetails } from "../interfaces";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { metaplexBuilder } from "@/metaplex";
import { MetaplexFile } from "@metaplex-foundation/js";
import { createSPLTokenTxBuilder } from "@/solana/txBuilder/createSPLTokenTxBuilder";

interface SidebarProps {
  data: PreviewData;
  showInfo: boolean;
  logo: string;
  createBtnText: string;
  mediaLinks: {
    website: string;
    twitter: string;
    discord: string;
    telegram: string;
  };
}

const RightSidebar: FC<SidebarProps> = ({
  data,
  showInfo,
  logo,
  createBtnText,
  mediaLinks,
}) => {
  const dataHeadings = Object.keys(data);
  console.log("Logo : ", logo);

  const {
    name,
    symbol,
    description,
    previewData,
    delegate,
    defaultAccountStateOption,
    rate,
    configAuthority,
    withdrawAuthority,
    maxFee,
    fee,
    nonTransferable,
    permanentDelegate,
    defaultAccountState,
    interestBearing,
    transferTax,
    enableExtensions,
    selectedForm,
    isToggled,
    discord,
    telegram,
    twitter,
    fileData,
    metaplexFileData,
    website,
    decimal,
    supply,

    tokenAddress,
    mintAuthority,
    freezeAuthority,
    mutableMetadata,
  } = useSelector((state: any) => state.formDataSlice);
  const wallet = useWallet();
  const { connection } = useConnection();
  const createTokenHandler = async () => {
    if (!wallet.connected) {
      console.log("Wallet not connected");
    }
    try {
      const isSPL = true;
      if (isSPL) {
        const metaplexhandler = await metaplexBuilder(wallet, connection);
        const imgURI = await metaplexhandler.storage().upload(metaplexFileData);
        console.log("Uploaded Image URI (Arweave)", imgURI);

        if (imgURI) {
          const tokenMetadata = {
            name: name,
            symbol: symbol,
            description: description,
            image: imgURI,
          };
          const { uri } = await metaplexhandler
            .nfts()
            .uploadMetadata(tokenMetadata);

          console.log("Uploaded Metadata URI (Arweave)", uri);

          const txhash = await createSPLTokenTxBuilder(
            name,
            symbol,
            decimal,
            uri,
            supply,
            connection,
            wallet
          );

          console.log("txhash", txhash);
        } else {
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mr-4 my-12 h-max w-[383px]">
      <div
        className="border-2"
        style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <div
          className="border-b-2 py-2 text-white cursor-pointer font-Orbitron text-small text-left px-4"
          style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        >
          Preview
        </div>
        <div className="p-4 bg-black">
          <div className="border-yellow1 border-2 flex items-center justify-center h-[343px] w-[343px]">
            {logo ? (
              <img
                src={logo} // default image is cat1 for now
                alt="cat1"
                width={`${254}px`}
                style={{
                  height: `${254}px`,
                  objectFit: "cover",
                }}
              />
            ) : (
              <Image
                src={"/cat1.png"}
                alt="Cat Logo"
                width={254}
                height={254}
                priority
              />
            )}
          </div>
          <span className="w-[full] flex justify-between items-center my-[20px] px-[90px]">
            <a className="website" href={mediaLinks.website}>
              {/* <img
                src={website}
                alt="website"
                width={`${23}px`}
                style={{
                  height: `${23}px`,
                }}
              /> */}
              <Image
                src={"/website.png"}
                alt="websity Logo"
                width={23}
                height={23}
                priority
              />
            </a>
            <a className="twitter" href={mediaLinks.twitter}>
              {/* <img
                src={twitter}
                alt="twitter"
                width={`${20}px`}
                style={{
                  height: `${20}px`,
                }}
              /> */}
              <Image
                src={"/twitter.png"}
                alt="twitter Logo"
                width={20}
                height={20}
                priority
              />
            </a>
            <a className="telegram" href={mediaLinks.telegram}>
              {/* <img
                src={telegram}
                alt="telegram"
                width={`${20}px`}
                style={{
                  height: `${20}px`,
                }}
              /> */}
              <Image
                src={"/telegram.png"}
                alt="telegram Logo"
                width={20}
                height={20}
                priority
              />
            </a>
            <a className="discord" href={mediaLinks.discord}>
              {/* <img
                src={discord}
                alt="discord"
                width={`${20}px`}
                style={{
                  height: `${20}px`,
                }}
              /> */}
              <Image
                src={"/discord.png"}
                alt="discord Logo"
                width={20}
                height={20}
                priority
              />
            </a>
          </span>
          {dataHeadings.map((heading: string, headingIndex: number) => {
            const keys = Object.keys(data[heading]);
            const headingData = data[heading];
            return (
              <React.Fragment key={headingIndex}>
                <span className="text-white flex mt-6">
                  <p className="w-1/2 text-left text-small text-yellow1 font-Orbitron my-[10px]">
                    {heading}
                  </p>
                </span>
                {keys.map((k, keyIndex) => {
                  const val = headingData[k];
                  return (
                    <span
                      className="text-white flex mt-2"
                      key={"hd-" + keyIndex}
                    >
                      <span className="w-1/3 flex justify-between">
                        <p className="text-left text-xsmall font-Oxanium">
                          {k}
                        </p>
                        <p className="text-left text-xsmall font-Oxanium">
                          {` : `}
                        </p>
                      </span>
                      <p className="w-2/3 text-left text-xsmall font-Oxanium pl-[7px]">
                        {`${val}`}
                      </p>
                    </span>
                  );
                })}
              </React.Fragment>
            );
          })}
          <button
            onClick={createTokenHandler}
            className="border-yellow1 border-2 w-full bg-buttonBlack rounded-sm mx-auto mt-6 py-1"
          >
            <p className="text-white text-xsmall">
              {createBtnText || "Create"}
            </p>
          </button>
        </div>
      </div>
      {showInfo && (
        <div
          className="border-2 mt-4"
          style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <div
            className="border-b-2 py-2 text-white cursor-pointer font-Orbitron text-small text-left px-4"
            style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
          >
            Information
          </div>
          <div className="p-4 bg-black">
            <span className="text-white flex mt-2">
              {/* <img
                src={bullet}
                alt="bullet"
                width={`${16}px`}
                style={{
                  height: `${16}px`,
                  marginRight: "8px",
                }}
              /> */}
              <Image
                src={"/bullet.png"}
                alt="bullet Logo"
                width={16}
                height={16}
                style={{ marginRight: "8px" }}
                priority
              />
              <p className="w-full text-left font-Oxanium text-xsmall">
                No smart contract programming necessary.
              </p>
            </span>
            <span className="text-white flex mt-2">
              {/* <img
                src={bullet}
                alt="bullet"
                width={`${16}px`}
                style={{
                  height: `${16}px`,
                  marginRight: "8px",
                }}
              /> */}
              <Image
                src={"/bullet.png"}
                alt="bullet Logo"
                width={16}
                height={16}
                style={{ marginRight: "8px" }}
                priority
              />
              <p className="w-full text-left font-Oxanium text-xsmall">
                Secure 100% ownership of generated token.
              </p>
            </span>
            <span className="text-white flex mt-2">
              {/* <img
                src={bullet}
                alt="bullet"
                width={`${16}px`}
                style={{
                  height: `${16}px`,
                  marginRight: "8px",
                }}
              /> */}
              <Image
                src={"/bullet.png"}
                alt="bullet Logo"
                width={16}
                height={16}
                style={{ marginRight: "8px" }}
                priority
              />
              <p className="w-full text-left font-Oxanium text-xsmall">
                Customize token name, symbol and initial supply.
              </p>
            </span>
            <span className="text-white flex mt-2">
              {/* <img
                src={bullet}
                alt="bullet"
                width={`${16}px`}
                style={{
                  height: `${16}px`,
                  marginRight: "8px",
                }}
              /> */}
              <Image
                src={"/bullet.png"}
                alt="bullet Logo"
                width={16}
                height={16}
                style={{ marginRight: "8px" }}
                priority
              />
              <p className="w-full text-left font-Oxanium text-xsmall">
                Sign and create your own wallet.
              </p>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
