"use client";
import Header from "@/component/header";
import Loader from "@/component/loader";
import PrimaryHeader from "@/component/primaryHeader";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { useState } from "react";
import Marquee from "react-fast-marquee";

export default function ComingSoon() {
  const [loading, setLoading] = useState(false);
  const windowWidth = window?.innerWidth;
  const isMobile = windowWidth < 1024;
  //   console.log(windowWidth);
  return (
    <>
      <div
        className={`absolute h-full w-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50 ${
          loading ? "visible" : "hidden"
        }`}
      >
        <Loader visible={loading} size={50} />
      </div>
      <div
        className="width-100 flex flex-col h-[100vh]"
        style={{ overflow: "scroll" }}
      >
        <section className="hidden lg:block">
          <Header
            showPrimaryHeader={true}
            handleClickProp={() => {
              setLoading(true);
            }}
          />
        </section>
        <section
          className="block lg:hidden absolute top-[40px]"
          style={{ alignSelf: "center" }}
        >
          <Image
            src={"/mobileHeader.svg"}
            alt="mobileHeader Logo"
            width={118}
            height={36}
            priority
          />
        </section>
        <div
          className="bg-gradient-to-t from-black to-transparent absolute h-[90vh] w-[100vw] bottom-[30px]] flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          <span style={{ position: "absolute", bottom: "10vh" }}>
            <Image
              src={"/comingSoon.svg"}
              alt="Coming Soon Logo"
              width={!isMobile ? 628 : 340}
              height={!isMobile ? 268 : 200}
              priority
            />
            <span className="flex justify-center items-center mt-4">
              <a
                className="twitter cursor-pointer"
                href={"https://twitter.com/TheWhiskersNFT"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ pointerEvents: "auto" }}
              >
                <Image
                  src={"/twitter.svg"}
                  alt="twitter Logo"
                  width={20}
                  height={20}
                  priority
                />
              </a>
              <a
                className="discord ml-4"
                href={"https://discord.gg/HKZWP3dU3m"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ pointerEvents: "auto" }}
              >
                <Image
                  src={"/discord.svg"}
                  alt="discord Logo"
                  width={20}
                  height={20}
                  priority
                />
              </a>
            </span>
          </span>
        </div>
        <Spline
          scene={
            isMobile
              ? "https://prod.spline.design/dex6W6sXGBikSDfO/scene.splinecode" // update here for mobile spline
              : "https://prod.spline.design/dex6W6sXGBikSDfO/scene.splinecode"
          }
        />
        <div className="absolute bottom-[0] w-[100vw]">
          <Marquee>
            <Image
              src={"/marquelmg.svg"}
              alt="Coming Soon Logo"
              height={48}
              width={2188}
              priority
            />
          </Marquee>
          <section className="hidden lg:block">
            <PrimaryHeader />
          </section>
        </div>
      </div>
    </>
  );
}
