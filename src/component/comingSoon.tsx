"use client";
import Header from "@/component/header";
import Loader from "@/component/loader";
import PrimaryHeader from "@/component/primaryHeader";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { Suspense, useState } from "react";
import Marquee from "react-fast-marquee";

const FormFallback = () => <Loader visible={true} size={50} />;

export default function ComingSoon() {
  const [loading, setLoading] = useState(false);
  return (
    <Suspense fallback={FormFallback as any}>
      <div
        className={`absolute h-full w-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50 ${
          loading ? "visible" : "hidden"
        }`}
      >
        <Loader visible={loading} size={50} />
      </div>
      <div
        className="width-100 flex flex-col h-[100vh]"
        style={{
          overflow: "scroll",
        }}
      >
        <Header
          showPrimaryHeader={true}
          handleClickProp={() => {
            setLoading(true);
          }}
        />

        <div
          className="bg-gradient-to-t from-black to-transparent absolute h-[90vh] w-[100vw] bottom-[30px] flex items-center justify-center"
          style={{
            pointerEvents: "none",
          }}
        >
          <span style={{ position: "absolute", bottom: "15vh" }}>
            <section className="hidden lg:block">
              <Image
                src={"/comingSoon.svg"}
                alt="Coming Soon Logo"
                width={628}
                height={268}
                priority
              />
            </section>
            <section className="block lg:hidden">
              <Image
                src={"/comingSoon.svg"}
                alt="Coming Soon Logo"
                width={340}
                height={200}
                priority
              />
            </section>
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
        <section className="hidden lg:flex lg:flex-1">
          <Spline
            scene={
              "https://prod.spline.design/dex6W6sXGBikSDfO/scene.splinecode"
            }
          />
        </section>
        <section className="flex flex-1 lg:hidden">
          <Spline scene="https://prod.spline.design/tIdZB2tsRoGBg-y1/scene.splinecode" />
        </section>
        <div className="absolute bottom-[0] w-[100vw]">
          <Marquee>
            <Image
              src={"/marquelmg.svg"}
              alt="Coming Soon Logo"
              height={48}
              width={2166}
              priority
            />
          </Marquee>
          <section className="hidden lg:block">
            <PrimaryHeader />
          </section>
        </div>
      </div>
    </Suspense>
  );
}
