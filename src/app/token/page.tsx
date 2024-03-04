"use client";
import ComingSoon from "@/component/comingSoon";
import Form from "@/component/form";
import Header from "@/component/header";
import Loader from "@/component/loader";
import PrimaryHeader from "@/component/primaryHeader";
import Sidebar from "@/component/sidebar";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

const FormFallback = () => <Loader visible={true} size={50} />;

export default function Token() {
  const [loading, setLoading] = useState(false);
  const windowWidth = window?.innerWidth;
  const isMobile = windowWidth < 1024;
  return (
    <Suspense fallback={FormFallback as any}>
      {isMobile ? (
        <ComingSoon />
      ) : (
        <>
          <div
            className={`absolute h-full w-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50 ${
              loading ? "visible" : "hidden"
            }`}
          >
            <Loader visible={loading} size={50} />
          </div>
          <div
            className="width-100 flex flex-col h-max"
            style={{ height: "100vh", overflow: "hidden" }}
          >
            <Header
              showPrimaryHeader={true}
              selectedLink="TOOLS"
              handleClickProp={() => {
                setLoading(true);
              }}
            />
            <div className="width-100 flex flex-row h-full overflow-hidden bg-black">
              <Sidebar />
              <Form />
              {/* <RightSidebar /> */}
            </div>
            <PrimaryHeader />
          </div>
        </>
      )}
    </Suspense>
  );
}
