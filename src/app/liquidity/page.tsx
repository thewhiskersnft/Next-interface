import ComingSoon from "@/component/comingSoon";
import Form from "@/component/form/form";
import Header from "@/component/header";
import PrimaryHeader from "@/component/primaryHeader";
import Sidebar from "@/component/form/sidebar";
import { Suspense } from "react";
import { isMobile } from "react-device-detect";
import Loader from "@/component/loader";

export default function Liquidity() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[100vh] w-[100vw] justify-center items-center absolute top-[0]">
          <Loader visible={true} size={80} />
        </div>
      }
    >
      <>
        <div className="block lg:hidden">
          <ComingSoon hideOnWeb={true} />
        </div>
        <div className="hidden lg:block">
          <div
            className="width-100 flex flex-col h-max"
            style={{ height: "100vh", overflow: "hidden" }}
          >
            <Header selectedLink="TOOLS" />
            <div className="width-100 flex flex-row h-full overflow-hidden bg-black">
              <Sidebar />
              <Form />
            </div>
            <PrimaryHeader />
          </div>
        </div>
      </>
    </Suspense>
  );
}
