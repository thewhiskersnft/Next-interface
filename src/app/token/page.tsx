"use client";
import ComingSoon from "@/component/comingSoon";
import Form from "@/component/form";
import Header from "@/component/header";
import Loader from "@/component/loader";
import PrimaryHeader from "@/component/primaryHeader";
import Sidebar from "@/component/sidebar";
import { Suspense, useState } from "react";

const FormFallback = () => <Loader visible={true} size={50} />;

export default function Token() {
  const [loading, setLoading] = useState(false);
  return (
    <Suspense fallback={FormFallback as any}>
      <div className="block lg:hidden">
        <ComingSoon />
      </div>
      <div className="hidden lg:block">
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
            selectedLink="TOOLS"
            handleClickProp={() => {
              setLoading(true);
            }}
          />
          <div className="width-100 flex flex-row h-full overflow-hidden bg-black">
            <Sidebar />
            <Form />
          </div>
          <PrimaryHeader />
        </div>
      </div>
    </Suspense>
  );
}
