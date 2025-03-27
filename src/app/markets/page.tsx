import ComingSoon from "@/component/common/comingSoon";
import Header from "@/component/common/header";
import Loader from "@/component/common/loader";
import PrimaryHeader from "@/component/common/primaryHeader";
import MarketComponent from "@/component/markets";
import React, { Suspense } from "react";

interface MarketsProps {}

const Markets = ({}: MarketsProps) => {
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
          {/* <ComingSoon hideOnWeb={false} /> */}
          <div
            className="width-100 flex flex-col h-max"
            style={{ height: "100vh", overflow: "hidden" }}
          >
            <Header selectedLink="MARKETS" />
            <div className="width-100 flex flex-row h-full overflow-hidden bg-black">
              <MarketComponent />
            </div>
            <PrimaryHeader />
          </div>
        </div>
      </>
    </Suspense>
  );
};

export default Markets;
