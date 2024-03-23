import ComingSoon from "@/component/common/comingSoon";
import Form from "@/component/form/form";
import Header from "@/component/common/header";
import PrimaryHeader from "@/component/common/primaryHeader";
import Sidebar from "@/component/common/sidebar";
import { Suspense } from "react";
import { isMobile } from "react-device-detect";
import Loader from "@/component/common/loader";

export default function Token() {
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
