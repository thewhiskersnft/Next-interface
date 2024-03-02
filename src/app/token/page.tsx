"use client";
import Form from "@/component/form";
import Header from "@/component/header";
import Loader from "@/component/loader";
import Sidebar from "@/component/sidebar";
import Image from "next/image";
import { Suspense } from "react";

const FormFallback = () => <Loader visible={true} size={50} />;

export default function Token() {
  return (
    <Suspense fallback={FormFallback as any}>
      <div
        className="width-100 flex flex-col h-max"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Header showPrimaryHeader={true} />
        <div className="width-100 flex flex-row h-full overflow-hidden bg-black">
          <Sidebar />
          <Form />
          {/* <RightSidebar /> */}
        </div>
      </div>
    </Suspense>
  );
}
