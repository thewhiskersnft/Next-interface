"use client";
import ComingSoon from "@/component/common/comingSoon";
import FavouriteSidebar from "@/component/common/favouritesSidebar";
import Header from "@/component/common/header";
import Loader from "@/component/common/loader";
import PrimaryHeader from "@/component/common/primaryHeader";
import Sidebar from "@/component/common/sidebar";
import Form from "@/component/form/form";
import HomeComponent from "@/component/homeComponent";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[100vh] w-[100vw] bg-black justify-center items-center absolute top-[0]">
          <Loader visible={true} size={80} />
        </div>
      }
    >
      <>
        <div className="block lg:hidden">
          <ComingSoon hideOnWeb={true} triggerHeadersApi={false} />
        </div>
        <div className="hidden lg:block">
          <div
            className="width-100 flex flex-col h-max"
            style={{ height: "100vh", overflow: "hidden" }}
          >
            <Header selectedLink="" />
            <div className="width-100 flex flex-row h-full overflow-hidden bg-black">
              <FavouriteSidebar />
              <HomeComponent />
            </div>
            <PrimaryHeader />
          </div>
        </div>
      </>
    </Suspense>
    // <ComingSoon triggerHeadersApi={true} />
  );
}
